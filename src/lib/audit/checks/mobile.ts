import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

export function checkMobile(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);
  const head = root.querySelector("head");

  // Texto visível (sem scripts/estilos): evita falsos positivos com ids, JSON, "logo@2x.png", etc.
  const textRoot = parse(html);
  textRoot.querySelectorAll("script, style, noscript").forEach((el) => el.remove());
  const text = textRoot.text;

  const viewport = head?.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "";
  if (!viewport) {
    out.push(finding("mobile.viewport.missing", "mobile", "high", "audit.findings.mobile.viewport.missing.title", "audit.findings.mobile.viewport.missing.what", "audit.findings.mobile.viewport.missing.why", "audit.findings.mobile.viewport.missing.how"));
  } else if (!/width\s*=\s*device-width/i.test(viewport)) {
    out.push(finding("mobile.viewport.notResponsive", "mobile", "medium", "audit.findings.mobile.viewport.notResponsive.title", "audit.findings.mobile.viewport.notResponsive.what", "audit.findings.mobile.viewport.notResponsive.why", "audit.findings.mobile.viewport.notResponsive.how"));
  }

  // telefone clicável (um link de WhatsApp também conta como clicável)
  const telLinks = root.querySelectorAll('a[href^="tel:"]');
  const waLinks = root.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
  const phoneText = text.match(/(?:\+\d{1,3}[\s.-]?)?\b[239]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/g);
  if (telLinks.length === 0 && waLinks.length === 0 && phoneText && phoneText.length > 0) {
    out.push(finding("mobile.tel.missing", "mobile", "medium", "audit.findings.mobile.tel.missing.title", "audit.findings.mobile.tel.missing.what", "audit.findings.mobile.tel.missing.why", "audit.findings.mobile.tel.missing.how"));
  }

  // email mailto
  const mailtoLinks = root.querySelectorAll('a[href^="mailto:"]');
  const emailText = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g);
  if ((!mailtoLinks || mailtoLinks.length === 0) && emailText && emailText.length > 0) {
    out.push(finding("mobile.mailto.missing", "mobile", "low", "audit.findings.mobile.mailto.missing.title", "audit.findings.mobile.mailto.missing.what", "audit.findings.mobile.mailto.missing.why", "audit.findings.mobile.mailto.missing.how"));
  }

  // WhatsApp
  const hasPhone = !!phoneText || telLinks.length > 0;
  if (hasPhone && waLinks.length === 0) {
    out.push(finding("mobile.whatsapp.missing", "mobile", "low", "audit.findings.mobile.whatsapp.missing.title", "audit.findings.mobile.whatsapp.missing.what", "audit.findings.mobile.whatsapp.missing.why", "audit.findings.mobile.whatsapp.missing.how"));
  }

  // formulário de contacto
  // (só falha se não houver formulário nem caminho para um: link para a página
  // de contacto, mailto ou WhatsApp)
  const forms = root.querySelectorAll("form");
  const hasContactKeyword = /contacto|contact|fale connosco|enviar mensagem/i.test(text);
  const hasContactPath =
    mailtoLinks.length > 0 ||
    waLinks.length > 0 ||
    root.querySelectorAll("a[href]").some((a) => /contact|fale-connosco|orcamento|orçamento/i.test(a.getAttribute("href") ?? ""));
  if (hasContactKeyword && forms.length === 0 && !hasContactPath) {
    out.push(finding("mobile.form.missing", "mobile", "medium", "audit.findings.mobile.form.missing.title", "audit.findings.mobile.form.missing.what", "audit.findings.mobile.form.missing.why", "audit.findings.mobile.form.missing.how"));
  }

  // morada / mapa
  const hasAddressKeyword = /\bmorada\b|\baddress\b|localiza[çc][ãa]o|como chegar/i.test(text);
  const hasMap = /maps\.google|google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl|openstreetmap|leaflet|mapbox|maps\.apple\.com/i.test(html);
  if (hasAddressKeyword && !hasMap) {
    out.push(finding("mobile.map.missing", "mobile", "low", "audit.findings.mobile.map.missing.title", "audit.findings.mobile.map.missing.what", "audit.findings.mobile.map.missing.why", "audit.findings.mobile.map.missing.how"));
  }

  // horário (só relevante para negócios com atendimento local: morada ou telefone)
  if ((hasAddressKeyword || hasPhone) && !/hor[aá]rio|opening hours|atendimento/i.test(text)) {
    out.push(finding("mobile.hours.missing", "mobile", "low", "audit.findings.mobile.hours.missing.title", "audit.findings.mobile.hours.missing.what", "audit.findings.mobile.hours.missing.why", "audit.findings.mobile.hours.missing.how"));
  }

  return out;
}
