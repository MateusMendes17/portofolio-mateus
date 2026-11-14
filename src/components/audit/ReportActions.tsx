"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { AuditResult } from "@/lib/audit/types";

type Status = "idle" | "loading" | "sent" | "forwarded" | "error";

/** Relatório em PDF: descarregar de imediato ou receber por email (com consentimento). */
export function ReportActions({ result }: { result: AuditResult }) {
  const { isEnglish } = useLanguage();
  const locale = isEnglish ? "en" : "pt";
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function post(payload: Record<string, unknown>) {
    return fetch("/api/audit/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result, locale, ...payload }),
    });
  }

  async function errorText(res: Response) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return data.error ?? (isEnglish ? "Something went wrong. Please try again." : "Algo correu mal. Tente novamente.");
  }

  /** Descarrega o PDF; devolve false se falhar. */
  async function savePdf(): Promise<boolean> {
    const res = await post({ delivery: "download" });
    if (!res.ok) {
      setMessage(await errorText(res));
      return false;
    }
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio-avaliador.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 10_000);
    return true;
  }

  async function download() {
    setStatus("loading");
    setMessage(null);
    try {
      setStatus((await savePdf()) ? "idle" : "error");
    } catch {
      setStatus("error");
      setMessage(isEnglish ? "Something went wrong. Please try again." : "Algo correu mal. Tente novamente.");
    }
  }

  async function sendEmail(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !consent) {
      setStatus("error");
      setMessage(isEnglish ? "Enter your email and tick the authorisation." : "Indique o email e autorize o envio.");
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const res = await post({ delivery: "email", email: email.trim(), consent, honeypot });
      const data = (await res.clone().json().catch(() => ({}))) as { emailed?: boolean };
      if (res.ok && data.emailed !== false) {
        setStatus("sent");
        return;
      }
      // O email não seguiu: o visitante fica já com o PDF, nunca com um beco sem saída.
      const saved = await savePdf().catch(() => false);
      if (res.ok) {
        setStatus("forwarded");
      } else if (saved) {
        setStatus("error");
        setMessage(
          isEnglish
            ? "We couldn't email it, so the PDF has been downloaded to your device instead."
            : "Não foi possível enviar por email, por isso o PDF foi descarregado para o seu dispositivo."
        );
      } else {
        setStatus("error");
        setMessage(await errorText(res));
      }
    } catch {
      setStatus("error");
      setMessage(isEnglish ? "Something went wrong. Please try again." : "Algo correu mal. Tente novamente.");
    }
  }

  const busy = status === "loading";

  return (
    <div className="mt-6 border-b border-line pb-6" data-hide-print>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={download}
          disabled={busy}
          className="border border-line-strong bg-highlight px-4 py-2 font-body text-label font-semibold text-accent-ink transition-colors hover:bg-highlight-hover disabled:opacity-60"
        >
          {busy && !showEmail ? (isEnglish ? "Generating…" : "A gerar…") : isEnglish ? "Download PDF report" : "Descarregar relatório PDF"}
        </button>
        <button
          type="button"
          onClick={() => setShowEmail((v) => !v)}
          aria-expanded={showEmail}
          className="font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {isEnglish ? "Send it to my email" : "Enviar para o meu email"}
        </button>
      </div>

      {showEmail && status !== "sent" && status !== "forwarded" && (
        <form onSubmit={sendEmail} className="mt-4 max-w-[34rem] space-y-3">
          <label className="block font-body text-micro uppercase tracking-[0.12em] text-muted" htmlFor="report-email">
            Email
          </label>
          <input
            id="report-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line-strong bg-surface px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-ink"
          />
          {/* Honeypot: invisível para pessoas, preenchido por bots. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            name="website"
          />
          <label className="flex items-start gap-2 font-body text-xs text-ink-2">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>
              {isEnglish
                ? "I authorise Mateus Mendes to email me this report and to contact me about it. My email is not used for anything else."
                : "Autorizo o Mateus Mendes a enviar-me este relatório por email e a contactar-me sobre ele. O meu email não é usado para mais nada."}
            </span>
          </label>
          <button
            type="submit"
            disabled={busy}
            className="border border-line-strong px-4 py-2 font-body text-label font-semibold text-ink transition-colors hover:bg-surface-2 disabled:opacity-60"
          >
            {busy ? (isEnglish ? "Sending…" : "A enviar…") : isEnglish ? "Send report" : "Enviar relatório"}
          </button>
        </form>
      )}

      <p className="mt-3 font-body text-sm text-ink-2" role="status" aria-live="polite">
        {status === "sent" &&
          (isEnglish ? "Done. Check your inbox (and spam folder)." : "Enviado. Verifique a caixa de entrada (e o spam).")}
        {status === "forwarded" &&
          (isEnglish
            ? "The PDF has been downloaded to your device. Mateus has received your request and will reply by email within 24 hours."
            : "O PDF foi descarregado para o seu dispositivo. O Mateus recebeu o seu pedido e vai responder-lhe por email em menos de 24 horas.")}
        {status === "error" && message && <span className="text-red-600 dark:text-red-400">{message}</span>}
      </p>
    </div>
  );
}
