import fs from "node:fs";
import path from "node:path";
import type { FailureFingerprint } from "./classifier.js";

interface HistoryEntry {
  fingerprint: string;
  resolution: string;
  resolvedAt: string;
  occurrences: number;
}

export class FailureHistory {
  private historyDir: string;
  private historyFile: string;

  constructor(repoRoot: string) {
    this.historyDir = path.join(repoRoot, ".vibeci", "history");
    this.historyFile = path.join(this.historyDir, "fingerprints.json");
  }

  private readHistory(): HistoryEntry[] {
    try {
      if (!fs.existsSync(this.historyFile)) return [];
      const data = fs.readFileSync(this.historyFile, "utf8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private writeHistory(entries: HistoryEntry[]): void {
    fs.mkdirSync(this.historyDir, { recursive: true });
    fs.writeFileSync(this.historyFile, JSON.stringify(entries, null, 2), "utf8");
  }

  lookup(fingerprint: string): HistoryEntry | undefined {
    const entries = this.readHistory();
    return entries.find((e) => e.fingerprint === fingerprint);
  }

  record(fingerprint: string, resolution: string): void {
    const entries = this.readHistory();
    const existing = entries.find((e) => e.fingerprint === fingerprint);

    if (existing) {
      existing.occurrences += 1;
      existing.resolution = resolution;
      existing.resolvedAt = new Date().toISOString();
    } else {
      entries.push({
        fingerprint,
        resolution,
        resolvedAt: new Date().toISOString(),
        occurrences: 1,
      });
    }

    this.writeHistory(entries);
  }

  getAll(): HistoryEntry[] {
    return this.readHistory();
  }
}