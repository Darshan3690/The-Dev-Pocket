import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { planChecks } from "../../core/change-planner.js";
import { runCheck } from "../../runners/local-runner.js";
import fs from "node:fs";
import path from "node:path";

const command = new Command("check")
  .description("Execute change-aware checks with safety guards")
  .option("--allow-build", "Allow moderate-risk build commands")
  .action(async (opts) => {
    const spinner = ora("Planning checks...").start();
    const plan = await planChecks(process.cwd());

    if (plan.skipReasons.length > 0) {
      spinner.info(chalk.yellow(`Skipping: ${plan.skipReasons.join(", ")}`));
    }

    if (plan.queue.length === 0) {
      spinner.stop();
      console.log(chalk.green("✓ No checks needed"));
      process.exit(0);
    }

    spinner.text = `Running ${plan.queue.length} check(s)...`;
    const results: any[] = [];

    for (const item of plan.queue) {
      spinner.text = `Running ${item.id}...`;
      const result = await runCheck(item.id, item.command, opts.allowBuild);
      results.push(result);

      const statusIcon = result.exitCode === 0 ? chalk.green("✓") : chalk.red("✗");
      console.log(`  ${statusIcon} ${item.id} (${result.durationMs}ms)`);
      if (result.exitCode !== 0 && result.stderr) {
        console.log(chalk.gray(`    ${result.stderr.substring(0, 200)}`));
      }
    }

    spinner.stop();

    const failed = results.filter((r) => r.exitCode !== 0);
    const passed = results.filter((r) => r.exitCode === 0);

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — Check Results                   │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.log(`Passed: ${chalk.green(passed.length)} | Failed: ${chalk.red(failed.length)}`);

    // Save report
    const reportDir = path.join(process.cwd(), ".vibeci", "reports");
    fs.mkdirSync(reportDir, { recursive: true });
    const report = {
      generatedAt: new Date().toISOString(),
      total: results.length,
      passed: passed.length,
      failed: failed.length,
      results,
    };
    fs.writeFileSync(path.join(reportDir, "latest.json"), JSON.stringify(report, null, 2), "utf8");

    console.log(chalk.gray("\nReport saved to .vibeci/reports/latest.json"));
    process.exit(failed.length > 0 ? 1 : 0);
  });

export default command;