"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

export function PrivacidadeView() {
  const { isEnglish } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Link href="/" className="text-xs font-semibold text-accent hover:underline mb-3 inline-block">
          {isEnglish ? "← Back to home page" : "← Voltar à página inicial"}
        </Link>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
          {isEnglish ? "Privacy Policy & GDPR" : "Política de Privacidade & RGPD"}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          {isEnglish ? "Last updated: October 2026" : `Última atualização: ${new Date().toLocaleDateString("pt-PT", { month: "long", year: "numeric" })}`}
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-8 sm:p-12 shadow-sm space-y-8 text-sm leading-relaxed text-text-secondary">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "1. Data Controller" : "1. Responsável pelo Tratamento de Dados"}
          </h2>
          <p>
            {isEnglish ? (
              <>
                The data controller responsible for personal information collected through this website is <strong>{SITE_CONFIG.name}</strong>, with direct contact at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </>
            ) : (
              <>
                O responsável pelo tratamento dos dados recolhidos através deste website é <strong>{SITE_CONFIG.name}</strong>, com endereço eletrónico de contacto em{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </>
            )}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "2. Collected Data & Purpose" : "2. Dados Recolhidos e Finalidade"}
          </h2>
          <p>
            {isEnglish
              ? "Information collected via the contact form (name, email address, phone/WhatsApp, project type, communication preference, and message) is strictly used to:"
              : "Os dados recolhidos através do formulário de contacto (nome, endereço de email, contacto telefónico, tipo de projeto, preferência de contacto e mensagem) destinam-se exclusivamente a:"}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {isEnglish ? (
              <>
                <li>Respond directly to inquiries and provide technical consultations;</li>
                <li>Deliver tailored proposals for requested digital development services;</li>
                <li>Schedule alignment calls or introductory meetings with the user.</li>
              </>
            ) : (
              <>
                <li>Responder a pedidos de informação e esclarecimento de dúvidas;</li>
                <li>Apresentar propostas personalizadas relativas aos serviços solicitados;</li>
                <li>Agendamento de reuniões ou chamadas de alinhamento com o utilizador.</li>
              </>
            )}
          </ul>
          <p>
            {isEnglish ? (
              <>
                Your personal details are <strong>never</strong> sold, rented, or distributed to 3rd parties for advertising or unauthorized uses.
              </>
            ) : (
              <>
                Os seus dados <strong>nunca</strong> serão vendidos, cedidos a terceiros para efeitos de marketing ou utilizados para qualquer fim não autorizado.
              </>
            )}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "3. Legal Basis for Processing" : "3. Base Legal para o Tratamento"}
          </h2>
          <p>
            {isEnglish
              ? "Data processing is grounded upon explicit consent granted by the user when submitting the contact inquiry form (Article 6(1)(a) of the General Data Protection Regulation — GDPR)."
              : "O tratamento dos seus dados fundamenta-se no consentimento expresso prestado pelo utilizador no momento da submissão do formulário de contacto (Artigo 6.º, n.º 1, alínea a) do Regulamento Geral sobre a Proteção de Dados — RGPD)."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "4. Data Retention" : "4. Conservação dos Dados"}
          </h2>
          <p>
            {isEnglish
              ? "Personal records are retained only for the duration required to address your consultation and support commercial communications, after which they are safely purged."
              : "Os dados pessoais serão conservados apenas durante o período necessário para responder à sua solicitação e dar seguimento à eventual relação comercial, sendo eliminados decorrido o prazo legal ou caso solicite o seu apagamento."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "5. User Rights" : "5. Direitos do Titular dos Dados"}
          </h2>
          <p>
            {isEnglish ? (
              <>
                Under GDPR legislation, you hold the right to access, rectify, or request deletion of your stored details at any moment by sending a request to{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </>
            ) : (
              <>
                Nos termos do RGPD, tem o direito de aceder, retificar, limitar ou solicitar o apagamento dos seus dados pessoais a qualquer momento. Para exercer estes direitos, basta enviar uma mensagem para{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </>
            )}
          </p>
        </section>

        <section className="space-y-3 border-t border-border/60 pt-6">
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {isEnglish ? "6. Cookies & Local Storage" : "6. Cookies e Rastreamento"}
          </h2>
          <p>
            {isEnglish
              ? "This website does not deploy invasive tracking or advertising cookies. It strictly utilizes localStorage to retain your interface preferences (Theme & Language selection)."
              : "Este website não utiliza cookies invasivos ou de publicidade direcionada. Utiliza unicamente armazenamento local estritamente necessário para guardar as suas preferências de tema (Dia / Noite) e idioma (PT / EN)."}
          </p>
        </section>
      </div>
    </div>
  );
}
