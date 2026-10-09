"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "contact";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

/**
 * Componente Button reconstruído com precisão:
 * - "contact": Efeito onde a linha luminosa da borda segue a posição do cursor (mouse spotlight)
 *              na cor terracota da paleta (--color-accent), sem girar sozinha.
 * - "primary": Simples, moderno e impactante — terracota acetinado com elevação sutil e clique tátil.
 * - "secondary": Superfície limpa com borda refinada e reação suave ao hover.
 * - "outline": Minimalista com borda elegante e preenchimento sutil.
 * - "ghost": Discreto para ações complementares.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      withArrow = false,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    // Escala de tamanhos ergonómica
    const sizeClasses = {
      sm: "h-9 px-4 text-xs gap-2",
      md: "h-11 px-6 text-sm gap-2.5",
      lg: "h-13 px-8 text-base gap-3",
    }[size];

    // =========================================================================
    // VARIANTE ESPECIAL: "contact"
    // A linha luminosa da borda segue o cursor (não anda sozinha) com a cor da paleta
    // =========================================================================
    if (variant === "contact") {
      const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        if (onMouseMove) {
          onMouseMove(e);
        }
      };

      const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseLeave) {
          onMouseLeave(e);
        }
      };

      return (
        <button
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "group relative inline-flex items-center justify-center rounded-full p-[2px] font-semibold select-none",
            "transition-all duration-300 ease-out active:scale-[0.98] hover:scale-[1.02]",
            "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
            className
          )}
          {...props}
        >
          {/* Borda base elegante que define o contorno da pílula */}
          <span
            className="absolute inset-0 rounded-full border border-border/80 pointer-events-none transition-colors duration-300 group-hover:border-border"
            aria-hidden="true"
          />

          {/* Linha luminosa na borda que segue o cursor do rato (na cor da paleta) */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(110px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), var(--color-accent) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Halo difuso exterior (Glow) que acompanha o rato na cor da paleta */}
          <span
            className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(90px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), var(--color-accent) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Fundo interior que respeita a paleta (Superfície limpa) e conteúdo */}
          <span
            className={cn(
              "relative z-10 flex h-full w-full items-center justify-center rounded-full font-medium tracking-wide",
              "bg-surface text-text-primary",
              "transition-colors duration-300 group-hover:bg-surface-hover",
              sizeClasses
            )}
          >
            <span>{children}</span>

            {withArrow && (
              <svg
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            )}
          </span>
        </button>
      );
    }

    // =========================================================================
    // VARIANTES PADRÃO: "primary", "secondary", "outline", "ghost"
    // =========================================================================
    const baseClasses = cn(
      "group relative inline-flex items-center justify-center rounded-full font-semibold select-none",
      "transition-all duration-200 ease-out",
      "active:scale-[0.98] active:translate-y-0",
      "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
      sizeClasses
    );

    const variantClasses = {
      // Primary: Visual limpo e atraente com tom terracota, leve elevação e sombra colorida difusa
      primary: cn(
        "bg-accent text-accent-text",
        "shadow-[0_4px_14px_-2px_rgba(158,103,71,0.35)] dark:shadow-[0_4px_16px_-2px_rgba(201,142,108,0.25)]",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-4px_rgba(158,103,71,0.5)] dark:hover:shadow-[0_8px_22px_-4px_rgba(201,142,108,0.4)]",
        "hover:brightness-[1.03]"
      ),

      // Secondary: Superfície limpa, com borda acetinada que no hover ganha destaque suave
      secondary: cn(
        "bg-surface text-text-primary border border-border",
        "shadow-sm",
        "hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-hover hover:shadow-md"
      ),

      // Outline: Transparente com borda nítida de precisão
      outline: cn(
        "bg-transparent text-text-primary border border-border-hover",
        "hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:bg-accent/5 hover:shadow-sm"
      ),

      // Ghost: Minimalista e discreto
      ghost: cn(
        "bg-transparent text-text-primary",
        "hover:text-accent hover:bg-accent/10"
      ),
    }[variant];

    return (
      <button ref={ref} className={cn(baseClasses, variantClasses, className)} {...props}>
        <span>{children}</span>

        {withArrow && (
          <svg
            className={cn(
              "w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1",
              variant === "primary" ? "text-accent-text/90" : "text-accent"
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
