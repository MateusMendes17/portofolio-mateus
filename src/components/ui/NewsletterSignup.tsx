"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "minimal";
  className?: string;
  showName?: boolean;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSuccess?: () => void;
}

export function NewsletterSignup({
  variant = "card",
  className,
  showName = false,
  placeholder,
  buttonText,
  successMessage,
}: NewsletterSignupProps) {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validação básica
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage(isEnglish ? "Please enter a valid email address." : "Por favor insira um email válido.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, locale: isEnglish ? "en" : "pt" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isEnglish ? "Something went wrong." : "Ocorreu um erro. Tente novamente."));
      }

      // Redirect to thank you page with email param
      const thankYouUrl = `/newsletter/obrigado?email=${encodeURIComponent(email)}`;
      router.push(thankYouUrl);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : (isEnglish ? "Something went wrong." : "Ocorreu um erro. Tente novamente."));
    }
  };

  const isSuccess = status === "success";

  // Variant: minimal (inline, minimal styling)
  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row gap-2 items-center", className)}>
        <label htmlFor="newsletter-email-minimal" className="sr-only">
          {isEnglish ? "Email address" : "Endereço de email"}
        </label>
        <input
          id="newsletter-email-minimal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder || (isEnglish ? "Your email" : "O seu email")}
          disabled={isSuccess || status === "loading"}
          className={cn(
            "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            isSuccess && "bg-emerald-500/10 border-emerald-500/30",
            status === "error" && "border-destructive/50"
          )}
          aria-describedby={status === "error" ? "newsletter-error-minimal" : undefined}
        />
        <Button
          type="submit"
          size="sm"
          variant="primary"
          disabled={isSuccess || status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? (isEnglish ? "Subscribing..." : "A subscrever...") : (buttonText || (isEnglish ? "Subscribe" : "Subscrever"))}
        </Button>
        {status === "error" && (
          <p id="newsletter-error-minimal" className="text-xs text-destructive" role="alert">{errorMessage}</p>
        )}
        {isSuccess && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400" role="status">
            {successMessage || (isEnglish ? "Subscribed! Check your inbox." : "Subscrito! Verifique o seu email.")}
          </p>
        )}
      </form>
    );
  }

  // Variant: inline (horizontal, for hero/footer)
  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row gap-3 items-stretch w-full max-w-md", className)}>
        <div className="flex-1">
          <label htmlFor="newsletter-email-inline" className="sr-only">
            {isEnglish ? "Email address" : "Endereço de email"}
          </label>
          <input
            id="newsletter-email-inline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder || (isEnglish ? "Enter your email" : "Insira o seu email")}
            disabled={isSuccess || status === "loading"}
            className={cn(
              "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
              isSuccess && "bg-emerald-500/10 border-emerald-500/30",
              status === "error" && "border-destructive/50"
            )}
            aria-describedby={status === "error" ? "newsletter-error-inline" : undefined}
          />
          {status === "error" && (
            <p id="newsletter-error-inline" className="mt-1 text-xs text-destructive" role="alert">{errorMessage}</p>
          )}
        </div>
        <Button
          type="submit"
          size="md"
          variant="primary"
          disabled={isSuccess || status === "loading"}
          className="shrink-0 sm:w-auto"
        >
          {status === "loading" ? (isEnglish ? "Subscribing..." : "A subscrever...") : (buttonText || (isEnglish ? "Subscribe" : "Subscrever"))}
        </Button>
        {isSuccess && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-emerald-600 dark:text-emerald-400 text-center sm:text-left"
            role="status"
          >
            {successMessage || (isEnglish ? "Subscribed! Check your inbox for the guide." : "Subscrito! Verifique o email para o guia.")}
          </motion.p>
        )}
      </form>
    );
  }

  // Variant: card (default, styled card with copy)
  return (
    <div className={cn("rounded-2xl border border-border/70 bg-surface/80 backdrop-blur-xl p-6 sm:p-8 shadow-sm", className)}>
      {!isSuccess ? (
        <>
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-subtle text-accent border border-accent/30">
              {isEnglish ? "Newsletter" : "Newsletter"}
            </span>
            <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-text-primary">
              {isEnglish
                ? "Get the Free Conversion Checklist"
                : "Receba o Checklist Grátis de Conversão"}
            </h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {isEnglish
                ? "12 actionable items to audit your website today. No fluff, just what moves the needle."
                : "12 itens acionáveis para auditar o seu site hoje. Sem enchimento, só o que traz resultados."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {showName && (
              <div>
                <label htmlFor="newsletter-name" className="sr-only">
                  {isEnglish ? "Name (optional)" : "Nome (opcional)"}
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isEnglish ? "Your name (optional)" : "O seu nome (opcional)"}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                {isEnglish ? "Email address" : "Endereço de email"}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder || (isEnglish ? "Enter your email" : "Insira o seu email")}
                disabled={isSuccess || status === "loading"}
                className={cn(
                  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                  status === "error" && "border-destructive/50"
                )}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
                required
              />
              {status === "error" && (
                <p id="newsletter-error" className="mt-1 text-xs text-destructive" role="alert">{errorMessage}</p>
              )}
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? (isEnglish ? "Subscribing..." : "A subscrever...")
                : (buttonText || (isEnglish ? "Get Free Checklist →" : "Receber Checklist Grátis →"))}
            </Button>

            <p className="text-xs text-center text-text-muted">
              {isEnglish
                ? "No spam. Unsubscribe anytime. Your data is safe."
                : "Sem spam. Cancele quando quiser. Os seus dados estão seguros."}
            </p>
          </form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
            {isEnglish ? "You're In! 🎉" : "Já Está! 🎉"}
          </h3>
          <p className="text-sm text-text-secondary mb-6">
            {successMessage || (isEnglish
              ? "Check your inbox for the PDF. If you don't see it, check spam."
              : "Verifique a sua caixa de entrada para o PDF. Se não vir, veja o spam.")}
          </p>
          <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
            {isEnglish ? "Subscribe another email" : "Subscrever outro email"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}