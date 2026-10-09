"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";

/**
 * Switch Toggle Dia/Noite com animação ultra suave (curva iOS/macOS).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
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

  const isDark = resolvedTheme === "dark";

  function toggleTheme(): void {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex h-9 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full p-1",
        "border border-border bg-surface shadow-sm",
        "transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-border-hover",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
      aria-label={isDark ? "Mudar para tema de dia" : "Mudar para tema de noite"}
    >
      {/* Background tracks com pequenos ícones fixos sutis para referência */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none select-none">
        {/* Sol fixo */}
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark ? "opacity-35 text-text-muted" : "opacity-0"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>

        {/* Lua fixa */}
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark ? "opacity-0" : "opacity-35 text-text-muted"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </div>

      {/* Thumb deslizante com física suave */}
      <span
        className={cn(
          "pointer-events-none relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-md",
          "will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? "translate-x-8 bg-surface border border-border text-accent shadow-black/30"
            : "translate-x-0 bg-accent text-accent-text shadow-accent/25"
        )}
      >
        {/* Ícone Sol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Ícone Lua */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
