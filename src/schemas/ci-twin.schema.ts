import { z } from "zod";

export const GapSeveritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const EnvironmentGapSchema = z.object({
  id: z.string(),
  category: z.enum([
    "OS_MISMATCH",
    "RUNTIME_MISMATCH",
    "PACKAGE_MANAGER_MISMATCH",
    "CASE_SENSITIVITY_TRAP",
    "ENGINE_CONFIG_DRIFT",
  ]),
  severity: GapSeveritySchema,
  localValue: z.string(),
  ciValue: z.string(),
  file: z.string().optional(),
  line: z.number().optional(),
  recommendation: z.string(),
});

export const CIJobSchema = z.object({
  workflowFile: z.string(),
  jobName: z.string(),
  runsOn: z.string(),
  nodeVersion: z.string().optional(),
  pythonVersion: z.string().optional(),
  commands: z.array(z.string()),
});

export const CITwinSchema = z.object({
  generatedAt: z.string(),
  repository: z.string(),
  local: z.object({
    os: z.string(),
    nodeVersion: z.string(),
    pythonVersion: z.string().optional(),
    packageManager: z.enum(["pnpm", "npm", "yarn", "bun", "pip", "uv", "poetry", "unknown"]),
  }),
  remoteCI: z.object({
    provider: z.literal("github-actions"),
    jobs: z.array(CIJobSchema),
  }),
  gaps: z.array(EnvironmentGapSchema),
  readinessScore: z.number().min(0).max(100),
});

export type CITwin = z.infer<typeof CITwinSchema>;
export type EnvironmentGap = z.infer<typeof EnvironmentGapSchema>;
export type CIJob = z.infer<typeof CIJobSchema>;