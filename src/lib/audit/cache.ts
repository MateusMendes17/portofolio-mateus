import type { AuditResult } from "./types";

/**
 * Cache em memória (24h por URL normalizado) — por instância, não global.
 * Partilhada pela rota de análise e pela rota do relatório em PDF, que lê daqui
 * em vez de voltar a analisar o site.
 */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 500;
// globalThis: as rotas /api/audit e /api/audit/report podem ser empacotadas em separado.
const globalForCache = globalThis as unknown as { __auditCache?: Map<string, { result: AuditResult; expires: number }> };
const cache = (globalForCache.__auditCache ??= new Map());

export function getCachedAudit(normalizedUrl: string): AuditResult | null {
  const hit = cache.get(normalizedUrl);
  if (!hit) return null;
  if (hit.expires <= Date.now()) {
    cache.delete(normalizedUrl);
    return null;
  }
  return hit.result;
}

export function setCachedAudit(normalizedUrl: string, result: AuditResult): void {
  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(normalizedUrl, { result, expires: Date.now() + CACHE_TTL_MS });
}

/** CSRF: aceita pedidos sem Origin (same-origin) ou com Origin igual ao host do servidor. */
export function isAllowedOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return true;
  const host = headers.get("host");
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}
