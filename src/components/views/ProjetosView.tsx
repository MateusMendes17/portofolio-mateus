"use client";

import { PROJECTS } from "@/content/projects";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <PageIntro
        eyebrow={t.projects.badge}
        title={t.projects.title}
        description={t.projects.description}
        aside={
          <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
            {t.projects.pills.map((pill) => (
              <li
                key={pill}
                className="inline-flex min-h-[36px] items-center gap-2 rounded-full border-[1.5px] border-ink px-4 font-mono text-xs text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-highlight ring-1 ring-ink/40" aria-hidden="true" />
                {pill}
              </li>
            ))}
          </ul>
        }
      />

      <section className="container-page" aria-label={t.projects.grid.index}>
        <ProjectCatalog projects={PROJECTS} />
      </section>

      {/* Processo */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <SectionHeading
          eyebrow={t.projects.process.badge}
          title={t.projects.process.title}
          description={t.projects.process.description}
        />
        <ol className="m-0 mt-12 flex list-none flex-wrap border-t-[1.5px] border-ink p-0">
          {t.projects.process.steps.map((step) => (
            <li key={step.step} className="min-w-0 flex-[1_1_260px] py-8 pr-7">
              <span className="inline-block bg-highlight px-2 py-0.5 font-mono text-sm text-accent-ink">
                {step.step}
              </span>
              <h3 className="m-0 mt-4 font-heading text-[1.75rem] leading-[1.05] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="m-0 mt-3 text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <div className="pt-[var(--section)] pb-20 lg:pb-28">
        <CtaPanel
          eyebrow={t.projects.cta.badge}
          title={t.projects.cta.title}
          description={t.projects.cta.description}
          primaryHref="/contacto"
          primaryLabel={t.nav.cta}
          secondaryHref="/servicos"
          secondaryLabel={t.projects.cta.secondary}
        />
      </div>
    </>
  );
}
