"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormController } from "./useContactForm";

/** Fase 3: dados de contacto, mensagem final, RGPD e submissão. */
export function FormStepDetails({ form }: { form: ContactFormController }) {
  const { t } = useLanguage();
  const {
    formData,
    stepErrors,
    isSubmitting,
    selectedProjectTypeTitle,
    selectedContactPreferenceTitle,
    handleInputChange,
    goToStep,
  } = form;

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="anim-reveal space-y-6"
    >
      <div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
          {t.contact.form.step3.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          {t.contact.form.step3.description}
        </p>
      </div>

      {/* Resumo Dinâmico das Fases Anteriores */}
      <div className="rounded-2xl border border-accent/20 bg-accent-subtle/30 p-4 text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-text-primary uppercase tracking-wider text-xs">
            {t.contact.form.step3.summaryTitle}
          </span>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-accent hover:underline font-semibold text-xs cursor-pointer"
          >
            {t.contact.form.step3.summaryEdit}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-text-secondary">
          <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            </svg>
            {selectedProjectTypeTitle}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t.contact.form.step3.summaryPreference} {selectedContactPreferenceTitle}
          </span>
          {formData.features && formData.features.length > 0 && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {formData.features.length} {t.contact.form.step3.summaryFeatures}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Nome & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
            {t.contact.form.step3.nameLabel} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t.contact.form.step3.namePlaceholder}
            disabled={isSubmitting}
            className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
              stepErrors.name ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
            }`}
          />
          {stepErrors.name && <p className="mt-1.5 text-xs text-destructive">{stepErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
            {t.contact.form.step3.emailLabel} <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.contact.form.step3.emailPlaceholder}
            disabled={isSubmitting}
            className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
              stepErrors.email ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
            }`}
          />
          {stepErrors.email && <p className="mt-1.5 text-xs text-destructive">{stepErrors.email}</p>}
        </div>
      </div>

      {/* Telefone / WhatsApp */}
      <div>
        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
          {t.contact.form.step3.phoneLabel}{" "}
          {formData.contactPreference === "chamada" || formData.contactPreference === "whatsapp" ? (
            <span className="text-accent">
              {t.contact.form.step3.phoneRequired}
            </span>
          ) : (
            <span className="text-text-muted font-normal">
              {t.contact.form.step3.phoneOptional}
            </span>
          )}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={t.contact.form.step3.phonePlaceholder}
          disabled={isSubmitting}
          className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
            stepErrors.phone ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
          }`}
        />
        {stepErrors.phone && <p className="mt-1.5 text-xs text-destructive">{stepErrors.phone}</p>}
      </div>

      {/* Mensagem / Detalhes */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
          {t.contact.form.step3.messageLabel}{" "}
          <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          placeholder={t.contact.form.step3.messagePlaceholder}
          disabled={isSubmitting}
          className={`w-full rounded-2xl border bg-surface/70 p-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
            stepErrors.message ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {stepErrors.message ? (
            <p className="text-xs text-destructive">{stepErrors.message}</p>
          ) : <span />}
          <span className="text-xs text-text-muted">{formData.message.length}/2000</span>
        </div>
      </div>

      {/* Checkbox de RGPD */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="mt-0.5 h-4 w-4 rounded-md border-border text-accent focus:ring-accent cursor-pointer accent-accent"
          />
          <span className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
            {t.contact.form.step3.consentBefore}
            <Link href="/privacidade" className="text-accent underline underline-offset-2 hover:opacity-80">
              {t.contact.form.step3.consentLink}
            </Link>
            .
          </span>
        </label>
        {stepErrors.consent && <p className="mt-1.5 text-xs text-destructive">{stepErrors.consent}</p>}
      </div>

      {/* Botões Finais de Submissão */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
        <button
          type="button"
          onClick={() => goToStep(2)}
          className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 order-2 sm:order-1 cursor-pointer"
        >
          {t.contact.form.step3.back}
        </button>

        <Button
          type="submit"
          variant="contact"
          size="lg"
          withArrow
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          {isSubmitting
            ? t.contact.form.step3.submitting
            : t.contact.form.step3.submit}
        </Button>
      </div>
    </motion.div>
  );
}
