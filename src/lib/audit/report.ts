import { runAllChecks } from "./checks";
import { fetchPageSpeed } from "./pagespeed";
import { computeCategoryScore, computeOverallScore, sortFindingsByPriority, CATEGORY_WEIGHTS } from "./scoring";
import type { AuditResult, Category, CategoryScore, Finding, PerformanceData } from "./types";
import { safeFetch } from "./safe-fetch";

export interface ReportInput {
  url: string;
  fromCache?: boolean;
  onProgress?: (step: string, message: string) => void;
}

const LIMITATIONS = [
  "audit.limitationsKeys.singlePage",
  "audit.limitationsKeys.noContrast",
  "audit.limitationsKeys.noJs",
  "audit.limitationsKeys.indicative",
];

export async function buildReport(input: ReportInput): Promise<AuditResult | { error: string }> {
  input.onProgress?.("fetch", "A obter a página...");
  const fetchResult = await safeFetch(input.url);
  if (!fetchResult.ok) {
    return { error: fetchResult.message };
  }

  input.onProgress?.("checks", "A verificar segurança, SEO e acessibilidade...");
  const findings = runAllChecks({
    html: fetchResult.html,
    headers: fetchResult.headers,
    finalUrl: fetchResult.url,
    status: fetchResult.status,
  });

  // PageSpeed (opcional)
  let performance: PerformanceData | null = null;
  input.onProgress?.("pagespeed", "A obter dados de desempenho...");
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
    const cs = computeCategoryScore(c, byCategory.get(c) ?? []);
    // Sem dados do PageSpeed, "desempenho" não deve inflacionar a nota com um 100 por omissão.
    if (c === "performance" && !performance) cs.available = false;
    categories.push(cs);
  }

  const overallScore = computeOverallScore(categories);

  const strengths: Finding[] = [];
  const findingsIds = new Set(findings.map((f) => f.id));

  if (!findingsIds.has("security.https.missing")) {
    strengths.push({
      id: "strengths.https",
      category: "security",
      severity: "info",
      titleKey: "audit.findings.strengths.https.title",
      whatKey: "audit.findings.strengths.https.what",
      whyKey: "audit.findings.strengths.https.why",
      howKey: "audit.findings.strengths.https.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("security.hsts.missing")) {
    strengths.push({
      id: "strengths.hsts",
      category: "security",
      severity: "info",
      titleKey: "audit.findings.strengths.hsts.title",
      whatKey: "audit.findings.strengths.hsts.what",
      whyKey: "audit.findings.strengths.hsts.why",
      howKey: "audit.findings.strengths.hsts.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("seo.title.missing") && !findingsIds.has("seo.title.length")) {
    strengths.push({
      id: "strengths.title",
      category: "seo",
      severity: "info",
      titleKey: "audit.findings.strengths.title.title",
      whatKey: "audit.findings.strengths.title.what",
      whyKey: "audit.findings.strengths.title.why",
      howKey: "audit.findings.strengths.title.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("seo.h1.missing") && !findingsIds.has("seo.h1.multiple")) {
    strengths.push({
      id: "strengths.h1",
      category: "seo",
      severity: "info",
      titleKey: "audit.findings.strengths.h1.title",
      whatKey: "audit.findings.strengths.h1.what",
      whyKey: "audit.findings.strengths.h1.why",
      howKey: "audit.findings.strengths.h1.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("seo.canonical.missing")) {
    strengths.push({
      id: "strengths.canonical",
      category: "seo",
      severity: "info",
      titleKey: "audit.findings.strengths.canonical.title",
      whatKey: "audit.findings.strengths.canonical.what",
      whyKey: "audit.findings.strengths.canonical.why",
      howKey: "audit.findings.strengths.canonical.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("mobile.viewport.missing") && !findingsIds.has("mobile.viewport.notResponsive")) {
    strengths.push({
      id: "strengths.viewport",
      category: "mobile",
      severity: "info",
      titleKey: "audit.findings.strengths.viewport.title",
      whatKey: "audit.findings.strengths.viewport.what",
      whyKey: "audit.findings.strengths.viewport.why",
      howKey: "audit.findings.strengths.viewport.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("mobile.tel.missing") && !findingsIds.has("mobile.mailto.missing") && !findingsIds.has("mobile.whatsapp.missing")) {
    strengths.push({
      id: "strengths.contact",
      category: "mobile",
      severity: "info",
      titleKey: "audit.findings.strengths.contact.title",
      whatKey: "audit.findings.strengths.contact.what",
      whyKey: "audit.findings.strengths.contact.why",
      howKey: "audit.findings.strengths.contact.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("seo.lang.missing") && !findingsIds.has("a11y.lang.missing")) {
    strengths.push({
      id: "strengths.lang",
      category: "accessibility",
      severity: "info",
      titleKey: "audit.findings.strengths.lang.title",
      whatKey: "audit.findings.strengths.lang.what",
      whyKey: "audit.findings.strengths.lang.why",
      howKey: "audit.findings.strengths.lang.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("content.privacy.missing")) {
    strengths.push({
      id: "strengths.privacy",
      category: "content",
      severity: "info",
      titleKey: "audit.findings.strengths.privacy.title",
      whatKey: "audit.findings.strengths.privacy.what",
      whyKey: "audit.findings.strengths.privacy.why",
      howKey: "audit.findings.strengths.privacy.how",
      pointsLost: 0,
    });
  }

  if (!findingsIds.has("weight.html.large") && !findingsIds.has("weight.html.medium")) {
    strengths.push({
      id: "strengths.weight",
      category: "weight",
      severity: "info",
      titleKey: "audit.findings.strengths.weight.title",
      whatKey: "audit.findings.strengths.weight.what",
      whyKey: "audit.findings.strengths.weight.why",
      howKey: "audit.findings.strengths.weight.how",
      pointsLost: 0,
    });
  }

  if (performance && performance.scores.performance !== null && performance.scores.performance >= 80) {
    strengths.push({
      id: "strengths.pagespeed",
      category: "performance",
      severity: "info",
      titleKey: "audit.findings.strengths.pagespeed.title",
      whatKey: "audit.findings.strengths.pagespeed.what",
      whyKey: "audit.findings.strengths.pagespeed.why",
      howKey: "audit.findings.strengths.pagespeed.how",
      evidence: `Lighthouse mobile: ${performance.scores.performance}/100`,
      pointsLost: 0,
    });
  }

  const penaltyFindings = findings.filter((f) => f.severity === "high" || f.severity === "medium" || f.severity === "low");
  const improvements = sortFindingsByPriority(penaltyFindings);

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
