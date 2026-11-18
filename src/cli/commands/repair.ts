import { Command } from "commander";
import chalk from "chalk";
import { RepairLoop } from "../../safety/repair-loop.js";

const command = new Command("repair")
  .description("Run evidence-driven repair loop for failed checks")
  .requiredOption("--failure-id <id>", "Failure ID to repair")
  .requiredOption("--root-cause <cause>", "Root cause description")
  .action(async (opts) => {
    const loop = new RepairLoop(process.cwd());

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│         VIBECI — Evidence-Driven Repair            │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));

    console.log(`Failure ID: ${opts.failureId}`);
    console.log(`Root Cause: ${opts.rootCause}`);

    // Note: applyFix is a placeholder — in production, an AI agent would apply the fix
    const attempt = await loop.runRepair(
      opts.failureId,
      opts.rootCause,
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