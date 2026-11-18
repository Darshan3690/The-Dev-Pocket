import { Command } from "commander";
import chalk from "chalk";

const command = new Command("mcp")
  .description("Start VibeCI JSON-RPC 2.0 MCP server for IDE agent integration")
  .action(async () => {
    console.log(chalk.cyan("\n╭────────────────────────────────────────────────────╮"));
    console.log(chalk.cyan("│           VIBECI — MCP Server                      │"));
    console.log(chalk.cyan("╰────────────────────────────────────────────────────╯"));
    console.log(chalk.yellow("Starting MCP server on stdio..."));
    console.log(chalk.gray("Tools available: get_ci_twin, run_preflight, verify_repair"));
    console.log(chalk.gray("Connect your IDE agent (Cursor, Claude Code, Antigravity)"));
    console.log();

    // Import and run the MCP server
    const { Server } = await import("@modelcontextprotocol/sdk/server");
    const {
      CallToolRequestSchema,
      ListToolsRequestSchema,
    } = await import("@modelcontextprotocol/sdk/types");
    const { buildCITwin } = require("../../core/ci-twin.js");
    const { auditRepairDiff } = require("../../safety/diff-auditor.js");

    const server = new Server(
      { name: "vibeci", version: "0.1.0" },
      { capabilities: { tools: {} } }
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_ci_twin",
          description: "Get CI Twin environment analysis",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "run_preflight",
          description: "Run preflight checks",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "verify_repair",
          description: "Verify repair diff safety audit",
          inputSchema: { type: "object", properties: {} },
        },
      ],
    }));

    server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      const { name } = request.params;
      if (name === "get_ci_twin") {
        const twin = await buildCITwin(process.cwd());
        return { content: [{ type: "text", text: JSON.stringify(twin, null, 2) }] };
      }
      if (name === "run_preflight") {
        const twin = await buildCITwin(process.cwd());
        const critical = twin.gaps.filter((g: any) => g.severity === "CRITICAL");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ gaps: twin.gaps.length, critical: critical.length, readinessScore: twin.readinessScore, blocked: critical.length > 0 }, null, 2),
          }],
        };
      }
      if (name === "verify_repair") {
        const result = await auditRepairDiff(process.cwd());
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
      throw new Error(`Unknown tool: ${name}`);
    });

    const { StdioServerTransport } = await import(
      "@modelcontextprotocol/sdk/server/stdio.js"
    );
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("VibeCI MCP server running on stdio");
  });

export default command;