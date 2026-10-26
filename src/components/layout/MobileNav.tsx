"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { ButtonLink } from "../ui/Button";
import { LinkedInIcon, GitHubIcon, WhatsAppIcon } from "../ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t, isEnglish } = useLanguage();
  const reduceMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const navLabels: Record<string, string> = {
    "/": t.nav.home,
    "/sobre": t.nav.about,
    "/servicos": t.nav.services,
    "/projetos": t.nav.projects,
    "/contacto": t.nav.contact,
  };

  // Fecha o menu quando a rota muda depois de uma navegação.
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const duration = reduceMotion ? 0 : 0.22;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mainAria}
          initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-[var(--gutter)]">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3"
              aria-label={t.nav.homeAria}
            >
              <span className="relative block h-9 w-9 overflow-hidden border border-line-strong bg-surface">
                <Image
                  src="/logo.jpg"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="font-heading text-[15px] font-semibold tracking-[-0.02em] text-ink">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-line bg-surface text-ink transition-colors duration-200 hover:border-line-strong"
              aria-label={t.nav.closeMenu}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label={t.nav.mainAria}
            className="flex-1 overflow-y-auto px-[var(--gutter)] py-4"
          >
            {NAV_ITEMS.map((item, index) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-body text-micro tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        active
                          ? "font-heading text-[clamp(1.75rem,7vw,2.5rem)] font-semibold tracking-[-0.04em] text-ink"
                          : "font-heading text-[clamp(1.75rem,7vw,2.5rem)] font-semibold tracking-[-0.04em] text-ink-2 transition-colors group-hover:text-ink"
                      }
                    >
                      {navLabels[item.href] || item.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={
                      active
                        ? "mb-1 h-2 w-2 shrink-0 bg-highlight ring-1 ring-ink/20"
                        : "mb-1 h-2 w-2 shrink-0 border border-line-strong"
                    }
                  />
                </Link>
              );
            })}

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-body text-label uppercase tracking-[0.12em] text-muted">
                  {t.mobileNav.language}
                </span>
                <LanguageToggle />
              </div>

              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-body text-label uppercase tracking-[0.12em] text-muted">
                  {t.mobileNav.theme}
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>

          <div className="shrink-0 space-y-5 border-t border-line px-[var(--gutter)] pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
            <ButtonLink
              href="/contacto"
              onClick={onClose}
              size="lg"
              withArrow
              className="w-full"
            >
              {t.nav.cta}
            </ButtonLink>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-micro text-muted">
              <a
                href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
