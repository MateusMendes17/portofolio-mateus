"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_LABEL_KEYS, SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { ButtonLink } from "../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLabel = (href: string) =>
    t.nav[NAV_LABEL_KEYS[href] as keyof typeof t.nav] || href;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const handleOpenMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full select-none border-b border-line bg-bg/92 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group -ml-1 flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            aria-label={t.nav.homeAria}
          >
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden border border-line-strong bg-surface">
              <Image
                src="/logo.jpg"
                alt=""
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-heading text-[15px] font-semibold tracking-[-0.02em] text-ink">
                {SITE_CONFIG.name}
              </span>
              <span className="mt-1 hidden font-body text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
                {t.nav.tagline}
              </span>
            </span>
          </Link>

          <nav
            aria-label={t.nav.mainAria}
            className="hidden items-center gap-0.5 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 font-body text-[13px] font-medium transition-colors duration-200",
                    active ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {getNavLabel(item.href)}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-0.5 h-px bg-ink transition-opacity duration-200",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <CommandPalette />

            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <ButtonLink
              href="/contacto"
              size="sm"
              withArrow
              className="ml-1 max-lg:hidden"
            >
              {t.nav.cta}
            </ButtonLink>

            <button
              type="button"
              onClick={handleOpenMobileMenu}
              className="ml-0.5 flex h-10 w-10 items-center justify-center border border-line bg-surface text-ink transition-colors duration-200 hover:border-line-strong md:hidden"
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
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
                  d="M3.75 7h16.5M3.75 12h16.5M3.75 17h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
