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
    <div className="relative isolate flex min-h-[75vh] flex-col justify-center overflow-hidden px-[var(--gutter)] py-16">
      <div aria-hidden="true" className="theme-intro-bg pointer-events-none absolute inset-0 -z-10" />

      <p
        aria-hidden="true"
        className="m-0 font-heading text-[clamp(8rem,28vw,22rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: "2px var(--ink)" }}
      >
        404
      </p>

      <h1 className="m-0 mt-8 max-w-[18ch] font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
        <span className="home-hl">{t.notFound.headline}</span>
      </h1>

      <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted sm:text-lg">
        {t.notFound.description}
      </p>

      <nav aria-label={t.notFound.navLabel} className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-accent-ink bg-highlight px-7 font-semibold text-accent-ink no-underline transition-transform hover:scale-105"
        >
          {t.notFound.backHome} <span aria-hidden="true" className="ml-2">→</span>
        </Link>

        <Link
          href="/contacto"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-ink px-7 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
        >
          {t.notFound.contact}
        </Link>
      </nav>
    </div>
  );
}
