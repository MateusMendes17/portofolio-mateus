# Graph Report - portofolio-mateus  (2026-10-27)

## Corpus Check
- 136 files · ~87,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 702 nodes · 1754 edges · 21 communities (16 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f100b4a1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- audit/route.ts
- audit/types.ts
- useLanguage
- ProjectDetailView.tsx
- layout.tsx
- Changelog
- CallBooking.tsx
- safe-fetch.ts
- compilerOptions
- package.json
- Portfólio Mateus Mendes
- AvaliadorView.tsx
- HomeView.tsx
- ProjectDetailView.tsx
- LanguageContext.tsx
- Portofolio Vault (Obsidian)
- projects.archive.ts
- AGENTS.md
- constants.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 87 edges
2. `next` - 51 edges
3. `react` - 49 edges
4. `cn()` - 28 edges
5. `framer-motion` - 21 edges
6. `Button` - 21 edges
7. `Changelog` - 21 edges
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
- `ServicosPage()` --calls--> `ServicosView()`  [EXTRACTED]
  src/app/servicos/page.tsx → src/components/views/ServicosView.tsx

## Import Cycles
- None detected.

## Communities (21 total, 5 thin omitted)

### Community 1 - "audit/route.ts"
Cohesion: 0.06
Nodes (66): zod, json(), POST(), runtime, schema, auditSchema, checkDailyLimit(), DAILY_LIMIT (+58 more)

### Community 2 - "audit/types.ts"
Cohesion: 0.10
Nodes (38): node-html-parser, vitest, StreamAuditOutcome, checkAccessibility(), finding(), checkContent(), finding(), CheckInput (+30 more)

### Community 3 - "useLanguage"
Cohesion: 0.06
Nodes (60): framer-motion, react, NotFound(), FormStepDetails(), FormStepPreference(), FormStepProjectType(), FormSuccess(), PREFERENCE_ICONS (+52 more)

### Community 4 - "ProjectDetailView.tsx"
Cohesion: 0.10
Nodes (29): metadata, ProjetosPage(), Command, CommandPalette(), Ico(), NavIcons, normalize(), score() (+21 more)

### Community 5 - "layout.tsx"
Cohesion: 0.06
Nodes (56): nextConfig, next, ContactoPage(), metadata, inter, metadata, RootLayout(), spaceGrotesk (+48 more)

### Community 6 - "Changelog"
Cohesion: 0.08
Nodes (22): 2026-10-26 — Animações na home (CSS puro, só transform/opacity), 2026-10-26 — Fundo do hero: hero-bg.png, 2026-10-26 — Hero simplificado, 2026-10-26 — Redesign completo do hero (v3), 2026-10-26 — Redesign do hero da home, 2026-10-26 — Redesign v4: intro compacta, projetos primeiro, 2026-10-26 — Redesign v5: tema violeta (referência Pinterest), 2026-10-26 — Reposta a paleta original (+14 more)

### Community 7 - "CallBooking.tsx"
Cohesion: 0.13
Nodes (20): CallBooking(), Mode, CAL_VARS, CallScheduler(), splitCalUrl(), keyOf(), MonthGrid(), pad() (+12 more)

### Community 10 - "safe-fetch.ts"
Cohesion: 0.13
Nodes (18): doRequest(), fail(), friendlyMessage(), ipToLong(), isBlockedHost(), isBlockedIp(), isPrivateIpv4(), isPrivateIpv6() (+10 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "package.json"
Cohesion: 0.05
Nodes (51): eslintConfig, dependencies, @calcom/embed-react@^1.5.3, clsx@^2.1.1, framer-motion@^13.5.0, next@16.3.8, next-themes@^0.4.6, node-html-parser@9.0.5 (+43 more)

### Community 13 - "Portfólio Mateus Mendes"
Cohesion: 0.06
Nodes (32): 1. O que é o Avaliador de Sites, 2. Metodologia de Pontuação e Pesos, 3. Catálogo de Verificações Implementadas, 4. Resumo de Riscos e Proteções Implementadas, 5. Limitações Assumidas na v1, 6. O que Ficou Fora da v1 e Ideias para a v2, 7. Extensões (2026-10-27), A. Segurança e Base (`src/lib/audit/checks/security.ts`) (+24 more)

### Community 15 - "AvaliadorView.tsx"
Cohesion: 0.12
Nodes (22): AvaliadorPage(), metadata, CompareResults(), hostOf(), NAMES, scoreOf(), LossCalculator(), toNumber() (+14 more)

### Community 19 - "HomeView.tsx"
Cohesion: 0.12
Nodes (19): Home(), metadata, ArrowIcon(), BASE_CLASSES, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize (+11 more)

### Community 21 - "ProjectDetailView.tsx"
Cohesion: 0.06
Nodes (35): 1. Stack e arquitetura, 2. Baseline Lighthouse mobile, 3. Dez fraquezas visuais, 4. Os 8 sites, 5. Decisões tomadas, 6. Restrições para a implementação, Auditoria e levantamento — fases 0 e 1, ACCENT (+27 more)

### Community 22 - "LanguageContext.tsx"
Cohesion: 0.10
Nodes (25): SpecsProps, en, DeepString, pt, Strings, emitChange(), getServerSnapshot(), LanguageContext (+17 more)

### Community 27 - "constants.ts"
Cohesion: 0.08
Nodes (23): metadata, NewsletterCancelarPage(), metadata, PrivacidadePage(), generateMetadata(), PageProps, ProjectDetailPage(), metadata (+15 more)

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `audit/route.ts`, `useLanguage`, `ProjectDetailView.tsx`, `package.json`, `AvaliadorView.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`, `LanguageContext.tsx`, `constants.ts`?**
  _High betweenness centrality (0.218) - this node is a cross-community bridge._
- **Should `audit/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05759623861298854 - nodes in this community are weakly interconnected._
- **Why does `useLanguage()` connect `useLanguage` to `ProjectDetailView.tsx`, `layout.tsx`, `CallBooking.tsx`, `AvaliadorView.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`, `LanguageContext.tsx`, `constants.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `audit/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10087082728592163 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useLanguage` to `ProjectDetailView.tsx`, `layout.tsx`, `CallBooking.tsx`, `package.json`, `AvaliadorView.tsx`, `HomeView.tsx`, `ProjectDetailView.tsx`, `LanguageContext.tsx`, `constants.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.06080246913580247 - nodes in this community are weakly interconnected._
- **Should `ProjectDetailView.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10241820768136557 - nodes in this community are weakly interconnected._