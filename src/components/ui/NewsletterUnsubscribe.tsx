"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/lib/constants";

type Status = "idle" | "loading" | "done" | "error";

/** Confirmação de cancelamento: só age quando a pessoa clica (evita cancelamentos por pré-visualização de links). */
export function NewsletterUnsubscribe() {
  const { isEnglish } = useLanguage();
  const params = useSearchParams();
  const email = params.get("e") ?? "";
  const token = params.get("t") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function confirm() {
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(data.error ?? null);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const missing = !email || !token;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      <div className="border border-line bg-surface p-6 sm:p-8">
        <p className="font-body text-label uppercase tracking-[0.14em] text-muted">Newsletter</p>

        {status === "done" ? (
          <>
            <h1 className="mt-2 font-heading text-h3 font-semibold text-ink">
              {isEnglish ? "Subscription cancelled" : "Subscrição cancelada"}
            </h1>
            <p className="mt-3 font-body text-sm text-ink-2" role="status">
              {isEnglish
                ? "Done. You will not receive more newsletter emails. You keep the checklist you already downloaded."
                : "Feito. Não vai receber mais emails da newsletter. Pode continuar a usar o checklist que já descarregou."}
            </p>
          </>
        ) : missing ? (
          <>
            <h1 className="mt-2 font-heading text-h3 font-semibold text-ink">
              {isEnglish ? "This link is incomplete" : "Esta ligação está incompleta"}
            </h1>
            <p className="mt-3 font-body text-sm text-ink-2">
              {isEnglish
                ? "Open the cancellation link from the newsletter email, or write to "
                : "Abra a ligação de cancelamento do email da newsletter, ou escreva para "}
              <a className="text-ink underline" href={`mailto:${SITE_CONFIG.email}?subject=Cancelar%20newsletter`}>
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-2 font-heading text-h3 font-semibold text-ink">
              {isEnglish ? "Cancel your subscription?" : "Cancelar a subscrição?"}
            </h1>
            <p className="mt-3 font-body text-sm text-ink-2">
              {isEnglish ? "Stop sending newsletter emails to " : "Deixar de enviar emails da newsletter para "}
              <strong className="break-all text-ink">{email}</strong>.
            </p>
            <button
              type="button"
              onClick={confirm}
              disabled={status === "loading"}
              className="mt-6 border border-ink bg-highlight px-6 py-3 font-body text-label font-semibold text-accent-ink transition-colors hover:bg-highlight-hover disabled:opacity-60"
            >
              {status === "loading"
                ? isEnglish
                  ? "Cancelling…"
                  : "A cancelar…"
                : isEnglish
                  ? "Yes, cancel"
                  : "Sim, cancelar"}
            </button>
            {status === "error" && (
              <p className="mt-4 font-body text-sm text-destructive" role="alert">
                {message ??
                  (isEnglish
                    ? "Something went wrong. Please try again or reply to the newsletter email."
                    : "Algo correu mal. Tente novamente ou responda ao email da newsletter.")}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
