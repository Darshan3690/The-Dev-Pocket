import { Command } from "commander";
import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import { classifyFailure } from "../../intelligence/classifier.js";
import { FailureHistory } from "../../intelligence/history.js";
import { calculateReadinessScore } from "../../intelligence/scorer.js";

const command = new Command("explain")
  .description("Classify failures and show readiness score from latest check report")
  .action(async () => {
    const reportPath = path.join(process.cwd(), ".vibeci", "reports", "latest.json");

    if (!fs.existsSync(reportPath)) {
      console.log(chalk.red("No check report found. Run `vibeci check` first."));
      process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const history = new FailureHistory(process.cwd());

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — Failure Explanation             │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));

    let allFingerprints: any[] = [];
    let totalFailed = 0;

    for (const result of report.results) {
      if (result.exitCode !== 0) {
        totalFailed++;
        const classified = classifyFailure(result.stdout, result.stderr, result.id);
        allFingerprints.push(...classified.fingerprints);

        console.log(chalk.yellow(`\n${result.id}:`));
        console.log(chalk.gray(`  Summary: ${classified.summary}`));

        for (const fp of classified.fingerprints) {
          const histEntry = history.lookup(fp.hash);
          console.log(`  • ${chalk.bold(fp.category)} — ${fp.errorCode ?? "unknown code"}`);
          console.log(`    File: ${fp.file}${fp.line ? `:${fp.line}` : ""}`);
          if (histEntry) {
            console.log(chalk.gray(`    📜 Previously resolved: ${histEntry.resolution}`));
          }
        }
      }
    }

    // Calculate readiness score
    const hasCriticalGap = false; // Would come from CI twin
    const score = calculateReadinessScore(totalFailed, false, false, hasCriticalGap);
    const scoreColor = score.status === "READY" ? chalk.green : score.status === "MODERATE RISK" ? chalk.yellow : chalk.red;

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — Readiness Score                 │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.log(`Score: ${scoreColor.bold(`${score.score}/100`)} — ${score.status}`);
    for (const d of score.deductions) {
      console.log(`  -${d.points}: ${d.reason}`);
    }

    process.exit(totalFailed > 0 ? 1 : 0);
  });

export default command;