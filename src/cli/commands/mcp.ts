import { Command } from "commander";
import chalk from "chalk";

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

    // Import and run the MCP server
    const { Server } = await import("@modelcontextprotocol/sdk/server/index.js");
    const {
      CallToolRequestSchema,
      ListToolsRequestSchema,
    } = await import("@modelcontextprotocol/sdk/types.js");
    const { buildCITwin } = await import("../../core/ci-twin.js");
    const { auditRepairDiff } = await import("../../safety/diff-auditor.js");

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