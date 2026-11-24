#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { buildCITwin } from "./core/ci-twin.js";
import { auditRepairDiff } from "./safety/diff-auditor.js";
import preflightCmd from "./cli/commands/preflight.js";
import checkCmd from "./cli/commands/check.js";
import explainCmd from "./cli/commands/explain.js";
import repairCmd from "./cli/commands/repair.js";
import mcpCmd from "./cli/commands/mcp.js";
import analyzePrCmd from "./cli/commands/analyze-pr.js";
import initCmd from "./cli/commands/init.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const program = new Command();

program
  .name("vibeci")
  .description("The CI seatbelt for vibe coding and AI coding agents.")
  .version(pkg.version);

program
  .command("analyze")
  .description("Scan repository, build .vibeci/ci-twin.json, and detect local-to-CI environment gaps")
  .action(async () => {
    const spinner = ora("Scanning repository & building VibeCI Twin...").start();
    try {
      const twin = await buildCITwin(process.cwd());
      spinner.succeed(chalk.bold.green("VibeCI Twin generated (.vibeci/ci-twin.json)"));

      console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
      console.log(chalk.cyan("│       VIBECI — Pre-PR Intelligence & CI Twin       │"));
      console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
      console.log(`Repository:      ${chalk.bold(twin.repository)}`);
      console.log(`Local Env:       ${chalk.yellow(twin.local.os)} | Node ${chalk.yellow(twin.local.nodeVersion)} | ${twin.local.packageManager}`);
      console.log(`CI Workflows:    ${chalk.bold(twin.remoteCI.jobs.length)} job(s) detected`);

      for (const job of twin.remoteCI.jobs) {
        console.log(
          `  • ${chalk.bold(job.jobName)} (${job.workflowFile}) -> runs-on: ${chalk.magenta(job.runsOn)} | ${job.commands.length} command(s)`
        );
      }

      if (twin.gaps.length === 0) {
        console.log(chalk.green("\n✓ Zero environment or cross-platform casing gaps detected!"));
      } else {
        console.log(chalk.yellow(`\n⚠ Detected ${twin.gaps.length} CI Gap(s):`));
        for (const gap of twin.gaps) {
          const badge = gap.severity === "CRITICAL" ? chalk.bgRed.white(" CRITICAL ") : chalk.yellow(`[${gap.severity}]`);
          console.log(`  ${badge} ${chalk.bold(gap.category)}: ${gap.localValue} vs ${gap.ciValue}`);
          console.log(`     ↳ ${chalk.gray(gap.recommendation)}`);
        }
      }

      const scoreColor = twin.readinessScore >= 80 ? chalk.green : twin.readinessScore >= 60 ? chalk.yellow : chalk.red;
      console.log(`\nPR Readiness Score: ${scoreColor.bold(`${twin.readinessScore}/100`)}\n`);
    } catch (err: any) {
      spinner.fail(chalk.red(`Analysis failed: ${err.message}`));
      process.exit(1);
    }
  });

program
  .command("verify")
  .description("Run Anti-Cheat Git Diff Audit to verify AI agent repairs or PR diffs")
  .option("-b, --base <baseRef>", "Compare against base git reference (e.g. origin/main, main)")
  .option("-h, --head <headRef>", "Compare head git reference (defaults to HEAD)", "HEAD")
  .action(async (opts: { base?: string; head?: string }) => {
    const result = await auditRepairDiff(process.cwd(), {
      baseBranch: opts.base,
      headBranch: opts.head,
    });
    if (result.passed) {
      console.log(chalk.green.bold("✓ VibeCI Safety Audit PASSED: 0 suppressed rules, 0 weakened assertions."));
    } else {
      console.log(chalk.red.bold("❌ VibeCI Safety Audit REJECTED REPAIR / PR DIFF:"));
      for (const v of result.violations) {
        console.log(chalk.red(`  • ${v}`));
      }
      process.exit(1);
    }
  });

program.addCommand(preflightCmd);
program.addCommand(checkCmd);
program.addCommand(explainCmd);
program.addCommand(repairCmd);
program.addCommand(mcpCmd);
program.addCommand(analyzePrCmd);
program.addCommand(initCmd);

program.parse();