"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";

/* Ícones das garantias por id — os textos vivem em t.services.standards.items */
const STANDARD_ICONS: Record<string, ReactNode> = {
  ownership: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  speed: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  seo: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  cms: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  invoicing: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
};

export function ServicosView() {
  const { t } = useLanguage();
  
  // Horizontal Scroll Setup
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  /* Distância exata a percorrer: largura do track menos a área visível.
     Assim o último cartão termina alinhado à direita em qualquer ecrã —
     uma percentagem fixa ("-70%") cortava o último cartão em telemóvel. */
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = track?.parentElement;
    if (!track || !container) return;

    const update = () =>
      setDistance(Math.max(0, track.scrollWidth - container.clientWidth));

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    // O ResizeObserver entrega a primeira medição de forma assíncrona,
    // logo não é preciso chamar `update()` aqui dentro.
    const observer = new ResizeObserver(update);
    observer.observe(track);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const x = useTransform(scrollYProgress, (progress) => -progress * distance);

  const servicesList = t.services.items;
  const standards = t.services.standards.items;
  const steps = t.services.process.steps;
  const faqs = t.services.faq.items;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-24">
      {/* Floating 3D Geometric Elements for Page Background */}
      <FloatingElements count={3} variant="minimal" />

      {/* 1. Cabeçalho de Alto Impacto */}
      <section className="max-w-3xl relative z-10">
        <ScrollReveal direction="up" distance={40}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary mb-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {t.services.badge}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
          <TextReveal3D>{t.services.title}</TextReveal3D>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed">
          {t.services.description}
        </p>

        {/* Atalhos Rápidos */}
        <div className="mt-8 flex flex-wrap gap-2 pt-2">
          {servicesList.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-accent transition-all"
            >
              {item.title.split(" — ")[0].split(" & ")[0]} ↓
            </a>
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* 2. Lista dos 5 Serviços */}
      <section className="space-y-12 sm:space-y-20 relative z-10">
        {servicesList.map((service) => (
          <ScrollReveal key={service.id} direction="up" distance={40} scale={0.98}>
          <div
            id={service.id}
            className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-8 sm:p-12 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              {/* Lado Esquerdo */}
              <div className="lg:max-w-lg space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded-full bg-accent-subtle">
                    {service.badge}
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  {service.title}
                </h2>

                <p className="text-base font-semibold text-text-primary">
                  {service.tagline}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                  {service.description}
                </p>

                <div className="rounded-xl border border-accent/20 bg-accent-subtle/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                    {t.services.labels.businessImpact}
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {service.businessImpact}
                  </p>
                </div>

                <div className="pt-2 text-xs text-text-muted">
                  <p>
                    <strong className="text-text-primary font-semibold">
                      {t.services.labels.recommendedFor}
                    </strong>{" "}
                    {service.idealFor}
                  </p>
                </div>

                <div className="pt-3">
                  <Link href="/contacto">
                    <Button variant="primary" size="md" withArrow>
                      {t.services.labels.discussService}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Lado Direito: Entregáveis */}
              <div className="lg:flex-1 rounded-2xl border border-border/70 bg-surface-hover/50 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-heading text-xs uppercase tracking-wider font-bold text-text-primary">
                    {t.services.labels.deliverables}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {t.services.labels.includedStandard}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                    {t.services.labels.techStack}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-surface border border-border px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        ))}
      </section>

      {/* 3. Padrões de Excelência */}
      <section className="space-y-8 relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t.services.standards.badge}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            <TextReveal3D>{t.services.standards.title}</TextReveal3D>
          </h2>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {t.services.standards.description}
          </p>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12}>
          {standards.map((std, i) => (
            <StaggerItem key={i}><TiltCard3D>
            <div
              className="rounded-2xl border border-border/70 bg-surface/70 p-6 space-y-3 transition-all hover:border-accent/40 h-full shimmer-scan"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-hover border border-border text-text-primary">
                {STANDARD_ICONS[std.id]}
              </div>
              <h3 className="font-heading text-base font-bold text-text-primary">{std.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{std.description}</p>
            </div>
            </TiltCard3D></StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Processo em 4 Etapas (Horizontal Scroll Invertido) */}
      <section ref={targetRef} className="relative h-[250vh] w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] dark dark:light bg-background text-text-primary pt-24 pb-12 border-y border-border transition-colors duration-500">
        {/* `h-full` é essencial: dá ao `sticky` um contentor mais alto do que
            ele próprio, sem o qual não existe espaço para "grudar" no ecrã. */}
        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="sticky top-24 h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden">
            
            {/* Cabeçalho Fixo */}
            <ScrollReveal direction="up" distance={30} className="max-w-2xl mb-12 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {t.services.process.badge}
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
                <TextReveal3D>{t.services.process.title}</TextReveal3D>
              </h2>
            </ScrollReveal>

            {/* Área de Movimento Horizontal */}
            <div className="relative flex-1 flex items-center overflow-hidden">
              <motion.div ref={trackRef} style={{ x }} className="flex gap-6 w-max pr-4">
                {steps.map((st) => (
                  <div 
                    key={st.step} 
                    className="w-[75vw] sm:w-[45vw] lg:w-[30vw] shrink-0 rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-accent transition-colors shadow-sm"
                  >
                    <span className="text-4xl sm:text-5xl font-bold font-heading text-accent/40 block mb-6">{st.step}</span>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{st.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="space-y-6 relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t.services.faq.badge}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            <TextReveal3D>{t.services.faq.title}</TextReveal3D>
          </h2>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" stagger={0.12}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
            <div className="rounded-2xl border border-border/60 bg-surface p-6 space-y-2 hover:border-accent/30 transition-colors h-full">
              <h3 className="font-heading text-base font-bold text-text-primary">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{faq.a}</p>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 6. Call to Action */}
      <section className="mx-auto">
        <ScrollReveal direction="up" distance={50} scale={0.95}>
        <div className="relative rounded-3xl sm:rounded-[2.5rem] border border-accent/40 bg-surface/90 backdrop-blur-xl p-8 sm:p-14 text-center shadow-xl space-y-6 overflow-hidden">
          {/* Floating 3D elements in CTA */}
          <FloatingElements count={4} variant="minimal" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              {t.services.cta.title}
            </h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto mt-5">
              {t.services.cta.description}
            </p>
            
            <div className="pt-2 mt-8 flex justify-center">
              <Link href="/contacto">
                <Button variant="primary" size="lg" withArrow className="font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  {t.common.startConversation}
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
