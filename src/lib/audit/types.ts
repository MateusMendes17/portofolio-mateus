/**
 * Tipos partilhados do Avaliador de Sites.
 * Determinísticos: cada Finding deriva de uma verificação real e documentada.
 */

export type Severity = "high" | "medium" | "low" | "info";

export type Category =
  | "security"
  | "seo"
  | "mobile"
  | "accessibility"
  | "content"
  | "performance"
  | "weight";

export interface Finding {
  /** Identificador estável (ex.: "seo.title.missing"). */
  id: string;
  category: Category;
  severity: Severity;
  /** Título curto (chave de i18n). */
  titleKey: string;
  /** "O que é" (chave de i18n). */
  whatKey: string;
  /** "Porque importa para o negócio" (chave de i18n). */
  whyKey: string;
  /** "Como se corrige" (chave de i18n). */
  howKey: string;
  /** Evidência objetiva (ex.: "title com 92 caracteres"). */
  evidence?: string;
  /** Pontos perdidos nesta verificação (0 se ok). */
  pointsLost: number;
}

export interface CategoryScore {
  category: Category;
  /** 0..100 */
  score: number;
  /** Pontos obtidos. */
  earned: number;
  /** Pontos possíveis. */
  possible: number;
  findings: Finding[];
}

export interface AuditResult {
  /** URL normalizado (sem fragmento, sem credenciais). */
  url: string;
  /** URL original tal como submetido. */
  originalUrl: string;
  /** Data/hora ISO da análise. */
  analyzedAt: string;
  /** Nota geral 0..100. */
  overallScore: number;
  categories: CategoryScore[];
  /** O que já está bom (findings com severity info/low que passaram). */
  strengths: Finding[];
  /** O que melhorar, ordenado por prioridade e impacto. */
  improvements: Finding[];
  /** Limitações da análise automática. */
  limitations: string[];
  /** Dados de desempenho (PageSpeed), se disponíveis. */
  performance: PerformanceData | null;
  /** Se a análise veio da cache. */
  fromCache: boolean;
}

export interface PerformanceData {
  strategy: "mobile";
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  metrics: {
    lcp: number | null; // ms
    cls: number | null;
    tbt: number | null; // ms
  };
  opportunities: Array<{ id: string; title: string; savingsMs?: number }>;
  fetchedAt: string;
}

export interface AuditProgress {
  step: string;
  done: boolean;
  message: string;
}

export interface NormalizedUrl {
  url: string;
  host: string;
  protocol: "http:" | "https:";
}
