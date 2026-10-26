"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function NewsletterThankYou() {
  const { isEnglish } = useLanguage();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const pathname = "/newsletter/obrigado";

  // Track conversion if needed
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "newsletter",
        event_label: "checklist_conversao",
        value: 1,
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto max-w-2xl px-4 py-16 sm:py-24 text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
        className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </motion.div>

      {/* Title */}
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        {isEnglish ? "You're In! 🎉" : "Já Está! 🎉"}
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
        {isEnglish
          ? `The checklist is on its way to <strong>${email || "your inbox"}</strong>. If you don't see it in 2 minutes, check spam/junk.`
          : `O checklist está a caminho do <strong>${email || "seu email"}</strong>. Se não vir em 2 minutos, verifique spam/lixo.`}
      </p>

      {/* Download Button */}
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="/lead-magnet/checklist-conversao.pdf"
          download="checklist-conversao.pdf"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent hover:bg-accent-hover text-surface px-8 py-4 text-base font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{isEnglish ? "Download PDF Now" : "Baixar PDF Agora"}</span>
        </a>

        <Link href="/contacto">
          <Button variant="contact" size="lg" withArrow>
            {isEnglish ? "Start a Conversation" : "Iniciar Conversa"}
          </Button>
        </Link>
      </div>

      {/* WhatsApp Quick Link */}
      <a
        href={getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "form-success")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm font-bold transition-all shadow-md hover:shadow-lg mb-10"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>{isEnglish ? "Talk on WhatsApp" : "Falar no WhatsApp"}</span>
      </a>

      {/* What's Next Section */}
      <div className="rounded-2xl border border-border/70 bg-surface/80 backdrop-blur-xl p-6 sm:p-8 text-left">
        <h2 className="font-heading text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {isEnglish ? "What Happens Next?" : "O Que Acontece Agora?"}
        </h2>
        <ul className="space-y-4 text-sm text-text-secondary">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent text-xs font-bold">1</span>
            <span>{isEnglish ? "Check your email for the PDF download link (also works directly above)" : "Verifique o email para o link de download do PDF (também funciona no botão acima)"}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent text-xs font-bold">2</span>
            <span>{isEnglish ? "Run the 12-point audit on your site today — start with the Quick Wins" : "Faça a auditoria dos 12 pontos no seu site hoje — comece pelos Quick Wins"}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent text-xs font-bold">3</span>
            <span>{isEnglish ? "You'll receive 1-2 emails/month with case studies, tips & availability" : "Vai receber 1-2 emails/mês com case studies, dicas e disponibilidade"}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent text-xs font-bold">4</span>
            <span>{isEnglish ? "Reply to any email to book a 15-min call — I read every reply" : "Responda a qualquer email para agendar chamada de 15min — leio todas as respostas"}</span>
          </li>
        </ul>
      </div>

      {/* Social Proof / Case Studies Teaser */}
      <div className="mt-12">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-6 text-center">
          {isEnglish ? "Recent Work" : "Trabalhos Recentes"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-border/60 bg-surface p-4 hover:border-accent/40 transition-colors">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Law Firm</p>
            <p className="text-sm text-text-secondary">Silva & Associados — 98/100 PageSpeed</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-surface p-4 hover:border-accent/40 transition-colors">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">E-Commerce</p>
            <p className="text-sm text-text-secondary">Green Harvest — MB WAY + Multibanco</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-surface p-4 hover:border-accent/40 transition-colors">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">Landing Page</p>
            <p className="text-sm text-text-secondary">Clínica Sorrir — CPL reduced 60%</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 pt-8 border-t border-border/60">
        <p className="text-sm text-text-muted mb-4">
          {isEnglish
            ? "Questions? Reply to the welcome email or book a call below."
            : "Dúvidas? Responda ao email de boas-vindas ou agende uma chamada abaixo."}
        </p>
        <Link href="/contacto">
          <Button variant="primary" size="lg" withArrow className="w-full sm:w-auto">
            {isEnglish ? "Book 15-min Call" : "Agendar Chamada de 15min"}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}