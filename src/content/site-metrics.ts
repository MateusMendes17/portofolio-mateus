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
    "measuredAt": "2026-10-27",
    "overall": 95,
    "performance": 76,
    "accessibility": 89,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 4069,
    "cls": 0.05512365343793935,
    "tbt": 0,
    "improvements": 6
  },
  "cota-zero": {
    "url": "https://cota-zero.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 95,
    "performance": 99,
    "accessibility": 96,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1951,
    "cls": 0,
    "tbt": 0,
    "improvements": 6
  },
  "mendes-valadares": {
    "url": "https://mendes-valadares.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 93,
    "performance": 100,
    "accessibility": 96,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1656,
    "cls": 0,
    "tbt": 0,
    "improvements": 6
  },
  "barbearia-sete-colinas": {
    "url": "https://barbearia-sete-colinas.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 92,
    "performance": 100,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 1682,
    "cls": 0,
    "tbt": 20,
    "improvements": 6
  },
  "lumina": {
    "url": "https://lumina-restaurant-nine.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 88,
    "performance": 90,
    "accessibility": 92,
    "bestPractices": 100,
    "seo": 92,
    "lcp": 3119,
    "cls": 0,
    "tbt": 0,
    "improvements": 9
  },
  "dentilusa": {
    "url": "https://dentilusa.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 93,
    "performance": 82,
    "accessibility": 82,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3495,
    "cls": 0,
    "tbt": 0,
    "improvements": 5
  },
  "aqualis": {
    "url": "https://aqualis-tau.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 98,
    "performance": 96,
    "accessibility": 91,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 2135,
    "cls": 0,
    "tbt": 18,
    "improvements": 3
  },
  "forja": {
    "url": "https://forja-training-club.vercel.app/",
    "measuredAt": "2026-10-27",
    "overall": 91,
    "performance": 80,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100,
    "lcp": 3801,
    "cls": 0,
    "tbt": 0,
    "improvements": 7
  }
};
