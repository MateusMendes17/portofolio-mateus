"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Botão flutuante de WhatsApp (apenas mobile).
 *
 * Aparece depois de o visitante passar o hero e esconde-se na página de
 * contacto, onde o formulário já é o caminho principal — o objetivo é
 * apanhar quem prefere mensagem direta a preencher um formulário.
 */
export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = isVisible && pathname !== "/contacto";

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsappFloat.aria}
          className="fixed bottom-6 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-xs font-bold text-surface shadow-lg hover:bg-accent-hover active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:hidden"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
