"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from "@/lib/constants";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, isEnglish } = useLanguage();

  const services = isEnglish
    ? [
        { label: "Corporate Websites", href: "/servicos" },
        { label: "High-Converting Landing Pages", href: "/servicos" },
        { label: "Online Stores & E-Commerce", href: "/servicos" },
        { label: "Custom Web Applications", href: "/servicos" },
        { label: "SEO & Performance Optimization", href: "/servicos" },
      ]
    : [
        { label: "Websites Institucionais", href: "/servicos" },
        { label: "Landing Pages de Alta Conversão", href: "/servicos" },
        { label: "Lojas Online & E-Commerce", href: "/servicos" },
        { label: "Aplicações Web Sob Medida", href: "/servicos" },
        { label: "Otimização SEO & Performance", href: "/servicos" },
      ];

  const navLabels: Record<string, string> = {
    "/": t.nav.home,
    "/sobre": t.nav.about,
    "/servicos": t.nav.services,
    "/projetos": t.nav.projects,
    "/contacto": t.nav.contact,
  };

  return (
    <footer className="border-t border-border/80 bg-surface/90 pt-16 pb-12 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner de Destaque Superior: Disponibilidade para Projetos */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-border/70">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {isEnglish
                ? `Available for new projects in ${currentYear}`
                : `Disponível para novos projetos em ${currentYear}`}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {isEnglish
                ? "Ready to elevate your digital presence?"
                : "Pronto para transformar a sua presença digital?"}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {isEnglish
                ? "Let's discuss your goals and build a tailored solution."
                : "Vamos conversar sobre os seus objetivos e construir uma solução sob medida."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-semibold text-accent-text shadow-md hover:bg-accent-hover transition-colors duration-200"
            >
              {isEnglish ? "Start a Conversation" : "Iniciar Conversa"}
            </Link>
          </div>
        </div>

        {/* Grelha de Colunas do Rodapé */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-border/60">
          {/* Coluna 1: Marca & Descrição */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-16 items-center justify-center overflow-hidden rounded-xl shadow-sm border border-border/50">
                <Image 
                  src="/logo.jpg" 
                  alt="Logo Mateus Mendes" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              {isEnglish
                ? "Professional web development focused on technical excellence, speed, and real business results."
                : "Desenvolvimento web profissional focado em qualidade técnica, velocidade e geração de resultados para PMEs e profissionais em Portugal."}
            </p>
            <div className="pt-2 text-xs text-text-muted flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lisbon, Portugal
              </span>
              <span>•</span>
              <span>{isEnglish ? "Direct response" : `Resposta em ${SITE_CONFIG.responseTime}`}</span>
            </div>
          </div>

          {/* Coluna 2: Serviços */}
          <div>
            <p className="font-heading text-xs uppercase tracking-wider font-bold text-text-primary mb-4">
              {isEnglish ? "Services" : "Serviços"}
            </p>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="hover:text-accent transition-colors duration-200 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Navegação Principal */}
          <div>
            <p className="font-heading text-xs uppercase tracking-wider font-bold text-text-primary mb-4">
              {isEnglish ? "Navigation" : "Navegação"}
            </p>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors duration-200 inline-block"
                  >
                    {navLabels[item.href] || item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacidade"
                  className="hover:text-accent transition-colors duration-200 inline-block"
                >
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contacto Direto & Redes */}
          <div className="space-y-4">
            <p className="font-heading text-xs uppercase tracking-wider font-bold text-text-primary mb-4">
              {isEnglish ? "Direct Contact" : "Contacto Direto"}
            </p>
            <div className="space-y-2 text-sm text-text-secondary">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block hover:text-accent transition-colors duration-200"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors duration-200"
              >
                {SITE_CONFIG.phone} (WhatsApp)
              </a>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shadow-sm"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shadow-sm"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha Final: Copyright & Detalhes Legais */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-text-muted">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-text-primary transition-colors">
              {t.footer.privacy}
            </Link>
            <span>•</span>
            <span>{isEnglish ? "Built with Next.js & Tailwind CSS" : "Construído com Next.js & Tailwind CSS"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
