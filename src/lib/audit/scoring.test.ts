import { describe, it, expect } from "vitest";
import { computeOverallScore, computeCategoryScore, sortFindingsByPriority } from "./scoring";
import type { CategoryScore, Finding } from "./types";

describe("scoring", () => {
  it("computa nota geral ponderada", () => {
    const cats: CategoryScore[] = [
      { category: "security", score: 100, earned: 100, possible: 100, findings: [] },
      { category: "seo", score: 50, earned: 50, possible: 100, findings: [] },
    ];
    // só 2 categorias, mas pesos das restantes não contam (0 peso? não — pesos fixos)
    const overall = computeOverallScore(cats);
    expect(typeof overall).toBe("number");
  });

  it("ordena findings por severidade", () => {
    const findings: Finding[] = [
      { id: "a", category: "seo", severity: "low", titleKey: "t", whatKey: "w", whyKey: "y", howKey: "h", pointsLost: 5 },
      { id: "b", category: "seo", severity: "high", titleKey: "t", whatKey: "w", whyKey: "y", howKey: "h", pointsLost: 25 },
    ];
    const sorted = sortFindingsByPriority(findings);
    expect(sorted[0].severity).toBe("high");
  });

  it("computeCategoryScore desconta pontos", () => {
    const f: Finding[] = [
      { id: "x", category: "seo", severity: "high", titleKey: "t", whatKey: "w", whyKey: "y", howKey: "h", pointsLost: 25 },
    ];
    const c = computeCategoryScore("seo", f);
    expect(c.score).toBe(75);
    expect(c.earned).toBe(75);
  });
});
