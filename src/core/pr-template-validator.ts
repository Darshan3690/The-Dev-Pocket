import fs from "node:fs";
import path from "node:path";
import { simpleGit } from "simple-git";

export interface PrTemplateCheckResult {
  valid: boolean;
  templateFound: boolean;
  templatePath?: string;
  missingSections: string[];
  uncompletedCheckboxes: string[];
  missingRiskLevel: boolean;
  warnings: string[];
}

export function findPrTemplate(repoRoot: string): string | null {
  const candidates = [
    path.join(repoRoot, ".github", "PULL_REQUEST_TEMPLATE.md"),
    path.join(repoRoot, ".github", "pull_request_template.md"),
    path.join(repoRoot, "PULL_REQUEST_TEMPLATE.md"),
    path.join(repoRoot, "pull_request_template.md"),
    path.join(repoRoot, ".github", "PULL_REQUEST_TEMPLATE", "pull_request_template.md"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const templateDir = path.join(repoRoot, ".github", "PULL_REQUEST_TEMPLATE");
  if (fs.existsSync(templateDir)) {
    try {
      const files = fs.readdirSync(templateDir).filter((f) => f.endsWith(".md"));
      if (files.length > 0) {
        return path.join(templateDir, files[0]);
      }
    } catch {
      // directory read failure
    }
  }

  return null;
}

export async function getLocalPrText(repoRoot: string, providedText?: string): Promise<string> {
  if (providedText && providedText.trim()) {
    return providedText;
  }

  const prMsgFile = path.join(repoRoot, ".github", "PULL_REQUEST_MSG.md");
  if (fs.existsSync(prMsgFile)) {
    try {
      return fs.readFileSync(prMsgFile, "utf8");
    } catch {
      // ignore
    }
  }

  try {
    const git = simpleGit(repoRoot);
    const isRepo = await git.checkIsRepo();
    if (isRepo) {
      const log = await git.log({ maxCount: 1 });
      if (log.latest) {
        return `${log.latest.message}\n\n${log.latest.body || ""}`;
      }
    }
  } catch {
    // git log fallback
  }

  return "";
}

export function validatePrContentAgainstTemplate(templateContent: string, prText: string): PrTemplateCheckResult {
  const lines = templateContent.split("\n");
  const requiredSections: string[] = [];
  let templateHasRiskSection = false;

  for (const line of lines) {
    const headerMatch = line.match(/^#{1,4}\s+(.+)$/);
    if (headerMatch) {
      const sectionTitle = headerMatch[1].trim();
      requiredSections.push(sectionTitle);
      if (/risk|impact/i.test(sectionTitle)) {
        templateHasRiskSection = true;
      }
    }
  }

  const missingSections: string[] = [];
  const normalizedPrText = prText.toLowerCase();

  for (const section of requiredSections) {
    // Strip markdown formatting and check if section keyword appears in PR text
    const cleanSection = section.replace(/[#*`_\[\]]/g, "").trim().toLowerCase();
    if (cleanSection && !normalizedPrText.includes(cleanSection)) {
      missingSections.push(section);
    }
  }

  // Detect uncompleted markdown checkboxes in PR description: - [ ]
  const uncompletedMatches = prText.match(/^[-*]\s*\[\s*\]\s*(.+)$/gm) || [];
  const uncompletedCheckboxes = uncompletedMatches.map((m) => m.replace(/^[-*]\s*\[\s*\]\s*/, "").trim());

  let missingRiskLevel = false;
  if (templateHasRiskSection) {
    const riskRegex = /(?:risk(?:\s*level)?|impact)\s*[:\-]?\s*(low|medium|moderate|high|critical|none)/i;
    if (!riskRegex.test(prText)) {
      missingRiskLevel = true;
    }
  }

  const warnings: string[] = [];
  if (uncompletedCheckboxes.length > 0) {
    warnings.push(`${uncompletedCheckboxes.length} uncompleted checklist item(s) found in PR description`);
  }
  if (missingSections.length > 0) {
    warnings.push(`Missing template section(s): ${missingSections.join(", ")}`);
  }
  if (missingRiskLevel) {
    warnings.push("Risk level not specified (e.g. Low, Medium, High)");
  }

  const valid = missingSections.length === 0 && uncompletedCheckboxes.length === 0 && !missingRiskLevel;

  return {
    valid,
    templateFound: true,
    missingSections,
    uncompletedCheckboxes,
    missingRiskLevel,
    warnings,
  };
}

export async function validatePrTemplate(
  repoRoot: string,
  options: { prText?: string; templatePath?: string } = {}
): Promise<PrTemplateCheckResult> {
  const tplPath = options.templatePath || findPrTemplate(repoRoot);
  if (!tplPath || !fs.existsSync(tplPath)) {
    return {
      valid: true,
      templateFound: false,
      missingSections: [],
      uncompletedCheckboxes: [],
      missingRiskLevel: false,
      warnings: ["No PR template found in repository (.github/PULL_REQUEST_TEMPLATE.md)"],
    };
  }

  const templateContent = fs.readFileSync(tplPath, "utf8");
  const prText = await getLocalPrText(repoRoot, options.prText);

  if (!prText.trim()) {
    return {
      valid: false,
      templateFound: true,
      templatePath: tplPath,
      missingSections: ["PR description / commit message is empty"],
      uncompletedCheckboxes: [],
      missingRiskLevel: true,
      warnings: ["No PR description or commit message provided to validate against PR template"],
    };
  }

  const result = validatePrContentAgainstTemplate(templateContent, prText);
  result.templatePath = tplPath;
  return result;
}
