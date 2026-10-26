import { SOCIAL_LINKS } from "@/lib/constants";

/**
 * Gera mensagens contextuais para WhatsApp baseadas na página atual.
 * Remove a fricção de o cliente ter de explicar "onde estava / o que viu".
 */

type WhatsAppMessageKey =
  | "home"
  | "servicos"
  | "servicos-websites"
  | "servicos-landing"
  | "servicos-loja"
  | "servicos-webapp"
  | "servicos-manutencao"
  | "projetos"
  | "projeto-detalhe"
  | "sobre"
  | "contacto"
  | "form-success"
  | "default";

const messagesPT: Record<WhatsAppMessageKey, string> = {
  home: "Olá Mateus, vi o teu website e gostaria de conversar sobre um projeto!",
  servicos: "Olá Mateus, vi os vossos serviços de desenvolvimento web. Gostaria de saber mais sobre como podem ajudar o meu negócio.",
  "servicos-websites": "Olá Mateus, vi os vossos websites institucionais. Preciso de um site que transmita autoridade e converta visitantes em contactos. Como funciona o processo e qual o investimento?",
  "servicos-landing": "Olá Mateus, vi as vossas landing pages de alta conversão. Tenho campanhas Google/Meta Ads e preciso de uma página que converta tráfego pago em leads. Qual o prazo e investimento?",
  "servicos-loja": "Olá Mateus, vi a vossa loja online com MB WAY e Multibanco. Quero vender produtos em Portugal e preciso de checkout com pagamentos portugueses. Qual o investimento base?",
  "servicos-webapp": "Olá Mateus, vi as vossas aplicações web e portais personalizados. Preciso de automatizar processos internos / criar área de clientes. Podemos agendar uma chamada para alinhar?",
  "servicos-manutencao": "Olá Mateus, vi o vosso serviço de redesign e manutenção. Tenho um site antigo/lento que precisa de ser modernizado. Fazem auditoria gratuita primeiro?",
  projetos: "Olá Mateus, vi o vosso portfólio e gostei dos casos de estudo. Tenho um projeto similar e gostava de perceber prazos e investimento.",
  "projeto-detalhe": "Olá Mateus, vi este projeto em detalhe no vosso portfólio. Tenho necessidades parecidas e quero saber mais sobre a abordagem técnica.",
  sobre: "Olá Mateus, li a vossa página 'Sobre' e identifico-me com a vossa metodologia. Gostava de falar sobre o meu projeto.",
  contacto: "Olá Mateus, vim do vosso formulário de contacto. Tenho um projeto em mente e gostava de agendar uma chamada de 15min para alinhar.",
  "form-success": "Olá Mateus, acabei de enviar uma mensagem através do vosso website. Gostaria de agilizar a conversa por WhatsApp.",
  default: "Olá Mateus, vi o vosso trabalho e gostaria de conversar sobre um projeto!",
};

const messagesEN: Record<WhatsAppMessageKey, string> = {
  home: "Hello Mateus, I saw your website and would like to discuss a project!",
  servicos: "Hello Mateus, I saw your web development services. I'd like to know how you can help my business.",
  "servicos-websites": "Hello Mateus, I saw your corporate websites. I need a site that conveys authority and converts visitors into leads. How does the process work and what's the investment?",
  "servicos-landing": "Hello Mateus, I saw your high-conversion landing pages. I run Google/Meta Ads campaigns and need a page that converts paid traffic into leads. What's the timeline and investment?",
  "servicos-loja": "Hello Mateus, I saw your online store with MB WAY and Multibanco. I want to sell products in Portugal and need checkout with Portuguese payment methods. What's the base investment?",
  "servicos-webapp": "Hello Mateus, I saw your custom web applications and portals. I need to automate internal processes / create a client area. Can we schedule a call to align?",
  "servicos-manutencao": "Hello Mateus, I saw your redesign and maintenance service. I have an old/slow site that needs modernization. Do you do a free audit first?",
  projetos: "Hello Mateus, I saw your portfolio and liked the case studies. I have a similar project and would like to understand timelines and investment.",
  "projeto-detalhe": "Hello Mateus, I saw this project in detail on your portfolio. I have similar needs and want to know more about the technical approach.",
  sobre: "Hello Mateus, I read your 'About' page and resonate with your methodology. I'd like to discuss my project.",
  contacto: "Hello Mateus, I came from your contact form. I have a project in mind and would like to schedule a 15min call to align.",
  "form-success": "Hello Mateus, I just submitted a message through your website. I'd like to speed up the conversation via WhatsApp.",
  default: "Hello Mateus, I saw your work and would like to discuss a project!",
};

function getMessageKey(pathname: string): WhatsAppMessageKey {
  // Exact matches first
  if (pathname === "/") return "home";
  if (pathname === "/contacto") return "contacto";
  if (pathname === "/sobre") return "sobre";
  if (pathname === "/projetos") return "projetos";
  if (pathname.startsWith("/projetos/")) return "projeto-detalhe";

  // Service sub-pages (anchors on /servicos)
  if (pathname === "/servicos") {
    // We can't detect anchor from pathname alone, so default to servicos
    // The components using this will pass the specific key if they know it
    return "servicos";
  }

  return "default";
}

export function getWhatsAppUrl(
  pathname: string,
  locale: "pt" | "en" = "pt",
  overrideKey?: WhatsAppMessageKey
): string {
  const key = overrideKey ?? getMessageKey(pathname);
  const messages = locale === "en" ? messagesEN : messagesPT;
  const message = messages[key] ?? messages.default;
  return `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppMessage(
  pathname: string,
  locale: "pt" | "en" = "pt",
  overrideKey?: WhatsAppMessageKey
): string {
  const key = overrideKey ?? getMessageKey(pathname);
  const messages = locale === "en" ? messagesEN : messagesPT;
  return messages[key] ?? messages.default;
}

// Helper para componentes que sabem o contexto específico (ex: cards de serviço)
export const WHATSAPP_KEYS = {
  home: "home" as WhatsAppMessageKey,
  servicos: "servicos" as WhatsAppMessageKey,
  websites: "servicos-websites" as WhatsAppMessageKey,
  landing: "servicos-landing" as WhatsAppMessageKey,
  loja: "servicos-loja" as WhatsAppMessageKey,
  webapp: "servicos-webapp" as WhatsAppMessageKey,
  manutencao: "servicos-manutencao" as WhatsAppMessageKey,
  projetos: "projetos" as WhatsAppMessageKey,
  projetoDetalhe: "projeto-detalhe" as WhatsAppMessageKey,
  sobre: "sobre" as WhatsAppMessageKey,
  contacto: "contacto" as WhatsAppMessageKey,
  formSuccess: "form-success" as WhatsAppMessageKey,
} as const;