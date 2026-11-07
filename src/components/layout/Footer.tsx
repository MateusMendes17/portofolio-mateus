"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS, NAV_LABEL_KEYS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

/** Página de cada serviço listado no rodapé (mesma ordem de t.footer.services). */
const SERVICE_SLUGS = ["websites", "landing-pages", "lojas-online", "web-apps", "manutencao"];

/**
 * Rodapé no tema da home: bloco escuro (chartreuse no tema escuro não,
 * para não competir com o CTA final) com o nome gigante em contorno.
 * Sem CTA repetido: cada página já termina com o seu painel de contacto.
 */
export function Footer() {
  const { t, isEnglish } = useLanguage();
  const pathname = usePathname();
  // O ano só muda à meia-noite de 31/12: suppressHydrationWarning cobre a diferença.
  const currentYear = new Date().getFullYear();

  // Hora local de Lisboa, atualizada a cada 30s.
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(isEnglish ? "en-GB" : "pt-PT", {
      timeZone: "Europe/Lisbon",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setLocalTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [isEnglish]);

  const getNavLabel = (href: string) =>
    t.nav[NAV_LABEL_KEYS[href] as keyof typeof t.nav] || href;

  const whatsappUrl = getWhatsAppUrl(pathname, isEnglish ? "en" : "pt");
  const link = "text-[var(--code-muted)] no-underline transition-colors duration-200 hover:text-[var(--code-ink)]";
  const social =
    "flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[var(--code-line)] text-[var(--code-ink)] transition-colors duration-200 hover:border-[var(--code-accent)] hover:bg-highlight hover:text-accent-ink";

  return (
    <footer className="theme-footer code-surface relative overflow-hidden" data-hide-whatsapp>
      <div className="px-[var(--gutter)] pt-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/sobre/mateus-avatar.webp"
                alt={t.about.photoAlt}
                width={480}
                height={480}
                sizes="56px"
                className="size-14 shrink-0 rounded-full border-[1.5px] border-[var(--code-accent)] object-cover"
              />
              <p className="m-0 inline-flex items-center gap-3 font-mono text-sm text-[var(--code-ink)]">
                <span className="home-dot" aria-hidden="true" />
                <span suppressHydrationWarning>{t.footer.availability.replace("{year}", String(currentYear))}</span>
              </p>
            </div>
            <p className="m-0 mt-6 max-w-[36ch] text-[var(--code-muted)]">{t.footer.tagline}</p>
            <p className="m-0 mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--code-muted)]">
              <span>{t.footer.location}</span>
              <span aria-hidden="true">/</span>
              <span>{t.footer.responseTime.replace("{time}", t.footer.responseTimeValue)}</span>
              {localTime && (
                <>
                  <span aria-hidden="true">/</span>
                  <time className="tabular-nums">{localTime}</time>
                </>
              )}
            </p>
          </div>

          <nav aria-label={t.footer.servicesTitle}>
            <p className="m-0 font-mono text-xs text-[var(--code-accent)]">{t.footer.servicesTitle}</p>
            <ul className="m-0 mt-5 list-none space-y-3 p-0 text-sm">
              {t.footer.services.map((label, index) => (
                <li key={label}>
                  <Link href={`/servicos/${SERVICE_SLUGS[index] ?? ""}`} className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.navTitle}>
            <p className="m-0 font-mono text-xs text-[var(--code-accent)]">{t.footer.navTitle}</p>
            <ul className="m-0 mt-5 list-none space-y-3 p-0 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {getNavLabel(item.href)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacidade" className={link}>
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="m-0 font-mono text-xs text-[var(--code-accent)]">{t.footer.contactTitle}</p>
            <div className="mt-5 space-y-3 text-sm">
              <a href={`mailto:${SITE_CONFIG.email}`} className={`block break-all ${link}`}>
                {SITE_CONFIG.email}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`block ${link}`}>
                {SITE_CONFIG.phone} (WhatsApp)
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={social} aria-label="WhatsApp">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={social} aria-label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={social} aria-label="GitHub">
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 rounded-[28px] border border-[var(--code-line)] p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="m-0 font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--code-ink)]">
              {t.footer.newsletterTitle}
            </p>
            <p className="m-0 mt-2 max-w-[40ch] text-sm text-[var(--code-muted)]">{t.footer.newsletterNote}</p>
          </div>
          {/* O formulário usa os tokens claros, legível sobre o fundo escuro. */}
          <div className="light rounded-full lg:ml-auto">
            <NewsletterSignup variant="inline" showName={false} />
          </div>
        </div>
      </div>

      {/* Nome gigante em contorno, a fechar a página. */}
      <p
        aria-hidden="true"
        className="theme-footer-name m-0 mt-12 select-none px-[var(--gutter)] font-heading font-semibold leading-[0.8] tracking-[-0.06em] whitespace-nowrap"
      >
        Mateus Mendes
      </p>

      <div className="flex flex-col gap-3 border-t border-[var(--code-line)] px-[var(--gutter)] pt-6 pb-24 font-mono text-xs text-[var(--code-muted)] sm:flex-row sm:items-center sm:justify-between sm:pb-6">
        <p className="m-0" suppressHydrationWarning>
          {t.footer.copyright.replace("{year}", String(currentYear))}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href="/privacidade" className={link}>
            {isEnglish ? "No tracking cookies" : "Sem cookies de rastreamento"}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
