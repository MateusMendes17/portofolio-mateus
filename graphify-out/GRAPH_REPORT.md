# Graph Report - portofolio-mateus  (2026-10-27)

## Corpus Check
- 131 files · ~85,965 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 678 nodes · 1673 edges · 26 communities (21 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ba41b70`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- layout.tsx
- audit/route.ts
- audit/types.ts
- useLanguage
- ProjectDetailView.tsx
- layout.tsx
- Changelog
- CallBooking.tsx
- ReportActions
- CompareResults.tsx
- safe-fetch.ts
- compilerOptions
- package.json
- Portfólio Mateus Mendes
- AvaliadorView.tsx
- HomeView.tsx
- generate-lead-magnet.ts
- LanguageContext.tsx
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- lib/seo.ts
- postcss.config.mjs
- constants.ts
- next

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 85 edges
2. `next` - 48 edges
3. `react` - 47 edges
4. `cn()` - 28 edges
5. `framer-motion` - 21 edges
6. `Button` - 21 edges
7. `Changelog` - 20 edges
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
- `measure()` --calls--> `buildReport()`  [EXTRACTED]
  scripts/measure-sites.ts → src/lib/audit/report.ts
- `NotFound()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/not-found.tsx → src/context/LanguageContext.tsx

## Import Cycles
- None detected.

## Communities (26 total, 5 thin omitted)

### Community 0 - "layout.tsx"
Cohesion: 0.14
Nodes (16): inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, SkipLink(), SmoothScroll() (+8 more)

### Community 1 - "audit/route.ts"
Cohesion: 0.08
Nodes (41): zod@^4.6.5, zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit() (+33 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.10
Nodes (38): node-html-parser, vitest, StreamAuditOutcome, checkAccessibility(), finding(), checkContent(), finding(), CheckInput (+30 more)

### Community 3 - "useLanguage"
Cohesion: 0.06
Nodes (63): framer-motion, react, NewsletterObrigadoPage(), ServicosPage(), SobrePage(), FormStepDetails(), FormStepPreference(), FormStepProjectType() (+55 more)

### Community 4 - "ProjectDetailView.tsx"
Cohesion: 0.11
Nodes (28): metadata, ProjetosPage(), ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery() (+20 more)

### Community 5 - "layout.tsx"
Cohesion: 0.09
Nodes (43): ContactoPage(), Command, CommandPalette(), Ico(), NavIcons, normalize(), score(), Section (+35 more)

### Community 6 - "Changelog"
Cohesion: 0.09
Nodes (21): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+13 more)

### Community 7 - "CallBooking.tsx"
Cohesion: 0.14
Nodes (18): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+10 more)

### Community 8 - "ReportActions"
Cohesion: 0.48
Nodes (6): ReportActions(), download(), errorText(), post(), sendEmail(), Status

### Community 9 - "CompareResults.tsx"
Cohesion: 0.60
Nodes (4): CompareResults(), hostOf(), NAMES, scoreOf()

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (18): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+10 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.05
Nodes (48): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+40 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 15 - "AvaliadorView.tsx"
Cohesion: 0.19
Nodes (12): AvaliadorPage(), metadata, LossCalculator(), toNumber(), streamAudit(), AvaliadorView(), handleContactSubmit(), handleSubmit() (+4 more)

### Community 19 - "HomeView.tsx"
Cohesion: 0.06
Nodes (37): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, main() (+29 more)

### Community 21 - "generate-lead-magnet.ts"
Cohesion: 0.06
Nodes (39): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+31 more)

### Community 22 - "LanguageContext.tsx"
Cohesion: 0.19
Nodes (13): en, DeepString, pt, Strings, emitChange(), getServerSnapshot(), LanguageContext, LanguageContextType (+5 more)

### Community 27 - "lib/seo.ts"
Cohesion: 0.18
Nodes (10): metadata, generateMetadata(), PageProps, ProjectDetailPage(), metadata, metadata, getProject(), pageMetadata() (+2 more)

### Community 30 - "constants.ts"
Cohesion: 0.21
Nodes (5): PROJECTS, CAL_URL_30, SITE_CONFIG, SITE_URL, NavItem

### Community 31 - "next"
Cohesion: 0.27
Nodes (6): nextConfig, next, NotFound(), metadata, PrivacidadePage(), PrivacidadeView()

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `layout.tsx`, `audit/route.ts`, `useLanguage`, `ProjectDetailView.tsx`, `layout.tsx`, `package.json`, `AvaliadorView.tsx`, `HomeView.tsx`, `generate-lead-magnet.ts`, `LanguageContext.tsx`, `lib/seo.ts`, `constants.ts`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1383399209486166 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `layout.tsx`, `ProjectDetailView.tsx`, `layout.tsx`, `CallBooking.tsx`, `ReportActions`, `CompareResults.tsx`, `AvaliadorView.tsx`, `HomeView.tsx`, `LanguageContext.tsx`, `next`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392156862745098 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useLanguage` to `layout.tsx`, `ProjectDetailView.tsx`, `layout.tsx`, `CallBooking.tsx`, `ReportActions`, `package.json`, `AvaliadorView.tsx`, `HomeView.tsx`, `LanguageContext.tsx`, `lib/seo.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10087082728592163 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.058549931600547195 - nodes in this community are weakly interconnected._