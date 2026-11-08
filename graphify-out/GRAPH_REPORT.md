# Graph Report - portofolio-mateus  (2026-11-08)

## Corpus Check
- 146 files · ~93,352 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 759 nodes · 1885 edges · 28 communities (21 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fb66a9b9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- InteractiveStats.tsx
- audit/types.ts
- useLanguage
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
- ProjectPreview.tsx
- HomeView.tsx
- measure-sites.ts
- Auditoria e levantamento — fases 0 e 1
- ProjectDetailView.tsx
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- postcss.config.mjs
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 91 edges
2. `next` - 55 edges
3. `react` - 48 edges
4. `cn()` - 34 edges
5. `Changelog` - 31 edges
6. `framer-motion` - 19 edges
7. `AvaliadorView()` - 19 edges
8. `getWhatsAppUrl()` - 18 edges
9. `Button` - 17 edges
10. `SITE_CONFIG` - 17 edges

## Surprising Connections (you probably didn't know these)
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-11-06 — Navbar no tema novo e correção de animações` --references--> `PageIntro()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/PageIntro.tsx
- `2026-10-26 — Animações na home (CSS puro, só transform/opacity)` --references--> `ScrollReveal()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/ScrollReveal.tsx
- `2026-11-07 — Fotografia, domínio da Vercel e página 404` --references--> `HeroName()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/home/HeroName.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `ProjectCatalog()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/projects/ProjectCatalog.tsx

## Import Cycles
- None detected.

## Communities (28 total, 7 thin omitted)

### Community 0 - "next"
Cohesion: 0.06
Nodes (32): nextConfig, next, AvaliadorPage(), first(), metadata, SearchParams, ContactoPage(), metadata (+24 more)

### Community 1 - "InteractiveStats.tsx"
Cohesion: 0.43
Nodes (5): 2026-11-07 — Auditoria completa: correções e melhorias, MeasuredMetrics(), scoreTone(), InteractiveStats(), CountUp()

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (36): node-html-parser, vitest, checkAccessibility(), finding(), checkContent(), finding(), CheckInput, runAllChecks() (+28 more)

### Community 3 - "useLanguage"
Cohesion: 0.05
Nodes (66): 2026-11-07 — Fotografia, domínio da Vercel e página 404, framer-motion, metadata, NewsletterObrigadoPage(), NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType() (+58 more)

### Community 4 - "next"
Cohesion: 0.08
Nodes (38): 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, metadata, ProjetosPage(), metadata, SobrePage(), Service, ServiceArticle(), CtaPanel() (+30 more)

### Community 5 - "useLanguage"
Cohesion: 0.06
Nodes (65): next-themes, react, inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson (+57 more)

### Community 6 - "Changelog"
Cohesion: 0.07
Nodes (28): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+20 more)

### Community 7 - "react"
Cohesion: 0.20
Nodes (13): keyOf(), MonthGrid(), pad(), parseKey(), dayKey(), Load, QuickBooking(), pickFirst() (+5 more)

### Community 8 - "package.json"
Cohesion: 0.05
Nodes (48): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+40 more)

### Community 9 - "audit/route.ts"
Cohesion: 0.05
Nodes (74): zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit(), DAILY_LIMIT (+66 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (18): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+10 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "AvaliadorView.tsx"
Cohesion: 0.10
Nodes (24): CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber(), ReportActions(), download() (+16 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "ProjectCatalog.tsx"
Cohesion: 0.21
Nodes (12): ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, ProjectPreviewProps, ProjectDetailViewProps, Project (+4 more)

### Community 15 - "ProjectPreview.tsx"
Cohesion: 0.67
Nodes (5): getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot(), ProjectPreview(), subscribeReducedMotion()

### Community 16 - "HomeView.tsx"
Cohesion: 0.17
Nodes (12): Home(), metadata, AUDIT_CATEGORIES, Band(), COPY, EASE, HomeView(), Reveal() (+4 more)

### Community 19 - "measure-sites.ts"
Cohesion: 0.19
Nodes (10): 1. Stack e arquitetura, 2026-10-27 — Publicação na Vercel e correção do PDF em produção, main(), measure(), next, only, OUT, targets (+2 more)

### Community 20 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.29
Nodes (6): 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.27
Nodes (10): CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs(), SpecsProps, StudyKey (+2 more)

### Community 22 - "pdf.ts"
Cohesion: 0.09
Nodes (23): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+15 more)

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `InteractiveStats.tsx`, `useLanguage`, `next`, `useLanguage`, `package.json`, `audit/route.ts`, `ProjectCatalog.tsx`, `ProjectPreview.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.061952861952861954 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `next`, `InteractiveStats.tsx`, `next`, `useLanguage`, `react`, `AvaliadorView.tsx`, `ProjectCatalog.tsx`, `ProjectPreview.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10938775510204081 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useLanguage` to `next`, `InteractiveStats.tsx`, `useLanguage`, `next`, `react`, `package.json`, `AvaliadorView.tsx`, `ProjectCatalog.tsx`, `ProjectPreview.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.05126050420168067 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.07982583454281568 - nodes in this community are weakly interconnected._