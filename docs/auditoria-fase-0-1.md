# Auditoria e levantamento — fases 0 e 1

Data: 2026-10-26  
Branch: `redesign`  
Âmbito: auditoria do portefólio atual e levantamento dos 8 sites publicados. Sem alterações de design ou código de produto.

## 1. Stack e arquitetura

- Next.js 16.3.8, React 19.2.8, TypeScript strict, Tailwind v4, Framer Motion 13, next-themes, Zod 4.
- Sem biblioteca de UI.
- Rotas em `main`: `/`, `/sobre`, `/servicos`, `/projetos`, `/projetos/[slug]`, `/contacto`, `/privacidade`.
- `/projetos/[slug]` já existe com 6 entradas; será reutilizada para os 8 casos de estudo.
- i18n por cookie, sem rotas `/en`; copy em `src/content/strings/pt.ts` e `en.ts`.
- Contacto: três passos, API existente em `/api/contact`; não será alterada.
- O working tree de base inclui WIP de newsletter, cookie consent, testimonials e lead magnet.

## 2. Baseline Lighthouse mobile

| Rota | Performance | Acessibilidade | Boas práticas | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 84 | 100 | 96 | 100 | 4,0 s | 220 ms | 0 |
| `/sobre` | 87 | 100 | 96 | 100 | 3,9 s | 140 ms | 0 |
| `/servicos` | 88 | 96 | 96 | 100 | 3,8 s | 80 ms | 0 |
| `/projetos` | 87 | 95 | 96 | 100 | 4,0 s | 80 ms | 0 |
| `/contacto` | 89 | 100 | 96 | 100 | 3,7 s | 80 ms | 0 |

Problemas de acessibilidade:

- `/servicos`: numeral do processo com `text-accent/40`, contraste 2,02:1; nome acessível do logo inconsistente.
- `/projetos`: filtro ativo branco sobre acento, contraste 2,77:1; saltos na hierarquia de headings; nome acessível do logo inconsistente.

## 3. Dez fraquezas visuais

1. Template beige/cartão repetido em quase todas as secções.
2. Hero 3D domina a atenção; a home tem o pior TBT.
3. Linguagens visuais misturadas: editorial, 3D, glass, wireframe e gradientes.
4. Portefólio fictício com clientes, métricas e testemunhos inventados.
5. Ilustrações por categoria em vez de screenshots do trabalho.
6. Hierarquia fraca, com excesso de 12 px, pills e badges.
7. Contraste e semântica AA falham em duas rotas.
8. Micro-interações em excesso, sem ponto focal.
9. Processo horizontal de ~250vh, com zonas vazias.
10. Dark theme sobretudo invertido; falta moldura neutra para 8 sites distintos.

## 4. Os 8 sites

| Site | Setor | Stack | Tipografia | Paleta | Âmbito verificado |
|---|---|---|---|---|---|
| Torra Lusa | Café / e-commerce | HTML, CSS, JS | DM Sans + Fraunces | `#F6EFE4` / `#2A211B` / `#C47A3D` | 10 páginas; loja, produto, checkout simulado, FAQ, envios; 3 formulários |
| Cota Zero | Arquitetura | HTML, CSS, JS | Archivo Black + JetBrains Mono + Caveat | `#E8E6E0` / `#0F0F0F` | 8 páginas; projetos, processo, materiais, estúdio, detalhe; loader; 0 formulários |
| Mendes Valadares | Advocacia | HTML, CSS, JS | DM Sans | `#F7F4EE` / `#1B2430` | Home, áreas, equipa, sobre, artigos, contactos, legais; 8 áreas; 0 formulários |
| Barbearia Sete Colinas | Barbearia | HTML, CSS, JS | Inter | `#F4EEE3` / `#1A1A1A` | One-page; marcação; PWA; SEO local |
| Lumina | Restauração | React, Vite, Tailwind | Inter + Playfair | `#000000` / `#FFFFFF` / `#6EE7B7` | Home, sobre, galeria, vinhos, 10 pratos; reservas; bilingue |
| DentiLusa | Saúde dentária | HTML, CSS, JS | DM Sans + Fraunces | `#FFFFFF` / `#12355B` / `#2BB5A8` / `#F0795B` | Home, tratamentos, sobre, equipa; 10 tratamentos; 1 formulário; urgências |
| AquaLis | Canalização | HTML, CSS, JS | Inter + Poppins | `#FFFFFF` / `#0B3C5D` / `#FF7A1A` | Home + 7 serviços + privacidade; 2 formulários; urgência 24h |
| FORJA Training Club | Ginásio | HTML, CSS, JS | DM Sans + Anton | `#0A0A0B` / `#F4F3EF` / `#2D5BFF` | 12+ páginas; horário, aulas, planos, treinadores, instalações; aula experimental; WhatsApp |

Notas:

- Sete repositórios são públicos; o da DentiLusa é privado e não será linkado.
- Vários sites usam conteúdo demonstrativo: fotografia Unsplash, contactos/moradas de exemplo, testemunhos e fluxos simulados.
- Lumina: a fonte Clarify City falha e cai para Playfair; a OG image é relativa.
- DentiLusa: canonical para `www.dentilusa.pt`, mas o site está em `dentilusa.vercel.app`.

## 5. Decisões tomadas

- **1A:** commit de baseline com o WIP atual antes dos commits de fase.
- **2C:** substituir os 6 projetos fictícios pelos 8 sites publicados; manter o histórico no Git e não os apresentar como clientes reais.
- **3A:** apresentar os 8 como projetos publicados / demonstrações de estúdio, sem inventar clientes, métricas ou resultados.
- **4A:** assumir 91–92 de performance mobile como objetivo, sem regressões, e corrigir os problemas de acessibilidade.

## 6. Restrições para a implementação

- Manter rotas existentes, API de contacto, temas, toggle PT/EN e comportamento SEO.
- Nenhuma alteração a `.env*`, Vercel, domínios ou deployments.
- Sem bibliotecas de UI.
- Copy novo dos casos de estudo em PT e EN, espelhado nos dois ficheiros de strings/dados.
- Previews de projetos só carregam em hover, focus ou proximidade do viewport.
- Respeitar `prefers-reduced-motion`.
- Um commit por fase; lint, typecheck e build limpos em cada fase.
