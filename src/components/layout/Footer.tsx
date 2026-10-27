"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS, NAV_LABEL_KEYS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLockup } from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export function Footer() {
  const { t, isEnglish } = useLanguage();
  const pathname = usePathname();

  // Ano atual — calculado via lazy initializer para evitar hydration mismatch
  // e evitar chamada de setState no effect (lint rule react-hooks/set-state-in-effect)
  const [currentYear] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return new Date().getFullYear();
    }
    return 2026; // fallback para SSR
  });

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

  const services = t.footer.services.map((label) => ({
    label,
    href: "/servicos",
  }));

  const getNavLabel = (href: string) =>
    t.nav[NAV_LABEL_KEYS[href] as keyof typeof t.nav] || href;

  return (
    <footer className="mt-24 border-t border-line bg-surface/40" data-hide-whatsapp>
      <div className="container-page">
        <div className="flex flex-col gap-5 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-start gap-2 font-body text-label uppercase tracking-[0.12em] text-muted">
              <span
                className="mt-[0.4em] h-1.5 w-1.5 shrink-0 bg-highlight ring-1 ring-ink/25"
                aria-hidden="true"
              />
              {t.footer.availability.replace("{year}", String(currentYear))}
            </p>

            <p className="mt-2 font-heading text-lg font-semibold tracking-[-0.02em] text-ink">
              {t.footer.ctaTitle}
            </p>
            <p className="mt-1 max-w-[58ch] font-body text-sm text-ink-2">
              {t.footer.ctaDescription}
            </p>
          </div>

          <ButtonLink href="/contacto" size="md" withArrow>
            {t.footer.cta}
          </ButtonLink>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label={t.nav.homeAria}
            >
              <BrandLockup name={SITE_CONFIG.name} />
            </Link>

            <p className="mt-5 max-w-[34ch] font-body text-sm leading-relaxed text-ink-2">
              {t.footer.tagline}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-micro text-muted">
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

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.footer.servicesTitle}
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-ink-2">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.footer.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-ink-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    {getNavLabel(item.href)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacidade"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.footer.contactTitle}
            </p>
            <div className="mt-4 space-y-2.5 font-body text-sm text-ink-2">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block break-all transition-colors hover:text-ink"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt")}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-ink"
              >
                {SITE_CONFIG.phone} (WhatsApp)
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line py-8">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                {t.footer.newsletterTitle}
              </p>
              <p className="mt-2 max-w-[40ch] font-body text-sm text-ink-2">
                {t.footer.newsletterNote}
              </p>
            </div>
            <NewsletterSignup
              variant="inline"
              showName={false}
              className="lg:ml-auto"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6 pb-24 font-body text-micro text-muted sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p>{t.footer.copyright.replace("{year}", String(currentYear))}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacidade" className="transition-colors hover:text-ink">
              {t.footer.privacy}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{t.footer.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
