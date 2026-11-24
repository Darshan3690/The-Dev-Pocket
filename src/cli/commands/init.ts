import { Command } from "commander";
import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import { simpleGit } from "simple-git";

const command = new Command("init")
  .description("Initialize VibeCI guardrails in repository (config and git hooks)")
  .option("--hook", "Install pre-commit anti-cheat verification hook")
  .action(async (opts) => {
    const repoRoot = process.cwd();
    const vibeciDir = path.join(repoRoot, ".vibeci");
    if (!fs.existsSync(vibeciDir)) {
      fs.mkdirSync(vibeciDir, { recursive: true });
    }

    const configPath = path.join(vibeciDir, "config.json");
    if (!fs.existsSync(configPath)) {
      const config = {
        version: "1.0",
        strict: false,
        rules: {
          blockCasingTraps: true,
          antiCheatGuard: true,
          checkCiMatrix: true
        }
      };
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
      console.log(chalk.green("✓ Initialized .vibeci/config.json"));
    }

    if (opts.hook) {
      const gitDir = path.join(repoRoot, ".git");
      if (fs.existsSync(gitDir)) {
        const hooksDir = path.join(gitDir, "hooks");
        fs.mkdirSync(hooksDir, { recursive: true });
        const preCommitPath = path.join(hooksDir, "pre-commit");
        const script = `#!/bin/sh\nnpx vibeci verify\n`;
        fs.writeFileSync(preCommitPath, script, { mode: 0o755 });
        console.log(chalk.green("✓ Installed git pre-commit hook in .git/hooks/pre-commit"));
      }
    }

    console.log(chalk.cyan("\n🚀 VibeCI ready! Run `npx vibeci preflight` anytime."));
  });

export default command;
