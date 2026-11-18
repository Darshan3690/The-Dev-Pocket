import fs from "node:fs";
import path from "node:path";
import { auditRepairDiff } from "./diff-auditor.js";
import { runCheck } from "../runners/local-runner.js";
import { classifyFailure } from "../intelligence/classifier.js";
import { FailureHistory } from "../intelligence/history.js";

export interface RepairAttempt {
  attemptId: string;
  failureId: string;
  rootCause: string;
  diff: string;
  safetyAuditPassed: boolean;
  verificationExitCode: number;
  timestamp: string;
}

export class RepairLoop {
  private repoRoot: string;
  private history: FailureHistory;

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot;
    this.history = new FailureHistory(repoRoot);
  }

  async runRepair(
    failureId: string,
    rootCause: string,
    applyFix: () => Promise<void>
  ): Promise<RepairAttempt> {
    const attemptId = `repair-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Step 1: Agent applies fix
    await applyFix();

    // Step 2: Capture diff
    const { execa } = await import("execa");
    const diffResult = await execa("git diff", { cwd: this.repoRoot });
    const diff = diffResult.stdout;

    // Step 3: Run anti-cheat safety audit
    const safetyAudit = await auditRepairDiff(this.repoRoot);

    let verificationExitCode = -1;

    if (safetyAudit.passed) {
      // Step 4: Re-run the failed check
      // In a real scenario, we'd know which check failed; here we re-run vitest
      const checkResult = await runCheck("verification", "npx vitest run", false);
      verificationExitCode = checkResult.exitCode;

      // Step 5: If check passes, run full suite
      if (verificationExitCode === 0) {
        const fullResult = await runCheck("full-suite", "npx vitest run", false);
        verificationExitCode = fullResult.exitCode;
      }
    }

    // Step 6: Record fingerprint in history
    const fingerprints = classifyFailure("", "", failureId);
    for (const fp of fingerprints.fingerprints) {
      this.history.record(fp.hash, rootCause);
    }

    const attempt: RepairAttempt = {
      attemptId,
      failureId,
      rootCause,
      diff,
      safetyAuditPassed: safetyAudit.passed,
      verificationExitCode,
      timestamp,
    };

    // Save evidence ledger
    const ledgerDir = path.join(this.repoRoot, ".vibeci", "ledger");
    fs.mkdirSync(ledgerDir, { recursive: true });
    fs.writeFileSync(
      path.join(ledgerDir, `${attemptId}.json`),
      JSON.stringify(attempt, null, 2),
      "utf8"
    );

    return attempt;
  }
}