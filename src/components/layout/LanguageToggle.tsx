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
        className={cn("h-9 w-16 border border-line bg-surface", className)}
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
        "inline-flex h-9 shrink-0 cursor-pointer items-center border border-line bg-surface p-0.5",
        "transition-colors duration-200 hover:border-line-strong",
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
          "flex h-7 items-center px-2.5 font-body text-[10px] font-semibold tracking-[0.12em] transition-colors duration-200",
          isEnglish ? "text-muted" : "bg-ink text-bg"
        )}
      >
        PT
      </span>
      <span
        className={cn(
          "flex h-7 items-center px-2.5 font-body text-[10px] font-semibold tracking-[0.12em] transition-colors duration-200",
          isEnglish ? "bg-ink text-bg" : "text-muted"
        )}
      >
        EN
      </span>
    </button>
  );
}
