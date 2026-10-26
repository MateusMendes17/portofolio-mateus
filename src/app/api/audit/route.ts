import { NextRequest } from "next/server";
import { z } from "zod";
import { normalizeUrl } from "@/lib/audit/safe-fetch";
import { buildReport } from "@/lib/audit/report";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { AuditResult } from "@/lib/audit/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const auditSchema = z.object({
  url: z.string().min(1).max(2048),
  honeypot: z.string().optional(),
});

// Cache em memória (24h por URL normalizado) — por instância, não global.
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, { result: AuditResult; expires: number }>();

// Limite diário global (por instância)
const DAILY_LIMIT = Number(process.env.AUDIT_DAILY_LIMIT ?? 100);
let dailyCount = 0;
let dailyReset = startOfDay();

function startOfDay(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime() + 24 * 60 * 60 * 1000;
}

function checkDailyLimit(): boolean {
  const now = Date.now();
  if (now >= dailyReset) {
    dailyCount = 0;
    dailyReset = now + (24 * 60 * 60 * 1000 - (now % (24 * 60 * 60 * 1000)));
  }
  if (dailyCount >= DAILY_LIMIT) return false;
  dailyCount++;
  return true;
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin requests may omit Origin
  const host = request.headers.get("host");
  try {
    const o = new URL(origin);
    return !!host && o.host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return new Response(JSON.stringify({ error: "Origem não permitida." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Content-Type inválido." }), {
      status: 415,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Dados inválidos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (parsed.data.honeypot) {
    // Simular sucesso para bots
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, 5, 60 * 60 * 1000);
  if (!rl.allowed) {
    return new Response(JSON.stringify({ error: `Limite excedido. Tente novamente em ${rl.retryAfterSeconds}s.` }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(rl.retryAfterSeconds),
      },
    });
  }

  if (!checkDailyLimit()) {
    return new Response(JSON.stringify({ error: "Limite diário atingido. Tente mais tarde." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const normalized = normalizeUrl(parsed.data.url);
  if (!normalized) {
    return new Response(JSON.stringify({ error: "URL inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Cache check
  const cached = cache.get(normalized);
  if (cached && cached.expires > Date.now()) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(JSON.stringify({ step: "cache", done: true, message: "Resultado em cache." }) + "\n"));
        controller.enqueue(enc.encode(JSON.stringify({ result: { ...cached.result, fromCache: true } }) + "\n"));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const send = (obj: unknown) => controller.enqueue(enc.encode(JSON.stringify(obj) + "\n"));

      try {
        send({ step: "fetch", done: false, message: "A obter a página..." });
        const report = await buildReport({
          url: normalized,
          onProgress: (step, message) => send({ step, done: false, message }),
        });

        if ("error" in report) {
          send({ error: report.error });
          controller.close();
          return;
        }

        // Guardar em cache
        cache.set(normalized, { result: report, expires: Date.now() + CACHE_TTL_MS });

        send({ step: "done", done: true, message: "Análise concluída." });
        send({ result: report });
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro desconhecido.";
        // Sem PII nos logs
        console.error("[audit] falha:", msg);
        send({ error: "Ocorreu um erro ao analisar o site." });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
