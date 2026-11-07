"use client";

import { useState, useRef, useId, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { ReportActions } from "@/components/audit/ReportActions";
import { LossCalculator } from "@/components/audit/LossCalculator";
import { CompareResults } from "@/components/audit/CompareResults";
import { streamAudit } from "@/components/audit/streamAudit";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE_CONFIG, SITE_URL } from "@/lib/constants";
import type { AuditResult } from "@/lib/audit/types";
import type { Strings } from "@/content/strings/pt";

type ProgressItem = { step: string; message: string; done: boolean };

function resolveKey(keyPath: string | undefined, t: Strings): string | undefined {
  if (!keyPath) return undefined;
  const parts = keyPath.split(".");
  let curr: unknown = t;
  for (const p of parts) {
    if (curr && typeof curr === "object") {
      curr = (curr as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof curr === "string" ? curr : undefined;
}

/** Teto da barra (%) enquanto cada passo do servidor decorre; "done" e "cache" fecham a 100. */
const STEP_TARGET: Record<string, number> = { fetch: 30, checks: 50, pagespeed: 92, done: 100, cache: 100 };

function getScoreRating(score: number, isEn: boolean) {
  if (score >= 90) return { label: isEn ? "Excellent" : "Excelente", color: "text-emerald-600 dark:text-emerald-400" };
  if (score >= 75) return { label: isEn ? "Good" : "Bom", color: "text-ink dark:text-accent" };
  if (score >= 50) return { label: isEn ? "Needs work" : "A melhorar", color: "text-amber-600 dark:text-amber-400" };
  return { label: isEn ? "Critical" : "Crítico", color: "text-red-600 dark:text-red-400" };
}

/** Último relatório guardado no browser (só este dispositivo; nada vai para o servidor). */
const LAST_KEY = "audit-last";
type SavedReport = { result: AuditResult; savedAt: string };

function readSaved(): SavedReport | null {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as SavedReport) : null;
  } catch {
    return null;
  }
}

/** Valores iniciais vindos do URL (?url=, ?modo=comparar, ?vs=), lidos no servidor para a página sair completa no HTML. */
export function AvaliadorView({
  initialUrl = "",
  initialCompare = false,
  initialUrlB = "",
  initialAuto = false,
}: {
  initialUrl?: string;
  initialCompare?: boolean;
  initialUrlB?: string;
  initialAuto?: boolean;
}) {
  const { t, isEnglish } = useLanguage();
  // Pré-preenchido pelo formulário da home (/avaliador?url=...).
  const [url, setUrl] = useState(initialUrl.slice(0, 2048));
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [percent, setPercent] = useState(0);
  // Modo comparação (?modo=comparar ou ?vs=...): analisa dois sites em sequência.
  const [compareMode, setCompareMode] = useState(initialCompare);
  const [urlB, setUrlB] = useState(initialUrlB.slice(0, 2048));
  const [resultB, setResultB] = useState<AuditResult | null>(null);
  const [phase, setPhase] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [saved, setSaved] = useState<SavedReport | null>(null);
  const [copied, setCopied] = useState(false);

  // Ao abrir: corre logo a análise de um link partilhado, ou oferece o último relatório.
  useEffect(() => {
    if (initialAuto && initialUrl) {
      formRef.current?.requestSubmit();
      return;
    }
    if (!initialUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(readSaved());
    }
  }, [initialAuto, initialUrl]);

  function showSaved() {
    if (!saved) return;
    setResult(saved.result);
    setUrl(saved.result.url);
    setSaved(null);
  }

  async function copyShareLink() {
    if (!result) return;
    const link = `${window.location.origin}/avaliador?url=${encodeURIComponent(result.url)}&analisar=1`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt(isEnglish ? "Copy this link:" : "Copie este link:", link);
    }
  }

  // A barra aproxima-se suavemente do teto do passo atual (o PageSpeed demora 20–40 s).
  const currentStep = progress[progress.length - 1]?.step;
  useEffect(() => {
    if (!loading) return;
    const base = STEP_TARGET[currentStep ?? "fetch"] ?? 30;
    const target = compareMode ? phase * 50 + base * 0.5 : base;
    const timer = setInterval(() => {
      setPercent((prev) => (prev >= target ? prev : Math.min(target, prev + Math.max(0.15, (target - prev) * 0.05))));
    }, 300);
    return () => clearInterval(timer);
  }, [loading, currentStep, compareMode, phase]);

  // Form de contacto pós-auditoria (Fase 8)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);


  const consentId = useId();
  const a = t.audit;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanUrl = url.trim();
    const cleanUrlB = urlB.trim();
    if (!cleanUrl || (compareMode && !cleanUrlB)) {
      setError(a.form.empty);
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setResultB(null);
    setProgress([]);
    setPercent(0);
    setPhase(0);
    setContactSuccess(false);
    setContactError(null);

    const onStep = (p: { step: string; message: string; done: boolean }) =>
      setProgress((prev) => [...prev.filter((x) => x.step !== p.step), p]);

    const fail = (outcome: { error: string | null; status?: number }) => {
      if (outcome.status === 429) setError(a.errors.rateLimit);
      else setError(outcome.error ?? a.errors.generic);
    };

    try {
      const first = await streamAudit(cleanUrl, onStep);
      if (!first.ok) return fail(first);

      if (compareMode) {
        setPhase(1);
        setProgress([]);
        const second = await streamAudit(cleanUrlB, onStep);
        if (!second.ok) return fail(second);
        setResultB(second.result);
      }

      setResult(first.result);
      setSaved(null);
      if (!compareMode) {
        try {
          localStorage.setItem(LAST_KEY, JSON.stringify({ result: first.result, savedAt: new Date().toISOString() }));
        } catch {}
      }
      // Expande os primeiros 3 itens por defeito
      const initialExpanded: Record<string, boolean> = {};
      first.result.improvements.slice(0, 3).forEach((imp) => {
        initialExpanded[imp.id] = true;
      });
      setExpanded(initialExpanded);
    } catch {
      setError(a.errors.generic);
    } finally {
      setLoading(false);
    }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    if (!result) return;
    const all: Record<string, boolean> = {};
    result.improvements.forEach((imp) => {
      all[imp.id] = true;
    });
    setExpanded(all);
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;

    if (!consent) {
      setContactError(a.cta.requiredFields);
      return;
    }

    if (!contactName.trim() || !contactEmail.trim()) {
      setContactError(a.cta.requiredFields);
      return;
    }

    setContactSending(true);
    setContactError(null);

    const topImprovements = result.improvements
      .slice(0, 5)
      .map((imp) => resolveKey(imp.titleKey, t) ?? imp.id);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          phone: contactPhone.trim() || undefined,
          projectType: isEnglish ? "Improve existing website" : "Melhorar site existente",
          contactPreference: contactPhone.trim() ? "whatsapp" : "email",
          features: ["Auditoria técnica", "Otimização de site"],
          message:
            contactMessage.trim() ||
            `Pedido de otimização para o website ${result.url} com base no relatório do Avaliador (Nota: ${result.overallScore}/100).`,
          consent: true,
          honeypot: honeypot || undefined,
          auditUrl: result.url,
          auditScore: result.overallScore,
          auditFindings: topImprovements,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setContactSuccess(true);
      } else {
        setContactError(data.message ?? a.cta.error);
      }
    } catch {
      setContactError(a.cta.error);
    } finally {
      setContactSending(false);
    }
  }

  const customWhatsappMessage = result
    ? isEnglish
      ? `Hello Mateus, I ran an audit of my website (${result.url}) with a score of ${result.overallScore}/100. I would like to discuss improvements.`
      : `Olá Mateus, fiz a análise do meu website (${result.url}) com nota ${result.overallScore}/100. Gostaria de falar sobre as melhorias prioritárias.`
    : isEnglish
    ? "Hello Mateus, I would like to know more about the Website Evaluator."
    : "Olá Mateus, gostaria de saber mais sobre o Avaliador de Sites.";

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(customWhatsappMessage)}`;
  const mailtoSubject = result
    ? `Avaliação de website [${result.overallScore}/100]: ${result.url}`
    : "Avaliação de website — Mateus Mendes";
  const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(mailtoSubject)}`;

  return (
    <div className="pb-20 lg:pb-28">
      {/* ── Estilos de Impressão (PDF) ── */}
      <style jsx global>{`
        @media print {
          header, footer, nav, button, input, form, [data-hide-print] {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #0b0b0c !important;
          }
          .print-full {
            display: block !important;
          }
          .print-header {
            display: block !important;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #0b0b0c;
          }
          .print-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-[var(--gutter)]" data-hide-print>
        <div aria-hidden="true" className="theme-intro-bg pointer-events-none absolute inset-0 -z-10" />
        <ScrollReveal direction="up" distance={30}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink py-4 font-mono text-sm">
            <span className="inline-flex items-center gap-3 text-ink">
              <span className="home-dot" aria-hidden="true" />
              {a.hero.badge}
            </span>
            <span className="text-muted">Next.js 16 • PageSpeed</span>
          </div>
          <h1 className="m-0 mt-10 max-w-[16ch] font-heading text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink">{a.hero.title}</h1>
          <p className="mt-8 max-w-[60ch] font-heading text-[clamp(1.25rem,1.8vw,1.75rem)] leading-[1.3] tracking-[-0.02em] text-ink-2">{a.hero.subtitle}</p>
          <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight ring-1 ring-ink/20" aria-hidden="true" />
            <span>{a.hero.privacyNote}</span>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Formulário de Análise ── */}
      <section className="container-page mt-10 lg:mt-12" data-hide-print>
        <div className="dark relative overflow-hidden rounded-[28px] border border-line bg-surface p-6 text-ink sm:p-9">
          <div className="home-scan pointer-events-none" aria-hidden="true" />
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="audit-url" className="block font-body text-label font-medium text-ink">
                {a.form.urlLabel}
              </label>
              <div className="mt-2 relative">
                <input
                  id="audit-url"
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={a.form.urlPlaceholder}
                  className="w-full rounded-full border border-line bg-bg px-5 py-3.5 font-body text-sm text-ink placeholder:text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:opacity-60"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            {compareMode && (
              <div className="flex-1">
                <label htmlFor="audit-url-b" className="block font-body text-label font-medium text-ink">
                  {isEnglish ? "Competitor's address" : "Endereço do concorrente"}
                </label>
                <div className="mt-2">
                  <input
                    id="audit-url-b"
                    type="url"
                    value={urlB}
                    onChange={(e) => setUrlB(e.target.value)}
                    placeholder={isEnglish ? "https://competitor.com" : "https://concorrente.pt"}
                    className="w-full rounded-full border border-line bg-bg px-5 py-3.5 font-body text-sm text-ink placeholder:text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:opacity-60"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full sm:w-auto font-medium shadow-xs"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {a.form.analyzing}
                </span>
              ) : (
                a.form.submit
              )}
            </Button>
          </form>

          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 font-body text-sm text-ink">
            <input
              type="checkbox"
              checked={compareMode}
              onChange={(e) => {
                setCompareMode(e.target.checked);
                setResultB(null);
              }}
              disabled={loading}
            />
            {isEnglish ? "Compare with a competitor's website" : "Comparar com o site de um concorrente"}
          </label>

          {/* Exemplos rápidos para testar */}
          {!result && !loading && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-line/60">
              <span className="font-body text-micro text-muted">
                {isEnglish ? "Try an example:" : "Experimente um exemplo:"}
              </span>
              {["https://dentilusa.vercel.app", SITE_URL].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setUrl(sample)}
                  className="font-body text-micro text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                >
                  {sample.replace("https://", "")}
                </button>
              ))}
            </div>
          )}

          {saved && !result && !loading && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-line bg-bg px-4 py-3 text-sm">
              <span className="text-ink-2">
                {isEnglish ? "Your last report:" : "O seu último relatório:"}{" "}
                <strong className="font-semibold text-ink">{saved.result.url.replace(/^https?:\/\//, "")}</strong>{" "}
                <span className="font-mono text-xs text-muted">({saved.result.overallScore}/100)</span>
              </span>
              <button
                type="button"
                onClick={showSaved}
                className="cursor-pointer rounded-full bg-highlight px-4 py-1.5 font-semibold text-accent-ink"
              >
                {isEnglish ? "View again" : "Ver de novo"}
              </button>
            </div>
          )}

          {error && (
            <div
              className="mt-4 rounded-[20px] border border-destructive/30 bg-destructive/5 p-4 font-body text-sm text-destructive"
              role="alert"
            >
              <p className="font-semibold">{error}</p>
              <p className="mt-1 text-xs opacity-90">
                {isEnglish
                  ? "Ensure the site is public and available via HTTP/HTTPS. Internal addresses and private networks are blocked for security."
                  : "Certifique-se de que o website está público e acessível via HTTP/HTTPS. Endereços internos e IPs privados são bloqueados por segurança."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Progresso em Streaming ── */}
      {loading && (
        <section className="container-page mt-8" aria-live="polite" data-hide-print>
          <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-8">
            <p className="font-body text-label font-medium uppercase tracking-wider text-muted">
              {isEnglish ? "Analysis in progress" : "Diagnóstico em curso"}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="h-2 flex-1 overflow-hidden bg-surface-2"
                role="progressbar"
                aria-label={isEnglish ? "Analysis progress" : "Progresso da análise"}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(percent)}
              >
                <div className="h-full bg-highlight transition-[width] duration-300 ease-out" style={{ width: `${percent}%` }} />
              </div>
              <span className="w-12 text-right font-heading text-sm font-semibold tabular-nums text-ink">{Math.round(percent)}%</span>
            </div>
            <ul className="mt-5 space-y-3">
              {progress.map((p, i) => (
                <li key={p.step} className="flex items-center gap-3 font-body text-sm text-ink">
                  {p.done || i < progress.length - 1 ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-highlight text-accent-ink text-xs font-bold" aria-hidden="true">
                      ✓
                    </span>
                  ) : (
                    <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-line-strong border-t-transparent" aria-hidden="true" />
                  )}
                  <span className={p.done || i < progress.length - 1 ? "font-normal text-ink-2" : "font-medium text-ink"}>{p.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Relatório Executivo ── */}
      {result && (
        <section className="container-page mt-12 space-y-12">
          {/* Header exclusivo de impressão */}
          <div className="hidden print:block print-header">
            <h1 className="text-2xl font-bold">Relatório de Avaliação de Website</h1>
            <p className="text-sm text-gray-600 mt-1">URL: {result.url} • Data: {new Date(result.analyzedAt).toLocaleDateString("pt-PT")}</p>
            <p className="text-lg font-semibold mt-2">Nota Geral: {result.overallScore} / 100</p>
          </div>

          {resultB && <CompareResults a={result} b={resultB} />}

          {/* 01. Pontuação Geral e Ações */}
          <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-6">
              <div>
                <p className="font-body text-label uppercase tracking-[0.14em] text-muted">{a.report.overallScore}</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-heading text-display font-semibold text-ink tabular-nums leading-none">
                    {result.overallScore}
                  </span>
                  <span className="font-body text-lead text-muted">/ 100</span>
                  <span className={`font-heading text-h3 font-semibold ${getScoreRating(result.overallScore, isEnglish).color}`}>
                    {getScoreRating(result.overallScore, isEnglish).label}
                  </span>
                </div>
                <p className="mt-2 font-mono text-xs text-muted truncate max-w-[40ch] sm:max-w-none">
                  {result.url}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4" data-hide-print>
                {result.fromCache && (
                  <span className="font-body text-micro text-muted border border-line px-2.5 py-1">
                    {a.report.fromCache}
                  </span>
                )}
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="font-body text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink flex items-center gap-1.5"
                  aria-live="polite"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {copied ? (isEnglish ? "Link copied" : "Link copiado") : isEnglish ? "Copy link" : "Copiar link"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    expandAll();
                    setTimeout(() => window.print(), 150);
                  }}
                  className="font-body text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect width="12" height="8" x="6" y="14" />
                  </svg>
                  {a.report.print}
                </button>
              </div>
            </div>

            <ReportActions result={result} />

            {/* 02. Grid de Categorias */}
            <div className="mt-8">
              <h2 className="font-heading text-h3 font-semibold text-ink">{a.report.categories}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {result.categories.map((c) => {
                  const label = a.categories[c.category as keyof typeof a.categories] ?? c.category;
                  return (
                    <div key={c.category} className="rounded-[20px] border border-line bg-bg p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-xs font-medium text-ink">{label}</span>
                        <span className="font-heading text-lg font-semibold text-ink tabular-nums">{c.available === false ? "—" : c.score}</span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full bg-highlight transition-all duration-500"
                          style={{ width: `${c.available === false ? 0 : c.score}%` }}
                        />
                      </div>
                      <span className="mt-2 font-body text-[11px] text-muted">
                        {c.available === false ? (isEnglish ? "Unavailable" : "Indisponível") : c.score >= 80 ? (isEnglish ? "Good" : "Bom") : c.score >= 50 ? (isEnglish ? "Attention" : "Atenção") : (isEnglish ? "Critical" : "Crítico")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 03. O que já está bom (Strengths) */}
          <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-8 print-break-inside-avoid">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-highlight text-accent-ink font-bold text-xs">
                ✓
              </span>
              <h2 className="font-heading text-h3 font-semibold text-ink">{a.report.strengthsTitle}</h2>
            </div>

            {result.strengths.length === 0 ? (
              <p className="mt-4 font-body text-sm text-muted">{a.report.strengthsEmpty}</p>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {result.strengths.map((f) => {
                  const title = resolveKey(f.titleKey, t) ?? f.id;
                  const what = resolveKey(f.whatKey, t) ?? "";
                  return (
                    <li key={f.id} className="rounded-[16px] border border-line/70 bg-bg/60 p-3.5">
                      <p className="font-body text-sm font-semibold text-ink flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        {title}
                      </p>
                      {what && <p className="mt-1 font-body text-xs text-ink-2 pl-4">{what}</p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* 04. O que melhorar (Improvements) */}
          <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-8 print-break-inside-avoid">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-heading text-h3 font-semibold text-ink">{a.report.improvementsTitle}</h2>
                <p className="mt-1 font-body text-xs text-muted">
                  {isEnglish
                    ? "Ordered by business priority and potential impact."
                    : "Ordenado por prioridade de negócio e impacto potencial."}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-body text-muted" data-hide-print>
                <span>{result.improvements.length} {isEnglish ? "findings" : "melhorias identificadas"}</span>
              </div>
            </div>

            {result.improvements.length === 0 ? (
              <p className="mt-6 font-body text-sm text-muted">{a.report.improvementsEmpty}</p>
            ) : (
              <ul className="mt-6 space-y-3">
                {result.improvements.map((f) => {
                  const title = resolveKey(f.titleKey, t) ?? f.id;
                  const what = resolveKey(f.whatKey, t) ?? "";
                  const why = resolveKey(f.whyKey, t) ?? "";
                  const how = resolveKey(f.howKey, t) ?? "";
                  const isExpanded = !!expanded[f.id];

                  const severityColor =
                    f.severity === "high"
                      ? "text-red-700 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900"
                      : f.severity === "medium"
                      ? "text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900"
                      : "text-muted bg-surface-2 border-line";

                  return (
                    <li key={f.id} className="overflow-hidden rounded-[20px] border border-line bg-bg transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleExpand(f.id)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                        aria-expanded={isExpanded}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span className={`font-body text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 border ${severityColor}`}>
                            {a.severity[f.severity as keyof typeof a.severity]}
                          </span>
                          <span className="font-body text-sm font-semibold text-ink truncate">{title}</span>
                        </span>
                        <span className="font-mono text-lg text-muted shrink-0" aria-hidden="true" data-hide-print>
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      <div className={`${isExpanded ? "block" : "hidden"} print:block border-t border-line px-5 py-4 space-y-3 bg-surface/50`}>
                        {what && (
                          <div>
                            <span className="font-body text-xs font-bold text-ink uppercase tracking-wider">
                              {isEnglish ? "What is it:" : "O que é:"}
                            </span>
                            <p className="mt-0.5 font-body text-sm text-ink-2">{what}</p>
                          </div>
                        )}
                        {why && (
                          <div>
                            <span className="font-body text-xs font-bold text-ink uppercase tracking-wider">
                              {isEnglish ? "Why it matters:" : "Porque importa:"}
                            </span>
                            <p className="mt-0.5 font-body text-sm text-ink-2">{why}</p>
                          </div>
                        )}
                        {how && (
                          <div>
                            <span className="font-body text-xs font-bold text-ink uppercase tracking-wider">
                              {isEnglish ? "How to fix:" : "Como corrigir:"}
                            </span>
                            <p className="mt-0.5 font-body text-sm text-ink-2">{how}</p>
                          </div>
                        )}
                        {f.evidence && (
                          <div className="pt-2 border-t border-line/60">
                            <span className="font-mono text-xs text-muted">
                              {isEnglish ? "Evidence:" : "Evidência:"} {f.evidence}
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* 05. Limitações desta análise */}
          <div className="rounded-[28px] border-[1.5px] border-line bg-surface/40 p-6 sm:p-7 print-break-inside-avoid">
            <h2 className="font-heading text-h3 font-semibold text-ink">{a.report.limitationsTitle}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {result.limitations.map((l, i) => {
                const text = resolveKey(l, t) ?? l;
                return (
                  <li key={i} className="flex items-start gap-2 font-body text-xs text-muted leading-relaxed">
                    <span className="text-line-strong">•</span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Fase 8: Bloco de Contacto e Conversão ── */}
          <div className="rounded-[40px] bg-highlight p-6 text-accent-ink sm:p-10 print-break-inside-avoid light" data-hide-print>
            <div className="max-w-2xl">
              <span className="font-body text-label uppercase tracking-[0.14em] text-muted">
                {isEnglish ? "Next step" : "Próximo passo"}
              </span>
              <h2 className="mt-3 font-heading text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">{a.cta.title}</h2>
              <p className="mt-3 font-body text-lead text-ink-2">{a.cta.subtitle}</p>
            </div>

            {/* Resumo visual do pedido */}
            <div className="mt-6 rounded-[20px] border-[1.5px] border-accent-ink bg-bg p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-body text-micro uppercase tracking-wider text-muted">Website</span>
                <p className="font-mono text-sm font-semibold text-ink truncate max-w-[28ch] sm:max-w-none">{result.url}</p>
              </div>
              <div>
                <span className="font-body text-micro uppercase tracking-wider text-muted">{a.report.overallScore}</span>
                <p className="font-heading text-lg font-bold text-ink">{result.overallScore} / 100</p>
              </div>
              <div>
                <span className="font-body text-micro uppercase tracking-wider text-muted">{isEnglish ? "Identified issues" : "Melhorias a tratar"}</span>
                <p className="font-body text-sm font-semibold text-ink">{result.improvements.length} itens</p>
              </div>
            </div>

            {/* Sucesso no envio */}
            {contactSuccess ? (
              <div className="mt-8 border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
                    ✓
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{a.cta.successTitle}</h3>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed">{a.cta.successDesc}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-emerald-700/40 bg-white dark:bg-surface px-4 py-2 font-body text-xs font-semibold text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100"
                  >
                    {a.cta.whatsapp}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-8 space-y-5" noValidate>
                {/* Honeypot anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="audit-contact-name" className="block font-body text-label text-ink">
                      {a.cta.name} *
                    </label>
                    <input
                      id="audit-contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      autoComplete="name"
                      className="mt-1.5 w-full border border-line bg-bg px-3.5 py-2.5 font-body text-sm text-ink focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-contact-email" className="block font-body text-label text-ink">
                      {a.cta.email} *
                    </label>
                    <input
                      id="audit-contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      autoComplete="email"
                      className="mt-1.5 w-full border border-line bg-bg px-3.5 py-2.5 font-body text-sm text-ink focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-contact-phone" className="block font-body text-label text-ink">
                      {a.cta.phone} ({isEnglish ? "optional" : "opcional"})
                    </label>
                    <input
                      id="audit-contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      autoComplete="tel"
                      className="mt-1.5 w-full border border-line bg-bg px-3.5 py-2.5 font-body text-sm text-ink focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="audit-contact-message" className="block font-body text-label text-ink">
                    {a.cta.message}
                  </label>
                  <textarea
                    id="audit-contact-message"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={
                      isEnglish
                        ? "E.g.: I would like to prioritize mobile speed and fix SEO issues."
                        : "Ex.: Gostaria de priorizar a velocidade no telemóvel e rever os problemas de SEO."
                    }
                    className="mt-1.5 w-full border border-line bg-bg px-3.5 py-2.5 font-body text-sm text-ink focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                  />
                </div>

                {/* Checkbox de consentimento obrigatória */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id={consentId}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded-none border border-line-strong text-ink focus:ring-1 focus:ring-ink"
                  />
                  <label htmlFor={consentId} className="font-body text-xs text-ink-2 leading-relaxed">
                    {a.cta.consent}
                  </label>
                </div>

                {contactError && (
                  <p className="font-body text-xs text-destructive" role="alert">
                    {contactError}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={contactSending || !consent}
                    className="font-semibold shadow-xs"
                  >
                    {contactSending ? a.cta.sending : a.cta.submit}
                  </Button>

                  <div className="flex items-center gap-4 text-xs font-body text-muted">
                    <span>{isEnglish ? "Or reach out directly:" : "Ou fale diretamente:"}</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                    >
                      {a.cta.whatsapp}
                    </a>
                    <span>•</span>
                    <a
                      href={mailtoUrl}
                      className="font-medium text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                    >
                      {a.cta.emailAlt}
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* ── Simulador: quanto vale converter melhor ── */}
      <section className="container-page mt-16 lg:mt-20" data-hide-print>
        <LossCalculator />
      </section>
    </div>
  );
}
