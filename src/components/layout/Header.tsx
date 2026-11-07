"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_LABEL_KEYS, SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { BrandLockup } from "../ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Navbar no tema da home: hairline de tinta, links em pílula (hover
 * chartreuse, ativo invertido) e CTA chartreuse com seta que roda.
 */
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
      <header className="sticky top-0 z-40 w-full select-none border-b-[1.5px] border-ink bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
        <div className="flex h-16 items-center justify-between gap-4 px-[var(--gutter)]">
          <Link
            href="/"
            className="group -ml-1 flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            aria-label={t.nav.homeAria}
          >
            <BrandLockup name={SITE_CONFIG.name} compactOnTablet />
          </Link>

          <nav
            aria-label={t.nav.mainAria}
            className="hidden items-center gap-1 rounded-full border-[1.5px] border-ink bg-surface/70 p-1 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-pill relative rounded-full px-3 py-1.5 lg:px-4 font-body text-[13px] font-semibold no-underline",
                    active ? "bg-ink text-bg" : "text-ink hover:bg-highlight hover:text-accent-ink"
                  )}
                >
                  {getNavLabel(item.href)}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <CommandPalette />

            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              href="/contacto"
              data-magnetic
              className="nav-cta ml-1 inline-flex h-10 items-center gap-2 rounded-full border-[1.5px] border-accent-ink bg-highlight px-5 text-sm font-semibold text-accent-ink no-underline max-lg:hidden focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--focus)]"
            >
              {t.nav.cta}
              <span className="nav-cta-arrow inline-block" aria-hidden="true">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={handleOpenMobileMenu}
              className="ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink bg-surface text-ink transition-colors duration-200 hover:bg-highlight hover:text-accent-ink md:hidden"
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
