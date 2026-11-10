# Graph Report - portofolio-mateus  (2026-11-10)

## Corpus Check
- 147 files · ~96,574 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 769 nodes · 1920 edges · 32 communities (24 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a2b6a5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- AvaliadorView.tsx
- audit/types.ts
- useLanguage
- SobreView.tsx
- useLanguage
- Changelog
- react
- package.json
- audit/route.ts
- safe-fetch.ts
- compilerOptions
- ProjectDetailView.tsx
- Portfólio Mateus Mendes
- ProjectCatalog.tsx
- HomeView.tsx
- measure-sites.ts
- Avaliador de Sites — Metodologia e Especificação Técnica
- 3. Catálogo de Verificações Implementadas
- InteractiveStats.tsx
- Auditoria e levantamento — fases 0 e 1
- pdf.ts
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- avaliador-metodologia.md
- postcss.config.mjs
- projects.ts
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 91 edges
2. `next` - 55 edges
3. `react` - 48 edges
4. `cn()` - 34 edges
5. `Changelog` - 33 edges
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
- `2026-11-07 — Fotografia, domínio da Vercel e página 404` --references--> `HeroName()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/home/HeroName.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `ProjectCatalog()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/projects/ProjectCatalog.tsx
- `2026-11-07 — Auditoria completa: correções e melhorias` --references--> `CtaPanel()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/CtaPanel.tsx

## Import Cycles
- None detected.

## Communities (32 total, 8 thin omitted)

### Community 0 - "next"
Cohesion: 0.06
Nodes (36): nextConfig, next, AvaliadorPage(), first(), metadata, SearchParams, metadata, metadata (+28 more)

### Community 1 - "AvaliadorView.tsx"
Cohesion: 0.10
Nodes (26): CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber(), ReportActions(), download() (+18 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (38): node-html-parser, vitest, checkAccessibility(), finding(), isHidden(), checkContent(), finding(), CheckInput (+30 more)

### Community 3 - "useLanguage"
Cohesion: 0.06
Nodes (59): 2026-11-07 — Fotografia, domínio da Vercel e página 404, framer-motion, NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), PREFERENCE_ICONS (+51 more)

### Community 4 - "SobreView.tsx"
Cohesion: 0.07
Nodes (41): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, ProjetosPage(), ServicosPage(), SobrePage(), CodePhilosophyTerminal(), TabFile, Service (+33 more)

### Community 5 - "useLanguage"
Cohesion: 0.06
Nodes (60): react, ContactoPage(), inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson (+52 more)

### Community 6 - "Changelog"
Cohesion: 0.07
Nodes (27): 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original, 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador (+19 more)

### Community 7 - "react"
Cohesion: 0.13
Nodes (20): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+12 more)

### Community 8 - "package.json"
Cohesion: 0.05
Nodes (50): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+42 more)

### Community 9 - "audit/route.ts"
Cohesion: 0.05
Nodes (72): zod@^4.6.5, zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit() (+64 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.11
Nodes (21): 2026-11-10 — Avaliador: precisão verificada em sites reais, decodeBody(), doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp() (+13 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "ProjectDetailView.tsx"
Cohesion: 0.22
Nodes (13): 2026-11-07 — Auditoria completa: correções e melhorias, MeasuredMetrics(), CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs() (+5 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.12
Nodes (16): Autor, Avaliador de Sites, Contacto e marcação de chamadas, Correr localmente, Deploy, Endpoints, Estrutura, Newsletter e checklist (+8 more)

### Community 14 - "ProjectCatalog.tsx"
Cohesion: 0.25
Nodes (13): ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot() (+5 more)

### Community 15 - "HomeView.tsx"
Cohesion: 0.18
Nodes (11): Home(), AUDIT_CATEGORIES, Band(), COPY, EASE, HomeView(), Reveal(), SERVICE_ANCHORS (+3 more)

### Community 16 - "measure-sites.ts"
Cohesion: 0.20
Nodes (9): 1. Stack e arquitetura, 2026-10-27 — Publicação na Vercel e correção do PDF em produção, main(), measure(), next, only, OUT, targets (+1 more)

### Community 17 - "Avaliador de Sites — Metodologia e Especificação Técnica"
Cohesion: 0.22
Nodes (9): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), Avaliador de Sites — Metodologia e Especificação Técnica, Penalização por Severidade (+1 more)

### Community 18 - "3. Catálogo de Verificações Implementadas"
Cohesion: 0.25
Nodes (8): 3. Catálogo de Verificações Implementadas, A. Segurança e Base (`src/lib/audit/checks/security.ts`), B. SEO Técnico (`src/lib/audit/checks/seo.ts`), C. Mobile e Usabilidade (`src/lib/audit/checks/mobile.ts`), D. Acessibilidade Básica (`src/lib/audit/checks/accessibility.ts`), E. Conteúdo e Conversão (`src/lib/audit/checks/content.ts`), F. Peso da Página (`src/lib/audit/checks/weight.ts`), G. Desempenho Google PageSpeed (`src/lib/audit/pagespeed.ts`)

### Community 19 - "InteractiveStats.tsx"
Cohesion: 0.43
Nodes (4): scoreTone(), InteractiveStats(), CountUp(), SiteMeasurement

### Community 20 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.29
Nodes (6): 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1

### Community 21 - "pdf.ts"
Cohesion: 0.20
Nodes (12): en, ACCENT, buildAuditPdf(), INK, L, LINE, MUTED, safe() (+4 more)

### Community 22 - "pdf.ts"
Cohesion: 0.18
Nodes (11): ACCENT, generate(), INK, LINE, MUTED, PAPER, Point, POINTS (+3 more)

### Community 30 - "projects.ts"
Cohesion: 0.50
Nodes (3): PROJECT_SLUGS, ProjectCategory, ProjectImage

## Knowledge Gaps
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `useLanguage`, `SobreView.tsx`, `useLanguage`, `package.json`, `audit/route.ts`, `ProjectDetailView.tsx`, `ProjectCatalog.tsx`, `HomeView.tsx`, `InteractiveStats.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.06144393241167435 - nodes in this community are weakly interconnected._
- **Why does `Changelog` connect `Changelog` to `useLanguage`, `SobreView.tsx`, `safe-fetch.ts`, `ProjectDetailView.tsx`, `measure-sites.ts`, `avaliador-metodologia.md`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Should `AvaliadorView.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0957983193277311 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `next`, `AvaliadorView.tsx`, `SobreView.tsx`, `useLanguage`, `react`, `ProjectDetailView.tsx`, `ProjectCatalog.tsx`, `HomeView.tsx`, `InteractiveStats.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10957910014513789 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.05821917808219178 - nodes in this community are weakly interconnected._