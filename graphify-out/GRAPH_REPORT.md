# Graph Report - portofolio-mateus  (2026-11-06)

## Corpus Check
- 141 files · ~89,722 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 734 nodes · 1816 edges · 25 communities (18 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0050961a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MeasuredMetrics.tsx
- audit/route.ts
- audit/types.ts
- useLanguage
- ProjectDetailView.tsx
- layout.tsx
- Changelog
- react
- package.json
- measure-sites.ts
- safe-fetch.ts
- compilerOptions
- AvaliadorView.tsx
- Portfólio Mateus Mendes
- Auditoria e levantamento — fases 0 e 1
- HomeView.tsx
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- next
- postcss.config.mjs
- LanguageContext.tsx
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 89 edges
2. `next` - 50 edges
3. `react` - 48 edges
4. `cn()` - 35 edges
5. `Changelog` - 27 edges
6. `framer-motion` - 20 edges
7. `getWhatsAppUrl()` - 18 edges
8. `Button` - 17 edges
9. `SITE_CONFIG` - 17 edges
10. `WhatsAppIcon()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-11-06 — Navbar no tema novo e correção de animações` --references--> `PageIntro()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/PageIntro.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FaqAccordion()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FaqAccordion.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FloatingElements()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FloatingElements.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `PageIntro()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/PageIntro.tsx

## Import Cycles
- None detected.

## Communities (25 total, 7 thin omitted)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (64): zod@^4.6.5, zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit() (+56 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (36): node-html-parser, vitest, checkAccessibility(), finding(), checkContent(), finding(), CheckInput, runAllChecks() (+28 more)

### Community 3 - "useLanguage"
Cohesion: 0.05
Nodes (67): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), framer-motion, NotFound(), metadata, ServicosPage(), metadata, SobrePage(), FormStepDetails() (+59 more)

### Community 4 - "ProjectDetailView.tsx"
Cohesion: 0.07
Nodes (40): 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, metadata, ProjetosPage(), ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey (+32 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (63): react, inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, NewsletterObrigadoPage() (+55 more)

### Community 6 - "Changelog"
Cohesion: 0.07
Nodes (25): 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original, 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador (+17 more)

### Community 7 - "react"
Cohesion: 0.20
Nodes (13): keyOf(), MonthGrid(), pad(), parseKey(), dayKey(), Load, QuickBooking(), pickFirst() (+5 more)

### Community 8 - "package.json"
Cohesion: 0.05
Nodes (48): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+40 more)

### Community 9 - "measure-sites.ts"
Cohesion: 0.22
Nodes (6): next, only, OUT, targets, SITE_METRICS, SiteMeasurement

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "AvaliadorView.tsx"
Cohesion: 0.12
Nodes (21): CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber(), ReportActions(), download() (+13 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.18
Nodes (10): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, 2026-10-27 — Publicação na Vercel e correção do PDF em produção (+2 more)

### Community 19 - "HomeView.tsx"
Cohesion: 0.15
Nodes (14): Home(), metadata, display, HeroName(), ROWS, AUDIT_CATEGORIES, Band(), COPY (+6 more)

### Community 22 - "pdf.ts"
Cohesion: 0.21
Nodes (11): ACCENT, generate(), INK, LINE, MUTED, PAPER, Point, POINTS (+3 more)

### Community 27 - "next"
Cohesion: 0.05
Nodes (43): nextConfig, next, GET(), json(), runtime, AvaliadorPage(), first(), metadata (+35 more)

### Community 30 - "LanguageContext.tsx"
Cohesion: 0.09
Nodes (27): pdf-lib@^1.17.1, pdf-lib, SpecsProps, en, DeepString, pt, Strings, emitChange() (+19 more)

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `audit/route.ts`, `useLanguage`, `ProjectDetailView.tsx`, `layout.tsx`, `package.json`, `HomeView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05895061728395062 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `MeasuredMetrics.tsx`, `ProjectDetailView.tsx`, `layout.tsx`, `react`, `AvaliadorView.tsx`, `HomeView.tsx`, `next`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10938775510204081 - nodes in this community are weakly interconnected._
- **Why does `react` connect `layout.tsx` to `useLanguage`, `ProjectDetailView.tsx`, `react`, `package.json`, `AvaliadorView.tsx`, `HomeView.tsx`, `next`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.05067920585161965 - nodes in this community are weakly interconnected._
- **Should `ProjectDetailView.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0693815987933635 - nodes in this community are weakly interconnected._