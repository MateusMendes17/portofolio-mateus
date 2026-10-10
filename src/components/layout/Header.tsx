"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { Button } from "../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const navLabels: Record<string, string> = {
    "/": t.nav.home,
    "/sobre": t.nav.about,
    "/servicos": t.nav.services,
    "/projetos": t.nav.projects,
    "/contacto": t.nav.contact,
  };

  const handleOpenMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Efeito de elevação suave ao fazer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 select-none",
          isScrolled
            ? "border-b border-border/80 bg-bg/85 backdrop-blur-xl shadow-sm py-3"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Marca Mateus Mendes */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-200 active:scale-95"
            aria-label="Página inicial — Mateus Mendes"
          >
            <div className="relative flex h-10 w-16 items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 rounded-xl shadow-sm border border-border/50">
              <Image 
                src="/logo.jpg" 
                alt="Logo Mateus Mendes" 
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent leading-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-xs font-medium text-text-muted tracking-wide">
                {t.nav.tagline}
              </span>
            </div>
          </Link>

          {/* Links de Navegação (Desktop) */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-surface/75 backdrop-blur-lg px-3 py-1.5 shadow-sm"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const label = navLabels[item.href] || item.label;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                    isActive
                      ? "text-accent-text bg-accent shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Ações da Direita: Pesquisa + Idioma + Tema + Botão CTA + Menu Mobile */}
          <div className="flex items-center gap-3">
            {/* Command Palette (⌘K / Ctrl+K) */}
            <CommandPalette />

            {/* Switch Toggle Idioma (PT / EN) */}
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* Switch Toggle Dia / Noite */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Botão de Contacto */}
            <Link href="/contacto" className="hidden lg:inline-flex">
              <Button variant="primary" size="sm" withArrow>
                {t.nav.cta}
              </Button>
            </Link>

            {/* Gatilho Hamburger do Menu Mobile */}
            <button
              type="button"
              onClick={handleOpenMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-text-primary transition-colors hover:border-accent hover:text-accent md:hidden shadow-sm active:scale-95"
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Barra de progresso de leitura (colada à base do header) */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
        />
      </header>

      {/* Gaveta do Menu Mobile */}
      <MobileNav isOpen={mobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
