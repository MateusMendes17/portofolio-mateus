"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { AuditResult } from "@/lib/audit/types";

const NAMES = {
  pt: { security: "Segurança", seo: "SEO", mobile: "Mobile", accessibility: "Acessibilidade", content: "Conteúdo", performance: "Desempenho", weight: "Peso da página" },
  en: { security: "Security", seo: "SEO", mobile: "Mobile", accessibility: "Accessibility", content: "Content", performance: "Performance", weight: "Page weight" },
} as const;

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Valor numérico da categoria, ou null quando não há dados (ex.: PageSpeed indisponível). */
function scoreOf(result: AuditResult, category: string): number | null {
  const c = result.categories.find((x) => x.category === category);
  return !c || c.available === false ? null : c.score;
}

/** Duas colunas lado a lado, com o melhor valor de cada linha destacado. */
export function CompareResults({ a, b }: { a: AuditResult; b: AuditResult }) {
  const { isEnglish } = useLanguage();
  const names = isEnglish ? NAMES.en : NAMES.pt;
  const diff = a.overallScore - b.overallScore;

  const verdict =
    diff === 0
      ? isEnglish
        ? "Both sites have the same overall score."
        : "Os dois sites têm a mesma nota geral."
      : isEnglish
        ? `${hostOf(diff > 0 ? a.url : b.url)} leads by ${Math.abs(diff)} points.`
        : `${hostOf(diff > 0 ? a.url : b.url)} está à frente por ${Math.abs(diff)} pontos.`;

  const rows = (Object.keys(names) as Array<keyof typeof names>).map((key) => ({
    key,
    label: names[key],
    va: scoreOf(a, key),
    vb: scoreOf(b, key),
  }));

  const cell = (value: number | null, other: number | null) => {
    const wins = value !== null && other !== null && value > other;
    return (
      <td className={`px-4 py-3 text-right tabular-nums ${wins ? "bg-highlight/20 font-semibold text-ink" : "text-ink-2"}`}>
        {value === null ? "—" : value}
      </td>
    );
  };

  return (
    <div className="border border-line bg-surface p-6 sm:p-8" data-hide-print>
      <p className="font-body text-label uppercase tracking-[0.14em] text-muted">
        {isEnglish ? "Side-by-side comparison" : "Comparação lado a lado"}
      </p>
      <h2 className="mt-2 font-heading text-h3 font-semibold text-ink">{verdict}</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-line font-body text-sm">
          <thead>
            <tr className="border-b border-line bg-bg text-left">
              <th scope="col" className="px-4 py-3 font-medium text-muted">
                {isEnglish ? "Category" : "Categoria"}
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium text-ink">{hostOf(a.url)}</th>
              <th scope="col" className="px-4 py-3 text-right font-medium text-ink">{hostOf(b.url)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            <tr className="bg-bg">
              <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">
                {isEnglish ? "Overall score" : "Nota geral"}
              </th>
              {cell(a.overallScore, b.overallScore)}
              {cell(b.overallScore, a.overallScore)}
            </tr>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row" className="px-4 py-3 text-left font-normal text-ink">{r.label}</th>
                {cell(r.va, r.vb)}
                {cell(r.vb, r.va)}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-4 py-3 text-left font-normal text-ink">
                {isEnglish ? "Load time (LCP, mobile)" : "Velocidade (LCP, mobile)"}
              </th>
              {[a, b].map((r, i) => {
                const mine = r.performance?.metrics.lcp ?? null;
                const other = (i === 0 ? b : a).performance?.metrics.lcp ?? null;
                const wins = mine !== null && other !== null && mine < other;
                return (
                  <td key={r.url} className={`px-4 py-3 text-right tabular-nums ${wins ? "bg-highlight/20 font-semibold text-ink" : "text-ink-2"}`}>
                    {mine === null ? "—" : `${(mine / 1000).toFixed(1)} s`}
                  </td>
                );
              })}
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 text-left font-normal text-ink">
                {isEnglish ? "Points to improve" : "Pontos a melhorar"}
              </th>
              {[a, b].map((r, i) => {
                const mine = r.improvements.length;
                const other = (i === 0 ? b : a).improvements.length;
                return (
                  <td key={r.url} className={`px-4 py-3 text-right tabular-nums ${mine < other ? "bg-highlight/20 font-semibold text-ink" : "text-ink-2"}`}>
                    {mine}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-body text-micro text-muted">
        {isEnglish
          ? "Highlighted = better value in that row. Home pages only; the comparison is indicative."
          : "Destacado = melhor valor nessa linha. Apenas páginas iniciais; a comparação é indicativa."}
      </p>
    </div>
  );
}
