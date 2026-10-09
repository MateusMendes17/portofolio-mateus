import { NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

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
function sanitizeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

export async function POST(request: Request) {
  // 0. Proteção CSRF: um pedido JSON legítimo vindo do nosso site envia o
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
      return NextResponse.json(
        { success: false, message: "Origem do pedido não autorizada." },
        { status: 403 }
      );
    }
  }

  // 1. Rate limiting por IP
  const ip = getClientIp(request);
  // Sem cabeçalhos de proxy (ex.: `next start` exposto diretamente) não há
  // como identificar o cliente — nesse caso todos partilham o mesmo bucket,
  // por isso usamos um teto mais alto para não bloquear visitantes legítimos.
  if (!rateLimit(ip, ip === "unknown" ? 30 : undefined)) {
    return NextResponse.json(
      {
        success: false,
        message: "Demasiados pedidos em sequência. Aguarde um minuto e tente novamente.",
      },
      { status: 429 }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Corpo do pedido inválido." },
        { status: 400 }
      );
    }

    const raw = (body ?? {}) as Record<string, unknown>;

    // 2. Honeypot anti-spam — verificado ANTES da validação para que um bot
    //    receba uma resposta de sucesso simulada em vez de um 400 que denuncia
    //    as regras de validação.
    if (typeof raw.honeypot === "string" && raw.honeypot.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. Validação com Zod
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

    const resolvedProjectType =
      data.projectType === "outro" && data.otherProjectType
        ? `Outro: ${data.otherProjectType}`
        : data.projectType;

    const resolvedContactPreference =
      data.contactPreference === "outro" && data.otherContactPreference
        ? `Outro: ${data.otherContactPreference}`
        : data.contactPreference;

    // 4. Registo do pedido
    console.log("=== NOVO PEDIDO DE CONTACTO RECEBIDO ===");
    console.log("Nome:", data.name);
    console.log("Email:", data.email);
    console.log("Telefone:", data.phone || "Não indicado");
    console.log("Tipo de Projeto:", resolvedProjectType);
    console.log("Preferência de Contacto:", resolvedContactPreference);
    console.log("Funcionalidades:", data.features?.join(", ") || "Nenhuma especificada");
    console.log("Mensagem:", data.message);
    console.log("Data/Hora:", new Date().toISOString());

    // 5. Envio de email via Resend
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Sem chave não há envio — nunca devolvemos "sucesso" em produção.
      console.error(
        "[contact] RESEND_API_KEY não está configurada — o email do contacto NÃO foi enviado."
      );
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Não foi possível enviar a sua mensagem neste momento. Por favor, contacte diretamente por WhatsApp ou email.",
          },
          { status: 500 }
        );
      }
    } else {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Mateus <onboarding@resend.dev>",
            to: ["mateuslm799@gmail.com"],
            subject: `Novo Pedido de Contacto: ${sanitizeSubject(data.name)} (${resolvedProjectType})`,
            html: `
              <h2>Novo Pedido de Contacto / Reunião</h2>
              <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
              <p><strong>Telefone / WhatsApp:</strong> ${data.phone ? escapeHtml(data.phone) : "Não indicado"}</p>
              <p><strong>Tipo de Projeto:</strong> ${escapeHtml(resolvedProjectType)}</p>
              <p><strong>Preferência de Contacto:</strong> ${escapeHtml(resolvedContactPreference)}</p>
              <p><strong>Funcionalidades Pretendidas:</strong> ${escapeHtml(data.features?.join(", ") || "Nenhuma específica")}</p>
              <p><strong>Mensagem / Ideia:</strong></p>
              <p style="white-space: pre-wrap; background: #f4f4f4; padding: 12px; border-radius: 6px;">${escapeHtml(data.message)}</p>
            `,
          }),
        });

        if (!resendRes.ok) {
          console.error("Erro ao enviar email via Resend:", await resendRes.text());
          return NextResponse.json(
            {
              success: false,
              message:
                "Houve um problema ao enviar a sua mensagem. Tente novamente ou fale comigo diretamente por WhatsApp.",
            },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error("Falha na chamada ao Resend:", err);
        return NextResponse.json(
          {
            success: false,
            message:
              "Não foi possível ligar ao serviço de email. Por favor, envie uma mensagem direta por WhatsApp ou email.",
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Obrigado pelo seu contacto! Responderei em menos de 24 horas.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no processamento do formulário:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro no servidor ao processar o seu pedido. Por favor, tente novamente.",
      },
      { status: 500 }
    );
  }
}
