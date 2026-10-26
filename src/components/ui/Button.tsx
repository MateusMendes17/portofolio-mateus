"use client";

import React, { forwardRef } from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "contact";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
}

const BASE_CLASSES = cn(
  "group relative inline-flex select-none items-center justify-center rounded-md font-semibold",
  "transition-[background-color,border-color,color,transform] duration-[var(--duration-160)] ease-[var(--ease-out)]",
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--focus)]"
);

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-xs",
  md: "h-11 gap-2.5 px-6 text-sm",
  lg: "h-13 gap-3 px-8 text-base",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
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
};

function ArrowIcon() {
  return (
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
  );
}

function classesFor({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return cn(BASE_CLASSES, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className);
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
    return (
      <button
        ref={ref}
        className={classesFor({ variant, size, className })}
        {...props}
      >
        <span>{children}</span>
        {withArrow && <ArrowIcon />}
      </button>
    );
  }
);

Button.displayName = "Button";

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  children: React.ReactNode;
}

/**
 * Link com a mesma linguagem visual do Button. Evita aninhar um <button>
 * dentro de um <a>, que é HTML inválido e prejudica a navegação por teclado.
 */
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={classesFor({ variant, size, className })} {...props}>
      <span>{children}</span>
      {withArrow && <ArrowIcon />}
    </Link>
  );
}
