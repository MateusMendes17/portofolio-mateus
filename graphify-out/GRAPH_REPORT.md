# Graph Report - portofolio-mateus  (2026-11-07)

## Corpus Check
- 146 files · ~92,919 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 758 nodes · 1884 edges · 33 communities (26 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b33b9da7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ProjectDetailView.tsx
- layout.tsx
- audit/types.ts
- useContactForm.ts
- next
- useLanguage
- Changelog
- react
- package.json
- audit/route.ts
- safe-fetch.ts
- compilerOptions
- AvaliadorView.tsx
- Portfólio Mateus Mendes
- ProjectCatalog.tsx
- react
- HomeView.tsx
- constants.ts
- FloatingElements.tsx
- measure-sites.ts
- Auditoria e levantamento — fases 0 e 1
- ProjectDetailView.tsx
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- TimeCombobox
- postcss.config.mjs
- LanguageContext.tsx
- vercel.json
- TechStackExplorer.tsx

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 91 edges
2. `next` - 55 edges
3. `react` - 48 edges
4. `cn()` - 34 edges
5. `Changelog` - 30 edges
6. `framer-motion` - 19 edges
7. `AvaliadorView()` - 19 edges
8. `getWhatsAppUrl()` - 18 edges
9. `Button` - 17 edges
10. `SITE_CONFIG` - 17 edges

## Surprising Connections (you probably didn't know these)
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FloatingElements()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FloatingElements.tsx
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-11-06 — Navbar no tema novo e correção de animações` --references--> `PageIntro()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/PageIntro.tsx
- `2026-10-26 — Animações na home (CSS puro, só transform/opacity)` --references--> `ScrollReveal()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/ScrollReveal.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `TextReveal3D()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/TextAnimations.tsx

## Import Cycles
- None detected.

## Communities (33 total, 7 thin omitted)

### Community 0 - "ProjectDetailView.tsx"
Cohesion: 0.21
Nodes (8): generateMetadata(), PageProps, ProjectDetailPage(), getProject(), PROJECT_SLUGS, ProjectCategory, ProjectImage, PROJECTS

### Community 1 - "layout.tsx"
Cohesion: 0.16
Nodes (9): inter, metadata, spaceGrotesk, structuredData, structuredDataJson, ThemeProvider(), ThemeProviderProps, CursorFX() (+1 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (36): node-html-parser, vitest, checkAccessibility(), finding(), checkContent(), finding(), CheckInput, runAllChecks() (+28 more)

### Community 3 - "useContactForm.ts"
Cohesion: 0.18
Nodes (15): PREFERENCE_ICONS, PreferenceOption, PROJECT_TYPE_ICONS, ProjectOption, clearDraft(), Draft, EMPTY_FORM, FormStep (+7 more)

### Community 4 - "next"
Cohesion: 0.05
Nodes (58): nextConfig, 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, next, ContactoPage(), metadata, metadata, metadata, PrivacidadePage() (+50 more)

### Community 5 - "useLanguage"
Cohesion: 0.06
Nodes (71): framer-motion, RootLayout(), metadata, NewsletterObrigadoPage(), CallBooking(), FormStepDetails(), FormStepPreference(), FormStepProjectType() (+63 more)

### Community 6 - "Changelog"
Cohesion: 0.06
Nodes (33): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+25 more)

### Community 7 - "react"
Cohesion: 0.31
Nodes (8): keyOf(), MonthGrid(), pad(), parseKey(), dayKey(), Load, QuickBooking(), pickFirst()

### Community 8 - "package.json"
Cohesion: 0.05
Nodes (49): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+41 more)

### Community 9 - "audit/route.ts"
Cohesion: 0.05
Nodes (73): zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit(), DAILY_LIMIT (+65 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "AvaliadorView.tsx"
Cohesion: 0.09
Nodes (27): AvaliadorPage(), first(), metadata, SearchParams, CompareResults(), hostOf(), NAMES, scoreOf() (+19 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "ProjectCatalog.tsx"
Cohesion: 0.26
Nodes (12): ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot(), ProjectPreview() (+4 more)

### Community 15 - "react"
Cohesion: 0.18
Nodes (9): react, metadata, NewsletterCancelarPage(), NewsletterUnsubscribe(), Status, TextReveal3D(), TextReveal3DProps, TiltCard3D() (+1 more)

### Community 16 - "HomeView.tsx"
Cohesion: 0.19
Nodes (11): Home(), AUDIT_CATEGORIES, Band(), COPY, EASE, HomeView(), Reveal(), SERVICE_ANCHORS (+3 more)

### Community 17 - "constants.ts"
Cohesion: 0.20
Nodes (8): Mode, CAL_VARS, CallScheduler(), splitCalUrl(), CAL_URL_30, CalEvent, SITE_URL, NavItem

### Community 18 - "FloatingElements.tsx"
Cohesion: 0.40
Nodes (4): FloatingElements(), FloatingElementsProps, POSITIONS, SHAPES

### Community 19 - "measure-sites.ts"
Cohesion: 0.23
Nodes (9): next, only, OUT, targets, scoreTone(), InteractiveStats(), CountUp(), SITE_METRICS (+1 more)

### Community 20 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.18
Nodes (10): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, 2026-10-27 — Publicação na Vercel e correção do PDF em produção (+2 more)

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.29
Nodes (10): 2026-11-07 — Auditoria completa: correções e melhorias, MeasuredMetrics(), CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs() (+2 more)

### Community 22 - "pdf.ts"
Cohesion: 0.09
Nodes (23): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+15 more)

### Community 27 - "TimeCombobox"
Cohesion: 0.47
Nodes (5): digits(), TimeCombobox(), choose(), onKeyDown(), TimeOption

### Community 30 - "LanguageContext.tsx"
Cohesion: 0.17
Nodes (14): SpecsProps, en, DeepString, pt, Strings, emitChange(), getServerSnapshot(), LanguageContext (+6 more)

### Community 32 - "TechStackExplorer.tsx"
Cohesion: 0.50
Nodes (3): FilterTab, TechItem, TechStackExplorer()

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `ProjectDetailView.tsx`, `layout.tsx`, `useLanguage`, `Changelog`, `package.json`, `audit/route.ts`, `AvaliadorView.tsx`, `ProjectCatalog.tsx`, `react`, `HomeView.tsx`, `constants.ts`, `measure-sites.ts`, `ProjectDetailView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10938775510204081 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `TechStackExplorer.tsx`, `useContactForm.ts`, `next`, `Changelog`, `react`, `AvaliadorView.tsx`, `ProjectCatalog.tsx`, `react`, `HomeView.tsx`, `constants.ts`, `measure-sites.ts`, `ProjectDetailView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.05359831376091539 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `TechStackExplorer.tsx`, `layout.tsx`, `useContactForm.ts`, `next`, `useLanguage`, `Changelog`, `react`, `package.json`, `AvaliadorView.tsx`, `ProjectCatalog.tsx`, `HomeView.tsx`, `constants.ts`, `FloatingElements.tsx`, `measure-sites.ts`, `ProjectDetailView.tsx`, `TimeCombobox`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.06257425742574257 - nodes in this community are weakly interconnected._
- **Should `Changelog` be split into smaller, more focused modules?**
  _Cohesion score 0.057057057057057055 - nodes in this community are weakly interconnected._