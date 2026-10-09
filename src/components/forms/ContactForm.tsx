"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "../ui/Button";
import { WhatsAppIcon } from "../ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

export function ContactForm() {
  const { isEnglish } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    otherProjectType: "",
    contactPreference: "",
    otherContactPreference: "",
    features: [],
    message: "",
    consent: false,
    honeypot: "",
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const projectTypes: ProjectOption[] = isEnglish
    ? [
        {
          id: "site-institucional",
          title: "Brand Website",
          badge: "Business & Corporate",
          description: "Present your company with authority, elegance, and build deep trust with prospective clients.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          ),
        },
        {
          id: "landing-page",
          title: "High-Converting Landing Page",
          badge: "Lead Generation",
          description: "Laser-focused page designed for advertising campaigns (Google/Meta) and direct lead acquisition.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="m13 2-2 10h8l-8 10 2-10H3z" />
            </svg>
          ),
        },
        {
          id: "loja-online",
          title: "E-Commerce & Online Store",
          badge: "24/7 Sales",
          description: "Complete digital store with multi-currency payments, seamless checkout, and inventory management.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          ),
        },
        {
          id: "web-app",
          title: "Custom Web App & Portal",
          badge: "Automation & Systems",
          description: "Advanced web portals, customer login dashboards, and internal business process automation.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          ),
        },
        {
          id: "manutencao-redesign",
          title: "Redesign, Speed & Support",
          badge: "Modernization",
          description: "Modernize an existing website, boost loading speeds (SEO), or retain ongoing technical engineering.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
        },
        {
          id: "outro",
          title: "Other Project Type",
          badge: "Custom",
          description: "Have a unique idea or bespoke specification? Describe it directly.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          ),
        },
      ]
    : [
        {
          id: "site-institucional",
          title: "Website Institucional",
          badge: "Empresas & Negócios",
          description: "Apresentar a sua empresa com autoridade, elegância e transmitir máxima confiança aos seus clientes.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          ),
        },
        {
          id: "landing-page",
          title: "Landing Page de Alta Conversão",
          badge: "Geração de Leads",
          description: "Página hiper-focada em campanhas de anúncios (Google/Meta), captação de contactos e vendas diretas.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="m13 2-2 10h8l-8 10 2-10H3z" />
            </svg>
          ),
        },
        {
          id: "loja-online",
          title: "Loja Online / E-commerce",
          badge: "Vendas 24/7",
          description: "Plataforma de venda completa com pagamentos portugueses (MB WAY, Multibanco, Cartão) e gestão de stock.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          ),
        },
        {
          id: "web-app",
          title: "Aplicação Web / Portal Sob Medida",
          badge: "Automação & Sistemas",
          description: "Sistemas web avançados, portais com login de clientes, dashboards ou automações de processos.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          ),
        },
        {
          id: "manutencao-redesign",
          title: "Redesign, Otimização ou Suporte",
          badge: "Modernização",
          description: "Modernizar um site existente, otimizar a velocidade de carregamento (SEO) ou suporte técnico.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
        },
        {
          id: "outro",
          title: "Outro Tipo de Projeto",
          badge: "Personalizado",
          description: "Tem uma necessidade específica ou ideia diferente? Descreva-a diretamente.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          ),
        },
      ];

  const contactPreferences = isEnglish
    ? [
        {
          id: "chamada",
          title: "Phone Call",
          desc: "Direct telephone conversation for rapid alignment and answering questions.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          ),
        },
        {
          id: "whatsapp",
          title: "WhatsApp",
          desc: "Quick instant messaging, voice notes, and easy sharing of visual references.",
          icon: <WhatsAppIcon className="w-5 h-5" />,
        },
        {
          id: "email",
          title: "Email",
          desc: "Formal written communication with detailed proposal sent directly to your inbox.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          ),
        },
        {
          id: "outro",
          title: "Other Medium",
          desc: "Video conference (Google Meet / Teams) or another platform of your choice.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          ),
        },
      ]
    : [
        {
          id: "chamada",
          title: "Chamada Telefónica",
          desc: "Conversa direta por telefone para alinhamento rápido e esclarecimento de dúvidas.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          ),
        },
        {
          id: "whatsapp",
          title: "WhatsApp",
          desc: "Troca rápida de mensagens, notas de voz e partilha prática de referências.",
          icon: <WhatsAppIcon className="w-5 h-5" />,
        },
        {
          id: "email",
          title: "Email",
          desc: "Comunicação formal por escrito com proposta detalhada enviada para a sua caixa de entrada.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          ),
        },
        {
          id: "outro",
          title: "Outro Meio",
          desc: "Reunião por videoconferência (Google Meet/Teams) ou outra plataforma à sua escolha.",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          ),
        },
      ];

  const featureTags = isEnglish
    ? [
        "Exclusive UI/UX Design",
        "Google SEO Optimization",
        "Secure Card & Local Payments",
        "Content Management System (CMS)",
        "Member Area / User Login",
        "Direct WhatsApp Integration",
        "Fluid Motion & Micro-interactions",
        "Multilingual Support (PT / EN)",
        "CRM & Email Integration",
        "Sub-Second Instant Loading",
      ]
    : [
        "Design UI/UX Exclusivo",
        "Otimização SEO (Google)",
        "Pagamentos MB WAY & Cartão",
        "Gestor de Conteúdos (CMS)",
        "Área Reservada / Login",
        "Integração WhatsApp Direto",
        "Animações Fluidas & Efeito Uau",
        "Multi-idioma (PT / EN)",
        "Integração de CRM / Newsletter",
        "Carregamento Instantâneo",
      ];

  const toggleFeature = (tag: string) => {
    setFormData((prev) => {
      const current = prev.features || [];
      const updated = current.includes(tag)
        ? current.filter((f) => f !== tag)
        : [...current, tag];
      return { ...prev, features: updated };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (stepErrors[name]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Validação do Passo 1
  const handleNextStep1 = () => {
    if (!formData.projectType) {
      setStepErrors({
        projectType: isEnglish
          ? "Please select the project type you need."
          : "Por favor, selecione o tipo de projeto pretendido.",
      });
      return;
    }
    if (formData.projectType === "outro" && (!formData.otherProjectType || formData.otherProjectType.trim().length < 3)) {
      setStepErrors({
        otherProjectType: isEnglish
          ? "Please briefly describe the intended project type."
          : "Por favor, descreva o tipo de projeto pretendido.",
      });
      return;
    }
    setStepErrors({});
    setCurrentStep(2);
  };

  // Validação do Passo 2
  const handleNextStep2 = () => {
    if (!formData.contactPreference) {
      setStepErrors({
        contactPreference: isEnglish
          ? "Please select your preferred communication channel."
          : "Por favor, selecione como prefere ser contactado.",
      });
      return;
    }
    if (formData.contactPreference === "outro" && (!formData.otherContactPreference || formData.otherContactPreference.trim().length < 3)) {
      setStepErrors({
        otherContactPreference: isEnglish
          ? "Please specify your preferred medium."
          : "Por favor, especifique o meio de contacto pretendido.",
      });
      return;
    }
    setStepErrors({});
    setCurrentStep(3);
  };

  // Submissão final no Passo 3
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");

    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      // Mapeia TODOS os erros do schema para a UI (nome, email, telefone,
      // mensagem, consentimento, tipo de projeto, preferência de contacto...).
      const { fieldErrors } = z.flattenError(validation.error);
      const nextErrors: Record<string, string> = {};

      for (const [field, messages] of Object.entries(fieldErrors)) {
        const first = Array.isArray(messages) ? messages[0] : undefined;
        if (first) nextErrors[field] = first;
      }

      setStepErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setServerMessage(
          result.message ||
            (isEnglish
              ? "Thank you for reaching out! We will be in touch shortly."
              : "Obrigado pelo seu contacto! Falaremos em breve.")
        );
      } else {
        setSubmitStatus("error");
        setServerMessage(
          result.message ||
            (isEnglish
              ? "An error occurred while sending. You can also contact directly via WhatsApp."
              : "Ocorreu um erro ao enviar. Pode também contactar diretamente por WhatsApp.")
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        isEnglish
          ? "Could not connect to the server. Please send a direct message via WhatsApp or email."
          : "Não foi possível conectar ao servidor. Por favor, envie uma mensagem direta por WhatsApp ou email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProjectTypeTitle =
    formData.projectType === "outro" && formData.otherProjectType
      ? (isEnglish ? `Other: ${formData.otherProjectType}` : `Outro: ${formData.otherProjectType}`)
      : projectTypes.find((p) => p.id === formData.projectType)?.title || formData.projectType;

  const selectedContactPreferenceTitle =
    formData.contactPreference === "outro" && formData.otherContactPreference
      ? (isEnglish ? `Other: ${formData.otherContactPreference}` : `Outro: ${formData.otherContactPreference}`)
      : contactPreferences.find((c) => c.id === formData.contactPreference)?.title || formData.contactPreference;

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Barra de Progresso por Fases */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-3">
          <span className="uppercase tracking-wider text-[11px] font-bold text-accent">
            {isEnglish ? `Phase ${currentStep} of 3` : `Fase ${currentStep} de 3`}
          </span>
          <span className="text-text-muted">
            {currentStep === 1 && (isEnglish ? "1. Project Type" : "1. Tipo de Projeto")}
            {currentStep === 2 && (isEnglish ? "2. Contact Preference" : "2. Preferência de Contacto")}
            {currentStep === 3 && (isEnglish ? "3. Your Details & Message" : "3. Seus Dados & Mensagem")}
          </span>
        </div>

        {/* Stepper visual */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((step) => {
            const isCompleted = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => {
                  if (step < currentStep) setCurrentStep(step as 1 | 2 | 3);
                }}
                disabled={step > currentStep}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-accent cursor-pointer hover:opacity-80"
                    : isCurrent
                    ? "bg-accent shadow-sm"
                    : "bg-surface-hover cursor-not-allowed"
                }`}
                title={isEnglish ? `Go to Phase ${step}` : `Ir para Fase ${step}`}
              />
            );
          })}
        </div>
      </div>

      {/* SUCESSO: Ecrã de Confirmação */}
      {submitStatus === "success" ? (
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
              {isEnglish ? "Message Received!" : "Mensagem Recebida!"}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {isEnglish ? (
                <>
                  Thank you, <strong className="text-text-primary">{formData.name}</strong>. I have registered your inquiry regarding{" "}
                  <strong className="text-accent">{selectedProjectTypeTitle}</strong>.
                </>
              ) : (
                <>
                  Obrigado, <strong className="text-text-primary">{formData.name}</strong>. Já registei o seu pedido sobre{" "}
                  <strong className="text-accent">{selectedProjectTypeTitle}</strong>.
                </>
              )}
            </p>
            <p className="text-xs text-text-muted mt-2">
              {isEnglish ? (
                <>
                  I will reach out via <strong className="text-text-primary">{selectedContactPreferenceTitle}</strong> as promptly as possible to discuss your project in detail.
                </>
              ) : (
                <>
                  Entrarei em contacto consigo via <strong className="text-text-primary">{selectedContactPreferenceTitle}</strong> com a máxima brevidade para conversarmos em detalhe.
                </>
              )}
            </p>
          </div>

          {/* Atalho WhatsApp */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
                isEnglish
                  ? `Hello Mateus, I just sent an inquiry on your website about ${selectedProjectTypeTitle}!`
                  : `Olá Mateus, acabei de enviar uma mensagem através do teu website sobre ${selectedProjectTypeTitle}!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{isEnglish ? "Chat Now on WhatsApp" : "Falar Agora pelo WhatsApp"}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmitStatus("idle");
                setCurrentStep(1);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  projectType: "",
                  otherProjectType: "",
                  contactPreference: "",
                  otherContactPreference: "",
                  features: [],
                  message: "",
                  consent: false,
                  honeypot: "",
                });
              }}
              className="px-5 py-3 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              {isEnglish ? "Send another message" : "Enviar nova mensagem"}
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo oculto anti-spam */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Mensagem de Erro de Servidor */}
          {submitStatus === "error" && (
            <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive text-xs flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive text-white font-bold text-xs">
                !
              </span>
              <span>{serverMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ==============================================================
                FASE 1: TIPO DE PROJETO
                ============================================================== */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {isEnglish ? "What does your business need?" : "O que precisa para o seu negócio?"}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                    {isEnglish
                      ? "Select the option that best matches your project goals."
                      : "Selecione a opção que melhor representa o objetivo pretendido."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {projectTypes.map((pt) => {
                    const isSelected = formData.projectType === pt.id;
                    return (
                      <div key={pt.id} className="flex flex-col">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, projectType: pt.id }));
                            if (stepErrors.projectType) {
                              setStepErrors((prev) => {
                                const next = { ...prev };
                                delete next.projectType;
                                return next;
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setFormData((prev) => ({ ...prev, projectType: pt.id }));
                            }
                          }}
                          className={`group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent-subtle/50 shadow-md ring-1 ring-accent"
                              : "border-border/80 bg-surface/60 hover:border-accent/40 hover:bg-surface-hover/50"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                              isSelected
                                ? "bg-accent text-white border-accent"
                                : "bg-surface text-text-primary border-border group-hover:text-accent group-hover:border-accent/40"
                            }`}
                          >
                            {pt.icon}
                          </div>

                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-heading text-sm sm:text-base font-bold text-text-primary">
                                {pt.title}
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-accent-subtle">
                                {pt.badge}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {pt.description}
                            </p>
                          </div>

                          <div className="shrink-0 mt-1">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "bg-accent border-accent text-white"
                                  : "border-border/80 bg-surface"
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Campo de texto expansível se a opção for 'Outro' */}
                        {pt.id === "outro" && isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pl-4 pr-1"
                          >
                            <label htmlFor="otherProjectType" className="block text-xs font-bold text-text-primary mb-1.5">
                              {isEnglish ? "Describe your project:" : "Descreva o seu projeto:"}{" "}
                              <span className="text-accent">*</span>
                            </label>
                            <input
                              type="text"
                              id="otherProjectType"
                              name="otherProjectType"
                              value={formData.otherProjectType || ""}
                              onChange={handleInputChange}
                              placeholder={
                                isEnglish
                                  ? "E.g.: Online booking system, custom blog, technical consulting..."
                                  : "Ex: Plataforma de reservas online, renovação de blog, consultoria técnica..."
                              }
                              className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                                stepErrors.otherProjectType ? "border-destructive ring-1 ring-destructive" : "border-border"
                              }`}
                            />
                            {stepErrors.otherProjectType && (
                              <p className="mt-1 text-xs text-destructive">{stepErrors.otherProjectType}</p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {stepErrors.projectType && (
                  <p className="text-xs font-semibold text-destructive">{stepErrors.projectType}</p>
                )}

                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    withArrow
                    onClick={handleNextStep1}
                  >
                    {isEnglish ? "Proceed to Contact Preference" : "Avançar para Preferência de Contacto"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ==============================================================
                FASE 2: PREFERÊNCIA DE CONTACTO & FUNCIONALIDADES
                ============================================================== */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {isEnglish ? "How do you prefer to discuss the project?" : "Como prefere conversar sobre o projeto?"}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                    {isEnglish
                      ? "Select the most convenient channel for us to align and clarify questions."
                      : "Escolha o meio mais conveniente para alinharmos detalhes e esclarecer dúvidas."}
                  </p>
                </div>

                {/* Secção A: Preferência de Contacto */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                    {isEnglish ? "Communication Preference" : "Preferência de Comunicação"}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactPreferences.map((cp) => {
                      const isSelected = formData.contactPreference === cp.id;
                      return (
                        <div key={cp.id} className="flex flex-col">
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, contactPreference: cp.id }));
                              if (stepErrors.contactPreference) {
                                setStepErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.contactPreference;
                                  return next;
                                });
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setFormData((prev) => ({ ...prev, contactPreference: cp.id }));
                              }
                            }}
                            className={`rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer h-full flex flex-col justify-between ${
                              isSelected
                                ? "border-accent bg-accent-subtle/50 shadow-sm ring-1 ring-accent"
                                : "border-border/80 bg-surface/60 hover:border-accent/40 hover:bg-surface-hover/50"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2.5">
                                  <div className="text-text-primary group-hover:text-accent">
                                    {cp.icon}
                                  </div>
                                  <span className="font-heading text-sm font-bold text-text-primary">
                                    {cp.title}
                                  </span>
                                </div>
                                <div
                                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                    isSelected ? "bg-accent border-accent text-white" : "border-border"
                                  }`}
                                >
                                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </div>
                              </div>
                              <p className="text-[11px] text-text-secondary leading-relaxed">{cp.desc}</p>
                            </div>
                          </div>

                          {/* Se for Outro meio */}
                          {cp.id === "outro" && isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2.5"
                            >
                              <label htmlFor="otherContactPreference" className="block text-xs font-bold text-text-primary mb-1">
                                {isEnglish ? "Specify your preferred medium:" : "Especifique como prefere ser contactado:"}{" "}
                                <span className="text-accent">*</span>
                              </label>
                              <input
                                type="text"
                                id="otherContactPreference"
                                name="otherContactPreference"
                                value={formData.otherContactPreference || ""}
                                onChange={handleInputChange}
                                placeholder={
                                  isEnglish
                                    ? "E.g.: Google Meet video call, Telegram, etc."
                                    : "Ex: Videoconferência Google Meet, Telegram, etc."
                                }
                                className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                                  stepErrors.otherContactPreference ? "border-destructive ring-1 ring-destructive" : "border-border"
                                }`}
                              />
                              {stepErrors.otherContactPreference && (
                                <p className="mt-1 text-xs text-destructive">{stepErrors.otherContactPreference}</p>
                              )}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {stepErrors.contactPreference && (
                    <p className="text-xs font-semibold text-destructive">{stepErrors.contactPreference}</p>
                  )}
                </div>

                {/* Secção B: Funcionalidades Pretendidas (Multi-select) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                      {isEnglish ? "Relevant Features (Optional)" : "Funcionalidades Relevantes (Opcional)"}
                    </label>
                    <span className="text-[11px] text-text-muted">
                      {isEnglish ? "Select any that apply" : "Selecione as pretendidas"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featureTags.map((tag) => {
                      const isSelected = formData.features?.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleFeature(tag)}
                          className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent text-white shadow-sm"
                              : "border-border/80 bg-surface/70 text-text-primary hover:border-accent/50 hover:bg-surface-hover"
                          }`}
                        >
                          <span>{isSelected ? "✓" : "+"}</span>
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botões de Navegação */}
                <div className="pt-4 flex items-center justify-between border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isEnglish ? "← Back to Project Type" : "← Voltar ao Tipo de Projeto"}
                  </button>

                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    withArrow
                    onClick={handleNextStep2}
                  >
                    {isEnglish ? "Proceed to Your Details" : "Avançar para os Seus Dados"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ==============================================================
                FASE 3: DADOS DE CONTACTO & MENSAGEM FINAL
                ============================================================== */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {isEnglish ? "Where can I reach you?" : "Onde posso contactá-lo?"}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                    {isEnglish
                      ? "Provide your contact information so we can get in touch."
                      : "Indique os seus dados para que possamos iniciar a conversa."}
                  </p>
                </div>

                {/* Resumo Dinâmico das Fases Anteriores */}
                <div className="rounded-2xl border border-accent/20 bg-accent-subtle/30 p-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">
                      {isEnglish ? "Your selection summary:" : "Resumo da sua seleção:"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-accent hover:underline font-semibold text-[11px] cursor-pointer"
                    >
                      {isEnglish ? "Edit selection" : "Alterar seleção"}
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
                      {isEnglish ? "Preference:" : "Preferência:"} {selectedContactPreferenceTitle}
                    </span>
                    {formData.features && formData.features.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {formData.features.length} {isEnglish ? "features selected" : "funcionalidades selecionadas"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Nome & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      {isEnglish ? "Your Name or Company" : "O Seu Nome ou Empresa"} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={isEnglish ? "E.g.: Sarah Jenkins or Acme Ltd" : "Ex: Ana Silva ou Empresa Lda"}
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                        stepErrors.name ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                      }`}
                    />
                    {stepErrors.name && <p className="mt-1.5 text-xs text-destructive">{stepErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      {isEnglish ? "Email Address" : "Endereço de Email"} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={isEnglish ? "email@example.com" : "email@exemplo.pt"}
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
                    {isEnglish ? "Phone Number / WhatsApp" : "Contacto Telefónico / WhatsApp"}{" "}
                    {formData.contactPreference === "chamada" || formData.contactPreference === "whatsapp" ? (
                      <span className="text-accent">
                        {isEnglish ? "* (Required for the selected preference)" : "* (Necessário para a preferência selecionada)"}
                      </span>
                    ) : (
                      <span className="text-text-muted font-normal">
                        {isEnglish ? "(Optional)" : "(Opcional)"}
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={isEnglish ? "E.g.: +351 917 810 763" : "Ex: 917 810 763"}
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
                    {isEnglish ? "Tell me about your project & goals" : "Conte-me sobre o seu projeto & objetivos"}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      isEnglish
                        ? "Share a bit about your business, the desired results, and any visual or functional references you have..."
                        : "Conte-me um pouco sobre o seu negócio, os objetivos pretendidos e qualquer detalhe ou referência visual que ache relevante..."
                    }
                    disabled={isSubmitting}
                    className={`w-full rounded-2xl border bg-surface/70 p-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
                      stepErrors.message ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {stepErrors.message ? (
                      <p className="text-xs text-destructive">{stepErrors.message}</p>
                    ) : <span />}
                    <span className="text-[11px] text-text-muted">{formData.message.length}/2000</span>
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
                      {isEnglish ? (
                        <>
                          I authorize data handling strictly to respond to this request, in accordance with the{" "}
                          <Link href="/privacidade" className="text-accent underline underline-offset-2 hover:opacity-80">
                            Privacy Policy
                          </Link>
                          .
                        </>
                      ) : (
                        <>
                          Autorizo o tratamento dos dados estritamente para contacto em resposta a esta solicitação, conforme a{" "}
                          <Link href="/privacidade" className="text-accent underline underline-offset-2 hover:opacity-80">
                            Política de Privacidade
                          </Link>
                          .
                        </>
                      )}
                    </span>
                  </label>
                  {stepErrors.consent && <p className="mt-1.5 text-xs text-destructive">{stepErrors.consent}</p>}
                </div>

                {/* Botões Finais de Submissão */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 order-2 sm:order-1 cursor-pointer"
                  >
                    {isEnglish ? "← Back to Contact Preference" : "← Voltar à Preferência de Contacto"}
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
                      ? (isEnglish ? "Sending..." : "A enviar...")
                      : (isEnglish ? "Send Message" : "Enviar Mensagem")}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
