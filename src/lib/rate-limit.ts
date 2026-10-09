/**
 * Rate limiter em memória (janela deslizante) para a API de contacto.
 * Sem dependências externas.
 *
 * Nota: em serverless (Vercel) cada instância mantém o seu próprio mapa, logo o
 * limite é por instância e não global. Chega para travar spam automatizado;
 * para um limite global deveria usar Upstash/Redis.
 */

export interface RateLimitResult {
  allowed: boolean;
  /** Segundos até poder tentar de novo (0 quando o pedido foi aceite). */
  retryAfterSeconds: number;
}

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60_000;
const MAX_KEYS = 10_000;

const buckets = new Map<string, number[]>();
let lastPrune = 0;

/** Remove entradas expiradas quando o mapa cresce demais (no máximo 1× por janela). */
function prune(now: number, windowMs: number): void {
  if (buckets.size < MAX_KEYS || now - lastPrune < windowMs) return;
  lastPrune = now;

  const cutoff = now - windowMs;
  for (const [key, stamps] of buckets) {
    const alive = stamps.filter((t) => t > cutoff);
    if (alive.length === 0) buckets.delete(key);
    else buckets.set(key, alive);
  }
}

/**
 * Regista um pedido para `key` e devolve a decisão.
 *
 * Janela deslizante: quando o limite é atingido, o tempo de espera indicado é
 * o que falta para a entrada mais antiga sair da janela — não um minuto fixo.
 */
export function checkRateLimit(
  key: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;
  const stamps = (buckets.get(key) ?? []).filter((t) => t > cutoff);

  if (stamps.length >= limit) {
    buckets.set(key, stamps);
    const oldest = stamps[0] ?? now;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  stamps.push(now);
  buckets.set(key, stamps);
  prune(now, windowMs);
  return { allowed: true, retryAfterSeconds: 0 };
}

/** IP do cliente, prioritizando os cabeçalhos definidos pelo proxy.
 *
 * Nota: num servidor exposto diretamente (sem proxy a truncar o cabeçalho)
 * um cliente pode forjar `X-Forwarded-For` para contornar o limite — a proteção
 * completa exige o proxy a sobrescrever o cabeçalho ou um rate limit global
 * (Upstash/Redis).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
