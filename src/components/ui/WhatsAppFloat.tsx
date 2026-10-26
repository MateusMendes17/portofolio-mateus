"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Atalho de WhatsApp no mobile. Ícone compacto para não tapar conteúdo;
 * aparece depois do hero e desaparece na página de contacto, onde o
 * formulário é o caminho principal.
 */
export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [hideForContact, setHideForContact] = useState(false);
  const pathname = usePathname();
  const { isEnglish, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 320;

      setIsVisible(
        window.scrollY > window.innerHeight * 0.9 && !nearBottom
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Não tapa o CTA final nem a zona de contacto do footer. */
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-whatsapp]");
    if (targets.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        setHideForContact(intersecting.size > 0);
      },
      { threshold: 0.01 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  const show =
    isVisible && !hideForContact && pathname !== "/contacto";
  const whatsappUrl = getWhatsAppUrl(pathname, isEnglish ? "en" : "pt");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat.aria}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={cn(
        "fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-40 flex h-12 w-12 items-center justify-center md:hidden",
        "border border-ink bg-ink text-bg shadow-sm",
        "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}
