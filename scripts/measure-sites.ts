/**
 * Mede os sites publicados com o próprio Avaliador (+ Google PageSpeed) e grava
 * os resultados em src/content/site-metrics.ts. Os números mostrados no site
 * vêm daqui — nunca são escritos à mão.
 *
 * Uso (na pasta do projeto):
 *   npx tsx --env-file=.env.local scripts/measure-sites.ts            # projetos + o próprio site
 *   npx tsx --env-file=.env.local scripts/measure-sites.ts torra-lusa # só um (mantém os restantes)
 *
 * Requer PAGESPEED_API_KEY. Cada medição demora ~30–60 s.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { PROJECTS } from "../src/content/projects";
import { SITE_CONFIG } from "../src/lib/constants";
import { buildReport } from "../src/lib/audit/report";
import { SITE_METRICS, type SiteMeasurement } from "../src/content/site-metrics";

const OUT = path.join(process.cwd(), "src", "content", "site-metrics.ts");

async function measure(url: string): Promise<SiteMeasurement | null> {
  const report = await buildReport({ url });
  if ("error" in report) {
    console.error(`  falhou: ${report.error}`);
    return null;
  }
  const perf = report.performance;
  if (!perf) {
    console.error("  sem dados do PageSpeed (verifica PAGESPEED_API_KEY / quota) — ignorado");
    return null;
  }
  return {
    url: report.url,
    measuredAt: new Date().toISOString().slice(0, 10),
    overall: report.overallScore,
    performance: perf.scores.performance,
    accessibility: perf.scores.accessibility,
    bestPractices: perf.scores.bestPractices,
    seo: perf.scores.seo,
    lcp: perf.metrics.lcp,
    cls: perf.metrics.cls,
    tbt: perf.metrics.tbt,
    improvements: report.improvements.length,
  };
}

const targets: Array<{ key: string; url: string }> = [
  ...PROJECTS.map((p) => ({ key: p.slug, url: p.liveUrl })),
  { key: "site", url: SITE_CONFIG.url },
];

const only = process.argv.slice(2);
const selected = only.length ? targets.filter((t) => only.includes(t.key)) : targets;
const next: Record<string, SiteMeasurement> = { ...SITE_METRICS };

async function main() {
  for (const target of selected) {
  console.log(`A medir ${target.key} (${target.url})...`);
  const m = await measure(target.url);
  if (m) {
    next[target.key] = m;
    console.log(`  nota ${m.overall} | Lighthouse ${m.performance} | LCP ${m.lcp} ms`);
  }
}

const body = `/* ============================================================
   Medições reais — GERADO por scripts/measure-sites.ts. Não editar à mão.
   Fonte: Avaliador de Sites + Google PageSpeed Insights (mobile).
   ============================================================ */

export interface SiteMeasurement {
  url: string;
  /** Data da medição (AAAA-MM-DD). */
  measuredAt: string;
  /** Nota geral do Avaliador (0–100). */
  overall: number;
  /** Lighthouse mobile (0–100). */
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  /** ms */
  lcp: number | null;
  cls: number | null;
  /** ms */
  tbt: number | null;
  /** Nº de pontos a melhorar que o Avaliador encontrou. */
  improvements: number;
}

export const SITE_METRICS: Record<string, SiteMeasurement> = ${JSON.stringify(next, null, 2)};
`;

writeFileSync(OUT, body, "utf8");
console.log(`Gravado ${Object.keys(next).length} medições em src/content/site-metrics.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
