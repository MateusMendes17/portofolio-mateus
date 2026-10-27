"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import type { CalEvent } from "@/lib/constants";

const NAMESPACE = "chamada";

/** Cores do site (src/app/globals.css) aplicadas ao calendário do Cal.com. */
const CAL_VARS = {
  light: {
    "cal-brand": "#d7ff3f",
    "cal-brand-emphasis": "#c4ed2a",
    "cal-brand-text": "#0b0b0c",
    "cal-bg": "#fbfaf5",
    "cal-bg-emphasis": "#f2f0e7",
    "cal-bg-subtle": "#f4f2ea",
    "cal-bg-muted": "#f4f2ea",
    "cal-text": "#0b0b0c",
    "cal-text-emphasis": "#0b0b0c",
    "cal-text-muted": "#64645e",
    "cal-border": "#d9d6cb",
    "cal-border-emphasis": "#7e7a6f",
  },
  dark: {
    "cal-brand": "#d7ff3f",
    "cal-brand-emphasis": "#e4ff6b",
    "cal-brand-text": "#0b0b0c",
    "cal-bg": "#141416",
    "cal-bg-emphasis": "#1a1a1d",
    "cal-bg-subtle": "#0b0b0c",
    "cal-bg-muted": "#0b0b0c",
    "cal-text": "#f1efe6",
    "cal-text-emphasis": "#f1efe6",
    "cal-text-muted": "#a3a099",
    "cal-border": "#2a2a2d",
    "cal-border-emphasis": "#6a6a70",
  },
} as const;

/** "https://cal.com/utilizador/15min" -> { origin: "https://cal.com", link: "utilizador/15min" } */
function splitCalUrl(url: string): { origin: string; link: string } | null {
  try {
    const parsed = new URL(url);
    const link = parsed.pathname.replace(/^\/+|\/+$/g, "");
    return link ? { origin: parsed.origin, link } : null;
  } catch {
    return null;
  }
}

/**
 * Calendário do Cal.com embebido na página de contacto. Só é montado quando o
 * separador "Marcar chamada" é aberto, por isso nada é carregado do Cal.com antes.
 */
export function CallScheduler({ event }: { event: CalEvent }) {
  const { isEnglish } = useLanguage();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const calUrl = event.url;
  const target = useMemo(() => splitCalUrl(calUrl), [calUrl]);

  useEffect(() => {
    let cancelled = false;
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      if (cancelled) return;
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: CAL_VARS,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  if (!target) return null;

  return (
    <div>
      <div className="min-h-[560px]">
        <Cal
          key={`${theme}-${event.minutes}`}
          namespace={NAMESPACE}
          calLink={target.link}
          calOrigin={target.origin}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{ layout: "month_view", theme }}
        />
      </div>
      <p className="mt-4 border-t border-line pt-3 font-body text-micro leading-relaxed text-muted">
        {isEnglish
          ? "The calendar is provided by Cal.com, an external service. Prefer not to use it? "
          : "O calendário é fornecido pelo Cal.com, um serviço externo. Prefere não o usar? "}
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
        >
          {isEnglish ? "Open it in a new tab" : "Abrir num novo separador"} ↗
        </a>
      </p>
    </div>
  );
}
