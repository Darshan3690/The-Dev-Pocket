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
  // Get PR check status
  const checksResult = await execa(`gh pr checks ${prNumber}`, {
    cwd: process.cwd(),
  });

  // Get failed run logs
  const runsResult = await execa(`gh pr view ${prNumber} --json commits`, {
    cwd: process.cwd(),
  });

  // Try to get failure logs
  let failureLog = "";
  try {
    const runView = await execa(`gh run list --limit 1 --json databaseId,status,conclusion`, {
      cwd: process.cwd(),
    });
    const runs = JSON.parse(runView.stdout);
    const failedRun = runs.find((r: any) => r.conclusion === "failure");
    if (failedRun) {
      const logResult = await execa(`gh run view ${failedRun.databaseId} --log-failed`, {
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
    status: checksResult.stdout || "unknown",
    failureLog,
    classified,
    ciTwinComparison: "Run `vibeci env` locally to compare with CI environment",
  };
}