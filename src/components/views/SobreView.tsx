"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";

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

export function SobreView() {
  const { t } = useLanguage();

  const pillars = t.about.methodology.pillars;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-24 relative">
      <FloatingElements count={5} variant="minimal" />

      {/* 1. Hero da Página Sobre */}
      <section className="max-w-3xl relative z-10">
        <ScrollReveal direction="up" distance={40}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary mb-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {t.about.hero.badge}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
          <TextReveal3D>{t.about.hero.title}</TextReveal3D>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed">
          {t.about.hero.introBefore}
          <strong className="text-text-primary font-bold">Mateus Mendes</strong>
          {t.about.hero.introAfter}
        </p>
        </ScrollReveal>
      </section>

      {/* 2. Estatísticas & Métricas Interativas */}
      <section>
        <InteractiveStats />
      </section>

      {/* 3. Assistente Interativo de Solução (Quiz) */}
      <section>
        <ProjectQuiz />
      </section>

      {/* 4. Metodologia: Os 4 Pilares de Trabalho (Corte Visual Invertido) */}
      <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] dark dark:light bg-background text-text-primary py-24 border-y border-border transition-colors duration-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <ScrollReveal direction="up" distance={30}>
            <span className="text-xs uppercase tracking-wider font-bold text-accent">
            {t.about.methodology.label}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            <TextReveal3D>{t.about.methodology.title}</TextReveal3D>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
            {t.about.methodology.description}
          </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[280px]" stagger={0.12}>
          {pillars.map((pillar, index) => {
            // Bento Box Asymmetrical Layout
            const bentoClasses = [
              "md:col-span-2 md:row-span-1", // Pillar 1: Largo (Horizontal)
              "md:col-span-1 md:row-span-2", // Pillar 2: Alto (Vertical)
              "md:col-span-1 md:row-span-1", // Pillar 3: Quadrado pequeno
              "md:col-span-1 md:row-span-1", // Pillar 4: Quadrado pequeno
            ];

            return (
              <StaggerItem key={pillar.number} className={bentoClasses[index]}>
              <TiltCard3D className="h-full">
              <div
                className={`group relative rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-8 shadow-sm transition-all duration-500 hover:border-accent/50 hover:shadow-xl flex flex-col justify-between overflow-hidden h-full shimmer-scan`}
              >
                {/* Glow de Fundo no Hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <span className="font-mono text-xs font-bold text-accent px-3 py-1.5 rounded-full bg-accent-subtle/50 inline-block mb-6">
                    {pillar.number}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mb-3">
                    {pillar.title}
                  </h3>
                </div>
                
                <p className="text-sm leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </div>
              </TiltCard3D>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        </div>
      </section>


      {/* 5. Explorador Interativo de Tecnologias */}
      <section>
        <TechStackExplorer />
      </section>

      {/* 6. Modo Terminal / Filosofia de Código */}
      <section>
        <CodePhilosophyTerminal />
      </section>

      {/* 7. CTA Final */}
      <section className="relative z-10">
        <ScrollReveal direction="up" distance={50} scale={0.95}>
        <div className="relative rounded-3xl border border-accent/30 bg-gradient-to-br from-surface to-accent-subtle/40 p-8 sm:p-12 text-center shadow-lg overflow-hidden animate-gradient-mesh">
          <FloatingElements count={3} variant="minimal" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              {t.about.cta.title}
            </h2>
            <p className="mt-2 text-base text-text-secondary max-w-xl mx-auto">
              {t.about.cta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contacto">
                <Button variant="contact" size="lg" withArrow className="font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  {t.common.startConversation}
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="secondary" size="lg" className="hover:scale-105 transition-all">
                  {t.about.cta.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
