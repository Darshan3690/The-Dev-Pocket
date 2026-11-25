import { describe, it, expect } from "vitest";
import { parseRemoteUrl } from "../src/remote/pr-forensics.js";
import { calculateReadinessScore } from "../src/intelligence/scorer.js";

describe("PR Forensics & Scorer Enhancements", () => {
  it("parses HTTPS and SSH remote URLs correctly", () => {
    const httpsRes = parseRemoteUrl("https://github.com/nvidia/TensorRT-Model-Connect.git");
    expect(httpsRes).toEqual({ owner: "nvidia", repo: "TensorRT-Model-Connect" });

    const sshRes = parseRemoteUrl("git@github.com:Darshan3690/The-Dev-Pocket.git");
    expect(sshRes).toEqual({ owner: "Darshan3690", repo: "The-Dev-Pocket" });
  });

  it("penalizes unverified / skipped toolchain gaps in readiness score", () => {
    const scoreWithoutGaps = calculateReadinessScore(0, false, false, false, 0);
    expect(scoreWithoutGaps.score).toBe(100);
    expect(scoreWithoutGaps.status).toBe("READY");

    const scoreWithGaps = calculateReadinessScore(0, false, false, false, 2);
    expect(scoreWithGaps.score).toBe(80);
    expect(scoreWithGaps.status).toBe("MODERATE RISK");
    expect(scoreWithGaps.deductions.some((d) => d.reason.includes("unverified"))).toBe(true);
  });
});
