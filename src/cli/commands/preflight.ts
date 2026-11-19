import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { buildCITwin } from "../../core/ci-twin.js";

const command = new Command("preflight")
  .description("Run preflight checks: CI twin analysis + cross-platform casing guard")
  .option("--strict", "Strict mode: exit with failure if any gap or score < 100")
  .option("--copy-pr-badge", "Copy PR badge Markdown to clipboard")
  .action(async (opts) => {
    const spinner = ora("Running preflight checks...").start();
    try {
      const twin = await buildCITwin(process.cwd());
      spinner.succeed(chalk.bold.green("Preflight complete"));

      console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
      console.log(chalk.cyan("│           VIBECI — Preflight Report                │"));
      console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));

      if (twin.gaps.length === 0) {
        console.log(chalk.green("✓ No gaps detected — CI twin is in sync"));
      } else {
        const critical = twin.gaps.filter((g) => g.severity === "CRITICAL");
        if (critical.length > 0) {
          console.log(chalk.red(`\n❌ ${critical.length} CRITICAL gap(s) — will fail on CI:`));
          for (const gap of critical) {
            console.log(`  • ${gap.category}: ${gap.localValue} vs ${gap.ciValue}`);
            console.log(`    ${gap.recommendation}`);
          }
        }

        const nonCritical = twin.gaps.filter((g) => g.severity !== "CRITICAL");
        if (nonCritical.length > 0) {
          console.log(chalk.yellow(`\n⚠ ${nonCritical.length} non-critical gap(s):`));
          for (const gap of nonCritical) {
            console.log(`  • [${gap.severity}] ${gap.category}: ${gap.localValue} vs ${gap.ciValue}`);
          }
        }
      }

      const scoreColor = twin.readinessScore >= 80 ? chalk.green : twin.readinessScore >= 60 ? chalk.yellow : chalk.red;
      console.log(`\nPR Readiness Score: ${scoreColor.bold(`${twin.readinessScore}/100`)}`);

      if (opts.copyPrBadge) {
        const badge = generatePrBadge(twin);
        console.log(chalk.gray("\nPR Badge (copy manually):"));
        console.log(chalk.gray(badge));
      }

      const shouldFail = opts.strict ? (twin.gaps.length > 0 || twin.readinessScore < 100) : (twin.readinessScore < 60);
      process.exit(shouldFail ? 1 : 0);
    } catch (err: any) {
      spinner.fail(chalk.red(`Preflight failed: ${err.message}`));
      process.exit(1);
    }
  });

function generatePrBadge(twin: any): string {
  const status = twin.readinessScore >= 80 ? "✅ PASS" : twin.readinessScore >= 60 ? "⚠️ WARN" : "❌ FAIL";
  return `<details>
<summary>VibeCI Preflight Report — ${status}</summary>

| Metric | Value |
|--------|-------|
| Readiness Score | ${twin.readinessScore}/100 |
| CI Gaps | ${twin.gaps.length} |
| Local OS | ${twin.local.os} |
| Node Version | ${twin.local.nodeVersion} |
| Package Manager | ${twin.local.packageManager} |

</details>`;
}

export default command;