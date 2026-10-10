"use client";

import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

export function ContactoView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative">
      <FloatingElements count={4} variant="minimal" />
      {/* Cabeçalho da Página */}
      <div className="mb-14 max-w-3xl relative z-10">
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
        </ScrollReveal>
      </div>

      {/* Grelha: Contacto Direto à Esquerda + Formulário à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Coluna Esquerda: Canais Diretos & Perguntas Frequentes */}
        <div className="lg:col-span-5 space-y-6">
          <StaggerContainer stagger={0.15}>
          {/* Card: Canais Diretos */}
          <StaggerItem>
          <TiltCard3D>
          <div className="rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-7 shadow-sm space-y-6 shimmer-scan">
            <h2 className="font-heading text-lg font-bold text-text-primary">
              {t.contact.channelsTitle}
            </h2>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-subtle text-accent border border-accent/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
                  {t.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm font-semibold text-text-primary hover:text-accent transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
                <span className="block text-xs text-text-muted mt-0.5">
                  {t.contact.emailNote}
                </span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
                  {t.contact.whatsappLabel}
                </span>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-text-primary hover:text-emerald-600 transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
                <span className="block text-xs text-text-muted mt-0.5">
                  {t.contact.whatsappNote}
                </span>
              </div>
            </div>

            {/* Localização & Faturação */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-hover text-text-primary border border-border">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
                  {t.contact.locationLabel}
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {t.contact.location}
                </span>
                <span className="block text-xs text-text-muted mt-0.5">
                  {t.contact.locationNote}
                </span>
              </div>
            </div>

            {/* Redes Profissionais */}
            <div className="pt-4 border-t border-border/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                {t.contact.networksLabel}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
          </TiltCard3D>
          </StaggerItem>

          {/* Card: FAQ Rápida sobre o Processo */}
          <StaggerItem>
          <TiltCard3D>
          <div className="rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-7 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-bold text-text-primary">
              {t.contact.faqTitle}
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-text-secondary">
              {t.contact.faq.map((item, i) => (
                <div key={i} className={i > 0 ? "pt-2 border-t border-border/60" : undefined}>
                  <p className="font-bold text-text-primary">{item.q}</p>
                  <p className="mt-0.5">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          </TiltCard3D>
          </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Coluna Direita: Formulário Interativo com Zod */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="up" distance={30} delay={0.2} scale={0.98}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
