"use client";

import Link from "next/link";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ServiceArticle } from "@/components/services/ServiceArticle";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Página própria de cada serviço (/servicos/[slug]): o mesmo cartão da
 * listagem com os entregáveis abertos, o processo, as FAQ e os outros
 * serviços. Melhor para SEO local do que âncoras numa página longa.
 */
export function ServiceDetailView({ slug }: { slug: string }) {
  const { t, isEnglish } = useLanguage();
  const items = t.services.items;
  const index = items.findIndex((item) => item.id === slug);
  const service = items[index];
  if (!service) return null;
  const others = items.filter((item) => item.id !== slug);

  return (
    <div className="pb-20 lg:pb-28">
      <div className="px-[var(--gutter)]">
        <nav
          aria-label={isEnglish ? "Breadcrumb" : "Caminho"}
          className="flex flex-wrap items-center gap-2 border-b border-ink py-4 font-mono text-sm text-muted"
        >
          <Link href="/servicos" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink">
            {t.nav.services}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink" aria-current="page">
            {service.title.split(" — ")[0]}
          </span>
        </nav>
      </div>

      <section className="px-[var(--gutter)] pt-10 lg:pt-14">
        <ServiceArticle service={service} index={index} headingLevel="h1" />
      </section>

      {/* Processo */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <p className="m-0 font-mono text-sm text-muted">{t.services.process.badge}</p>
        <h2 className="m-0 mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
          {t.services.process.title}
        </h2>
        <ol className="m-0 mt-12 flex list-none flex-wrap border-t-[1.5px] border-ink p-0">
          {t.services.process.steps.map((step) => (
            <li key={step.step} className="min-w-0 flex-[1_1_260px] py-8 pr-7">
              <span className="inline-block bg-highlight px-2 py-0.5 font-mono text-sm text-accent-ink">{step.step}</span>
              <h3 className="m-0 mt-4 font-heading text-[1.75rem] leading-[1.05] font-semibold text-ink">{step.title}</h3>
              <p className="m-0 mt-3 text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="flex flex-wrap gap-12 px-[var(--gutter)] pt-[var(--section)]">
        <div className="flex-[1_1_300px]">
          <p className="m-0 font-mono text-sm text-muted">{t.services.faq.badge}</p>
          <h2 className="m-0 mt-5 font-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
            {t.services.faq.title}
          </h2>
        </div>
        <div className="min-w-0 flex-[2_1_560px]">
          <FaqAccordion items={t.services.faq.items} />
        </div>
      </section>

      {/* Outros serviços */}
      <section className="px-[var(--gutter)] pt-[var(--section)]">
        <h2 className="m-0 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-ink">
          {isEnglish ? "Other services" : "Outros serviços"}
        </h2>
        <div className="mt-8 border-t-[1.5px] border-ink">
          {others.map((item) => (
            <Link
              key={item.id}
              href={`/servicos/${item.id}`}
              className="theme-row group flex items-center justify-between gap-6 border-b-[1.5px] border-ink px-3 py-6 no-underline"
            >
              <span className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
                {item.title.split(" — ")[0]}
              </span>
              <span className="text-3xl text-ink transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

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
