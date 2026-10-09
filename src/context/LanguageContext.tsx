"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import pt, { type Strings } from "@/content/strings/pt";
import en from "@/content/strings/en";

export type Locale = "pt" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
  t: Strings;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "portfolio_language";

/* ------------------------------------------------------------------ */
/* Store externo da locale                                             */
/*                                                                     */
/* A locale vive no localStorage (externo ao React), por isso usamos    */
/* `useSyncExternalStore` em vez de `useState` + leitura no efeito:     */
/* - `getServerSnapshot` devolve "pt" → o HTML do servidor bate certo; */
/* - depois da hidratação React re-lê o valor real guardado;           */
/* - escrever em localStorage não conta como `setState` num efeito.     */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved === "en" ? "en" : "pt";
  } catch {
    // localStorage indisponível (modo privado / cookies bloqueados)
    return "pt";
  }
}

const getServerSnapshot = (): Locale => "pt";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readStoredLocale, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, newLocale);
    } catch {
      // Sem armazenamento persistente — a locale fica só em memória.
    }
    emitChange();
  }, []);

  const toggleLanguage = useCallback(() => {
    setLocale(locale === "pt" ? "en" : "pt");
  }, [locale, setLocale]);

  // Só toca no DOM (sem setState), pelo que é seguro dentro de um efeito.
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-PT" : "en";
  }, [locale]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    toggleLanguage,
    t: locale === "en" ? en : pt,
    isEnglish: locale === "en",
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
