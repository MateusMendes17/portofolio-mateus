# Graph Report - portofolio-mateus  (2026-11-08)

## Corpus Check
- 146 files · ~93,897 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 760 nodes · 1886 edges · 31 communities (24 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `469c234b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- dependencies
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
- ServicosView.tsx
- Portfólio Mateus Mendes
- HomeView.tsx
- ProjetosView.tsx
- Button.tsx
- ScrollReveal.tsx
- ProjectQuiz.tsx
- scripts
- eslint.config.mjs
- LanguageContext.tsx
- pdf.ts
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- servicos/[slug]/page.tsx
- postcss.config.mjs
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 91 edges
2. `next` - 55 edges
3. `react` - 48 edges
4. `cn()` - 34 edges
5. `Changelog` - 32 edges
6. `framer-motion` - 19 edges
7. `AvaliadorView()` - 19 edges
8. `getWhatsAppUrl()` - 18 edges
9. `Button` - 17 edges
10. `SITE_CONFIG` - 17 edges

## Surprising Connections (you probably didn't know these)
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-11-07 — Fotografia, domínio da Vercel e página 404` --references--> `HeroName()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/home/HeroName.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `ProjectCatalog()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/projects/ProjectCatalog.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `CtaPanel()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/CtaPanel.tsx
- `2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site` --references--> `FaqAccordion()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/FaqAccordion.tsx

## Import Cycles
- None detected.

## Communities (31 total, 7 thin omitted)

### Community 0 - "next"
Cohesion: 0.08
Nodes (25): nextConfig, next, AvaliadorPage(), first(), metadata, SearchParams, ContactoPage(), metadata (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, node-html-parser@9.0.5, react@19.2.8, react-dom@19.2.8 (+9 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.06
Nodes (60): node-html-parser, vitest, CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber() (+52 more)

### Community 3 - "useLanguage"
Cohesion: 0.08
Nodes (45): framer-motion, metadata, NewsletterObrigadoPage(), CallBooking(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess() (+37 more)

### Community 4 - "SobreView.tsx"
Cohesion: 0.16
Nodes (15): metadata, SobrePage(), CodePhilosophyTerminal(), TabFile, FilterTab, TechItem, TechStackExplorer(), StaggerContainer() (+7 more)

### Community 5 - "useLanguage"
Cohesion: 0.08
Nodes (43): next-themes@^0.4.6, next-themes, inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson (+35 more)

### Community 6 - "Changelog"
Cohesion: 0.07
Nodes (27): 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original, 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador (+19 more)

### Community 7 - "react"
Cohesion: 0.07
Nodes (31): 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site, react, metadata, NewsletterCancelarPage(), Mode, CAL_VARS, CallScheduler(), splitCalUrl() (+23 more)

### Community 8 - "package.json"
Cohesion: 0.15
Nodes (17): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5, vitest@3.2.4 (+9 more)

### Community 9 - "audit/route.ts"
Cohesion: 0.05
Nodes (74): zod@^4.6.5, zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit() (+66 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (19): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "ServicosView.tsx"
Cohesion: 0.29
Nodes (8): metadata, ServicosPage(), Service, ServiceArticle(), FaqAccordion(), ServiceDetailView(), ServicosView(), STANDARD_ICONS

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 14 - "HomeView.tsx"
Cohesion: 0.05
Nodes (56): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, 2026-10-27 — Publicação na Vercel e correção do PDF em produção (+48 more)

### Community 15 - "ProjetosView.tsx"
Cohesion: 0.26
Nodes (8): 2026-11-06 — Navbar no tema novo e correção de animações, metadata, ProjetosPage(), PageIntro(), PageIntroProps, SectionHeading(), SectionHeadingProps, ProjetosView()

### Community 16 - "Button.tsx"
Cohesion: 0.22
Nodes (10): ArrowIcon(), BASE_CLASSES, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, classesFor() (+2 more)

### Community 17 - "ScrollReveal.tsx"
Cohesion: 0.32
Nodes (6): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), ScrollReveal(), ScrollRevealProps, StaggerContainerProps, StaggerItemProps, Testimonials()

### Community 18 - "ProjectQuiz.tsx"
Cohesion: 0.25
Nodes (7): GOAL_ICONS, PRIORITY_ICONS, QuizAnswer, RESULT_LINKS, ResultKey, SolutionResult, STAGE_ICONS

### Community 19 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, typecheck

### Community 20 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.8, eslint, eslint-config-next

### Community 21 - "LanguageContext.tsx"
Cohesion: 0.09
Nodes (29): 2026-11-07 — Fotografia, domínio da Vercel e página 404, NotFound(), DEFAULT_ROWS, DEFAULT_SPECS, display, HeroName(), SpecsProps, en (+21 more)

### Community 22 - "pdf.ts"
Cohesion: 0.14
Nodes (13): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+5 more)

### Community 27 - "servicos/[slug]/page.tsx"
Cohesion: 0.47
Nodes (4): generateMetadata(), getService(), PageProps, ServiceDetailPage()

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `dependencies`, `useLanguage`, `SobreView.tsx`, `useLanguage`, `react`, `package.json`, `audit/route.ts`, `ServicosView.tsx`, `HomeView.tsx`, `ProjetosView.tsx`, `Button.tsx`, `ProjectQuiz.tsx`, `LanguageContext.tsx`, `servicos/[slug]/page.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.07822410147991543 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `next`, `audit/types.ts`, `SobreView.tsx`, `useLanguage`, `react`, `ServicosView.tsx`, `HomeView.tsx`, `ProjetosView.tsx`, `ScrollReveal.tsx`, `ProjectQuiz.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `dependencies`, `audit/types.ts`, `useLanguage`, `SobreView.tsx`, `useLanguage`, `package.json`, `ServicosView.tsx`, `HomeView.tsx`, `ProjetosView.tsx`, `Button.tsx`, `ScrollReveal.tsx`, `ProjectQuiz.tsx`, `LanguageContext.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05730238025271819 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.08298368298368299 - nodes in this community are weakly interconnected._