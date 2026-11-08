/* ============================================================
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

export const SITE_METRICS: Record<string, SiteMeasurement> = {
  "torra-lusa": {
    "url": "https://torra-lusa.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 95,
    "performance": 79,
    "accessibility": 89,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3983,
    "cls": 0.17663033630549704,
    "tbt": 0,
    "improvements": 6
  },
  "cota-zero": {
    "url": "https://cota-zero.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 95,
    "performance": 98,
    "accessibility": 96,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1997,
    "cls": 0,
    "tbt": 0,
    "improvements": 6
  },
  "mendes-valadares": {
    "url": "https://mendes-valadares.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 93,
    "performance": 99,
    "accessibility": 96,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1093,
    "cls": 0,
    "tbt": 0,
    "improvements": 6
  },
  "barbearia-sete-colinas": {
    "url": "https://barbearia-sete-colinas.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 92,
    "performance": 98,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1554,
    "cls": 0,
    "tbt": 1,
    "improvements": 6
  },
  "lumina": {
    "url": "https://lumina-restaurant-nine.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 88,
    "performance": 96,
    "accessibility": 92,
    "bestPractices": 100,
    "seo": 92,
    "lcp": 1693,
    "cls": 0,
    "tbt": 1,
    "improvements": 9
  },
  "dentilusa": {
    "url": "https://dentilusa.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 94,
    "performance": 90,
    "accessibility": 82,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3341,
    "cls": 0,
    "tbt": 0,
    "improvements": 4
  },
  "aqualis": {
    "url": "https://aqualis-tau.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 98,
    "performance": 97,
    "accessibility": 91,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1870,
    "cls": 0,
    "tbt": 3,
    "improvements": 3
  },
  "forja": {
    "url": "https://forja-training-club.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 91,
    "performance": 86,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3646,
    "cls": 0,
    "tbt": 0,
    "improvements": 7
  },
  "site": {
    "url": "https://portofolio-mateus.vercel.app/",
    "measuredAt": "2026-11-08",
    "overall": 91,
    "performance": 89,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3342,
    "cls": 0,
    "tbt": 12,
    "improvements": 6
  }
};
