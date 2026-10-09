"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provedor de temas usando next-themes.
 * Mantém transições ativas para que o switch toggle anime com suavidade absoluta.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {/*
        `reducedMotion="user"`: o framer-motion passa a respeitar
        `prefers-reduced-motion` do sistema em TODAS as animações da app
        (entradas, transições, scroll) sem ter de verificar em cada componente.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
