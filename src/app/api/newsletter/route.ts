import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  name: z.string().max(100).optional(),
  locale: z.enum(["pt", "en"]).default("pt"),
});

/**
 * POST /api/newsletter
 * Subscreve um email na newsletter via Resend
 * Requer RESEND_API_KEY no ambiente
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, locale } = newsletterSchema.parse(body);

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || "newsletter@mateusmendes.pt";
    const audienceId = process.env.RESEND_AUDIENCE_ID; // Opcional: para gerir contactos no Resend

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY não configurado — a simular sucesso");
      // Em desenvolvimento sem API key, retorna sucesso para testar UI
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ success: true, message: "Subscrito (modo dev)" });
      }
      return NextResponse.json(
        { success: false, message: "Serviço de email não configurado" },
        { status: 503 }
      );
    }

    // 1. Adicionar contacto ao Resend (se audienceId existir)
    if (audienceId) {
      try {
        await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name: name?.split(" ")[0] || "",
            last_name: name?.split(" ").slice(1).join(" ") || "",
            unsubscribed: false,
          }),
        });
      } catch (audienceError) {
        // Não falha se audience falhar - o email ainda é enviado
        console.warn("Erro ao adicionar à audience Resend:", audienceError);
      }
    }

    // 2. Enviar email de boas-vindas com link do lead magnet
    const leadMagnetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://mateusmendes.pt"}/lead-magnet/checklist-conversao.pdf`;
    
    const emailHtml = locale === "en" ? `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #362C24; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #9E6747; font-size: 28px; margin: 0;">Welcome to the Newsletter! 🎉</h1>
          </div>
          
          <p>Hi ${name || "there"},</p>
          
          <p>Thanks for subscribing! Here's your free resource:</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${leadMagnetUrl}" style="display: inline-block; background: #9E6747; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
              📥 Download: 12-Point Website Conversion Checklist
            </a>
          </div>
          
          <p><strong>What you'll get:</strong></p>
          <ul style="padding-left: 20px;">
            <li>12 actionable items to audit your website today</li>
            <li>Quick wins for speed, SEO & conversion</li>
            <li>No fluff — just what moves the needle</li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #E6D5C3; margin: 32px 0;" />
          
          <p style="font-size: 14px; color: #6A5A4B;">
            You'll receive 1-2 emails/month with case studies, technical tips, and occasional availability updates. 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://mateusmendes.pt"}/privacidade" style="color: #9E6747;">Privacy Policy</a> | 
            <a href="#" style="color: #9E6747;">Unsubscribe</a>
          </p>
          
          <p style="margin-top: 24px;">— Mateus Mendes<br/>Web Developer, Portugal</p>
        </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #362C24; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #9E6747; font-size: 28px; margin: 0;">Bem-vindo à Newsletter! 🎉</h1>
          </div>
          
          <p>Olá ${name || "tudo bem"},</p>
          
          <p>Obrigado por subscrever! Aqui está o seu recurso gratuito:</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${leadMagnetUrl}" style="display: inline-block; background: #9E6747; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
              📥 Baixar: Checklist de Conversão — 12 Pontos
            </a>
          </div>
          
          <p><strong>O que vai encontrar:</strong></p>
          <ul style="padding-left: 20px;">
            <li>12 itens acionáveis para auditar o seu site hoje</li>
            <li>Quick wins para velocidade, SEO e conversão</li>
            <li>Sem enchimento — só o que traz resultados</li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #E6D5C3; margin: 32px 0;" />
          
          <p style="font-size: 14px; color: #6A5A4B;">
            Vai receber 1-2 emails/mês com case studies, dicas técnicas e atualizações ocasionais de disponibilidade. 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://mateusmendes.pt"}/privacidade" style="color: #9E6747;">Política de Privacidade</a> | 
            <a href="#" style="color: #9E6747;">Cancelar subscrição</a>
          </p>
          
          <p style="margin-top: 24px;">— Mateus Mendes<br/>Programador Web, Portugal</p>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Mateus Mendes <${fromEmail}>`,
        to: [email],
        subject: locale === "en" 
          ? "Your Free Website Conversion Checklist 📥" 
          : "O Seu Checklist Grátis de Conversão de Sites 📥",
        html: emailHtml,
        tags: [
          { name: "category", value: "newsletter_welcome" },
          { name: "locale", value: locale },
        ],
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.json();
      console.error("Resend error:", error);
      throw new Error("Falha ao enviar email de boas-vindas");
    }

    return NextResponse.json({ success: true, message: "Subscrito com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]?.message || "Dados inválidos";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}