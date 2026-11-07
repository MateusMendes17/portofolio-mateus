"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { Strings } from "@/content/strings/pt";

type Service = Strings["services"]["items"][number];

/**
 * Cartão de um serviço, usado na listagem de /servicos (entregáveis num
 * acordeão, para a página não ficar enorme) e na página própria de cada
 * serviço (entregáveis abertos).
 */
export function ServiceArticle({
  service,
  index,
  collapsible = false,
  headingLevel = "h2",
}: {
  service: Service;
  index: number;
  collapsible?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const { t, isEnglish } = useLanguage();
  const Heading = headingLevel;

  const deliverables = (
    <>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
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
        <span className="mb-2 block font-mono text-xs text-[var(--code-muted)]">{t.services.labels.techStack}</span>
        <div className="flex flex-wrap gap-1.5">
          {service.techStack.map((tech) => (
            <span key={tech} className="rounded-full border border-[var(--code-line)] px-3 py-1 text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article
      id={service.id}
      className="scroll-mt-10 rounded-[28px] border-[1.5px] border-ink bg-surface p-7 sm:p-10 lg:p-12"
    >
      {/* Na listagem os entregáveis ficam por baixo (fechados); na página própria, ao lado. */}
      <div className={collapsible ? "flex flex-col gap-8" : "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between"}>
        <div className={collapsible ? "flex max-w-3xl flex-col gap-5" : "flex flex-col gap-5 lg:max-w-xl"}>
          <div className="flex items-center gap-4">
            <span
              className="font-heading text-[72px] leading-[0.8] font-semibold text-transparent"
              style={{ WebkitTextStroke: "2px var(--ink)" }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="bg-highlight px-2 py-0.5 font-mono text-sm text-accent-ink">{service.badge}</span>
          </div>

          <Heading className="m-0 font-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-ink">
            {service.title}
          </Heading>

          <p className="m-0 font-heading text-xl leading-snug font-semibold text-ink">{service.tagline}</p>

          <p className="m-0 text-muted">{service.description}</p>

          <div className="rounded-[20px] bg-highlight p-5 text-accent-ink">
            <p className="m-0 mb-1 font-mono text-xs uppercase tracking-[0.08em]">{t.services.labels.businessImpact}</p>
            <p className="m-0 text-sm font-medium leading-relaxed">{service.businessImpact}</p>
          </div>

          <p className="m-0 text-sm text-muted">
            <strong className="font-semibold text-ink">{t.services.labels.recommendedFor}</strong> {service.idealFor}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contacto" withArrow>
              {t.services.labels.discussService}
            </ButtonLink>
            {collapsible && (
              <Link
                href={`/servicos/${service.id}`}
                className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {isEnglish ? "Service page" : "Página do serviço"} →
              </Link>
            )}
          </div>
        </div>

        {/* Entregáveis */}
        {collapsible ? (
          <details className="theme-faq code-surface group rounded-[24px] bg-[var(--code-bg)] text-[var(--code-ink)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block font-mono text-sm text-[var(--code-accent)]">{t.services.labels.deliverables}</span>
                <span className="mt-1 block text-xs text-[var(--code-muted)]">
                  {service.includes.length} {isEnglish ? "items" : "itens"} · {t.services.labels.includedStandard}
                </span>
              </span>
              <span
                className="home-plus grid size-10 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--code-line)] text-xl"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="grid gap-6 px-6 pb-6 sm:px-8 sm:pb-8 lg:grid-cols-[1.4fr_1fr]">{deliverables}</div>
          </details>
        ) : (
          <div className="code-surface flex flex-col gap-4 rounded-[24px] bg-[var(--code-bg)] p-6 text-[var(--code-ink)] sm:p-8 lg:flex-1">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--code-line)] pb-3">
              <span className="font-mono text-sm text-[var(--code-accent)]">{t.services.labels.deliverables}</span>
              <span className="text-xs text-[var(--code-muted)]">{t.services.labels.includedStandard}</span>
            </div>
            {deliverables}
          </div>
        )}
      </div>
    </article>
  );
}
