import fs from "node:fs";
import path from "node:path";
import { simpleGit } from "simple-git";
import { parseGitHubWorkflows } from "./workflow-parser.js";
import type { CITwin, EnvironmentGap } from "../schemas/ci-twin.schema.js";

function detectPackageManager(repoRoot: string): CITwin["local"]["packageManager"] {
  if (fs.existsSync(path.join(repoRoot, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(repoRoot, "package-lock.json"))) return "npm";
  if (fs.existsSync(path.join(repoRoot, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(repoRoot, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(repoRoot, "uv.lock"))) return "uv";
  if (fs.existsSync(path.join(repoRoot, "poetry.lock"))) return "poetry";
  if (fs.existsSync(path.join(repoRoot, "requirements.txt"))) return "pip";
  return "unknown";
}

function checkExactCaseOnDisk(baseDir: string, importPath: string): { valid: boolean; actual?: string } {
  const normalized = importPath.replace(/\\/g, "/");
  const targetFull = path.resolve(baseDir, normalized);
  const dir = path.dirname(targetFull);
  const baseName = path.basename(targetFull).replace(/\.(js|jsx|ts|tsx)$/, "");

  if (!fs.existsSync(dir)) return { valid: true };

  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const entryWithoutExt = entry.replace(/\.(js|jsx|ts|tsx|d\.ts)$/, "");
    if (entryWithoutExt.toLowerCase() === baseName.toLowerCase()) {
      if (entryWithoutExt !== baseName && entry !== path.basename(targetFull)) {
        return { valid: false, actual: entry };
      }
    }
  }
  return { valid: true };
}

export async function buildCITwin(repoRoot: string): Promise<CITwin> {
  const jobs = await parseGitHubWorkflows(repoRoot);
  const localOS = process.platform;
  const localNode = process.version.replace(/^v/, "");
  const packageManager = detectPackageManager(repoRoot);
  const gaps: EnvironmentGap[] = [];
  let score = 100;

  const usesUbuntuCI = jobs.some((j) => j.runsOn.toLowerCase().includes("ubuntu"));
  if ((localOS === "win32" || localOS === "darwin") && usesUbuntuCI) {
    gaps.push({
      id: "GAP-OS-01",
      category: "OS_MISMATCH",
      severity: "MEDIUM",
      localValue: localOS,
      ciValue: "ubuntu-latest (case-sensitive ext4)",
      recommendation: "VibeCI Case-Sensitivity Guard enabled for relative imports.",
    });
    score -= 10;
  }

  for (const job of jobs) {
    if (job.nodeVersion) {
      const ciMajor = job.nodeVersion.split(".")[0]?.replace(/[^0-9]/g, "");
      const localMajor = localNode.split(".")[0];
      if (ciMajor && localMajor && ciMajor !== localMajor) {
        gaps.push({
          id: `GAP-NODE-${job.jobName}`,
          category: "RUNTIME_MISMATCH",
          severity: "MEDIUM",
          localValue: `Node ${localNode}`,
          ciValue: `Node ${job.nodeVersion} (in ${job.workflowFile}#${job.jobName})`,
          recommendation: `Switch local Node version to v${ciMajor} or verify Node ${ciMajor} API compatibility.`,
        });
        score -= 10;
        break;
      }
    }
  }

  const git = simpleGit(repoRoot);
  const isRepo = await git.checkIsRepo();
  if (isRepo) {
    const status = await git.status();
    const changedFiles = [...new Set([...status.modified, ...status.created, ...status.not_added])].filter(
      (f) => /\.(ts|tsx|js|jsx)$/.test(f)
    );

    const importRegex = /(?:import\s+.*?from\s+|require\()\s*['"](\.[^'"]+)['"]/g;

    for (const relFile of changedFiles) {
      const absFile = path.join(repoRoot, relFile);
      if (!fs.existsSync(absFile)) continue;
      const lines = fs.readFileSync(absFile, "utf8").split("\n");

      lines.forEach((lineText, idx) => {
        for (const match of lineText.matchAll(importRegex)) {
          const imp = match[1];
          if (!imp) continue;
          const check = checkExactCaseOnDisk(path.dirname(absFile), imp);
          if (!check.valid) {
            gaps.push({
              id: `GAP-CASE-${relFile}-${idx + 1}`,
              category: "CASE_SENSITIVITY_TRAP",
              severity: "CRITICAL",
              localValue: imp,
              ciValue: check.actual ?? "exact-case-required",
              file: relFile,
              line: idx + 1,
              recommendation: `Update import '${imp}' in ${relFile}:${idx + 1} to match exact disk filename '${check.actual}'. Will fail on Ubuntu CI!`,
            });
            score -= 25;
          }
        }
      });
    }
  }

  const twin: CITwin = {
    generatedAt: new Date().toISOString(),
    repository: path.basename(repoRoot),
    local: {
      os: localOS,
      nodeVersion: localNode,
      packageManager,
    },
    remoteCI: {
      provider: "github-actions",
      jobs,
    },
    gaps,
    readinessScore: Math.max(0, score),
  };

  const outDir = path.join(repoRoot, ".vibeci");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "ci-twin.json"), JSON.stringify(twin, null, 2), "utf8");

  return twin;
}