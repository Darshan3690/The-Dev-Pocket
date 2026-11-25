import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { planChecks } from "../../core/change-planner.js";
import { runCheck } from "../../runners/local-runner.js";
import { validatePrTemplate } from "../../core/pr-template-validator.js";
import { calculateReadinessScore } from "../../intelligence/scorer.js";
import fs from "node:fs";
import path from "node:path";

const command = new Command("check")
  .description("Execute change-aware checks with safety guards")
  .option("--allow-build", "Allow moderate-risk build commands")
  .option("--all", "Run all CI jobs regardless of git diff")
  .option("--fast", "Skip slow build and test suites, run fast static checks only")
  .option("--base <branch>", "Base branch for comparison (e.g. origin/main)")
  .option("--pr-template", "Validate local git commit/PR description against .github/PULL_REQUEST_TEMPLATE.md")
  .option("--pr-metadata", "Alias for --pr-template: validate PR metadata guardrail before pushing")
  .action(async (opts) => {
    // 1. PR Template Guardrail Validation if requested
    if (opts.prTemplate || opts.prMetadata) {
      console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
      console.log(chalk.cyan("│       VIBECI — PR Template & Metadata Guardrail    │"));
      console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
      const tplResult = await validatePrTemplate(process.cwd());

      if (!tplResult.templateFound) {
        console.log(chalk.yellow(`ℹ ${tplResult.warnings.join("\n")}`));
      } else if (!tplResult.valid) {
        console.log(chalk.red(`❌ PR Template Guardrail FAILED (${tplResult.templatePath}):`));
        for (const w of tplResult.warnings) {
          console.log(chalk.red(`  • ${w}`));
        }
        if (tplResult.uncompletedCheckboxes.length > 0) {
          console.log(chalk.yellow("\nUncompleted checkboxes:"));
          for (const box of tplResult.uncompletedCheckboxes) {
            console.log(chalk.yellow(`  [ ] ${box}`));
          }
        }
        process.exit(1);
      } else {
        console.log(chalk.green(`✓ PR Template validation PASSED: Required sections, checkboxes, and risk level verified.`));
      }

      // If user only wanted template check without running full pipeline
      if (!opts.all && !opts.base) {
        // Continue to plan or complete if specific check requested
      }
    }

    const spinner = ora("Planning checks...").start();
    const plan = await planChecks(process.cwd(), {
      all: opts.all,
      fast: opts.fast,
      baseBranch: opts.base,
    });

    if (plan.skipReasons.length > 0) {
      spinner.info(chalk.yellow(`Skipping / Unverified Notes:\n  ${plan.skipReasons.join("\n  ")}`));
    }

    if (plan.skippedGaps.length > 0) {
      console.log(chalk.yellow(`\n⚠ UNVERIFIED GAPS (${plan.skippedGaps.length} missing toolchains):`));
      for (const gap of plan.skippedGaps) {
        console.log(`  • [${gap.category}] ${gap.tool}: ${gap.reason}`);
        if (gap.containerFallback) {
          console.log(chalk.cyan(`    ↳ Container Fallback: ${gap.containerFallback}`));
        }
      }
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

    // Calculate score taking skipped gaps into account
    const readiness = calculateReadinessScore(
      failed.length,
      false,
      false,
      false,
      plan.skippedGaps.length
    );

    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — Check Results                   │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.log(`Passed: ${passed.length} | Failed: ${failed.length} | Unverified Gaps: ${plan.skippedGaps.length}`);
    const scoreColor = readiness.status === "READY" ? chalk.green : readiness.status === "MODERATE RISK" ? chalk.yellow : chalk.red;
    console.log(`Readiness Score: ${scoreColor.bold(`${readiness.score}/100`)} (${readiness.status})\n`);

    if (readiness.deductions.length > 0) {
      console.log("Score Deductions:");
      for (const d of readiness.deductions) {
        console.log(`  -${d.points} pts: ${d.reason}`);
      }
      console.log("");
    }

    const reportDir = path.join(process.cwd(), ".vibeci", "reports");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(reportDir, "latest.json"),
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          total: results.length,
          passed: passed.length,
          failed: failed.length,
          skippedGaps: plan.skippedGaps,
          readinessScore: readiness.score,
          readinessStatus: readiness.status,
          results,
        },
        null,
        2
      )
    );

    console.log(chalk.gray(`Report saved to .vibeci/reports/latest.json\n`));

    if (failed.length > 0) {
      process.exit(1);
    }
  });

export default command;
