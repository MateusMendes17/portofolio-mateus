"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { SiteMeasurement } from "@/content/site-metrics";

function scoreTone(score: number | null): string {
  if (score === null) return "text-muted";
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

/**
 * Números medidos (não escritos à mão): Lighthouse mobile + nota do Avaliador.
 * Só aparece quando existe uma medição real em `site-metrics.ts`.
 */
export function MeasuredMetrics({
  measurement,
  title,
  className = "",
}: {
  measurement: SiteMeasurement;
  title?: string;
  className?: string;
}) {
  const { isEnglish } = useLanguage();
  const date = new Date(measurement.measuredAt).toLocaleDateString(isEnglish ? "en-GB" : "pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const scores: Array<{ label: string; value: number | null }> = [
    { label: isEnglish ? "Performance" : "Desempenho", value: measurement.performance },
    { label: isEnglish ? "Accessibility" : "Acessibilidade", value: measurement.accessibility },
    { label: isEnglish ? "Best practices" : "Boas práticas", value: measurement.bestPractices },
    { label: "SEO", value: measurement.seo },
  ];

  const vitals: Array<{ label: string; value: string }> = [
    { label: "LCP", value: measurement.lcp === null ? "—" : `${(measurement.lcp / 1000).toFixed(1)} s` },
    { label: "CLS", value: measurement.cls === null ? "—" : measurement.cls.toFixed(2) },
    { label: "TBT", value: measurement.tbt === null ? "—" : `${measurement.tbt} ms` },
  ];

  return (
    <div className={`border border-line bg-surface p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
          {title ?? (isEnglish ? "Measured results" : "Resultados medidos")}
        </p>
        <p className="font-body text-micro text-muted">
          {isEnglish ? `Measured on ${date}` : `Medido a ${date}`}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-5">
        <div className="bg-bg p-4">
          <p className="font-heading text-3xl font-semibold tabular-nums text-ink">{measurement.overall}</p>
          <p className="mt-1 font-body text-micro text-muted">
            {isEnglish ? "Evaluator score" : "Nota do Avaliador"}
          </p>
        </div>
        {scores.map((s) => (
          <div key={s.label} className="bg-bg p-4">
            <p className={`font-heading text-3xl font-semibold tabular-nums ${scoreTone(s.value)}`}>
              {s.value ?? "—"}
            </p>
            <p className="mt-1 font-body text-micro text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-body text-sm">
        {vitals.map((v) => (
          <div key={v.label} className="flex gap-2">
            <dt className="text-muted">{v.label}</dt>
            <dd className="font-medium tabular-nums text-ink">{v.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 font-body text-micro leading-relaxed text-muted">
        {isEnglish
          ? "Google Lighthouse (mobile) and this site's own Evaluator, run on the published home page. Technical measurements, not business results."
          : "Google Lighthouse (mobile) e o Avaliador deste site, executados na página inicial publicada. São medições técnicas, não resultados comerciais."}
      </p>
    </div>
  );
}
