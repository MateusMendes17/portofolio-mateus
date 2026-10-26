import dns from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import { URL } from "node:url";

export const USER_AGENT = "AvaliadorMateus/1.0 (+https://mateusmendes.pt)";

export const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
export const TIMEOUT_MS = 8_000;
export const MAX_REDIRECTS = 5;

export type SafeFetchError =
  | "invalid-url"
  | "unsupported-protocol"
  | "unsupported-port"
  | "blocked-host"
  | "blocked-ip"
  | "dns-failed"
  | "too-large"
  | "wrong-content-type"
  | "timeout"
  | "inaccessible"
  | "too-many-redirects"
  | "invalid-certificate";

export interface SafeFetchResult {
  ok: true;
  url: string;
  status: number;
  html: string;
  headers: Record<string, string>;
}

export interface SafeFetchFailure {
  ok: false;
  error: SafeFetchError;
  message: string;
}

export type SafeFetchOutcome = SafeFetchResult | SafeFetchFailure;

/* ------------------------------------------------------------------ */
/* Normalização de URL                                                 */
/* ------------------------------------------------------------------ */

export function normalizeUrl(input: string): string | null {
  let raw = input.trim();
  if (!raw) return null;
  // Adicionar protocolo se faltar
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    raw = "https://" + raw;
  }
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  // Remover credenciais e fragmento
  u.username = "";
  u.password = "";
  u.hash = "";
  // Porta: apenas 80/443 ou default
  if (u.port && u.port !== "80" && u.port !== "443") return null;
  // Normalizar: remover trailing slash? manter path
  return u.toString();
}

/* ------------------------------------------------------------------ */
/* Validação de IP                                                    */
/* ------------------------------------------------------------------ */

function ipToLong(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let acc = 0;
  for (const p of parts) {
    // Detectar octal/hex/decimal
    let val: number;
    if (/^0[xX]/.test(p)) val = parseInt(p, 16);
    else if (/^0[0-7]+$/.test(p) && p.length > 1) val = parseInt(p, 8);
    else if (/^\d+$/.test(p)) val = parseInt(p, 10);
    else return null;
    if (Number.isNaN(val) || val < 0 || val > 255) return null;
    acc = (acc << 8) + val;
  }
  // converter para unsigned
  return acc >>> 0;
}

function isPrivateIpv4(ip: string): boolean {
  const n = ipToLong(ip);
  if (n === null) return true; // inválido = bloquear
  // 0.0.0.0/8, 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12,
  // 192.168.0.0/16, 100.64.0.0/10, 192.0.0.0/24, 192.0.2.0/24, 198.18.0.0/15,
  // 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4 (multicast), 240.0.0.0/4
  const ranges: Array<[number, number]> = [
    [0x00000000, 0x00ffffff], // 0.0.0.0/8
    [0x0a000000, 0x0affffff], // 10.0.0.0/8
    [0x7f000000, 0x7fffffff], // 127.0.0.0/8
    [0xa9fe0000, 0xa9feffff], // 169.254.0.0/16
    [0xac100000, 0xac1fffff], // 172.16.0.0/12
    [0xc0a80000, 0xc0a8ffff], // 192.168.0.0/16
    [0x64400000, 0x647fffff], // 100.64.0.0/10
    [0xc0000000, 0xc00000ff], // 192.0.0.0/24
    [0xc0000200, 0xc00002ff], // 192.0.2.0/24
    [0xc6120000, 0xc613ffff], // 198.18.0.0/15
    [0xc6336400, 0xc63364ff], // 198.51.100.0/24
    [0xcb007100, 0xcb0071ff], // 203.0.113.0/24
    [0xe0000000, 0xefffffff], // 224.0.0.0/4 multicast
    [0xf0000000, 0xffffffff], // 240.0.0.0/4 reserved
  ];
  // metadata cloud
  if (n === 0xa9fea9fe) return true; // 169.254.169.254
  for (const [a, b] of ranges) {
    if (n >= a && n <= b) return true;
  }
  return false;
}

function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  // loopback ::1
  if (lower === "::1" || lower === "0:0:0:0:0:0:0:1") return true;
  // unspecified ::
  if (lower === "::" || lower === "0:0:0:0:0:0:0:0") return true;
  // unique local fc00::/7
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  // link-local fe80::/10
  if (lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb")) return true;
  // multicast ff00::/8
  if (lower.startsWith("ff")) return true;
  // IPv4-mapped ::ffff:a.b.c.d
  const v4mapped = lower.match(/^::ffff:(.+)$/);
  if (v4mapped) {
    const v4 = v4mapped[1];
    // pode ser hex
    if (v4.includes(":")) return true;
    if (net.isIP(v4) === 4) return isPrivateIpv4(v4);
    return true;
  }
  // 6to4, teredo etc. bloquear por segurança
  if (lower.startsWith("2002:") || lower.startsWith("2001:0:")) return true;
  return false;
}

export function isBlockedIp(ip: string): boolean {
  const family = net.isIP(ip);
  if (family === 4) return isPrivateIpv4(ip);
  if (family === 6) return isPrivateIpv6(ip);
  return true; // desconhecido = bloquear
}

export function isBlockedHost(host: string): boolean {
  const lower = host.toLowerCase().replace(/\.$/, "");
  if (lower === "localhost" || lower.endsWith(".localhost")) return true;
  if (lower.endsWith(".local") || lower.endsWith(".internal")) return true;
  // metadata hostnames
  if (lower === "metadata" || lower === "metadata.google.internal") return true;
  return false;
}

/* ------------------------------------------------------------------ */
/* Resolução DNS + validação                                           */
/* ------------------------------------------------------------------ */

export async function resolveAndValidate(host: string): Promise<{ ip: string; family: 4 | 6 } | null> {
  if (isBlockedHost(host)) return null;
  // Se já for IP literal
  if (net.isIP(host)) {
    if (isBlockedIp(host)) return null;
    return { ip: host, family: net.isIP(host) as 4 | 6 };
  }
  try {
    const res = await dns.lookup(host, { all: false });
    if (!res || !res.address) return null;
    if (isBlockedIp(res.address)) return null;
    return { ip: res.address, family: res.family as 4 | 6 };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Fetch seguro                                                        */
/* ------------------------------------------------------------------ */

function friendlyMessage(err: SafeFetchError): string {
  switch (err) {
    case "invalid-url":
      return "URL inválido.";
    case "unsupported-protocol":
      return "Apenas http e https são suportados.";
    case "unsupported-port":
      return "Apenas as portas 80 e 443 são suportadas.";
    case "blocked-host":
      return "Este endereço não pode ser analisado.";
    case "blocked-ip":
      return "Este endereço não pode ser analisado.";
    case "dns-failed":
      return "Não foi possível resolver o domínio.";
    case "too-large":
      return "A página é demasiado grande.";
    case "wrong-content-type":
      return "O endereço não devolveu uma página HTML.";
    case "timeout":
      return "O site demorou demasiado a responder.";
    case "inaccessible":
      return "O site está inacessível.";
    case "too-many-redirects":
      return "Demasiados redirecionamentos.";
    case "invalid-certificate":
      return "Certificado inválido.";
    default:
      return "Erro desconhecido.";
  }
}

function fail(error: SafeFetchError): SafeFetchFailure {
  return { ok: false, error, message: friendlyMessage(error) };
}

function doRequest(
  url: string,
  fixedIp: string,
  family: 4 | 6,
  hostname: string
): Promise<{ ok: true; status: number; headers: Record<string, string>; body: Buffer } | SafeFetchFailure> {
  return new Promise((resolve) => {
    const u = new URL(url);
    const isHttps = u.protocol === "https:";
    const mod = isHttps ? https : http;
    const port = u.port ? Number(u.port) : (isHttps ? 443 : 80);

    const options: http.RequestOptions & { servername?: string; rejectUnauthorized?: boolean } = {
      method: "GET",
      host: fixedIp,
      port,
      path: u.pathname + u.search,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        Host: hostname,
      },
      lookup: (_hostname: string, _opts: unknown, cb: (err: Error | null, address: string, family: number) => void) => {
        cb(null, fixedIp, family);
      },
      servername: isHttps ? hostname : undefined,
      timeout: TIMEOUT_MS,
      rejectUnauthorized: isHttps,
    };

    const req = mod.request(options, (res) => {
      // redirects tratados fora
      const chunks: Buffer[] = [];
      let total = 0;
      let aborted = false;
      res.on("data", (chunk: Buffer) => {
        total += chunk.length;
        if (total > MAX_BYTES) {
          aborted = true;
          req.destroy();
          resolve(fail("too-large"));
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => {
        if (aborted) return;
        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) {
          if (typeof v === "string") headers[k.toLowerCase()] = v;
          else if (Array.isArray(v)) headers[k.toLowerCase()] = v.join(", ");
        }
        resolve({ ok: true, status: res.statusCode ?? 0, headers, body: Buffer.concat(chunks) });
      });
      res.on("error", () => resolve(fail("inaccessible")));
    });

    req.on("timeout", () => {
      req.destroy();
      resolve(fail("timeout"));
    });
    req.on("error", (err: Error) => {
      const msg = err.message.toLowerCase();
      if (msg.includes("certificate") || msg.includes("ssl") || msg.includes("tls")) {
        resolve(fail("invalid-certificate"));
      } else if (msg.includes("timeout")) {
        resolve(fail("timeout"));
      } else {
        resolve(fail("inaccessible"));
      }
    });
    req.end();
  });
}

export async function safeFetch(startUrl: string): Promise<SafeFetchOutcome> {
  const normalized = normalizeUrl(startUrl);
  if (!normalized) return fail("invalid-url");
  const u0 = new URL(normalized);
  if (isBlockedHost(u0.hostname)) return fail("blocked-host");

  let currentUrl = normalized;
  let redirects = 0;

  while (true) {
    const u = new URL(currentUrl);
    if (u.protocol !== "http:" && u.protocol !== "https:") return fail("unsupported-protocol");
    if (u.port && u.port !== "80" && u.port !== "443") return fail("unsupported-port");

    const resolved = await resolveAndValidate(u.hostname);
    if (!resolved) {
      // distinguir host vs ip
      if (isBlockedHost(u.hostname)) return fail("blocked-host");
      return fail("blocked-ip");
    }

    const result = await doRequest(currentUrl, resolved.ip, resolved.family, u.hostname);
    if ("error" in result) return result;

    const { status, headers, body } = result;

    // Redirects
    if (status >= 300 && status < 400 && headers.location) {
      if (redirects >= MAX_REDIRECTS) return fail("too-many-redirects");
      redirects++;
      try {
        const next = new URL(headers.location, currentUrl);
        // normalizar
        next.username = "";
        next.password = "";
        next.hash = "";
        if (next.protocol !== "http:" && next.protocol !== "https:") return fail("unsupported-protocol");
        if (next.port && next.port !== "80" && next.port !== "443") return fail("unsupported-port");
        currentUrl = next.toString();
        continue;
      } catch {
        return fail("invalid-url");
      }
    }

    // Content-type
    const ct = headers["content-type"] ?? "";
    if (!ct.toLowerCase().includes("text/html")) {
      return fail("wrong-content-type");
    }

    const html = body.toString("utf8");
    return { ok: true, url: currentUrl, status, html, headers };
  }
}
