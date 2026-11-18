import { Command } from "commander";
import chalk from "chalk";
import { analyzePr } from "../../remote/pr-forensics.js";
import { generatePrBadge, copyToClipboard } from "../../remote/badge-generator.js";

const command = new Command("analyze-pr")
  .description("Analyze remote PR failures and generate verification badge")
  .argument("<pr-number>", "Pull Request number")
  .action(async (prNumber: string, opts: any) => {
    const prNum = parseInt(prNumber, 10);

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│         VIBECI — Remote PR Forensics               │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));

    console.log(chalk.yellow(`\nAnalyzing PR #${prNum}...`));

    try {
      const result = await analyzePr(prNum);

      console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
      console.log(chalk.cyan("│           VIBECI — PR Analysis Report              │"));
      console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
      console.log(`PR Number: ${result.prNumber}`);
      console.log(`Check Status: ${result.status}`);
      console.log(`\nClassified Failures: ${result.classified.summary}`);

      for (const fp of result.classified.fingerprints) {
        console.log(`  • ${fp.category} — ${fp.errorCode ?? "unknown"}`);
        console.log(`    File: ${fp.file}${fp.line ? `:${fp.line}` : ""}`);
      }

      console.log(chalk.gray(`\nCI Twin Comparison: ${result.ciTwinComparison}`));

      // Generate badge
      const badgeData = {
        readinessScore: result.classified.fingerprints.length > 0 ? 40 : 100,
        ciTwinParity: false,
        executedChecks: [],
        safetyAudit: { passed: true, violations: 0 },
      };
      const badge = generatePrBadge(badgeData);
      console.log(chalk.gray("\nPR Badge:"));
      console.log(badge);

      if (opts.copyPrBadge) {
        copyToClipboard(badge);
        console.log(chalk.green("✓ PR badge copied to clipboard"));
      }

      process.exit(0);
    } catch (err: any) {
      console.log(chalk.red(`\n❌ PR analysis failed: ${err.message}`));
      process.exit(1);
    }
  });

export default command;