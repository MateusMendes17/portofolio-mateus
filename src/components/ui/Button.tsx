"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "contact";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

/**
 * Botão base do sistema.
 *
 * - primary/contact: preenchimento chartreuse, tinta escura e hairline de
 *   tinta no tema claro (transparente no escuro).
 * - secondary: superfície + hairline.
 * - outline: hairline forte, sem preenchimento.
 * - ghost: sem moldura.
 *
 * O foco é sempre visível e usa o token --focus, que passa a --code-focus
 * dentro de superfícies escuras.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      withArrow = false,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 gap-2 px-4 text-xs",
      md: "h-11 gap-2.5 px-6 text-sm",
      lg: "h-13 gap-3 px-8 text-base",
    }[size];

    const baseClasses = cn(
      "group relative inline-flex select-none items-center justify-center rounded-md font-semibold",
      "transition-[background-color,border-color,color,transform] duration-[var(--duration-160)] ease-[var(--ease-out)]",
      "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--focus)]",
      sizeClasses
    );

    const variantClasses = {
      primary:
        "border border-[var(--accent-button-border)] bg-highlight text-accent-ink hover:bg-highlight-hover",
      contact:
        "border border-[var(--accent-button-border)] bg-highlight text-accent-ink hover:bg-highlight-hover",
      secondary:
        "border border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-hover",
      outline:
        "border border-line-strong bg-transparent text-ink hover:bg-surface-2",
      ghost:
        "border border-transparent bg-transparent text-ink-2 hover:bg-surface-2 hover:text-ink",
    }[variant];

    return (
      <button ref={ref} className={cn(baseClasses, variantClasses, className)} {...props}>
        <span>{children}</span>

        {withArrow && (
          <svg
            className="h-4 w-4 transition-transform duration-[var(--duration-160)] ease-[var(--ease-out)] group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.25}
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
