import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildCITwin } from "../core/ci-twin.js";
import { auditRepairDiff } from "../safety/diff-auditor.js";

export function createMcpServer(): Server {
  const server = new Server(
    {
      name: "vibeci",
      version: "0.1.2",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "get_ci_twin",
        description: "Get the CI Twin environment analysis (.vibeci/ci-twin.json)",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "run_preflight",
        description: "Run preflight checks: CI twin + casing guard",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "verify_repair",
        description: "Run anti-cheat diff safety audit on current git diff",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    const { name } = request.params;

    if (name === "get_ci_twin") {
      const twin = await buildCITwin(process.cwd());
      return {
        content: [{ type: "text", text: JSON.stringify(twin, null, 2) }],
      };
    }

    if (name === "run_preflight") {
      const twin = await buildCITwin(process.cwd());
      const critical = twin.gaps.filter((g: any) => g.severity === "CRITICAL");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                gaps: twin.gaps.length,
                critical: critical.length,
                readinessScore: twin.readinessScore,
                blocked: critical.length > 0,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === "verify_repair") {
      const result = await auditRepairDiff(process.cwd());
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  return server;
}

export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("VibeCI MCP server running on stdio");
}

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  startMcpServer().catch((err) => {
    console.error("MCP server error:", err);
    process.exit(1);
  });
}
