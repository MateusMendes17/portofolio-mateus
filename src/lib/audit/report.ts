import { runAllChecks } from "./checks";
import { fetchPageSpeed } from "./pagespeed";
import { computeCategoryScore, computeOverallScore, sortFindingsByPriority, CATEGORY_WEIGHTS } from "./scoring";
import type { AuditResult, Category, CategoryScore, Finding, PerformanceData } from "./types";
import { safeFetch } from "./safe-fetch";

export interface ReportInput {
  url: string;
  fromCache?: boolean;
}

const LIMITATIONS = [
  "audit.limitations.singlePage",
  "audit.limitations.noContrast",
  "audit.limitations.noJs",
  "audit.limitations.indicative",
];

export async function buildReport(input: ReportInput): Promise<AuditResult | { error: string }> {
  const fetchResult = await safeFetch(input.url);
  if (!fetchResult.ok) {
    return { error: fetchResult.message };
  }

  const findings = runAllChecks({
    html: fetchResult.html,
    headers: fetchResult.headers,
    finalUrl: fetchResult.url,
    status: fetchResult.status,
  });

  // PageSpeed (opcional)
  let performance: PerformanceData | null = null;
  const ps = await fetchPageSpeed(fetchResult.url);
  if (ps) {
    performance = {
      strategy: "mobile",
      scores: ps.scores,
      metrics: ps.metrics,
      opportunities: ps.opportunities,
      fetchedAt: ps.fetchedAt,
    };
    // Adicionar finding de performance se score baixo
    if (ps.scores.performance !== null && ps.scores.performance < 50) {
      findings.push({
        id: "performance.pagespeed.low",
        category: "performance",
        severity: "high",
        titleKey: "audit.findings.performance.pagespeed.low.title",
        whatKey: "audit.findings.performance.pagespeed.low.what",
        whyKey: "audit.findings.performance.pagespeed.low.why",
        howKey: "audit.findings.performance.pagespeed.low.how",
        evidence: `Lighthouse mobile: ${ps.scores.performance}/100`,
        pointsLost: 25,
      });
    } else if (ps.scores.performance !== null && ps.scores.performance < 90) {
      findings.push({
        id: "performance.pagespeed.medium",
        category: "performance",
        severity: "medium",
        titleKey: "audit.findings.performance.pagespeed.medium.title",
        whatKey: "audit.findings.performance.pagespeed.medium.what",
        whyKey: "audit.findings.performance.pagespeed.medium.why",
        howKey: "audit.findings.performance.pagespeed.medium.how",
        evidence: `Lighthouse mobile: ${ps.scores.performance}/100`,
        pointsLost: 12,
      });
    }
  } else {
    findings.push({
      id: "performance.pagespeed.unavailable",
      category: "performance",
      severity: "info",
      titleKey: "audit.findings.performance.pagespeed.unavailable.title",
      whatKey: "audit.findings.performance.pagespeed.unavailable.what",
      whyKey: "audit.findings.performance.pagespeed.unavailable.why",
      howKey: "audit.findings.performance.pagespeed.unavailable.how",
      pointsLost: 0,
    });
  }

  // Agrupar por categoria
  const byCategory = new Map<Category, Finding[]>();
  for (const c of Object.keys(CATEGORY_WEIGHTS) as Category[]) {
    byCategory.set(c, []);
  }
  for (const f of findings) {
    const arr = byCategory.get(f.category);
    if (arr) arr.push(f);
  }

  const categories: CategoryScore[] = [];
  for (const c of Object.keys(CATEGORY_WEIGHTS) as Category[]) {
    categories.push(computeCategoryScore(c, byCategory.get(c) ?? []));
  }

  const overallScore = computeOverallScore(categories);

  // strengths: findings com severity info/low que são "passou"? Na v1, strengths = categorias com score >= 80
  // Usamos findings de info como informativos; strengths derivados de ausência de high/medium
  const highMedium = findings.filter((f) => f.severity === "high" || f.severity === "medium");
  const strengths: Finding[] = findings.filter((f) => f.severity === "info");
  const improvements = sortFindingsByPriority(highMedium.concat(findings.filter((f) => f.severity === "low")));

  return {
    url: fetchResult.url,
    originalUrl: input.url,
    analyzedAt: new Date().toISOString(),
    overallScore,
    categories,
    strengths,
    improvements,
    limitations: LIMITATIONS,
    performance,
    fromCache: input.fromCache ?? false,
  };
}
