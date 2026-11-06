# Graph Report - portofolio-mateus  (2026-11-06)

## Corpus Check
- 141 files · ~88,815 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 734 nodes · 1813 edges · 26 communities (20 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a5fdac8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SobreView.tsx
- audit/route.ts
- audit/types.ts
- useLanguage
- ProjectCatalog.tsx
- layout.tsx
- Changelog
- react
- package.json
- measure-sites.ts
- safe-fetch.ts
- compilerOptions
- audit/types.ts
- Portfólio Mateus Mendes
- Auditoria e levantamento — fases 0 e 1
- KineticName.tsx
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
1. `useLanguage()` - 87 edges
2. `next` - 50 edges
3. `react` - 48 edges
4. `cn()` - 35 edges
5. `Changelog` - 25 edges
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
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `ProjectCatalog()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/projects/ProjectCatalog.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `CtaPanel()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/CtaPanel.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FaqAccordion()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FaqAccordion.tsx

## Import Cycles
- None detected.

## Communities (26 total, 6 thin omitted)

### Community 0 - "SobreView.tsx"
Cohesion: 0.07
Nodes (39): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), metadata, ProjetosPage(), metadata, ServicosPage(), CodePhilosophyTerminal(), TabFile, InteractiveStats() (+31 more)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (65): zod@^4.6.5, zod, json(), POST(), auditSchema, checkDailyLimit(), DAILY_LIMIT, dailyReset (+57 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (34): node-html-parser, vitest, checkAccessibility(), finding(), checkContent(), finding(), CheckInput, runAllChecks() (+26 more)

### Community 3 - "useLanguage"
Cohesion: 0.12
Nodes (30): framer-motion, NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), PREFERENCE_ICONS, PreferenceOption (+22 more)

### Community 4 - "ProjectCatalog.tsx"
Cohesion: 0.18
Nodes (17): ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot() (+9 more)

### Community 5 - "layout.tsx"
Cohesion: 0.07
Nodes (61): react, NewsletterObrigadoPage(), Command, CommandPalette(), Ico(), NavIcons, normalize(), score() (+53 more)

### Community 6 - "Changelog"
Cohesion: 0.05
Nodes (32): 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original, 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador (+24 more)

### Community 7 - "react"
Cohesion: 0.14
Nodes (18): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+10 more)

### Community 8 - "package.json"
Cohesion: 0.05
Nodes (48): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+40 more)

### Community 9 - "measure-sites.ts"
Cohesion: 0.23
Nodes (8): next, only, OUT, targets, MeasuredMetrics(), scoreTone(), SITE_METRICS, SiteMeasurement

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "audit/types.ts"
Cohesion: 0.06
Nodes (44): pdf-lib@^1.17.1, pdf-lib, runtime, schema, CompareResults(), hostOf(), NAMES, scoreOf() (+36 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.18
Nodes (10): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, 2026-10-27 — Publicação na Vercel e correção do PDF em produção (+2 more)

### Community 15 - "KineticName.tsx"
Cohesion: 0.33
Nodes (4): kinetic, KineticName(), LetterState, ROWS

### Community 19 - "HomeView.tsx"
Cohesion: 0.18
Nodes (11): Home(), metadata, AUDIT_CATEGORIES, Band(), COPY, EASE, HomeView(), Reveal() (+3 more)

### Community 22 - "pdf.ts"
Cohesion: 0.18
Nodes (11): ACCENT, generate(), INK, LINE, MUTED, PAPER, Point, POINTS (+3 more)

### Community 27 - "next"
Cohesion: 0.08
Nodes (26): nextConfig, next, AvaliadorPage(), first(), metadata, SearchParams, ContactoPage(), metadata (+18 more)

### Community 30 - "LanguageContext.tsx"
Cohesion: 0.08
Nodes (31): inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, SkipLink(), SmoothScroll() (+23 more)

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `SobreView.tsx`, `audit/route.ts`, `useLanguage`, `ProjectCatalog.tsx`, `layout.tsx`, `package.json`, `audit/types.ts`, `KineticName.tsx`, `HomeView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Should `SobreView.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07256894049346879 - nodes in this community are weakly interconnected._
- **Why does `react` connect `layout.tsx` to `SobreView.tsx`, `useLanguage`, `ProjectCatalog.tsx`, `Changelog`, `react`, `package.json`, `audit/types.ts`, `KineticName.tsx`, `HomeView.tsx`, `next`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056150600454397924 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `SobreView.tsx`, `ProjectCatalog.tsx`, `layout.tsx`, `react`, `measure-sites.ts`, `audit/types.ts`, `HomeView.tsx`, `next`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10823311748381129 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.11538461538461539 - nodes in this community are weakly interconnected._