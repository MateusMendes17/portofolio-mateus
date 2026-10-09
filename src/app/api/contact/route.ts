import { NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactEmail, CONTACT_RECIPIENT } from "@/lib/contact-email";

/* Forma da resposta que o ContactForm espera: `{ success, message?, errors? }`. */

function success(message?: string): NextResponse {
  return NextResponse.json({ success: true, message }, { status: 200 });
}

function failure(message: string, status: number, headers?: HeadersInit): NextResponse {
  return NextResponse.json({ success: false, message }, { status, headers });
}

export async function POST(request: Request): Promise<NextResponse> {
  // 0. Só aceitamos JSON — recusa pedidos com outro content-type.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return failure("Tipo de conteúdo não suportado.", 415);
  }

  // 1. Proteção CSRF: um pedido JSON legítimo vindo do nosso site envia o
  //    cabeçalho Origin. Se vier de outro host, rejeitamos.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === host;
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) {
      return failure("Origem do pedido não autorizada.", 403);
    }
  }

  // 2. Rate limiting por IP (janela deslizante).
  const ip = getClientIp(request);
  // Sem cabeçalhos de proxy (ex.: `next start` exposto diretamente) não há
  // como identificar o cliente — nesse caso todos partilham o mesmo bucket,
  // por isso usamos um teto mais alto para não bloquear visitantes legítimos.
  const limit = checkRateLimit(ip, ip === "unknown" ? 30 : undefined);
  if (!limit.allowed) {
    return failure(
      "Demasiados pedidos em sequência. Aguarde um minuto e tente novamente.",
      429,
      { "Retry-After": String(limit.retryAfterSeconds) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return failure("Corpo do pedido inválido.", 400);
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // 3. Honeypot anti-spam — verificado ANTES da validação para que um bot
  //    receba uma resposta de sucesso simulada em vez de um 400 que denuncia
  //    as regras de validação.
  if (typeof raw.honeypot === "string" && raw.honeypot.trim() !== "") {
    return success();
  }

  // 4. Validação com Zod
  const validationResult = contactFormSchema.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        errors: z.flattenError(validationResult.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = validationResult.data;

  const projectType =
    data.projectType === "outro" && data.otherProjectType
      ? `Outro: ${data.otherProjectType}`
      : data.projectType;

  const contactPreference =
    data.contactPreference === "outro" && data.otherContactPreference
      ? `Outro: ${data.otherContactPreference}`
      : data.contactPreference;

  // 5. Registo do pedido — SEM dados pessoais (nome, email, telefone ou
  //    conteúdo da mensagem não ficam nos logs do servidor).
  console.info("[contact] Pedido validado", {
    projectType,
    contactPreference,
    features: data.features?.length ?? 0,
    messageLength: data.message.length,
    destination: CONTACT_RECIPIENT,
  });

  // 6. Envio de email
  const result = await sendContactEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    projectType,
    contactPreference,
    features: data.features,
    message: data.message,
  });

  if (result.status === "sem-chave") {
    if (process.env.NODE_ENV === "production") {
      // Em produção nunca devolvemos "sucesso" sem ter enviado nada.
      console.error(
        "[contact] RESEND_API_KEY não está configurada — o email NÃO foi enviado."
      );
      return failure(
        "Não foi possível enviar a sua mensagem neste momento. Por favor, contacte diretamente por WhatsApp ou email.",
        500
      );
    }
    // Em desenvolvimento o formulário continua testável, mas sem ilusões:
    // a mensagem diz explicitamente que nada foi enviado.
    console.warn(
      "[contact] RESEND_API_KEY em falta: mensagem validada mas NÃO enviada (apenas desenvolvimento)."
    );
    return success(
      "(Desenvolvimento) Mensagem validada, mas não enviada: falta a RESEND_API_KEY."
    );
  }

  if (result.status === "falhou") {
    return failure(
      "Houve um problema ao enviar a sua mensagem. Tente novamente ou fale comigo diretamente por WhatsApp.",
      502
    );
  }

  console.info("[contact] Email enviado com sucesso.");
  return success("Obrigado pelo seu contacto! Responderei em menos de 24 horas.");
}
