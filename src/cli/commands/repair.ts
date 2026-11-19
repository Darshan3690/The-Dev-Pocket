import { Command } from "commander";
import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import { RepairLoop } from "../../safety/repair-loop.js";

const command = new Command("repair")
  .description("Run evidence-driven repair loop for failed checks")
  .option("--failure-id <id>", "Failure ID to repair (defaults to first failure in latest report)")
  .option("--root-cause <cause>", "Root cause description")
  .option("--max-attempts <count>", "Maximum repair verification attempts", "3")
  .action(async (opts) => {
    let failureId = opts.failureId;
    let rootCause = opts.rootCause;

    if (!failureId || !rootCause) {
      const reportPath = path.join(process.cwd(), ".vibeci", "reports", "latest.json");
      if (fs.existsSync(reportPath)) {
        try {
          const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
          const failed = report.results?.find((r: any) => r.exitCode !== 0);
          if (failed) {
            failureId = failureId || failed.id;
            rootCause = rootCause || failed.stderr || failed.stdout || "Command execution failure";
          }
        } catch {
          // ignore
        }
      }
    }

    if (!failureId) {
      console.log(chalk.yellow("No active failures found in .vibeci/reports/latest.json. Run `vibeci check` first or provide --failure-id."));
      process.exit(0);
    }

    rootCause = rootCause || "Automatic repair check verification";

    const loop = new RepairLoop(process.cwd());

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│         VIBECI — Evidence-Driven Repair            │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));

    console.log(`Failure ID: ${chalk.bold(failureId)}`);
    console.log(`Root Cause: ${chalk.gray(rootCause.substring(0, 100))}`);

    // Note: applyFix is a placeholder — in production, an AI agent would apply the fix
    const attempt = await loop.runRepair(
      failureId,
      rootCause,
      async () => {
        console.log(chalk.yellow("\n⚠ No automatic fix applied — agent must apply fix manually"));
        console.log(chalk.gray("  Edit the source file, then re-run `vibeci verify`"));
      }
    );

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — Repair Evidence Ledger          │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.log(`Attempt ID: ${attempt.attemptId}`);
    console.log(`Safety Audit: ${attempt.safetyAuditPassed ? chalk.green("PASSED") : chalk.red("REJECTED")}`);
    console.log(`Verification Exit Code: ${attempt.verificationExitCode}`);
    console.log(`Timestamp: ${attempt.timestamp}`);

    if (attempt.safetyAuditPassed && attempt.verificationExitCode === 0) {
      console.log(chalk.green("\n✓ Repair verified — ready for PR"));
      process.exit(0);
    } else {
      console.log(chalk.red("\n❌ Repair not verified — review violations and retry"));
      process.exit(1);
    }
  });

export default command;