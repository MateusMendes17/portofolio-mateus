# Graph Report - portofolio-mateus  (2026-10-27)

## Corpus Check
- 139 files · ~88,462 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 716 nodes · 1782 edges · 32 communities (26 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d040fdac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- booking/route.ts
- unsubscribe/route.ts
- audit/types.ts
- useLanguage
- ProjectCatalog.tsx
- layout.tsx
- Changelog
- CallBooking.tsx
- constants.ts
- contact-email.ts
- safe-fetch.ts
- compilerOptions
- package.json
- Portfólio Mateus Mendes
- Auditoria e levantamento — fases 0 e 1
- AvaliadorView.tsx
- projects.ts
- NewsletterUnsubscribe.tsx
- audit/route.ts
- HomeView.tsx
- report/route.ts
- ProjectDetailView.tsx
- pdf.ts
- newsletter/route.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- next
- postcss.config.mjs
- pt.ts
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 87 edges
2. `next` - 50 edges
3. `react` - 47 edges
4. `cn()` - 28 edges
5. `Changelog` - 23 edges
6. `framer-motion` - 21 edges
7. `Button` - 21 edges
8. `getWhatsAppUrl()` - 18 edges
9. `WhatsAppIcon()` - 16 edges
10. `AvaliadorView()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-10-26 — Animações na home (CSS puro, só transform/opacity)` --references--> `ScrollReveal()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/ScrollReveal.tsx
- `1. Stack e arquitetura` --references--> `main()`  [INFERRED]
  docs/auditoria-fase-0-1.md → scripts/measure-sites.ts
- `2026-10-27 — Publicação na Vercel e correção do PDF em produção` --references--> `main()`  [INFERRED]
  Portofolio-Vault/Changelog.md → scripts/measure-sites.ts
- `measure()` --calls--> `buildReport()`  [EXTRACTED]
  scripts/measure-sites.ts → src/lib/audit/report.ts

## Import Cycles
- None detected.

## Communities (32 total, 6 thin omitted)

### Community 0 - "booking/route.ts"
Cohesion: 0.21
Nodes (15): json(), POST(), runtime, schema, GET(), json(), runtime, CAL_API (+7 more)

### Community 1 - "unsubscribe/route.ts"
Cohesion: 0.19
Nodes (16): zod@^4.6.5, zod, failure(), POST(), success(), bodySchema, json(), notifyOwner() (+8 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.08
Nodes (44): 1. Stack e arquitetura, 2026-10-27 — Publicação na Vercel e correção do PDF em produção, node-html-parser, vitest, main(), measure(), next, only (+36 more)

### Community 3 - "useLanguage"
Cohesion: 0.05
Nodes (77): framer-motion, react, NewsletterObrigadoPage(), NotFound(), CallBooking(), Mode, CAL_VARS, CallScheduler() (+69 more)

### Community 4 - "ProjectCatalog.tsx"
Cohesion: 0.18
Nodes (16): metadata, ProjetosPage(), ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery() (+8 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (68): next-themes, inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, Command (+60 more)

### Community 6 - "Changelog"
Cohesion: 0.08
Nodes (23): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+15 more)

### Community 7 - "CallBooking.tsx"
Cohesion: 0.20
Nodes (13): keyOf(), MonthGrid(), pad(), parseKey(), dayKey(), Load, QuickBooking(), pickFirst() (+5 more)

### Community 8 - "constants.ts"
Cohesion: 0.19
Nodes (8): AvaliadorPage(), first(), metadata, SearchParams, CAL_URL, CAL_URL_30, SITE_URL, NavItem

### Community 9 - "contact-email.ts"
Cohesion: 0.17
Nodes (15): escapeHtml(), HTML_ENTITIES, resend(), sendAuditReportEmail(), SendReportResult, Locale, buildHtml(), CONTACT_FROM (+7 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.05
Nodes (47): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+39 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.29
Nodes (6): 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1

### Community 15 - "AvaliadorView.tsx"
Cohesion: 0.12
Nodes (21): CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber(), ReportActions(), download() (+13 more)

### Community 16 - "projects.ts"
Cohesion: 0.32
Nodes (4): PROJECT_SLUGS, ProjectCategory, ProjectImage, PROJECTS

### Community 17 - "NewsletterUnsubscribe.tsx"
Cohesion: 0.38
Nodes (4): metadata, NewsletterCancelarPage(), NewsletterUnsubscribe(), Status

### Community 18 - "audit/route.ts"
Cohesion: 0.21
Nodes (11): auditSchema, checkDailyLimit(), DAILY_LIMIT, dailyReset, maxDuration, POST(), runtime, getCachedAudit() (+3 more)

### Community 19 - "HomeView.tsx"
Cohesion: 0.16
Nodes (13): Home(), metadata, MeasuredMetrics(), scoreTone(), CtaPanel(), CtaPanelProps, SectionHeading(), SectionHeadingProps (+5 more)

### Community 20 - "report/route.ts"
Cohesion: 0.25
Nodes (10): json(), POST(), runtime, schema, canonical(), secret(), signResult(), base (+2 more)

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.36
Nodes (8): CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs(), StudyKey, projectCategoryLabel()

### Community 22 - "pdf.ts"
Cohesion: 0.10
Nodes (23): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+15 more)

### Community 23 - "newsletter/route.ts"
Cohesion: 0.45
Nodes (8): newsletterSchema, POST(), normalizeEmail(), secret(), unsubscribeOneClickUrl(), unsubscribePageUrl(), unsubscribeToken(), verifyUnsubscribeToken()

### Community 27 - "next"
Cohesion: 0.12
Nodes (18): nextConfig, next, ContactoPage(), metadata, metadata, PrivacidadePage(), generateMetadata(), PageProps (+10 more)

### Community 30 - "pt.ts"
Cohesion: 0.27
Nodes (6): SpecsProps, en, DeepString, pt, Strings, LanguageContextType

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `booking/route.ts`, `unsubscribe/route.ts`, `useLanguage`, `ProjectCatalog.tsx`, `layout.tsx`, `constants.ts`, `package.json`, `projects.ts`, `NewsletterUnsubscribe.tsx`, `audit/route.ts`, `HomeView.tsx`, `report/route.ts`, `ProjectDetailView.tsx`, `newsletter/route.ts`, `pt.ts`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07932310946589106 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `ProjectCatalog.tsx`, `layout.tsx`, `CallBooking.tsx`, `AvaliadorView.tsx`, `NewsletterUnsubscribe.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`, `next`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.05078469405748545 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useLanguage` to `ProjectCatalog.tsx`, `layout.tsx`, `CallBooking.tsx`, `package.json`, `AvaliadorView.tsx`, `NewsletterUnsubscribe.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.056100981767180924 - nodes in this community are weakly interconnected._
- **Should `Changelog` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._