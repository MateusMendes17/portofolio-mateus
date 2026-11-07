"use client";

import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { SITE_METRICS } from "@/content/site-metrics";
import { useLanguage } from "@/context/LanguageContext";
import { CountUp } from "@/components/ui/CountUp";

/**
 * Números do Sobre, todos verificáveis: calculados a partir das medições
 * reais em site-metrics.ts (Lighthouse mobile + Avaliador) e da lista de
 * projetos. Nada escrito à mão, para bater certo com "Não confie na
 * minha palavra. Confirme." da home.
 */
export function InteractiveStats() {
  const { isEnglish } = useLanguage();

  const measured = PROJECTS.map((p) => SITE_METRICS[p.slug]).filter(Boolean);
  const avg = (pick: (m: (typeof measured)[number]) => number | null) => {
    const values = measured.map(pick).filter((v): v is number => v !== null);
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  };
  const date = measured[0]?.measuredAt
    ? new Date(measured[0].measuredAt).toLocaleDateString(isEnglish ? "en-GB" : "pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const stats = [
    {
      value: PROJECTS.length,
      suffix: "",
      label: isEnglish ? "Published projects" : "Projetos publicados",
      detail: isEnglish ? "Live sites you can open, most with public code on GitHub." : "Sites online que pode abrir, a maioria com código público no GitHub.",
    },
    {
      value: Math.round(avg((m) => m.performance)),
      suffix: "/100",
      label: isEnglish ? "Average performance" : "Desempenho médio",
      detail: isEnglish ? "Google Lighthouse (mobile), average across the projects." : "Google Lighthouse (mobile), média dos projetos.",
    },
    {
      value: Math.round(avg((m) => m.accessibility)),
      suffix: "/100",
      label: isEnglish ? "Average accessibility" : "Acessibilidade média",
      detail: isEnglish ? "Same Lighthouse run: contrast, labels, structure." : "Mesma medição do Lighthouse: contraste, etiquetas, estrutura.",
    },
    {
      value: Math.round(avg((m) => m.overall)),
      suffix: "/100",
      label: isEnglish ? "Evaluator score" : "Nota do Avaliador",
      detail: isEnglish ? "This site's own tool, run on every project. Test it yourself." : "A ferramenta deste site, corrida em cada projeto. Pode testá-la.",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              "theme-card flex flex-col gap-3 p-7 " +
              (i === 1 ? "bg-highlight text-accent-ink" : "border-[1.5px] border-ink bg-surface text-ink")
            }
          >
            <span className="font-mono text-sm opacity-70">{String(i + 1).padStart(2, "0")}</span>
            <p className="m-0 font-heading text-[clamp(3rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.05em] tabular-nums">
              <CountUp value={stat.value} />
              <span className="text-[0.4em] tracking-normal opacity-60">{stat.suffix}</span>
            </p>
            <h3 className="m-0 font-heading text-xl font-semibold text-inherit">{stat.label}</h3>
            <p className="m-0 text-sm leading-relaxed opacity-75">{stat.detail}</p>
          </div>
        ))}
      </div>
      {date && (
        <p className="m-0 mt-4 font-mono text-xs text-muted">
          {isEnglish ? `Measured on ${date}.` : `Medido a ${date}.`}{" "}
          <Link href="/avaliador" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {isEnglish ? "Run the Evaluator" : "Correr o Avaliador"} →
          </Link>
        </p>
      )}
    </div>
  );
}
