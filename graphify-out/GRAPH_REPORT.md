# Graph Report - portofolio-mateus  (2026-10-27)

## Corpus Check
- 136 files · ~87,863 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 705 nodes · 1756 edges · 27 communities (22 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7266d8cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LanguageContext.tsx
- audit/route.ts
- audit/types.ts
- useLanguage
- ProjectCatalog.tsx
- layout.tsx
- Changelog
- CallBooking.tsx
- constants.ts
- next
- safe-fetch.ts
- compilerOptions
- package.json
- Portfólio Mateus Mendes
- Auditoria e levantamento — fases 0 e 1
- AvaliadorView.tsx
- projects.ts
- NewsletterUnsubscribe.tsx
- HomeView.tsx
- ProjectDetailView.tsx
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- lib/seo.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 87 edges
2. `next` - 50 edges
3. `react` - 47 edges
4. `cn()` - 28 edges
5. `Changelog` - 22 edges
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
- `measure()` --calls--> `buildReport()`  [EXTRACTED]
  scripts/measure-sites.ts → src/lib/audit/report.ts
- `pickFirst()` --indirect_call--> `first()`  [INFERRED]
  src/components/contact/QuickBooking.tsx → src/app/avaliador/page.tsx

## Import Cycles
- None detected.

## Communities (27 total, 5 thin omitted)

### Community 0 - "LanguageContext.tsx"
Cohesion: 0.10
Nodes (25): inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, NotFound(), SkipLink() (+17 more)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (65): zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit(), DAILY_LIMIT (+57 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.08
Nodes (44): node-html-parser, vitest, main(), measure(), next, only, OUT, targets (+36 more)

### Community 3 - "useLanguage"
Cohesion: 0.08
Nodes (39): framer-motion, react, metadata, ServicosPage(), metadata, SobrePage(), TabFile, GOAL_ICONS (+31 more)

### Community 4 - "ProjectCatalog.tsx"
Cohesion: 0.23
Nodes (14): ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot() (+6 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (77): NewsletterObrigadoPage(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), PREFERENCE_ICONS, PreferenceOption, PROJECT_TYPE_ICONS (+69 more)

### Community 6 - "Changelog"
Cohesion: 0.08
Nodes (23): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+15 more)

### Community 7 - "CallBooking.tsx"
Cohesion: 0.13
Nodes (20): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+12 more)

### Community 8 - "constants.ts"
Cohesion: 0.16
Nodes (10): AvaliadorPage(), first(), metadata, SearchParams, CAL_EVENTS, CAL_URL, CAL_URL_30, NAV_LABEL_KEYS (+2 more)

### Community 9 - "next"
Cohesion: 0.23
Nodes (8): nextConfig, next, metadata, PrivacidadePage(), metadata, ProjetosPage(), PrivacidadeView(), ProjetosView()

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (18): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+10 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.05
Nodes (49): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+41 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.25
Nodes (7): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1

### Community 15 - "AvaliadorView.tsx"
Cohesion: 0.13
Nodes (20): CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber(), ReportActions(), download() (+12 more)

### Community 16 - "projects.ts"
Cohesion: 0.32
Nodes (4): PROJECT_SLUGS, ProjectCategory, ProjectImage, PROJECTS

### Community 17 - "NewsletterUnsubscribe.tsx"
Cohesion: 0.38
Nodes (4): metadata, NewsletterCancelarPage(), NewsletterUnsubscribe(), Status

### Community 19 - "HomeView.tsx"
Cohesion: 0.22
Nodes (10): Home(), metadata, ButtonLink(), CtaPanel(), CtaPanelProps, SectionHeading(), SectionHeadingProps, AUDIT_CATEGORIES (+2 more)

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.20
Nodes (14): MeasuredMetrics(), scoreTone(), CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs() (+6 more)

### Community 22 - "pdf.ts"
Cohesion: 0.09
Nodes (25): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+17 more)

### Community 27 - "lib/seo.ts"
Cohesion: 0.17
Nodes (11): ContactoPage(), metadata, generateMetadata(), PageProps, ProjectDetailPage(), getProject(), DeepString, pt (+3 more)

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `LanguageContext.tsx`, `audit/route.ts`, `useLanguage`, `ProjectCatalog.tsx`, `layout.tsx`, `constants.ts`, `package.json`, `projects.ts`, `NewsletterUnsubscribe.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`, `lib/seo.ts`?**
  _High betweenness centrality (0.212) - this node is a cross-community bridge._
- **Should `LanguageContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09803921568627451 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `layout.tsx` to `LanguageContext.tsx`, `useLanguage`, `ProjectCatalog.tsx`, `CallBooking.tsx`, `next`, `AvaliadorView.tsx`, `NewsletterUnsubscribe.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05871725383920506 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useLanguage` to `LanguageContext.tsx`, `ProjectCatalog.tsx`, `layout.tsx`, `CallBooking.tsx`, `package.json`, `AvaliadorView.tsx`, `NewsletterUnsubscribe.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08038075092543628 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.07686932215234102 - nodes in this community are weakly interconnected._