# Graph Report - portofolio-mateus  (2026-11-06)

## Corpus Check
- 141 files · ~88,504 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 733 nodes · 1814 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `87ddd0d1`
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
- dependencies
- measure-sites.ts
- safe-fetch.ts
- compilerOptions
- package.json
- Portfólio Mateus Mendes
- Auditoria e levantamento — fases 0 e 1
- scripts
- projects.ts
- eslint.config.mjs
- HomeView.tsx
- ProjectDetailView.tsx
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
5. `Changelog` - 24 edges
6. `framer-motion` - 20 edges
7. `getWhatsAppUrl()` - 18 edges
8. `Button` - 17 edges
9. `SITE_CONFIG` - 17 edges
10. `WhatsAppIcon()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FloatingElements()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FloatingElements.tsx
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `TextReveal3D()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/TextAnimations.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `TiltCard3D()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/TiltCard3D.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `ProjectCatalog()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/projects/ProjectCatalog.tsx

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "SobreView.tsx"
Cohesion: 0.08
Nodes (34): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, metadata, ProjetosPage(), metadata, ServicosPage(), metadata, SobrePage() (+26 more)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (61): zod@^4.6.5, zod, auditSchema, checkDailyLimit(), DAILY_LIMIT, dailyReset, maxDuration, POST() (+53 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.05
Nodes (67): node-html-parser, vitest, json(), POST(), runtime, schema, CompareResults(), hostOf() (+59 more)

### Community 3 - "useLanguage"
Cohesion: 0.08
Nodes (42): framer-motion, NewsletterObrigadoPage(), NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), PREFERENCE_ICONS (+34 more)

### Community 4 - "ProjectCatalog.tsx"
Cohesion: 0.25
Nodes (13): ProjectCatalog(), ProjectCatalogProps, ProjectEntry(), ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot() (+5 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (64): next-themes, inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, Command (+56 more)

### Community 6 - "Changelog"
Cohesion: 0.08
Nodes (22): 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original, 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador (+14 more)

### Community 7 - "react"
Cohesion: 0.07
Nodes (33): react, metadata, NewsletterCancelarPage(), CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl() (+25 more)

### Community 8 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5, react@19.2.8 (+10 more)

### Community 9 - "measure-sites.ts"
Cohesion: 0.17
Nodes (12): 1. Stack e arquitetura, 2026-10-27 — Publicação na Vercel e correção do PDF em produção, main(), measure(), next, only, OUT, targets (+4 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.15
Nodes (17): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5, vitest@3.2.4 (+9 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "Auditoria e levantamento — fases 0 e 1"
Cohesion: 0.29
Nodes (6): 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1

### Community 15 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, typecheck

### Community 16 - "projects.ts"
Cohesion: 0.32
Nodes (4): PROJECT_SLUGS, ProjectCategory, ProjectImage, PROJECTS

### Community 17 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.8, eslint, eslint-config-next

### Community 19 - "HomeView.tsx"
Cohesion: 0.12
Nodes (16): Home(), metadata, kinetic, KineticName(), LetterState, ROWS, AUDIT_CATEGORIES, Band() (+8 more)

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.27
Nodes (10): CtaPanel(), CtaPanelProps, CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs() (+2 more)

### Community 22 - "pdf.ts"
Cohesion: 0.18
Nodes (13): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+5 more)

### Community 27 - "next"
Cohesion: 0.11
Nodes (19): nextConfig, next, AvaliadorPage(), first(), metadata, SearchParams, ContactoPage(), metadata (+11 more)

### Community 30 - "LanguageContext.tsx"
Cohesion: 0.10
Nodes (25): SpecsProps, en, DeepString, pt, Strings, emitChange(), getServerSnapshot(), LanguageContext (+17 more)

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `SobreView.tsx`, `audit/route.ts`, `audit/types.ts`, `useLanguage`, `ProjectCatalog.tsx`, `layout.tsx`, `react`, `dependencies`, `package.json`, `projects.ts`, `HomeView.tsx`, `ProjectDetailView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Should `SobreView.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08156028368794327 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `SobreView.tsx`, `audit/types.ts`, `useLanguage`, `ProjectCatalog.tsx`, `layout.tsx`, `dependencies`, `package.json`, `HomeView.tsx`, `ProjectDetailView.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059125085440874914 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `SobreView.tsx`, `audit/types.ts`, `ProjectCatalog.tsx`, `layout.tsx`, `react`, `measure-sites.ts`, `HomeView.tsx`, `ProjectDetailView.tsx`, `next`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05095839177185601 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.07857142857142857 - nodes in this community are weakly interconnected._