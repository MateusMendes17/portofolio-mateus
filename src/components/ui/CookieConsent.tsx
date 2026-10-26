"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Cookie Consent Banner — RGPD compliant
 * Categorias: necessary, analytics, marketing
 * Guarda preferências em localStorage
 */
export function CookieConsent() {
  const { t } = useLanguage();

  // Lazy initializers para evitar setState no effect (lint rule react-hooks/set-state-in-effect)
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("cookie-consent");
  });

  const [accepted, setAccepted] = useState<{
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }>(() => {
    if (typeof window === "undefined") {
      return { necessary: true, analytics: false, marketing: false };
    }
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      return { necessary: true, analytics: false, marketing: false };
    }
    try {
      return JSON.parse(consent);
    } catch {
      return { necessary: true, analytics: false, marketing: false };
    }
  });

  // Effect removido — lazy initializers já definem o estado inicial corretamente
// Se houver consentimento no localStorage, show inicia como false; caso contrário, true.

  const acceptAll = () => {
    const consent = { necessary: true, analytics: true, marketing: true };
    setAccepted(consent);
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShow(false);
    // Disparar evento para analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  const acceptNecessary = () => {
    const consent = { necessary: true, analytics: false, marketing: false };
    setAccepted(consent);
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShow(false);
  };

  const saveCustom = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(accepted));
    setShow(false);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: accepted.analytics ? "granted" : "denied",
        ad_storage: accepted.marketing ? "granted" : "denied",
      });
    }
  };

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 animate-slide-up",
        "md:bottom-6 md:right-6 md:left-auto md:w-[420px] md:rounded-2xl md:shadow-xl"
      )}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="rounded-2xl sm:rounded-3xl border border-border bg-surface/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 id="cookie-title" className="font-heading text-lg font-bold text-text-primary">
              {t.cookieConsent?.title || "Gerir Cookies"}
            </h3>
            <p id="cookie-desc" className="mt-1 text-xs text-text-secondary">
              {t.cookieConsent?.description || "Usamos cookies para melhorar a sua experiência, analisar tráfego e personalizar conteúdo."}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-5 border-t border-border pt-4">
          {/* Necessários — sempre ativos */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="cookie-necessary"
                checked={true}
                disabled
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="cookie-necessary" className="text-sm font-medium text-text-primary">
                {t.cookieConsent?.necessary?.title || "Necessários"}
              </label>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {t.cookieConsent?.alwaysActive || "Sempre ativos"}
            </span>
          </div>
          <p className="ml-7 text-[11px] text-text-muted">
            {t.cookieConsent?.necessary?.desc || "Essenciais para o funcionamento do site (segurança, rede, acessibilidade)."}
          </p>

          {/* Analytics */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="cookie-analytics"
                checked={accepted.analytics}
                onChange={(e) => setAccepted({ ...accepted, analytics: e.target.checked })}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="cookie-analytics" className="text-sm font-medium text-text-primary">
                {t.cookieConsent?.analytics?.title || "Analytics"}
              </label>
            </div>
            <span className="text-xs text-text-muted">
              {accepted.analytics ? "Ativo" : "Inativo"}
            </span>
          </div>
          <p className="ml-7 text-[11px] text-text-muted">
            {t.cookieConsent?.analytics?.desc || "Ajuda-nos a entender como os visitantes interagem (Vercel Analytics, Google Analytics)."}
          </p>

          {/* Marketing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="cookie-marketing"
                checked={accepted.marketing}
                onChange={(e) => setAccepted({ ...accepted, marketing: e.target.checked })}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="cookie-marketing" className="text-sm font-medium text-text-primary">
                {t.cookieConsent?.marketing?.title || "Marketing"}
              </label>
            </div>
            <span className="text-xs text-text-muted">
              {accepted.marketing ? "Ativo" : "Inativo"}
            </span>
          </div>
          <p className="ml-7 text-[11px] text-text-muted">
            {t.cookieConsent?.marketing?.desc || "Usado para anúncios personalizados e medição de campanhas (Meta Pixel, Google Ads)."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={acceptNecessary}
            className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-hover transition-colors"
          >
            {t.cookieConsent?.rejectAll || "Apenas Necessários"}
          </button>
          <button
            type="button"
            onClick={saveCustom}
            className="flex-1 rounded-xl border border-accent bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent hover:bg-accent/20 transition-colors"
          >
            {t.cookieConsent?.savePreferences || "Guardar Preferências"}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-text hover:bg-accent-hover transition-colors shadow-sm"
          >
            {t.cookieConsent?.acceptAll || "Aceitar Todos"}
          </button>
        </div>

        <p className="mt-4 text-[10px] text-text-muted text-center">
          {t.cookieConsent?.footer || "Pode alterar as suas preferências a qualquer momento na nossa "}<a href="/privacidade" className="underline hover:text-accent">{t.cookieConsent?.policyLink || "Política de Privacidade"}</a>{t.cookieConsent?.footer2 || "."}
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
      `}</style>
    </div>
  );
}