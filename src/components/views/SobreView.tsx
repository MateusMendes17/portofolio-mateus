"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/*
  Componentes interativos pesados, carregados em separado (cada um é o seu
  chunk). NÃO se usa `ssr: false`: nenhum deles toca em `window`/`document` no
  render, e SSR-los mantém o conteúdo no HTML inicial. Sem SSR, cada um "nascia"
  no cliente ~1s depois e empurrava a página — CLS de 0.75 em /sobre.
*/
const TechStackExplorer = dynamic(
  () => import("@/components/interactive/TechStackExplorer").then((m) => m.TechStackExplorer)
);
const ProjectQuiz = dynamic(
  () => import("@/components/interactive/ProjectQuiz").then((m) => m.ProjectQuiz)
);
const CodePhilosophyTerminal = dynamic(
  () => import("@/components/interactive/CodePhilosophyTerminal").then((m) => m.CodePhilosophyTerminal)
);
const InteractiveStats = dynamic(
  () => import("@/components/interactive/InteractiveStats").then((m) => m.InteractiveStats)
);

/* Pilares: superfície, chartreuse, invertido e superfície (como os serviços da home). */
const PILLAR_STYLES = [
  { cell: "md:col-span-2", card: "bg-surface text-ink border-[1.5px] border-ink" },
  { cell: "md:row-span-2", card: "bg-highlight text-accent-ink" },
  { cell: "", card: "bg-ink text-bg" },
  { cell: "", card: "bg-surface text-ink border-[1.5px] border-ink" },
];

export function SobreView() {
  const { t } = useLanguage();

  const pillars = t.about.methodology.pillars;

  return (
    <div className="pb-20 lg:pb-28">
      {/* 1. Cabeçalho */}
      <PageIntro
        eyebrow={t.about.hero.badge}
        title={t.about.hero.title}
        description={
          <>
            {t.about.hero.introBefore}
            <span className="home-hl font-semibold">Mateus Mendes</span>
            {t.about.hero.introAfter}
          </>
        }
      />

      <div className="container-page flex flex-col gap-[var(--section)]">
        {/* 2. Estatísticas */}
        <section>
          <h2 className="sr-only">{t.stats.sectionHeading}</h2>
          <InteractiveStats />
        </section>

        {/* 3. Assistente (quiz) */}
        <section>
          <ProjectQuiz />
        </section>
      </div>

      {/* 4. Metodologia */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <ScrollReveal direction="up" distance={30}>
          <SectionHeading
            eyebrow={t.about.methodology.label}
            title={t.about.methodology.title}
            description={t.about.methodology.description}
          />
        </ScrollReveal>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 md:auto-rows-[280px] md:grid-cols-3" stagger={0.1}>
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.number} className={cn("min-h-0", PILLAR_STYLES[index]?.cell)}>
              <div
                className={cn(
                  "theme-card flex h-full flex-col justify-between gap-6 p-8",
                  PILLAR_STYLES[index]?.card
                )}
              >
                <div>
                  <span className="font-mono text-sm opacity-70">{pillar.number}</span>
                  <h3 className="m-0 mt-4 font-heading text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.05] font-semibold text-inherit">
                    {pillar.title}
                  </h3>
                </div>
                <p className="m-0 text-sm leading-relaxed opacity-80">{pillar.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <div className="container-page flex flex-col gap-[var(--section)] pt-[var(--section)]">
        {/* 5. Tecnologias */}
        <section>
          <TechStackExplorer />
        </section>

        {/* 6. Filosofia de código */}
        <section>
          <CodePhilosophyTerminal />
        </section>
      </div>

      {/* 7. CTA final */}
      <div className="pt-[var(--section)]">
        <CtaPanel
          title={t.about.cta.title}
          description={t.about.cta.description}
          primaryHref="/contacto"
          primaryLabel={t.common.startConversation}
          secondaryHref="/servicos"
          secondaryLabel={t.about.cta.secondary}
        />
      </div>
    </div>
  );
}
