/**
 * Pontuação do Avaliador de Sites.
 *
 * Pesos por categoria (soma = 100). A nota geral é a média ponderada
 * das notas por categoria. Cada verificação contribui com pontos dentro
 * da sua categoria; um Finding com severity "high" desconta mais do que
 * "low". Detalhes em docs/avaliador-metodologia.md.
 */

import type { Category, CategoryScore, Finding, Severity } from "./types";

export const CATEGORY_WEIGHTS: Record<Category, number> = {
  security: 18,
  seo: 18,
  mobile: 14,
  accessibility: 12,
  content: 12,
  performance: 14,
  weight: 12,
};

export const SEVERITY_PENALTY: Record<Severity, number> = {
  high: 25,
  medium: 12,
  low: 5,
  info: 0,
};

export const CATEGORIES: Category[] = [
  "security",
  "seo",
  "mobile",
  "accessibility",
  "content",
  "performance",
  "weight",
];

/** Pontos máximos de uma categoria (base 100). */
export function categoryMaxPoints(): number {
  return 100;
}

export function computeCategoryScore(
  category: Category,
  findings: Finding[]
): CategoryScore {
  const possible = categoryMaxPoints();
  const lost = findings.reduce((acc, f) => acc + f.pointsLost, 0);
  const earned = Math.max(0, possible - lost);
  const score = Math.round((earned / possible) * 100);
  return { category, score, earned, possible, findings };
}

export function computeOverallScore(categories: CategoryScore[]): number {
  let weighted = 0;
  let totalWeight = 0;
  for (const c of categories) {
    const w = CATEGORY_WEIGHTS[c.category];
    weighted += c.score * w;
    totalWeight += w;
  }
  if (totalWeight === 0) return 0;
  return Math.round(weighted / totalWeight);
}

export function sortFindingsByPriority(findings: Finding[]): Finding[] {
  const order: Record<Severity, number> = { high: 0, medium: 1, low: 2, info: 3 };
  return [...findings].sort((a, b) => {
    const s = order[a.severity] - order[b.severity];
    if (s !== 0) return s;
    return a.category.localeCompare(b.category);
  });
}
