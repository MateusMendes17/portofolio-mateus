"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";

/**
 * Alternador PT / EN. O estado ativo usa a tinta do tema, não o chartreuse,
 * para manter a cor de destaque reservada a ações e estados pontuais.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { toggleLanguage, isEnglish, t } = useLanguage();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={cn("h-10 w-[76px] rounded-full border-[1.5px] border-ink bg-surface", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEnglish}
      onClick={toggleLanguage}
      className={cn(
        "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full border-[1.5px] border-ink bg-surface p-[3px]",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
        className
      )}
      aria-label={
        isEnglish
          ? t.languageToggle.switchToPortuguese
          : t.languageToggle.switchToEnglish
      }
      title={isEnglish ? t.languageToggle.currentEn : t.languageToggle.currentPt}
    >
      <span
        className={cn(
          "flex h-full items-center rounded-full px-2.5 font-mono text-[11px] font-semibold transition-colors duration-300",
          isEnglish ? "text-muted" : "bg-highlight text-accent-ink"
        )}
      >
        PT
      </span>
      <span
        className={cn(
          "flex h-full items-center rounded-full px-2.5 font-mono text-[11px] font-semibold transition-colors duration-300",
          isEnglish ? "bg-highlight text-accent-ink" : "text-muted"
        )}
      >
        EN
      </span>
    </button>
  );
}
