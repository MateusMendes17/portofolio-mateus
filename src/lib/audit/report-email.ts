import { CONTACT_FROM, CONTACT_RECIPIENT } from "@/lib/contact-email";
import type { Locale } from "./text";
import type { AuditResult } from "./types";

const RESEND_API_URL = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 15_000;

export type SendReportResult = { status: "enviado" } | { status: "sem-chave" } | { status: "falhou" };

const HTML_ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c] ?? c);

async function resend(body: Record<string, unknown>, apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!res.ok) {
      // O corpo pode ecoar o input (email do visitante): só o estado vai para o log.
      console.error(`[audit-report] Resend respondeu ${res.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[audit-report] falha ao contactar o Resend:", error instanceof Error ? error.name : "erro");
    return false;
  }
}

/**
 * Envia o PDF ao visitante e avisa o dono do site de que há um novo contacto.
 * O aviso só é enviado se o PDF seguiu; nunca lança.
 */
export async function sendAuditReportEmail(input: {
  to: string;
  locale: Locale;
  result: AuditResult;
  pdf: Uint8Array;
}): Promise<SendReportResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { status: "sem-chave" };

  const en = input.locale === "en";
  const host = (() => {
    try {
      return new URL(input.result.url).host;
    } catch {
      return "website";
    }
  })();

  const subject = en
    ? `Your website report: ${host} (${input.result.overallScore}/100)`
    : `O relatório do seu site: ${host} (${input.result.overallScore}/100)`;

  const html = en
    ? `<p>Hello,</p><p>Attached is the PDF report for <strong>${escapeHtml(host)}</strong>, with an overall score of <strong>${input.result.overallScore}/100</strong>.</p><p>If you want help with the priority fixes, just reply to this email.</p><p>Mateus Mendes</p>`
    : `<p>Olá,</p><p>Segue em anexo o relatório em PDF de <strong>${escapeHtml(host)}</strong>, com nota geral <strong>${input.result.overallScore}/100</strong>.</p><p>Se quiser ajuda com as correções prioritárias, basta responder a este email.</p><p>Mateus Mendes</p>`;

  const sent = await resend(
    {
      from: CONTACT_FROM,
      to: [input.to],
      reply_to: [CONTACT_RECIPIENT],
      subject,
      html,
      attachments: [
        {
          filename: `relatorio-${host.replace(/[^a-z0-9.-]/gi, "")}.pdf`,
          content: Buffer.from(input.pdf).toString("base64"),
        },
      ],
    },
    apiKey
  );
  if (!sent) return { status: "falhou" };

  // Lead: o visitante autorizou expressamente o contacto (consentimento obrigatório na rota).
  await resend(
    {
      from: CONTACT_FROM,
      to: [CONTACT_RECIPIENT],
      reply_to: [input.to],
      subject: `Novo lead (relatório PDF): ${host} [${input.result.overallScore}/100]`,
      html: `<p><strong>Email:</strong> ${escapeHtml(input.to)}</p><p><strong>Site:</strong> ${escapeHtml(input.result.url)}</p><p><strong>Nota:</strong> ${input.result.overallScore}/100</p><p>O visitante pediu o relatório em PDF e autorizou o contacto.</p>`,
    },
    apiKey
  );

  return { status: "enviado" };
}
