import { execa } from "execa";
import { classifyFailure } from "../intelligence/classifier.js";

export interface RemoteFailure {
  prNumber: number;
  checkName: string;
  status: string;
  failureLog: string;
  classified: ReturnType<typeof classifyFailure>;
  ciTwinComparison: string;
}

export async function analyzePr(prNumber: number): Promise<RemoteFailure> {
  // Check if gh CLI is available
  try {
    await execa("gh --version", { shell: true });
  } catch {
    throw new Error(
      "GitHub CLI ('gh') is not installed or not available in PATH. Please install it from https://cli.github.com to use PR forensics."
    );
  }

  // Get PR check status
  let checkStatus = "unknown";
  try {
    const checksResult = await execa(`gh pr checks ${prNumber}`, {
      shell: true,
      cwd: process.cwd(),
    });
    checkStatus = checksResult.stdout || "unknown";
  } catch (err: any) {
    checkStatus = err.stdout || err.stderr || "Checks pending or failed";
  }

  // Try to get failure logs
  let failureLog = "";
  try {
    const runView = await execa(`gh run list --limit 1 --json databaseId,status,conclusion`, {
      shell: true,
      cwd: process.cwd(),
    });
    const runs = JSON.parse(runView.stdout || "[]");
    const failedRun = runs.find((r: any) => r.conclusion === "failure");
    if (failedRun) {
      const logResult = await execa(`gh run view ${failedRun.databaseId} --log-failed`, {
        shell: true,
        cwd: process.cwd(),
      });
      failureLog = logResult.stdout;
    }
  } catch {
    failureLog = "Unable to fetch failure logs";
  }

  const classified = classifyFailure("", failureLog, `pr-${prNumber}`);

  return {
    prNumber,
    checkName: `pr-${prNumber}`,
    status: checkStatus,
    failureLog,
    classified,
    ciTwinComparison: "Run `vibeci env` locally to compare with CI environment",
  };
}