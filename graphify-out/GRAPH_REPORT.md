# Graph Report - portofolio-mateus  (2026-10-27)

## Corpus Check
- 133 files · ~87,532 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 699 nodes · 1693 edges · 33 communities (28 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28f5df54`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useLanguage
- audit/route.ts
- audit/types.ts
- next
- ProjectCatalog.tsx
- layout.tsx
- Changelog
- CallBooking.tsx
- measure-sites.ts
- measure-sites.ts
- safe-fetch.ts
- compilerOptions
- package.json
- 3. Catálogo de Verificações Implementadas
- Button.tsx
- AvaliadorView.tsx
- react
- Portfólio Mateus Mendes
- ProjectDetailView.tsx
- HomeView.tsx
- useContactForm.ts
- generate-lead-magnet.ts
- LanguageContext.tsx
- ProjectQuiz.tsx
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- lib/seo.ts
- postcss.config.mjs
- projects.ts
- next
- ProjetosView.tsx

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 85 edges
2. `next` - 48 edges
3. `react` - 47 edges
4. `cn()` - 28 edges
5. `framer-motion` - 21 edges
6. `Button` - 21 edges
7. `Changelog` - 19 edges
8. `getWhatsAppUrl()` - 18 edges
9. `WhatsAppIcon()` - 16 edges
10. `AvaliadorView()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `2026-10-27 — Marca em texto + ícone` --references--> `BrandLockup()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/Logo.tsx
- `2026-10-26 — Animações na home (CSS puro, só transform/opacity)` --references--> `ScrollReveal()`  [INFERRED]
  Portofolio-Vault/Changelog.md → src/components/ui/ScrollReveal.tsx
- `1. Stack e arquitetura` --references--> `main()`  [INFERRED]
  Portofolio-Vault/docs/auditoria-fase-0-1.md → scripts/measure-sites.ts
- `1. Stack e arquitetura` --references--> `main()`  [INFERRED]
  docs/auditoria-fase-0-1.md → scripts/measure-sites.ts
- `measure()` --calls--> `buildReport()`  [EXTRACTED]
  scripts/measure-sites.ts → src/lib/audit/report.ts

## Import Cycles
- None detected.

## Communities (33 total, 5 thin omitted)

### Community 0 - "useLanguage"
Cohesion: 0.30
Nodes (12): framer-motion, NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), ContactFormController, ContactForm() (+4 more)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (52): zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit(), DAILY_LIMIT (+44 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.11
Nodes (35): node-html-parser, checkAccessibility(), finding(), checkContent(), finding(), CheckInput, runAllChecks(), checkMobile() (+27 more)

### Community 3 - "next"
Cohesion: 0.13
Nodes (24): metadata, ServicosPage(), FloatingElements(), FloatingElementsProps, POSITIONS, SHAPES, ScrollReveal(), ScrollRevealProps (+16 more)

### Community 4 - "ProjectCatalog.tsx"
Cohesion: 0.28
Nodes (11): ProjectCatalogProps, ProjectEntryProps, StudyKey, getReducedMotionQuery(), getReducedMotionSnapshot(), getServerReducedMotionSnapshot(), ProjectPreview(), ProjectPreviewProps (+3 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (63): inter, metadata, RootLayout(), spaceGrotesk, structuredData, structuredDataJson, Command, CommandPalette() (+55 more)

### Community 6 - "Changelog"
Cohesion: 0.05
Nodes (36): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+28 more)

### Community 7 - "CallBooking.tsx"
Cohesion: 0.13
Nodes (20): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+12 more)

### Community 8 - "measure-sites.ts"
Cohesion: 0.11
Nodes (16): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, 1. Stack e arquitetura (+8 more)

### Community 9 - "measure-sites.ts"
Cohesion: 0.25
Nodes (8): next, only, OUT, targets, MeasuredMetrics(), scoreTone(), SITE_METRICS, SiteMeasurement

### Community 10 - "safe-fetch.ts"
Cohesion: 0.11
Nodes (20): vitest@3.2.4, vitest, doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp() (+12 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.05
Nodes (49): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+41 more)

### Community 13 - "3. Catálogo de Verificações Implementadas"
Cohesion: 0.12
Nodes (16): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+8 more)

### Community 14 - "Button.tsx"
Cohesion: 0.22
Nodes (8): ArrowIcon(), BASE_CLASSES, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, SIZE_CLASSES, VARIANT_CLASSES

### Community 15 - "AvaliadorView.tsx"
Cohesion: 0.11
Nodes (24): AvaliadorPage(), metadata, CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber() (+16 more)

### Community 16 - "react"
Cohesion: 0.24
Nodes (6): react, NewsletterObrigadoPage(), CodePhilosophyTerminal(), TabFile, NewsletterThankYou(), PageIntroProps

### Community 17 - "Portfólio Mateus Mendes"
Cohesion: 0.14
Nodes (13): Autor, Correr localmente, Deploy, Estrutura, Formulário de contacto, Funcionalidades, Performance, Portfólio Mateus Mendes (+5 more)

### Community 18 - "ProjectDetailView.tsx"
Cohesion: 0.26
Nodes (11): CaseSection(), CaseSectionProps, CaseText(), getHostname(), ProjectDetailView(), Specs(), SpecsProps, StudyKey (+3 more)

### Community 19 - "HomeView.tsx"
Cohesion: 0.19
Nodes (10): Home(), metadata, CtaPanel(), CtaPanelProps, SectionHeading(), SectionHeadingProps, AUDIT_CATEGORIES, HomeView() (+2 more)

### Community 20 - "useContactForm.ts"
Cohesion: 0.21
Nodes (12): PREFERENCE_ICONS, PreferenceOption, PROJECT_TYPE_ICONS, ProjectOption, EMPTY_FORM, FormStep, loadValidation(), SubmitStatus (+4 more)

### Community 21 - "generate-lead-magnet.ts"
Cohesion: 0.09
Nodes (25): pdf-lib@^1.17.1, pdf-lib, ACCENT, generate(), INK, LINE, MUTED, PAPER (+17 more)

### Community 22 - "LanguageContext.tsx"
Cohesion: 0.21
Nodes (11): FilterTab, TechItem, TechStackExplorer(), emitChange(), getServerSnapshot(), LanguageContext, LanguageProvider(), listeners (+3 more)

### Community 23 - "ProjectQuiz.tsx"
Cohesion: 0.25
Nodes (7): GOAL_ICONS, PRIORITY_ICONS, QuizAnswer, RESULT_LINKS, ResultKey, SolutionResult, STAGE_ICONS

### Community 27 - "lib/seo.ts"
Cohesion: 0.12
Nodes (14): ContactoPage(), metadata, generateMetadata(), PageProps, ProjectDetailPage(), metadata, SobrePage(), getProject() (+6 more)

### Community 30 - "projects.ts"
Cohesion: 0.32
Nodes (4): PROJECT_SLUGS, ProjectCategory, ProjectImage, PROJECTS

### Community 31 - "next"
Cohesion: 0.36
Nodes (5): nextConfig, next, metadata, PrivacidadePage(), PrivacidadeView()

### Community 32 - "ProjetosView.tsx"
Cohesion: 0.43
Nodes (5): metadata, ProjetosPage(), ProjectCatalog(), ProjectEntry(), ProjetosView()

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `useLanguage`, `audit/route.ts`, `ProjetosView.tsx`, `next`, `ProjectCatalog.tsx`, `layout.tsx`, `package.json`, `Button.tsx`, `AvaliadorView.tsx`, `react`, `ProjectDetailView.tsx`, `HomeView.tsx`, `ProjectQuiz.tsx`, `lib/seo.ts`, `projects.ts`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06196291270918137 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `ProjetosView.tsx`, `next`, `ProjectCatalog.tsx`, `layout.tsx`, `CallBooking.tsx`, `measure-sites.ts`, `AvaliadorView.tsx`, `react`, `ProjectDetailView.tsx`, `HomeView.tsx`, `useContactForm.ts`, `LanguageContext.tsx`, `ProjectQuiz.tsx`, `next`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11139455782312925 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `useLanguage`, `next`, `ProjectCatalog.tsx`, `layout.tsx`, `CallBooking.tsx`, `package.json`, `Button.tsx`, `AvaliadorView.tsx`, `ProjectDetailView.tsx`, `HomeView.tsx`, `useContactForm.ts`, `LanguageContext.tsx`, `ProjectQuiz.tsx`, `lib/seo.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.13306451612903225 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.061156235069278544 - nodes in this community are weakly interconnected._