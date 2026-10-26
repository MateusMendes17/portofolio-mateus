import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";
import * as safeFetchModule from "@/lib/audit/safe-fetch";

describe("POST /api/audit", () => {
  it("rejects non-json content type", async () => {
    const req = new NextRequest("http://localhost:3000/api/audit", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
      },
      body: "plain text",
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
  });

  it("rejects invalid origin", async () => {
    const req = new NextRequest("http://localhost:3000/api/audit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://evil-attacker.com",
        host: "localhost:3000",
      },
      body: JSON.stringify({ url: "https://example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("handles honeypot silently", async () => {
    const req = new NextRequest("http://localhost:3000/api/audit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        host: "localhost:3000",
      },
      body: JSON.stringify({ url: "https://example.com", honeypot: "bot-fill" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("executes audit stream successfully for valid url", async () => {
    vi.spyOn(safeFetchModule, "safeFetch").mockResolvedValueOnce({
      ok: true,
      url: "https://example.com",
      status: 200,
      headers: {
        "content-type": "text/html",
        "strict-transport-security": "max-age=31536000",
        "x-content-type-options": "nosniff",
      },
      html: `
        <!DOCTYPE html>
        <html lang="pt-PT">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Website Exemplo</title>
          </head>
          <body>
            <h1>Exemplo</h1>
          </body>
        </html>
      `,
    });

    const req = new NextRequest("http://localhost:3000/api/audit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        host: "localhost:3000",
      },
      body: JSON.stringify({ url: "https://example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/x-ndjson");

    const text = await res.text();
    const lines = text.trim().split("\n");
    expect(lines.length).toBeGreaterThan(1);

    const first = JSON.parse(lines[0]);
    expect(first.step).toBe("fetch");

    const last = JSON.parse(lines[lines.length - 1]);
    expect(last.result).toBeDefined();
    expect(last.result.url).toBe("https://example.com");
  });
});
