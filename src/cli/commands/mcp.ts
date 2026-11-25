import { Command } from "commander";
import chalk from "chalk";
import { startMcpServer } from "../../mcp/server.js";

const command = new Command("mcp")
  .description("Start VibeCI JSON-RPC 2.0 MCP server for IDE agent integration")
  .action(async () => {
    // Log info only to stderr so stdout remains clean JSON-RPC for MCP
    console.error(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.error(chalk.cyan("│           VIBECI — MCP Server                      │"));
    console.error(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.error(chalk.yellow("Starting MCP server on stdio..."));
    console.error(chalk.gray("Tools available: get_ci_twin, run_preflight, verify_repair"));
    console.error(chalk.gray("Connect your IDE agent (Cursor, Claude Code, Antigravity)"));

    await startMcpServer();
  });

export default command;
