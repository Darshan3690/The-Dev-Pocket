export type ReadinessStatus = "READY" | "MODERATE RISK" | "NEEDS REPAIR";

export interface ReadinessScore {
  score: number;
  status: ReadinessStatus;
  deductions: Array<{ reason: string; points: number }>;
}

export function calculateReadinessScore(
  failedChecks: number,
  hasLockfileDrift: boolean,
  hasOsRuntimeMismatch: boolean,
  hasCriticalGap: boolean
): ReadinessScore {
  const deductions: Array<{ reason: string; points: number }> = [];
  let score = 100;

  if (failedChecks > 0) {
    const deduction = failedChecks * 25;
    score -= deduction;
    deductions.push({ reason: `${failedChecks} failed CI check(s)`, points: deduction });
  }

  if (hasLockfileDrift) {
    score -= 15;
    deductions.push({ reason: "Lockfile drift detected", points: 15 });
  }

  if (hasOsRuntimeMismatch) {
    score -= 10;
    deductions.push({ reason: "OS/runtime mismatch", points: 10 });
  }

  if (hasCriticalGap) {
    score -= 25;
    deductions.push({ reason: "Critical cross-platform gap", points: 25 });
  }

  score = Math.max(0, score);

  let status: ReadinessStatus;
  if (score >= 90) status = "READY";
  else if (score >= 60) status = "MODERATE RISK";
  else status = "NEEDS REPAIR";

  return { score, status, deductions };
}