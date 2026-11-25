import { execa } from "execa";
import { classifyFailure } from "../intelligence/classifier.js";
import { simpleGit } from "simple-git";

export interface RemoteFailure {
  prNumber: number;
  repo: string;
  checkName: string;
  status: string;
  failureLog: string;
  failedJobs: Array<{ name: string; conclusion: string; url?: string }>;
  classified: ReturnType<typeof classifyFailure>;
  ciTwinComparison: string;
}

export function parseRemoteUrl(remoteUrl: string): { owner: string; repo: string } | null {
  const cleanUrl = remoteUrl.trim();
  // Format: git@github.com:owner/repo.git or https://github.com/owner/repo.git
  const sshMatch = cleanUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?/i);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2].replace(/\.git$/, "") };
  }
  return null;
}

export async function detectRemoteRepo(repoRoot: string): Promise<string | null> {
  try {
    const git = simpleGit(repoRoot);
    const remotes = await git.getRemotes(true);

    const upstream = remotes.find((r) => r.name === "upstream");
    if (upstream && upstream.refs.fetch) {
      const parsed = parseRemoteUrl(upstream.refs.fetch);
      if (parsed) return `${parsed.owner}/${parsed.repo}`;
    }

    const origin = remotes.find((r) => r.name === "origin");
    if (origin && origin.refs.fetch) {
      const parsed = parseRemoteUrl(origin.refs.fetch);
      if (parsed) return `${parsed.owner}/${parsed.repo}`;
    }
  } catch {
    // fallback
  }
  return null;
}

export async function isGhAvailable(): Promise<boolean> {
  try {
    await execa("gh --version", { shell: true });
    return true;
  } catch {
    return false;
  }
}

export async function fetchFromGitHubApi(
  endpoint: string,
  token?: string
): Promise<any> {
  const ghToken = token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    "User-Agent": "VibeCI-Engine",
    Accept: "application/vnd.github.v3+json",
  };

  if (ghToken) {
    headers["Authorization"] = `Bearer ${ghToken}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : `https://api.github.com${endpoint}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub REST API error (${response.status}): ${response.statusText}`);
  }

  return response.json();
}

export async function analyzePr(prNumber: number, repoRoot: string = process.cwd()): Promise<RemoteFailure> {
  const targetRepo = await detectRemoteRepo(repoRoot);
  const repoFlag = targetRepo ? `-R ${targetRepo}` : "";
  const ghPresent = await isGhAvailable();

  let checkStatus = "unknown";
  let failureLog = "";
  const failedJobs: Array<{ name: string; conclusion: string; url?: string }> = [];

  if (ghPresent) {
    // GH CLI Flow with -R targeting
    try {
      const checksCmd = `gh pr checks ${prNumber} ${repoFlag}`.trim();
      const checksResult = await execa(checksCmd, {
        shell: true,
        cwd: repoRoot,
      });
      checkStatus = checksResult.stdout || "unknown";
    } catch (err: any) {
      checkStatus = err.stdout || err.stderr || "Checks pending or failed";
    }

    // Inspect failed runs and checks rollup
    try {
      const runViewCmd = `gh run list ${repoFlag} --limit 5 --json databaseId,status,conclusion,name,headBranch`.trim();
      const runView = await execa(runViewCmd, {
        shell: true,
        cwd: repoRoot,
      });
      const runs = JSON.parse(runView.stdout || "[]");
      const failedRun = runs.find((r: any) => r.conclusion === "failure");

      if (failedRun) {
        failedJobs.push({
          name: failedRun.name || "Workflow Run",
          conclusion: failedRun.conclusion,
        });

        const logResult = await execa(`gh run view ${failedRun.databaseId} ${repoFlag} --log-failed`.trim(), {
          shell: true,
          cwd: repoRoot,
        });
        failureLog = logResult.stdout;
      }
    } catch {
      // Fallback log retrieval
      if (!failureLog) {
        failureLog = "Unable to fetch failure logs via gh CLI";
      }
    }
  }

  // Direct GitHub REST API fallback if gh CLI failed or absent or gave no log
  const hasToken = !!(process.env.GITHUB_TOKEN || process.env.GH_TOKEN);
  if ((!ghPresent || !failureLog || failureLog === "Unable to fetch failure logs via gh CLI") && targetRepo) {
    try {
      // Fetch PR checks rollup / check-runs
      const prData = await fetchFromGitHubApi(`/repos/${targetRepo}/pulls/${prNumber}`);
      const headSha = prData.head?.sha;

      if (headSha) {
        const checkRunsData = await fetchFromGitHubApi(`/repos/${targetRepo}/commits/${headSha}/check-runs`);
        const runs = checkRunsData.check_runs || [];

        for (const run of runs) {
          if (run.conclusion === "failure") {
            failedJobs.push({
              name: run.name,
              conclusion: run.conclusion,
              url: run.html_url,
            });
            if (run.output?.text || run.output?.summary) {
              failureLog += `\n[${run.name}]\n${run.output.summary || ""}\n${run.output.text || ""}\n`;
            }
          }
        }

        if (runs.length > 0) {
          checkStatus = failedJobs.length > 0 ? "failure" : "success";
        }
      }
    } catch (apiErr: any) {
      if (!failureLog) {
        failureLog = `REST API Fallback attempt failed: ${apiErr.message}`;
      }
    }
  }

  if (!ghPresent && !hasToken && !failureLog) {
    throw new Error(
      "GitHub CLI ('gh') is not installed and no GITHUB_TOKEN/GH_TOKEN provided for REST API fallback."
    );
  }

  const classified = classifyFailure("", failureLog, `pr-${prNumber}`);

  return {
    prNumber,
    repo: targetRepo || "local",
    checkName: `pr-${prNumber}`,
    status: checkStatus,
    failureLog: failureLog || "No detailed failure logs found",
    failedJobs,
    classified,
    ciTwinComparison: "Run `vibeci env` locally to compare with CI environment",
  };
}
