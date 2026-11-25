import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import YAML from "yaml";
import type { CIJob } from "../schemas/ci-twin.schema.js";

export async function parseGitHubWorkflows(repoRoot: string): Promise<CIJob[]> {
  const workflowFiles = await fg(".github/workflows/*.{yml,yaml}", {
    cwd: repoRoot,
    absolute: true,
  });

  const extractedJobs: CIJob[] = [];

  for (const filePath of workflowFiles) {
    try {
      const rawContent = fs.readFileSync(filePath, "utf8");
      const parsed = YAML.parse(rawContent);
      if (!parsed?.jobs || typeof parsed.jobs !== "object") continue;

      const relativeFile = path.relative(repoRoot, filePath).replace(/\\/g, "/");

      for (const [jobName, jobDef] of Object.entries<any>(parsed.jobs)) {
        const runsOn = Array.isArray(jobDef?.["runs-on"])
          ? jobDef["runs-on"].join(",")
          : String(jobDef?.["runs-on"] ?? "ubuntu-latest");

        let nodeVersion: string | undefined;
        let pythonVersion: string | undefined;
        const commands: string[] = [];

        const matrix = jobDef?.strategy?.matrix;
        if (matrix?.["node-version"]) {
          nodeVersion = Array.isArray(matrix["node-version"])
            ? String(matrix["node-version"][0])
            : String(matrix["node-version"]);
        } else if (matrix?.["node"]) {
          nodeVersion = Array.isArray(matrix["node"])
            ? String(matrix["node"][0])
            : String(matrix["node"]);
        }

        if (matrix?.["python-version"]) {
          pythonVersion = Array.isArray(matrix["python-version"])
            ? String(matrix["python-version"][0])
            : String(matrix["python-version"]);
        } else if (matrix?.["python"]) {
          pythonVersion = Array.isArray(matrix["python"])
            ? String(matrix["python"][0])
            : String(matrix["python"]);
        }

        const steps = Array.isArray(jobDef?.steps) ? jobDef.steps : [];
        for (const step of steps) {
          if (typeof step?.uses === "string") {
            if (step.uses.startsWith("actions/setup-node") && step.with?.["node-version"]) {
              nodeVersion = String(step.with["node-version"]);
            }
            if (step.uses.startsWith("actions/setup-python") && step.with?.["python-version"]) {
              pythonVersion = String(step.with["python-version"]);
            }
          }
          if (typeof step?.run === "string") {
            const cleanLines = step.run
              .split("\n")
              .map((l: string) => l.trim())
              .filter((l: string) => l.length > 0 && !l.startsWith("#"));
            commands.push(...cleanLines);
          }
        }

        extractedJobs.push({
          workflowFile: relativeFile,
          jobName,
          runsOn,
          nodeVersion,
          pythonVersion,
          commands,
        });
      }
    } catch {
      // Ignore unparseable workflow files gracefully
    }
  }

  return extractedJobs;
}
