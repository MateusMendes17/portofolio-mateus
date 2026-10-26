"use client";

import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";
import { useLanguage } from "@/context/LanguageContext";

/* ============================================================
   /projetos — índice editorial de oito sites publicados.

   O rail fixo é desktop-only. Em mobile, o índice horizontal com
   miniaturas antecede a lista. O processo e os critérios mantêm a
   copy existente, mas com uma altura mais contida.
   ============================================================ */

export function ProjetosView() {
  const { t } = useLanguage();

  return (
    <>
      <section className="container-page pt-24 pb-4 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-start lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-body text-label uppercase tracking-[0.14em] text-muted">
              <span className="h-px w-8 bg-ink" aria-hidden="true" />
              {t.projects.badge}
            </p>

            <h1 className="mt-5 font-heading text-display font-semibold text-ink">
              {t.projects.title}
            </h1>
          </div>

          <div className="max-w-[52ch]">
            <p className="font-body text-lead text-ink-2">{t.projects.description}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {t.projects.pills.map((pill) => (
                <li
                  key={pill}
                  className="inline-flex items-center gap-2 font-body text-micro text-muted"
                >
                  <span className="h-1.5 w-1.5 bg-highlight" aria-hidden="true" />
                  {pill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page" aria-label={t.projects.grid.index}>
        <ProjectCatalog projects={PROJECTS} />
      </section>

      {/* Processo — horizontal, baixo, sem cartões grandes. */}
      <section className="container-page mt-24 lg:mt-32">
        <div className="border-y border-line py-9 lg:py-11">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] lg:gap-12">
            <div>
              <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
                {t.projects.process.badge}
              </p>
              <h2 className="mt-3 font-heading text-h3 text-ink">
                {t.projects.process.title}
              </h2>
              <p className="mt-3 max-w-[42ch] font-body text-sm leading-relaxed text-muted">
                {t.projects.process.description}
              </p>
            </div>

            <ol className="grid gap-0 md:grid-cols-3">
              {t.projects.process.steps.map((step, index) => (
                <li
                  key={step.step}
                  className={
                    "border-t border-line pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5 " +
                    (index === 0 ? "md:border-l-0 md:pl-0" : "")
                  }
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[32ch] font-body text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Critérios — grelha de duas colunas, sem ícones decorativos. */}
      <section className="container-page mt-24 lg:mt-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] lg:gap-12">
          <div>
            <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
              {t.projects.highlights.badge}
            </p>
            <h2 className="mt-3 font-heading text-h2 text-ink">
              {t.projects.highlights.title}
            </h2>
            <p className="mt-4 max-w-[40ch] font-body text-body text-ink-2">
              {t.projects.highlights.description}
            </p>
          </div>

          <ul className="grid border-t border-line sm:grid-cols-2">
            {t.projects.highlights.items.map((item, index) => (
              <li
                key={item.id}
                className="border-b border-line py-5 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[38ch] font-body text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA — bloco invertido, usado uma única vez nesta página. */}
      <section className="container-page mt-24 pb-20 lg:mt-32 lg:pb-28">
        <div className="code-surface bg-ink px-6 py-10 text-bg sm:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="font-body text-label uppercase tracking-[0.12em] text-bg/60">
                {t.projects.cta.badge}
              </p>
              <h2 className="mt-3 max-w-[24ch] font-heading text-h2 text-bg">
                {t.projects.cta.title}
              </h2>
              <p className="mt-4 max-w-[54ch] font-body text-sm leading-relaxed text-bg/70">
                {t.projects.cta.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex h-11 items-center justify-center border border-[var(--accent-button-border)] bg-highlight px-6 font-body text-sm font-semibold text-accent-ink transition-colors duration-[var(--duration-160)] hover:bg-highlight-hover"
              >
                {t.nav.cta}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/servicos"
                className="inline-flex h-11 items-center justify-center border border-bg/25 px-6 font-body text-sm font-semibold text-bg transition-colors duration-[var(--duration-160)] hover:border-bg/60"
              >
                {t.projects.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
