"use client";

import { useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CallBooking } from "@/components/contact/CallBooking";
import { usePathname } from "next/navigation";
import { CAL_EVENTS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageIntro } from "@/components/ui/PageIntro";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactoView({ initialTab = "mensagem" }: { initialTab?: "mensagem" | "chamada" }) {
  const { t, isEnglish } = useLanguage();
  const pathname = usePathname();
  const hasCal = CAL_EVENTS.length > 0;
  const durations = CAL_EVENTS.map((e) => e.minutes).join(isEnglish ? " or " : " ou ");

  // Separador ativo: ?aba=chamada abre o calendário (só existe com NEXT_PUBLIC_CAL_URL).
  type Tab = "mensagem" | "chamada";
  const [tab, setTab] = useState<Tab>(hasCal && initialTab === "chamada" ? "chamada" : "mensagem");

  function selectTab(next: Tab, scroll = false) {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === "chamada") url.searchParams.set("aba", "chamada");
    else url.searchParams.delete("aba");
    window.history.replaceState(null, "", url);
    if (scroll) document.getElementById("contacto-painel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  interface ContactMethod {
    label: string;
    value: string;
    note: string;
    icon: React.ReactNode;
    bgClass: string;
    href: string | undefined;
    isLink: boolean;
    /** Em vez de abrir uma ligação, ativa um separador desta página. */
    onSelect?: () => void;
  }

  const contactMethods: ContactMethod[] = [
    {
      label: t.contact.emailLabel,
      value: SITE_CONFIG.email,
      note: t.contact.emailNote,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      bgClass: "bg-highlight text-accent-ink border-accent-ink",
      href: `mailto:${SITE_CONFIG.email}`,
      isLink: true,
    },
    {
      label: t.contact.whatsappLabel,
      value: SITE_CONFIG.phone,
      note: t.contact.whatsappNote,
      icon: <WhatsAppIcon className="w-5 h-5" />,
      bgClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      href: getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "contacto"),
      isLink: true,
    },
    ...(hasCal
      ? [
          {
            label: isEnglish ? "Book a call" : "Marcar chamada",
            value: isEnglish ? `${durations} minutes, no commitment` : `${durations} minutos, sem compromisso`,
            note: isEnglish
              ? "Pick a time that suits you"
              : "Escolha o horário que lhe der mais jeito",
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            ),
            bgClass: "bg-highlight text-accent-ink border-accent-ink",
            href: CAL_EVENTS[0]?.url,
            isLink: true,
            onSelect: () => selectTab("chamada", true),
          },
        ]
      : []),
    {
      label: t.contact.locationLabel,
      value: t.contact.location,
      note: t.contact.locationNote,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      bgClass: "bg-surface-2 text-ink border-line",
      href: undefined,
      isLink: false,
    },
  ];

  const socialLinks = [
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon className="w-4 h-4" />,
      href: getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "contacto"),
    },
    {
      label: "LinkedIn",
      icon: <LinkedInIcon className="w-4 h-4" />,
      href: SOCIAL_LINKS.linkedin,
    },
    {
      label: "GitHub",
      icon: <GitHubIcon className="w-4 h-4" />,
      href: SOCIAL_LINKS.github,
    },
  ];

  return (
    <div className="pb-20 lg:pb-28">
      {/* Cabeçalho da Página */}
      <PageIntro
        eyebrow={t.contact.badge}
        title={t.contact.title}
        description={t.contact.description}
        aside={
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hasCal && (
              <button
                type="button"
                onClick={() => selectTab("chamada", true)}
                className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-accent-ink bg-highlight px-7 font-semibold text-accent-ink transition-transform hover:scale-105"
              >
                {isEnglish ? "Book a call" : "Marcar chamada"} →
              </button>
            )}
            <a
              href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "contacto")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-[1.5px] border-ink px-7 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        }
      />

      <div className="container-page">
      {/* NEWSLETTER / LEAD MAGNET — Secção de Destaque (Full Width) */}
      <ScrollReveal direction="up" distance={30} delay={0.1}>
      <div className="mb-16 rounded-[28px] bg-highlight p-8 text-accent-ink sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-accent-ink px-3 py-1 font-mono text-xs">
            {t.contact.newsletterBadge || "Recurso Gratuito"}
          </span>
          <h2 className="m-0 mb-3 font-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-inherit">
            {t.contact.newsletterTitle || "Quer Receber o Checklist de Conversão?"}
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-accent-ink/75 sm:text-base">
            {t.contact.newsletterDesc || "12 pontos para auditar o seu site hoje. Baixe o PDF grátis e comece a converter mais visitantes em clientes."}
          </p>
          <div className="light">
            <NewsletterSignup variant="inline" showName={true} />
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Grelha Principal: Canais à Esquerda + Formulário à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Coluna Esquerda: Canais de Contacto */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Canais de Contacto — 3 cards com mesma altura visual */}
          <div className="grid grid-cols-1 gap-5">
            {contactMethods.map((method) => (
              <div
                key={method.label}
                className="theme-card flex items-start gap-4 border-[1.5px] border-ink bg-surface p-6"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${method.bgClass}`}>
                  {method.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="mb-1 block font-mono text-xs text-muted">{method.label}</span>
                  {method.onSelect ? (
                    <button
                      type="button"
                      onClick={method.onSelect}
                      className="block max-w-full cursor-pointer truncate text-left font-heading text-xl font-semibold text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {method.value} →
                    </button>
                  ) : method.isLink ? (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-heading text-xl font-semibold text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="block truncate font-heading text-xl font-semibold text-ink">{method.value}</span>
                  )}
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{method.note}</span>
                </div>
              </div>
            ))}

          {/* Redes Profissionais */}
          <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6">
            <span className="mb-3 block font-mono text-xs text-muted">{t.contact.networksLabel}</span>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-ink px-4 text-sm font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Rápida */}
          <div className="code-surface rounded-[28px] bg-[var(--code-bg)] p-6 text-[var(--code-ink)]">
            <h3 className="m-0 mb-4 font-heading text-xl font-semibold text-inherit">{t.contact.faqTitle}</h3>
            <div className="space-y-3 text-sm leading-relaxed text-[var(--code-muted)]">
              {t.contact.faq.map((item, i) => (
                <div key={i} className={i > 0 ? "border-t border-[var(--code-line)] pt-3" : undefined}>
                  <p className="font-semibold text-[var(--code-ink)]">{item.q}</p>
                  <p className="mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Coluna Direita: Formulário Interativo */}
        <div className="lg:col-span-7 min-w-0">
          <ScrollReveal direction="up" distance={30} delay={0.2} scale={0.98}>
            <div id="contacto-painel" className="scroll-mt-24">
              {hasCal && (
                <div
                  role="tablist"
                  aria-label={isEnglish ? "How would you like to get in touch?" : "Como prefere falar comigo?"}
                  className="mb-4 grid grid-cols-2 gap-1 rounded-full border-[1.5px] border-ink bg-surface p-1"
                >
                  {(
                    [
                      { id: "mensagem", label: isEnglish ? "Send a message" : "Enviar mensagem" },
                      { id: "chamada", label: isEnglish ? "Book a call" : "Marcar chamada" },
                    ] as const
                  ).map((item) => {
                    const active = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        id={`aba-${item.id}`}
                        aria-selected={active}
                        aria-controls={`painel-${item.id}`}
                        onClick={() => selectTab(item.id)}
                        className={`cursor-pointer rounded-full px-4 py-3 font-body text-label font-semibold transition-colors ${
                          active ? "bg-highlight text-accent-ink" : "text-ink-2 hover:bg-surface-2"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {tab === "chamada" && hasCal ? (
                <div
                  role="tabpanel"
                  id="painel-chamada"
                  aria-labelledby="aba-chamada"
                  className="rounded-[28px] border-[1.5px] border-ink bg-surface p-5 sm:p-8"
                >
                  <h2 className="font-heading text-h3 font-semibold text-ink">
                    {isEnglish ? "Pick a day and time" : "Escolha o dia e a hora"}
                  </h2>
                  <p className="mt-2 mb-5 max-w-[56ch] font-body text-sm text-ink-2">
                    {isEnglish
                      ? "No commitment. We talk about your site or project and what the next step could be. You get the confirmation by email."
                      : "Sem compromisso. Falamos do seu site ou projeto e do que pode ser o próximo passo. Recebe a confirmação por email."}
                  </p>
                  <CallBooking events={CAL_EVENTS} />
                </div>
              ) : (
                <div
                  role={hasCal ? "tabpanel" : undefined}
                  id="painel-mensagem"
                  aria-labelledby={hasCal ? "aba-mensagem" : undefined}
                >
                  <ContactForm />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
      </div>
    </div>
  );
}
