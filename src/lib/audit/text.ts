import pt from "@/content/strings/pt";
import en from "@/content/strings/en";

export type Locale = "pt" | "en";

/** Resolve uma chave de i18n ("audit.findings.seo.h1.missing.title") no servidor. */
export function resolveText(key: string | undefined, locale: Locale): string {
  if (!key) return "";
  let curr: unknown = locale === "en" ? en : pt;
  for (const part of key.split(".")) {
    if (curr && typeof curr === "object") curr = (curr as Record<string, unknown>)[part];
    else return "";
  }
  return typeof curr === "string" ? curr : "";
}
