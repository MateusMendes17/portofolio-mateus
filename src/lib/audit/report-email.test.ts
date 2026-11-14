import { describe, it, expect, vi, afterEach } from "vitest";
import { sendAuditReportEmail } from "./report-email";
import type { AuditResult } from "./types";

/** Resend sem domínio verificado responde 403 a qualquer destinatário que não seja o dono da conta. */
const result = { url: "https://cliente.pt/", overallScore: 72 } as AuditResult;
const pdf = new Uint8Array([37, 80, 68, 70]);

function mockResend(...statuses: number[]) {
  const calls: Array<{ to: string[]; attachments?: unknown[] }> = [];
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
    calls.push(JSON.parse(String(init.body)));
    return new Response("{}", { status: statuses[calls.length - 1] ?? 200 });
  }));
  return calls;
}

describe("sendAuditReportEmail", () => {
  afterEach(() => vi.unstubAllGlobals());
  process.env.RESEND_API_KEY = "re_test";

  it("envia ao visitante e avisa o dono", async () => {
    const calls = mockResend(200, 200);
    expect(await sendAuditReportEmail({ to: "cliente@ex.pt", locale: "pt", result, pdf })).toEqual({ status: "enviado" });
    expect(calls.map((c) => c.to[0])).toEqual(["cliente@ex.pt", expect.not.stringMatching("cliente@ex.pt")]);
  });

  it("se o Resend recusar o visitante (403), reencaminha o pedido e o PDF ao dono", async () => {
    const calls = mockResend(403, 200);
    expect(await sendAuditReportEmail({ to: "cliente@ex.pt", locale: "pt", result, pdf })).toEqual({ status: "reencaminhado" });
    expect(calls[1].to[0]).not.toBe("cliente@ex.pt");
    expect(calls[1].attachments).toHaveLength(1);
  });

  it("só falha se nem o dono puder ser avisado", async () => {
    mockResend(403, 403);
    expect(await sendAuditReportEmail({ to: "cliente@ex.pt", locale: "pt", result, pdf })).toEqual({ status: "falhou" });
  });
});
