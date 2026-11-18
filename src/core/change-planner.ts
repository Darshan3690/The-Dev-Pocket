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

export interface CheckPlan {
  queue: CheckItem[];
  skipReasons: string[];
}

const TEST_FILE_PATTERNS = [/\.(test|spec)\.(ts|js|jsx|tsx)$/, /__tests__\//];
const LOCK_FILE_PATTERNS = [/package-lock\.json$/, /pnpm-lock\.yaml$/, /yarn\.lock$/, /poetry\.lock$/, /uv\.lock$/];
const DOC_PATTERNS = [/\.md$/, /\/docs\//];

function categorizeFile(filePath: string): FileCategory {
  if (TEST_FILE_PATTERNS.some((p) => p.test(filePath))) return "TEST_FILES";
  if (LOCK_FILE_PATTERNS.some((p) => p.test(filePath))) return "DEPENDENCY_LOCK";
  if (filePath.startsWith(".github/workflows/")) return "CI_CONFIG";
  if (DOC_PATTERNS.some((p) => p.test(filePath))) return "DOCS_ONLY";
  return "SOURCE_CODE";
}

export async function planChecks(repoRoot: string): Promise<CheckPlan> {
  const git = simpleGit(repoRoot);
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    return { queue: [], skipReasons: ["Not a git repository"] };
  }

  const status = await git.status();
  const changedFiles = [...new Set([...status.modified, ...status.created, ...status.not_added])];

  const categories = changedFiles.map((f) => categorizeFile(f));
  const skipReasons: string[] = [];

  // If only docs changed, skip heavy checks
  if (categories.every((c) => c === "DOCS_ONLY") && changedFiles.length > 0) {
    skipReasons.push("Only documentation files changed — skipping heavy build/test checks");
  }

  const queue: CheckItem[] = [];

  // Always run static checks first
  queue.push({
    id: "static-casing",
    command: "vibeci preflight",
    category: "STATIC",
    estimatedMs: 100,
    relatedFiles: changedFiles.filter((f) => /\.(ts|tsx|js|jsx)$/.test(f)),
  });

  // Lint if source or test files changed
  if (categories.includes("SOURCE_CODE") || categories.includes("TEST_FILES")) {
    queue.push({
      id: "eslint",
      command: "npx eslint . --ext .ts,.tsx",
      category: "LINT",
      estimatedMs: 5000,
      relatedFiles: changedFiles.filter((f) => /\.(ts|tsx)$/.test(f)),
    });
  }

  // Type check if source files changed
  if (categories.includes("SOURCE_CODE")) {
    queue.push({
      id: "tsc",
      command: "npx tsc --noEmit",
      category: "TYPECHECK",
      estimatedMs: 10000,
      relatedFiles: changedFiles.filter((f) => /\.(ts|tsx)$/.test(f)),
    });
  }

  // Tests if test files or source files changed
  if (categories.includes("TEST_FILES") || categories.includes("SOURCE_CODE")) {
    queue.push({
      id: "vitest",
      command: "npx vitest run",
      category: "TEST",
      estimatedMs: 30000,
      relatedFiles: changedFiles.filter((f) => /\.(test|spec)\.(ts|tsx)$/.test(f)),
    });
  }

  // Build if lock files or source changed
  if (categories.includes("DEPENDENCY_LOCK") || categories.includes("SOURCE_CODE")) {
    queue.push({
      id: "build",
      command: "npm run build",
      category: "BUILD",
      estimatedMs: 60000,
      relatedFiles: changedFiles,
    });
  }

  return { queue, skipReasons };
}