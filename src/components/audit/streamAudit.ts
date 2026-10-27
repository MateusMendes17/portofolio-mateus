import type { AuditResult } from "@/lib/audit/types";

export type StreamAuditOutcome =
  | { ok: true; result: AuditResult }
  | { ok: false; error: string | null; status?: number };

/**
 * Chama /api/audit e lê o stream NDJSON. `onStep` recebe cada passo de progresso.
 * `error: null` significa "usar a mensagem genérica da interface".
 */
export async function streamAudit(
  url: string,
  onStep: (step: { step: string; message: string; done: boolean }) => void
): Promise<StreamAuditOutcome> {
  let res: Response;
  try {
    res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch {
    return { ok: false, error: null };
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: false, error: data.error ?? null, status: res.status };
  }

  const reader = res.body?.getReader();
  if (!reader) return { ok: false, error: null };

  const decoder = new TextDecoder();
  let buffer = "";
  let result: AuditResult | null = null;
  let error: string | null = null;

  const handleLine = (line: string) => {
    if (!line.trim()) return;
    let obj: Record<string, unknown>;
    try {
      obj = JSON.parse(line);
    } catch {
      return;
    }
    if (obj.error) error = String(obj.error);
    else if (obj.result) result = obj.result as AuditResult;
    else if (obj.step) onStep({ step: String(obj.step), message: String(obj.message ?? ""), done: Boolean(obj.done) });
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      lines.forEach(handleLine);
    }
    handleLine(buffer);
  } catch {
    return { ok: false, error: null };
  }

  if (result) return { ok: true, result };
  return { ok: false, error };
}
