"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

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

  const servicesList = t.services.items;
  const standards = t.services.standards.items;
  const steps = t.services.process.steps;
  const faqs = t.services.faq.items;

  return (
    <div className="pb-20 lg:pb-28">
      {/* 1. Cabeçalho */}
      <PageIntro
        eyebrow={t.services.badge}
        title={t.services.title}
        description={t.services.description}
        aside={
          <div className="mt-8 flex flex-wrap gap-2">
            {servicesList.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-ink px-4 text-sm font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
              >
                {item.title.split(" — ")[0].split(" & ")[0]} ↓
              </a>
            ))}
          </div>
        }
      />

      {/* 2. Lista dos serviços */}
      <section className="flex flex-col gap-5 px-[var(--gutter)]">
        {servicesList.map((service, index) => (
          <ScrollReveal key={service.id} direction="up" distance={40}>
            <article
              id={service.id}
              className="scroll-mt-24 rounded-[28px] border-[1.5px] border-ink bg-surface p-7 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-5 lg:max-w-xl">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-heading text-[72px] leading-[0.8] font-semibold text-transparent"
                      style={{ WebkitTextStroke: "2px var(--ink)" }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-highlight px-2 py-0.5 font-mono text-sm text-accent-ink">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="m-0 font-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-ink">
                    {service.title}
                  </h2>

                  <p className="m-0 font-heading text-xl leading-snug font-semibold text-ink">{service.tagline}</p>

                  <p className="m-0 text-muted">{service.description}</p>

                  <div className="rounded-[20px] bg-highlight p-5 text-accent-ink">
                    <p className="m-0 mb-1 font-mono text-xs uppercase tracking-[0.08em]">
                      {t.services.labels.businessImpact}
                    </p>
                    <p className="m-0 text-sm font-medium leading-relaxed">{service.businessImpact}</p>
                  </div>

                  <p className="m-0 text-sm text-muted">
                    <strong className="font-semibold text-ink">{t.services.labels.recommendedFor}</strong>{" "}
                    {service.idealFor}
                  </p>

                  <div>
                    <ButtonLink href="/contacto" withArrow>
                      {t.services.labels.discussService}
                    </ButtonLink>
                  </div>
                </div>

                {/* Entregáveis */}
                <div className="code-surface flex flex-col gap-4 rounded-[24px] bg-[var(--code-bg)] p-6 text-[var(--code-ink)] sm:p-8 lg:flex-1">
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--code-line)] pb-3">
                    <span className="font-mono text-sm text-[var(--code-accent)]">
                      {t.services.labels.deliverables}
                    </span>
                    <span className="text-xs text-[var(--code-muted)]">{t.services.labels.includedStandard}</span>
                  </div>

                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-highlight text-accent-ink">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-[var(--code-line)] pt-4">
                    <span className="mb-2 block font-mono text-xs text-[var(--code-muted)]">
                      {t.services.labels.techStack}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--code-line)] px-3 py-1 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      {/* 3. Garantias */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <ScrollReveal direction="up" distance={30}>
          <SectionHeading
            eyebrow={t.services.standards.badge}
            title={t.services.standards.title}
            description={t.services.standards.description}
          />
        </ScrollReveal>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {standards.map((std) => (
            <StaggerItem key={std.id}>
              <div className="theme-card flex h-full flex-col gap-4 border-[1.5px] border-ink bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight text-accent-ink">
                  {STANDARD_ICONS[std.id]}
                </div>
                <h3 className="m-0 font-heading text-2xl leading-tight font-semibold text-ink">{std.title}</h3>
                <p className="m-0 text-muted">{std.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Processo */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <ScrollReveal direction="up" distance={30}>
          <SectionHeading eyebrow={t.services.process.badge} title={t.services.process.title} />
        </ScrollReveal>
        <ol className="m-0 mt-12 flex list-none flex-wrap border-t-[1.5px] border-ink p-0">
          {steps.map((step) => (
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

      {/* 5. FAQ */}
      <section className="flex flex-wrap gap-12 px-[var(--gutter)] pt-[var(--section)]">
        <div className="flex-[1_1_300px]">
          <p className="m-0 font-mono text-sm text-muted">{t.services.faq.badge}</p>
          <h2 className="m-0 mt-5 font-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
            {t.services.faq.title}
          </h2>
        </div>
        <div className="min-w-0 flex-[2_1_560px]">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* 6. CTA */}
      <div className="pt-[var(--section)]">
        <CtaPanel
          title={t.services.cta.title}
          description={t.services.cta.description}
          primaryHref="/contacto"
          primaryLabel={t.common.startConversation}
          secondaryHref="/avaliador"
          secondaryLabel={t.nav.audit}
        />
      </div>
    </div>
  );
}
