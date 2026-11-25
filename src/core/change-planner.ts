import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { simpleGit } from "simple-git";

export type FileCategory =
  | "SOURCE_CODE"
  | "TEST_FILES"
  | "DEPENDENCY_LOCK"
  | "CI_CONFIG"
  | "DOCS_ONLY";

export interface CheckItem {
  id: string;
  command: string;
  category: "STATIC" | "LINT" | "TYPECHECK" | "TEST" | "BUILD";
  estimatedMs: number;
  relatedFiles: string[];
}

export interface VerificationGap {
  tool: string;
  category: "LINT" | "TEST" | "BUILD";
  reason: string;
  containerFallback?: string;
}

export interface CheckPlan {
  queue: CheckItem[];
  skipReasons: string[];
  skippedGaps: VerificationGap[];
}

const TEST_FILE_PATTERNS = [
  /\.(test|spec)\.(ts|js|jsx|tsx)$/,
  /__tests__\//,
  /test_[^/]+\.py$/,
  /[^/]+_test\.py$/,
  /tests?\//,
  /test_[^/]+\.cpp$/,
];

const LOCK_FILE_PATTERNS = [
  /package-lock\.json$/,
  /pnpm-lock\.yaml$/,
  /yarn\.lock$/,
  /poetry\.lock$/,
  /uv\.lock$/,
  /Cargo\.lock$/,
];

const DOC_PATTERNS = [/\.md$/, /\/docs\//, /^website\//];

export function hasBinary(binaryName: string): boolean {
  try {
    const cmd = process.platform === "win32" ? `where.exe ${binaryName}` : `which ${binaryName}`;
    execSync(cmd, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function categorizeFile(filePath: string): FileCategory {
  if (TEST_FILE_PATTERNS.some((p) => p.test(filePath))) return "TEST_FILES";
  if (LOCK_FILE_PATTERNS.some((p) => p.test(filePath))) return "DEPENDENCY_LOCK";
  if (filePath.startsWith(".github/workflows/")) return "CI_CONFIG";
  if (DOC_PATTERNS.some((p) => p.test(filePath))) return "DOCS_ONLY";
  return "SOURCE_CODE";
}

export interface PlanCheckOptions {
  all?: boolean;
  fast?: boolean;
  baseBranch?: string;
  headBranch?: string;
}

export async function planChecks(repoRoot: string, options: PlanCheckOptions = {}): Promise<CheckPlan> {
  const git = simpleGit(repoRoot);
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    return { queue: [], skipReasons: ["Not a git repository"], skippedGaps: [] };
  }

  let changedFiles: string[] = [];

  if (options.baseBranch) {
    const head = options.headBranch || "HEAD";
    try {
      const diffSummary = await git.diffSummary([`${options.baseBranch}...${head}`]);
      changedFiles = diffSummary.files.map((f) => f.file);
    } catch {
      try {
        const diffSummary = await git.diffSummary([`${options.baseBranch}..${head}`]);
        changedFiles = diffSummary.files.map((f) => f.file);
      } catch {
        // fallback to working tree
      }
    }
  }

  if (changedFiles.length === 0) {
    const status = await git.status();
    changedFiles = [...new Set([...status.modified, ...status.created, ...status.not_added])];
  }

  const categories = changedFiles.map((f) => categorizeFile(f));
  const skipReasons: string[] = [];
  const skippedGaps: VerificationGap[] = [];
  const queue: CheckItem[] = [];

  // Always run static checks first
  queue.push({
    id: "static-casing",
    command: "vibeci preflight",
    category: "STATIC",
    estimatedMs: 100,
    relatedFiles: changedFiles.filter((f) => /\.(ts|tsx|js|jsx|py|cpp|h|hpp|c|rs|go)$/.test(f)),
  });

  const shouldRunAll = options.all || changedFiles.length === 0;

  // If only docs changed and not --all, skip heavy checks
  if (!shouldRunAll && categories.every((c) => c === "DOCS_ONLY") && changedFiles.length > 0) {
    skipReasons.push("Only documentation files changed — skipping heavy build/test checks");
    return { queue, skipReasons, skippedGaps };
  }

  // Node.js project checks
  const packageJsonPath = path.join(repoRoot, "package.json");
  const hasPackageJson = fs.existsSync(packageJsonPath);
  let pkgScripts: Record<string, string> = {};

  if (hasPackageJson) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      pkgScripts = pkg.scripts || {};
    } catch {
      // ignore JSON parse error
    }
  }

  // Lint
  const hasEslint =
    fs.existsSync(path.join(repoRoot, "eslint.config.mjs")) ||
    fs.existsSync(path.join(repoRoot, "eslint.config.js")) ||
    fs.existsSync(path.join(repoRoot, ".eslintrc.json")) ||
    fs.existsSync(path.join(repoRoot, ".eslintrc.js")) ||
    !!pkgScripts["lint"];

  if (hasEslint && (shouldRunAll || categories.includes("SOURCE_CODE") || categories.includes("TEST_FILES"))) {
    queue.push({
      id: "eslint",
      command: pkgScripts["lint"] ? "npm run lint" : "npx eslint . --ext .ts,.tsx",
      category: "LINT",
      estimatedMs: 5000,
      relatedFiles: changedFiles.filter((f) => /\.(ts|tsx|js|jsx)$/.test(f)),
    });
  }

  // C/C++ formatting checks (clang-format)
  const hasClangFormat =
    fs.existsSync(path.join(repoRoot, ".clang-format")) ||
    fs.existsSync(path.join(repoRoot, "_clang-format"));
  const cppFiles = changedFiles.filter((f) => /\.(cpp|cc|cxx|c|h|hpp)$/i.test(f));

  if (hasClangFormat || cppFiles.length > 0) {
    if (hasBinary("clang-format")) {
      queue.push({
        id: "clang-format",
        command: "clang-format --dry-run --Werror " + (cppFiles.length > 0 ? cppFiles.join(" ") : "."),
        category: "LINT",
        estimatedMs: 3000,
        relatedFiles: cppFiles,
      });
    } else {
      const gap: VerificationGap = {
        tool: "clang-format",
        category: "LINT",
        reason: "C/C++ sources or .clang-format detected but clang-format binary is missing locally.",
        containerFallback: "docker run --rm -v ${PWD}:/work -w /work ghcr.io/clang-format/clang-format --dry-run --Werror",
      };
      skippedGaps.push(gap);
      skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
    }
  }

  // Python linters: ruff & black
  const pythonFiles = changedFiles.filter((f) => /\.py$/i.test(f));
  const hasPythonConfig =
    fs.existsSync(path.join(repoRoot, "pyproject.toml")) ||
    fs.existsSync(path.join(repoRoot, "ruff.toml")) ||
    fs.existsSync(path.join(repoRoot, ".ruff.toml"));

  if (pythonFiles.length > 0 || hasPythonConfig) {
    // Ruff check
    if (hasBinary("ruff")) {
      queue.push({
        id: "ruff",
        command: "ruff check .",
        category: "LINT",
        estimatedMs: 2000,
        relatedFiles: pythonFiles,
      });
    } else {
      const gap: VerificationGap = {
        tool: "ruff",
        category: "LINT",
        reason: "Python files or config detected but ruff linter is not installed locally.",
        containerFallback: "docker run --rm -v ${PWD}:/app -w /app python:3.11-slim sh -c 'pip install -q ruff && ruff check .'",
      };
      skippedGaps.push(gap);
      skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
    }

    // Black check
    if (hasBinary("black")) {
      queue.push({
        id: "black",
        command: "black --check .",
        category: "LINT",
        estimatedMs: 3000,
        relatedFiles: pythonFiles,
      });
    } else {
      const gap: VerificationGap = {
        tool: "black",
        category: "LINT",
        reason: "Python files detected but black formatter is not installed locally.",
        containerFallback: "docker run --rm -v ${PWD}:/app -w /app python:3.11-slim sh -c 'pip install -q black && black --check .'",
      };
      skippedGaps.push(gap);
      skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
    }
  }

  // Type check if tsconfig exists
  const hasTsConfig = fs.existsSync(path.join(repoRoot, "tsconfig.json"));
  if (hasTsConfig && (shouldRunAll || categories.includes("SOURCE_CODE"))) {
    queue.push({
      id: "tsc",
      command: pkgScripts["typecheck"] ? "npm run typecheck" : "npx tsc --noEmit",
      category: "TYPECHECK",
      estimatedMs: 10000,
      relatedFiles: changedFiles.filter((f) => /\.(ts|tsx)$/.test(f)),
    });
  }

  // Skip test & build if --fast
  if (options.fast) {
    skipReasons.push("--fast flag enabled: skipping heavy test and build suites");
    return { queue, skipReasons, skippedGaps };
  }

  // Tests
  const hasVitest =
    fs.existsSync(path.join(repoRoot, "vitest.config.ts")) ||
    fs.existsSync(path.join(repoRoot, "vitest.config.js")) ||
    !!pkgScripts["test"];

  const hasPythonTests =
    fs.existsSync(path.join(repoRoot, "pytest.ini")) ||
    fs.existsSync(path.join(repoRoot, "pyproject.toml")) ||
    fs.existsSync(path.join(repoRoot, "setup.py")) ||
    pythonFiles.some((f) => f.includes("test"));

  const hasCargo = fs.existsSync(path.join(repoRoot, "Cargo.toml"));

  if (hasVitest && (shouldRunAll || categories.includes("TEST_FILES") || categories.includes("SOURCE_CODE"))) {
    queue.push({
      id: "vitest",
      command: pkgScripts["test"] ? "npm test" : "npx vitest run",
      category: "TEST",
      estimatedMs: 30000,
      relatedFiles: changedFiles.filter((f) => /\.(test|spec)\.(ts|tsx|js|jsx)$/.test(f)),
    });
  }

  if (hasPythonTests && (shouldRunAll || categories.includes("TEST_FILES") || categories.includes("SOURCE_CODE"))) {
    if (hasBinary("pytest")) {
      queue.push({
        id: "pytest",
        command: "pytest -q",
        category: "TEST",
        estimatedMs: 20000,
        relatedFiles: pythonFiles,
      });
    } else {
      const gap: VerificationGap = {
        tool: "pytest",
        category: "TEST",
        reason: "Python test files detected but pytest executable is not installed in local environment.",
        containerFallback: "docker run --rm -v ${PWD}:/app -w /app python:3.11-slim sh -c 'pip install -q pytest && pytest -q'",
      };
      skippedGaps.push(gap);
      skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
    }
  }

  if (hasCargo && (shouldRunAll || categories.includes("SOURCE_CODE"))) {
    if (hasBinary("cargo")) {
      queue.push({
        id: "cargo-test",
        command: "cargo test",
        category: "TEST",
        estimatedMs: 30000,
        relatedFiles: changedFiles.filter((f) => /\.rs$/.test(f)),
      });
    } else {
      const gap: VerificationGap = {
        tool: "cargo",
        category: "TEST",
        reason: "Rust project detected but cargo executable is not installed in local environment.",
        containerFallback: "docker run --rm -v ${PWD}:/app -w /app rust:latest cargo test",
      };
      skippedGaps.push(gap);
      skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
    }
  }

  // Build: Only if repository actually declares a build script or build file
  const hasNpmBuild = hasPackageJson && !!pkgScripts["build"];
  const hasCargoBuild = hasCargo;
  const hasCmake = fs.existsSync(path.join(repoRoot, "CMakeLists.txt"));

  if (shouldRunAll || categories.includes("DEPENDENCY_LOCK") || categories.includes("SOURCE_CODE")) {
    if (hasNpmBuild) {
      queue.push({
        id: "build",
        command: "npm run build",
        category: "BUILD",
        estimatedMs: 60000,
        relatedFiles: changedFiles,
      });
    } else if (hasCargoBuild && hasBinary("cargo")) {
      queue.push({
        id: "cargo-build",
        command: "cargo build --release",
        category: "BUILD",
        estimatedMs: 60000,
        relatedFiles: changedFiles.filter((f) => /\.rs$/.test(f)),
      });
    } else if (hasCmake) {
      if (hasBinary("cmake") && (hasBinary("ninja") || hasBinary("make"))) {
        queue.push({
          id: "cmake-build",
          command: "cmake -B build && cmake --build build",
          category: "BUILD",
          estimatedMs: 90000,
          relatedFiles: changedFiles.filter((f) => /\.(cpp|cc|c|h|hpp|txt)$/i.test(f)),
        });
      } else {
        const gap: VerificationGap = {
          tool: "cmake/ninja",
          category: "BUILD",
          reason: "CMake build system detected but cmake/ninja toolchain is missing locally.",
          containerFallback: "act -j build (or docker run --rm -v ${PWD}:/src -w /src debian:bookworm-slim sh -c 'apt update && apt install -y cmake ninja-build build-essential && cmake -B build && cmake --build build')",
        };
        skippedGaps.push(gap);
        skipReasons.push(`[UNVERIFIED GAP] ${gap.reason}`);
      }
    }
  }

  return { queue, skipReasons, skippedGaps };
}
