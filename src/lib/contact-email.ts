import { SITE_CONFIG } from "@/lib/constants";

/**
 * Envio do email de notificação do formulário de contacto (via Resend).
 *
 * Configuração por environment variables — ver `.env.local.example`:
 *
 * - `CONTACT_EMAIL`  — destino. Por omissão usa o email público do site.
 * - `RESEND_FROM`    — remetente. Por omissão usa `onboarding@resend.dev`, que
 *   o Resend só aceita em contas de teste (para o próprio email da conta).
 *   Em produção, definir um remetente com domínio verificado.
 */
export const CONTACT_RECIPIENT =
  process.env.CONTACT_EMAIL?.trim() || SITE_CONFIG.email;

export const CONTACT_FROM =
  process.env.RESEND_FROM?.trim() || "Portfolio Mateus <onboarding@resend.dev>";

const RESEND_API_URL = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 10_000;

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapa o input do utilizador antes de o interpolarmos no template HTML do email. */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}

/** Remove quebras de linha do input para não partir o assunto do email. */
function sanitizeOneLine(value: string, maxLength = 120): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  /** Tipo de projeto já resolvido (ex.: "Outro: ..." quando o utilizador escolhe "outro"). */
  projectType: string;
  /** Preferência de contacto já resolvida. */
  contactPreference: string;
  features?: string[];
  message: string;
}

export type SendContactEmailResult =
  /** Email entregue ao Resend. */
  | { status: "enviado" }
  /** `RESEND_API_KEY` não está configurada — nada foi enviado. */
  | { status: "sem-chave" }
  /** O Resend recusou ou a chamada falhou. */
  | { status: "falhou" };

function buildHtml(p: ContactEmailPayload): string {
  return `
    <h2>Novo Pedido de Contacto / Reunião</h2>
    <p><strong>Nome:</strong> ${escapeHtml(p.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(p.email)}</p>
    <p><strong>Telefone / WhatsApp:</strong> ${p.phone ? escapeHtml(p.phone) : "Não indicado"}</p>
    <p><strong>Tipo de Projeto:</strong> ${escapeHtml(p.projectType)}</p>
    <p><strong>Preferência de Contacto:</strong> ${escapeHtml(p.contactPreference)}</p>
    <p><strong>Funcionalidades Pretendidas:</strong> ${escapeHtml(p.features?.join(", ") || "Nenhuma específica")}</p>
    <p><strong>Mensagem / Ideia:</strong></p>
    <p style="white-space: pre-wrap; background: #f4f4f4; padding: 12px; border-radius: 6px;">${escapeHtml(p.message)}</p>
  `;
}

/**
 * Envia o email de notificação.
 *
 * Nunca lança: devolve um resultado discriminado para a rota decidir a resposta
 * HTTP. Os detalhes do erro ficam apenas no log do servidor.
 */
export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { status: "sem-chave" };

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_RECIPIENT],
        // Responder ao email do visitante chega diretamente a ele.
        reply_to: [payload.email],
        subject: `Novo Pedido de Contacto: ${sanitizeOneLine(payload.name)} (${sanitizeOneLine(payload.projectType, 60)})`,
        html: buildHtml(payload),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      // O corpo da resposta do Resend pode ecoar o input — fica só no servidor.
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] Resend respondeu ${response.status}: ${detail.slice(0, 300)}`
      );
      return { status: "falhou" };
    }

    return { status: "enviado" };
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error);
    console.error(`[contact] Falha ao contactar o Resend (${message})`);
    return { status: "falhou" };
  }
}
