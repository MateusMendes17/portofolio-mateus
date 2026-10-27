"use client";

import { useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CallBooking } from "@/components/contact/CallBooking";
import { usePathname } from "next/navigation";
import { CAL_EVENTS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
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
      bgClass: "bg-accent-subtle text-accent border-accent/20",
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
            bgClass: "bg-accent-subtle text-accent border-accent/20",
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
      bgClass: "bg-surface-hover text-text-primary border-border",
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative">
      <FloatingElements count={4} variant="minimal" />

      {/* Cabeçalho da Página */}
      <div className="mb-16 max-w-3xl relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary mb-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {t.contact.badge}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
          <TextReveal3D>{t.contact.title}</TextReveal3D>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
          {t.contact.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {hasCal && (
            <button
              type="button"
              onClick={() => selectTab("chamada", true)}
              className="inline-flex items-center gap-2 border border-ink bg-highlight px-5 py-3 font-body text-label font-semibold text-accent-ink transition-colors hover:bg-highlight-hover"
            >
              {isEnglish ? "Book a call" : "Marcar chamada"} →
            </button>
          )}
          <a
            href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "contacto")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-body text-label font-semibold text-ink transition-colors hover:bg-surface-2"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
        </ScrollReveal>
      </div>

      {/* NEWSLETTER / LEAD MAGNET — Secção de Destaque (Full Width) */}
      <ScrollReveal direction="up" distance={30} delay={0.1}>
      <div className="mb-16 relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent/10 via-surface to-accent-subtle/10 border border-accent/20 p-8 sm:p-10">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t.contact.newsletterBadge || "Recurso Gratuito"}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {t.contact.newsletterTitle || "Quer Receber o Checklist de Conversão?"}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mb-6 max-w-lg mx-auto leading-relaxed">
            {t.contact.newsletterDesc || "12 pontos para auditar o seu site hoje. Baixe o PDF grátis e comece a converter mais visitantes em clientes."}
          </p>
          <NewsletterSignup variant="inline" showName={true} />
        </div>
      </div>
      </ScrollReveal>

      {/* Grelha Principal: Canais à Esquerda + Formulário à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Coluna Esquerda: Canais de Contacto */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Canais de Contacto — 3 cards com mesma altura visual */}
          <div className="grid grid-cols-1 gap-6">
            {contactMethods.map((method) => (
              <TiltCard3D key={method.label} className="h-[220px]">
              <div className="rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 h-full shimmer-scan flex flex-col justify-center">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.bgClass}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                      {method.label}
                    </span>
                    {method.onSelect ? (
                        <button
                          type="button"
                          onClick={method.onSelect}
                          className="block max-w-full text-left text-base font-semibold text-text-primary hover:text-accent transition-colors truncate"
                        >
                          {method.value} →
                        </button>
                      ) : method.isLink ? (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-base font-semibold text-text-primary hover:text-accent transition-colors truncate"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="block text-base font-semibold text-text-primary truncate">
                          {method.value}
                        </span>
                      )}
                    <span className="block text-xs text-text-muted mt-2 leading-relaxed">
                      {method.note}
                    </span>
                  </div>
                </div>
              </div>
              </TiltCard3D>
            ))}

          {/* Redes Profissionais */}
          <TiltCard3D>
          <div className="rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-xl p-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 shimmer-scan">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              {t.contact.networksLabel}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          </TiltCard3D>

          {/* FAQ Rápida */}
          <TiltCard3D>
          <div className="rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-xl p-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 shimmer-scan">
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">
              {t.contact.faqTitle}
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-text-secondary">
              {t.contact.faq.map((item, i) => (
                <div key={i} className={i > 0 ? "pt-3 border-t border-border/60" : undefined}>
                  <p className="font-bold text-text-primary">{item.q}</p>
                  <p className="mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          </TiltCard3D>
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
                  className="mb-4 grid grid-cols-2 border border-line-strong bg-surface"
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
                        className={`px-4 py-3 font-body text-label font-semibold transition-colors ${
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
                  className="border border-line bg-surface p-4 sm:p-6"
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
  );
}
