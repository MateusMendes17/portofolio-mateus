"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "../../ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormController } from "./useContactForm";

/** Ecrã de confirmação exibido após submissão bem-sucedida. */
export function FormSuccess({ form }: { form: ContactFormController }) {
  const { t } = useLanguage();
  const { formData, selectedProjectTypeTitle, selectedContactPreferenceTitle, reset } = form;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10 space-y-6"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          {t.contact.form.success.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {t.contact.form.success.thanksBefore}
          <strong className="text-text-primary">{formData.name}</strong>
          {t.contact.form.success.thanksAfter}
          <strong className="text-accent">{selectedProjectTypeTitle}</strong>.
        </p>
        <p className="text-xs text-text-muted mt-2">
          {t.contact.form.success.contactBefore}
          <strong className="text-text-primary">{selectedContactPreferenceTitle}</strong>
          {t.contact.form.success.contactAfter}
        </p>
      </div>

      {/* Atalho WhatsApp */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
            t.contact.form.success.whatsappMessage.replace("{project}", selectedProjectTypeTitle)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>{t.contact.form.success.whatsappCta}</span>
        </a>

        <button
          type="button"
          onClick={reset}
          className="px-5 py-3 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
        >
          {t.contact.form.success.sendAnother}
        </button>
      </div>
    </motion.div>
  );
}
