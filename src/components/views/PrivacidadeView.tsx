"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

export function PrivacidadeView() {
  const { isEnglish, t } = useLanguage();

  // Data dinâmica com formatação conforme a locale (valor, não texto fixo).
  const lastUpdated = new Date().toLocaleDateString(isEnglish ? "en-US" : "pt-PT", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Link href="/" className="text-xs font-semibold text-accent hover:underline mb-3 inline-block">
          {t.privacy.backHome}
        </Link>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
          {t.privacy.title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          {t.privacy.lastUpdatedPrefix} {lastUpdated}
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-8 sm:p-12 shadow-sm space-y-8 text-sm leading-relaxed text-text-secondary">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {t.privacy.controller.heading}
          </h2>
          <p>
            {t.privacy.controller.beforeName} <strong>{SITE_CONFIG.name}</strong>
            {t.privacy.controller.afterName}{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
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
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {t.privacy.legalBasis.heading}
          </h2>
          <p>{t.privacy.legalBasis.body}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {t.privacy.retention.heading}
          </h2>
          <p>{t.privacy.retention.body}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {t.privacy.rights.heading}
          </h2>
          <p>
            {t.privacy.rights.beforeLink}{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3 border-t border-border/60 pt-6">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {t.privacy.cookies.heading}
          </h2>
          <p>{t.privacy.cookies.body}</p>
        </section>
      </div>
    </div>
  );
}
