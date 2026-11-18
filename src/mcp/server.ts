import { Server } from "@modelcontextprotocol/sdk/server";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types";
import { buildCITwin } from "../core/ci-twin.js";
import { auditRepairDiff } from "../safety/diff-auditor.js";
import { planChecks } from "../core/change-planner.js";

const server = new Server(
  {
    name: "vibeci",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools
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

async function main() {
  // Import and start the stdio transport
  const { StdioServerTransport } = await import(
    "@modelcontextprotocol/sdk/server/stdio.js"
  );
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("VibeCI MCP server running on stdio");
}

main().catch((err) => {
  console.error("MCP server error:", err);
  process.exit(1);
});