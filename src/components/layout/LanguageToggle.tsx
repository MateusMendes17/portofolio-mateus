"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";

/**
 * Switch Toggle de Idioma (PT / EN)
 * Construído com a mesma ergonomia, dimensões (h-9 w-[4.5rem]) e física
 * ultra suave (curva iOS/macOS) do ThemeToggle para ficarem perfeitamente harmoniosos lado a lado.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, toggleLanguage, isEnglish, t } = useLanguage();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-[4.5rem] rounded-full border border-border bg-surface/70",
          className
        )}
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
        "group relative inline-flex h-9 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full p-1",
        "border border-border bg-surface shadow-sm",
        "transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-border-hover",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 select-none",
        className
      )}
      aria-label={
        isEnglish
          ? t.languageToggle.switchToPortuguese
          : t.languageToggle.switchToEnglish
      }
      title={isEnglish ? t.languageToggle.currentEn : t.languageToggle.currentPt}
    >
      {/* Background tracks com os códigos de idioma fixos */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none select-none">
        {/* Label PT no fundo */}
        <span
          className={cn(
            "text-[10px] font-bold tracking-wider transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isEnglish ? "opacity-45 text-text-muted" : "opacity-0"
          )}
        >
          PT
        </span>

        {/* Label EN no fundo */}
        <span
          className={cn(
            "text-[10px] font-bold tracking-wider transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isEnglish ? "opacity-0" : "opacity-45 text-text-muted"
          )}
        >
          EN
        </span>
      </div>

      {/* Thumb deslizante com física suave */}
      <span
        className={cn(
          "pointer-events-none relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-md",
          "will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "bg-accent text-accent-text font-bold text-[11px] tracking-tight shadow-accent/25",
          isEnglish ? "translate-x-8" : "translate-x-0"
        )}
      >
        <span className="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {locale.toUpperCase()}
        </span>
      </span>
    </button>
  );
}
