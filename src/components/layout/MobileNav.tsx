"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "../ui/Button";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "../ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t, isEnglish } = useLanguage();
  const prevPathname = React.useRef(pathname);

  const navLabels: Record<string, string> = {
    "/": t.nav.home,
    "/sobre": t.nav.about,
    "/servicos": t.nav.services,
    "/projetos": t.nav.projects,
    "/contacto": t.nav.contact,
  };

  // Fecha menu apenas quando o utilizador navega para outra página
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop escurecido suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Gaveta do Menu Mobile */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-x-0 top-0 z-50 flex flex-col justify-between rounded-b-3xl border-b border-border/80 bg-surface/95 backdrop-blur-2xl p-6 shadow-2xl md:hidden"
          >
            {/* Topo: Logo & Fechar */}
            <div className="flex items-center justify-between pb-6 border-b border-border/60">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-text font-bold text-sm shadow-sm">
                  M
                </span>
                <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
                  {SITE_CONFIG.name}
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-hover text-text-primary transition-colors hover:text-accent"
                aria-label="Fechar menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links de Navegação com animação escalonada */}
            <nav className="py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200",
                        isActive
                          ? "bg-accent-subtle text-accent"
                          : "text-text-primary hover:bg-surface-hover hover:text-accent"
                      )}
                    >
                      <span>{navLabels[item.href] || item.label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Rodapé do Menu: Idioma, Tema, CTA e Contacto rápido */}
            <div className="pt-6 border-t border-border/60 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">
                  {isEnglish ? "Language" : "Idioma"}
                </span>
                <LanguageToggle />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">
                  {isEnglish ? "Theme" : "Modo de Visualização"}
                </span>
                <ThemeToggle />
              </div>

              <div className="pt-2">
                <Link href="/contacto" onClick={onClose} className="block w-full">
                  <Button variant="primary" size="md" withArrow className="w-full">
                    {t.nav.cta}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 pt-3 text-xs text-text-muted">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
