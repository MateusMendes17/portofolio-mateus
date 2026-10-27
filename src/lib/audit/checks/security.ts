import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

export interface CheckContext {
  html: string;
  headers: Record<string, string>;
  finalUrl: string;
  status: number;
}

function finding(
  id: string,
  category: Finding["category"],
  severity: Finding["severity"],
  titleKey: string,
  whatKey: string,
  whyKey: string,
  howKey: string,
  evidence?: string
): Finding {
  return {
    id,
    category,
    severity,
    titleKey,
    whatKey,
    whyKey,
    howKey,
    evidence,
    pointsLost: SEVERITY_PENALTY[severity],
  };
}

export function checkSecurity(ctx: CheckContext): Finding[] {
  const out: Finding[] = [];
  const u = new URL(ctx.finalUrl);
  const headers = ctx.headers;

  // HTTPS
  if (u.protocol !== "https:") {
    out.push(
      finding(
        "security.https.missing",
        "security",
        "high",
        "audit.findings.security.https.missing.title",
        "audit.findings.security.https.missing.what",
        "audit.findings.security.https.missing.why",
        "audit.findings.security.https.missing.how"
      )
    );
  } else {
    // redirecionamento http->https não verificável aqui sem request inicial; marcar info
  }

  // HSTS
  if (!headers["strict-transport-security"]) {
    out.push(
      finding(
        "security.hsts.missing",
        "security",
        "medium",
        "audit.findings.security.hsts.missing.title",
        "audit.findings.security.hsts.missing.what",
        "audit.findings.security.hsts.missing.why",
        "audit.findings.security.hsts.missing.how"
      )
    );
  }

  // X-Content-Type-Options
  if (headers["x-content-type-options"]?.toLowerCase() !== "nosniff") {
    out.push(
      finding(
        "security.xcto.missing",
        "security",
        "low",
        "audit.findings.security.xcto.missing.title",
        "audit.findings.security.xcto.missing.what",
        "audit.findings.security.xcto.missing.why",
        "audit.findings.security.xcto.missing.how"
      )
    );
  }

  // Mixed content evidente
  // (só aplicável a páginas HTTPS; <link rel="canonical"> e afins não carregam recursos)
  const root = parse(ctx.html);
  const mixed =
    u.protocol === "https:"
      ? root.querySelectorAll(
          'img[src^="http:"], script[src^="http:"], iframe[src^="http:"], link[rel="stylesheet"][href^="http:"]'
        )
      : [];
  if (mixed.length > 0) {
    out.push(
      finding(
        "security.mixed-content",
        "security",
        "high",
        "audit.findings.security.mixed.title",
        "audit.findings.security.mixed.what",
        "audit.findings.security.mixed.why",
        "audit.findings.security.mixed.how",
        `${mixed.length} recurso(s) HTTP numa página HTTPS`
      )
    );
  }

  return out;
}
