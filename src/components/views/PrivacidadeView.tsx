"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

/** Data da última revisão da política (AAAA-MM-DD). */
const PRIVACY_LAST_UPDATED = "2026-11-08T12:00:00Z";

export function PrivacidadeView() {
  const { isEnglish, t } = useLanguage();

  // Data fixa da última revisão do texto: atualizar à mão quando a política mudar.
  const lastUpdated = new Date(PRIVACY_LAST_UPDATED).toLocaleDateString(isEnglish ? "en-GB" : "pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative isolate px-[var(--gutter)] pb-20 lg:pb-28">
      <div aria-hidden="true" className="theme-intro-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="mb-12 border-b border-ink">
        <Link href="/" className="mt-4 mb-8 inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-ink px-4 text-sm font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg">
          {t.privacy.backHome}
        </Link>
        <h1 className="m-0 font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink">
          {t.privacy.title}
        </h1>
        <p className="mt-6 mb-6 font-mono text-sm text-muted">
          {t.privacy.lastUpdatedPrefix} {lastUpdated}
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-10 rounded-[28px] border-[1.5px] border-ink bg-surface p-8 text-base leading-relaxed text-ink-2 sm:p-12">
        <section className="space-y-3">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.controller.heading}
          </h2>
          <p>
            {t.privacy.controller.beforeName} <strong>{SITE_CONFIG.name}</strong>
            {t.privacy.controller.afterName}{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="home-hl font-semibold no-underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.collectedData.heading}
          </h2>
          <p>{t.privacy.collectedData.intro}</p>
          <ul className="list-disc pl-5 space-y-1">
            {t.privacy.collectedData.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {t.privacy.collectedData.neverBefore} <strong>{t.privacy.collectedData.neverStrong}</strong>{" "}
            {t.privacy.collectedData.neverAfter}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.legalBasis.heading}
          </h2>
          <p>{t.privacy.legalBasis.body}</p>
        </section>

        <section className="space-y-3">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.retention.heading}
          </h2>
          <p>{t.privacy.retention.body}</p>
        </section>

        <section className="space-y-3">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.rights.heading}
          </h2>
          <p>
            {t.privacy.rights.beforeLink}{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="home-hl font-semibold no-underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3 border-t-[1.5px] border-ink pt-8">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
            {t.privacy.cookies.heading}
          </h2>
          <p>{t.privacy.cookies.body}</p>
        </section>
      </div>
    </div>
  );
}
