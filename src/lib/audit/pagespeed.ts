const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TIMEOUT_MS = 20_000;

export interface PageSpeedResult {
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  metrics: {
    lcp: number | null;
    cls: number | null;
    tbt: number | null;
  };
  opportunities: Array<{ id: string; title: string; savingsMs?: number }>;
  fetchedAt: string;
}

export async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  const apiKey = process.env.PAGESPEED_API_KEY?.trim();
  if (!apiKey) return null;

  const endpoint = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&key=${encodeURIComponent(apiKey)}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;

    const lhr = (data.lighthouseResult ?? {}) as Record<string, unknown>;
    const categories = (lhr.categories ?? {}) as Record<string, { score?: number }>;
    const audits = (lhr.audits ?? {}) as Record<string, { numericValue?: number; title?: string; displayValue?: string }>;

    const toScore = (c: { score?: number } | undefined): number | null =>
      typeof c?.score === "number" ? Math.round(c.score * 100) : null;

    const scores = {
      performance: toScore(categories.performance),
      accessibility: toScore(categories.accessibility),
      bestPractices: toScore(categories["best-practices"]),
      seo: toScore(categories.seo),
    };

    const metrics = {
      lcp: typeof audits["largest-contentful-paint"]?.numericValue === "number" ? Math.round(audits["largest-contentful-paint"].numericValue) : null,
      cls: typeof audits["cumulative-layout-shift"]?.numericValue === "number" ? audits["cumulative-layout-shift"].numericValue : null,
      tbt: typeof audits["total-blocking-time"]?.numericValue === "number" ? Math.round(audits["total-blocking-time"].numericValue) : null,
    };

    // oportunidades: audits com details.type === "opportunity", ordenar por savingsMs desc
    const opps: Array<{ id: string; title: string; savingsMs?: number }> = [];
    for (const [id, audit] of Object.entries(audits)) {
      const a = audit as { details?: { type?: string; overallSavingsMs?: number }; title?: string };
      if (a?.details?.type === "opportunity") {
        opps.push({
          id,
          title: a.title ?? id,
          savingsMs: typeof a.details.overallSavingsMs === "number" ? Math.round(a.details.overallSavingsMs) : undefined,
        });
      }
    }
    opps.sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0));
    const topOpps = opps.slice(0, 5);

    return {
      scores,
      metrics,
      opportunities: topOpps,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
