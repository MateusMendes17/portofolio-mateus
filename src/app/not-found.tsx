"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/* ============================================================
   Página 404 — renderizada dentro do root layout (Header/Footer
   incluídos) para qualquer URL que não corresponda a uma rota.

   É client component para reagir ao toggle PT/EN do LanguageContext.
   A Next injeta sozinha `<meta name="robots" content="noindex" />`
   nas respostas 404, por isso não é preciso declará-lo aqui.
   ============================================================ */

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p
        aria-hidden="true"
        className="font-heading text-7xl font-bold tracking-tight text-accent sm:text-8xl"
      >
        404
      </p>

      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {t.notFound.headline}
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
        {t.notFound.description}
      </p>

      <nav
        aria-label={t.notFound.navLabel}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-text shadow-[0_4px_14px_-2px_rgba(158,103,71,0.35)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {t.notFound.backHome}
        </Link>

        <Link
          href="/contacto"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {t.notFound.contact}
        </Link>
      </nav>
    </div>
  );
}
