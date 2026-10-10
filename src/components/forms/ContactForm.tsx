"use client";

import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "./contact/useContactForm";
import { FormStepProjectType } from "./contact/FormStepProjectType";
import { FormStepPreference } from "./contact/FormStepPreference";
import { FormStepDetails } from "./contact/FormStepDetails";
import { FormSuccess } from "./contact/FormSuccess";

/**
 * Formulário de contacto em 3 fases.
 * A lógica vive em ./contact/useContactForm; a UI de cada fase nos
 * componentes FormStep* / FormSuccess — aqui fica só a orquestração.
 */
export function ContactForm() {
  const { t } = useLanguage();
  const form = useContactForm();

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Barra de Progresso por Fases */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-3">
          <span className="uppercase tracking-wider text-xs font-bold text-accent">
            {t.contact.form.steps.phase.replace("{current}", String(form.currentStep))}
          </span>
          <span className="text-text-muted">
            {form.currentStep === 1 && t.contact.form.steps.titles[0]}
            {form.currentStep === 2 && t.contact.form.steps.titles[1]}
            {form.currentStep === 3 && t.contact.form.steps.titles[2]}
          </span>
        </div>

        {/* Stepper visual */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((step) => {
            const isCompleted = form.currentStep > step;
            const isCurrent = form.currentStep === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => {
                  if (step < form.currentStep) form.goToStep(step as 1 | 2 | 3);
                }}
                disabled={step > form.currentStep}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-accent cursor-pointer hover:opacity-80"
                    : isCurrent
                    ? "bg-accent shadow-sm"
                    : "bg-surface-hover cursor-not-allowed"
                }`}
                title={t.contact.form.steps.goToPhase.replace("{step}", String(step))}
              />
            );
          })}
        </div>
      </div>

      {/* SUCESSO: Ecrã de Confirmação */}
      {form.submitStatus === "success" ? (
        <FormSuccess form={form} />
      ) : (
        <form onSubmit={form.handleSubmit} noValidate>
          {/* Campo oculto anti-spam */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={form.formData.honeypot}
              onChange={form.handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Mensagem de Erro de Servidor */}
          {form.submitStatus === "error" && (
            <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive text-xs flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive text-white font-bold text-xs">
                !
              </span>
              <span>{form.serverMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {form.currentStep === 1 && <FormStepProjectType key="step1" form={form} />}
            {form.currentStep === 2 && <FormStepPreference key="step2" form={form} />}
            {form.currentStep === 3 && <FormStepDetails key="step3" form={form} />}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
