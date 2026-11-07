---
tags: [changelog]
---

# Changelog

## 2026-11-07 — Página de projetos afinada

- Filtros com contagem por categoria ("Institucional 5") e `aria-pressed` (`ProjectCatalog.tsx`).
- Cada projeto mostra os números medidos logo na lista (Avaliador em destaque, depois Desempenho, Acessibilidade, SEO), lidos de `site-metrics.ts`.
- Removida a secção "critérios" de `ProjetosView.tsx`, que repetia o Sobre e os Serviços (página mais curta).

## 2026-11-07 — Fotografia, domínio da Vercel e página 404

- **Fotografia:** original em `docs/fotos/foto-mateus-original.jpeg`; versões otimizadas em `public/sobre/` (`mateus-retrato.webp` 4:5, 54 KB; `mateus-avatar.webp` quadrado, 15 KB). Aparece no topo do Sobre (moldura inclinada + autocolante "Olá, sou o Mateus 👋", novo `PageIntro.media`), no cartão "Sem agência" da home (avatar que liga ao Sobre), no rodapé e no JSON-LD `Person.image`.
- **Domínio:** sem domínio próprio por agora; `SITE_CONFIG.url`, `.env.local` e `.env.local.example` passam a `https://portofolio-mateus.vercel.app`.
- **404 nova:** "404" gigante com a lente raio-X da home (o `HeroName` passou a aceitar `rows`, `label`, `bandRow`, `specs`, `as` e `compact`), endereço pedido nas medidas da lente, atalhos para Projetos/Serviços/Avaliador/Contacto e botão que abre a pesquisa (Ctrl K). Título "Página não encontrada | Mateus Mendes" reposto com um `MutationObserver` (a Next repunha o título por omissão).
- Newsletter: campos de email em pílula com hairline de tinta.
- Preços: decidido não publicar (ver conversa).

## 2026-11-07 — Auditoria completa: correções e melhorias

**Erros corrigidos**
- Âncoras entre páginas (`/servicos#x`) caíam no topo: removido `SmoothScroll.tsx` (forçava `scrollTo(0,0)`); `scroll-padding-top` global para a navbar.
- Variantes `dark:` seguiam o sistema e não o botão de tema: `@custom-variant dark` em `globals.css` (blocos `.light` ficam claros).
- Botões selecionados com texto branco sobre chartreuse no tema escuro (formulário de contacto, explorador de tecnologias).
- Menu móvel mostrava "Avaliador" em PT com o site em EN (usa `NAV_LABEL_KEYS`).
- Exemplo do Avaliador e fallbacks dos emails/user-agent apontavam para `mateusmendes.pt` fixo: usam `SITE_URL`.
- Banner de cookies removido: falava de GA/Meta Pixel/Ads que não existem e não fazia nada. Nota "Sem cookies de rastreamento" no rodapé (o Avaliador continua a encontrar a menção a cookies).
- "Iniciar Assistente" leva a `/sobre#assistente`.
- Marcador chartreuse tapava a linha anterior em títulos de duas linhas (`.home-hl` com z-index -1 num contexto isolado).
- Mancha chartreuse removida das imagens `public/hero/topo-*.webp`.
- Rodapé, botão "voltar ao topo" e botão do WhatsApp no estilo novo; rodapé sem CTA repetido e colado ao "Vamos falar?".
- `.container-page` a toda a largura: margens iguais às do cabeçalho das páginas.
- Cartão "Sem agência", pilares do Sobre (linhas com altura mínima), lente raio-X no escuro (cinzenta, visível sobre a faixa), nome na navbar entre 768–1100 px (só ícone).
- Widgets do Sobre (quiz, stack, terminal) com a escala tipográfica nova.
- Pontos do formulário com `aria-label`; páginas da newsletter sem `<main>` duplicado e com título/noindex; ano do rodapé sem risco de hidratação; emails da newsletter com a paleta nova; capa do catálogo sem `priority` (pré-carregada à toa no telemóvel).
- Título do `CtaPanel` com classe partida (`m-0max-w-[16ch]`).
- Não resolvido: título da página 404 (o Next repõe o título por omissão; é noindex).

**Melhorias**
- Números do Sobre calculados das medições reais (`InteractiveStats.tsx`), com contador animado (`CountUp.tsx`, também em `MeasuredMetrics`).
- Página própria por serviço: `/servicos/[slug]` (`ServiceDetailView.tsx`, `ServiceArticle.tsx`), no sitemap; na listagem os entregáveis ficam num acordeão (página mais curta). Cartões da home e rodapé apontam para elas.
- Cursor com anel e botões magnéticos (`CursorFX.tsx`, só desktop com rato); cortina chartreuse entre páginas (`RouteCurtain.tsx`) e entrada da página (`app/template.tsx`).
- Avaliador: guarda o último relatório no browser ("Ver de novo") e "Copiar link" (`?url=…&analisar=1` corre a análise ao abrir).
- Formulário de contacto guarda rascunho no browser, com aviso e "Começar de novo".
- Por fazer (precisa do Mateus): fotografia, preços indicativos, ligar o domínio `mateusmendes.pt` (e atualizar `NEXT_PUBLIC_SITE_URL`).

## 2026-11-06 — Nome do topo: lente "raio-X" (substitui o nome cinético)

- `KineticName.tsx` removido; novo `src/components/home/HeroName.tsx`. O nome fica sólido (Bricolage Grotesque 800, sem eixos animados) e por cima passa uma lente circular que mostra o "esqueleto" das letras: contornos chartreuse, grelha técnica, linhas-guia (altura das maiúsculas e base), caixas dos glifos e as medidas tipográficas reais. Ideia: design por fora, rigor técnico por dentro.
- Entrada: as letras sobem por baixo de uma linha de corte, em cascata; a faixa chartreuse de "MENDES" entra a seguir. Depois de ~1,7 s a lente aparece e passeia sozinha (também em telemóvel); com rato segue o cursor com atraso suave, desaparece ao sair e volta a passear 2,6 s depois.
- Desempenho: só se animam o `clip-path` da lente e o `transform` do anel; o loop pára quando o topo sai do ecrã ou o separador fica escondido. Respeita `prefers-reduced-motion` (sem passeio nem entrada).
- Tema escuro: lente chartreuse com contornos escuros.

## 2026-11-06 — Nome cinético mais suave

- A onda do "MATEUS MENDES" estava travada: animar os eixos da fonte mudava a largura das letras e obrigava a recalcular a linha inteira a cada fotograma (e a letra debaixo do rato fugia do cursor).
- Cada letra é agora uma célula de tamanho fixo (`KineticName.tsx`): uma cópia invisível no peso/largura máximos reserva o espaço e o glifo visível muda por cima, com `contain: layout style`. Onda um pouco mais lenta (4,8 s) e com easing simétrico.

## 2026-11-06 — Navbar no tema novo e correção de animações

**Navbar** (`Header.tsx`, `MobileNav.tsx`, `Logo.tsx`, `ThemeToggle.tsx`, `LanguageToggle.tsx`, `CommandPalette.tsx`)
- Hairline de tinta 1.5px; links numa cápsula (hover chartreuse, página ativa invertida); CTA chartreuse com seta que roda; botões redondos para pesquisa, tema e menu; seletor PT/EN em pílula chartreuse.
- Marca: nome em Space Grotesk e "Web Developer" em mono com o ponto "disponível".
- Menu móvel: itens gigantes que entram em cascata, hover chartreuse, botão de fechar chartreuse que roda.
- Paleta de comandos com cantos de 28px e item ativo chartreuse.

**Animações corrigidas**
- Nome cinético: as letras saltavam ao entrar/sair com o rato (a onda era cortada). A onda corre sempre e o hover mistura-se com ela por `@property --kn-mix` com transição.
- Botões: o `hover:scale` não tinha transição (Tailwind v4 usa a propriedade `scale`, que faltava na lista).
- Cartões "Provas verificáveis": o hover CSS lutava com o transform da animação de entrada; o hover passou para um elemento interior.
- FAQ (`<details>`): a resposta entra com deslize curto.
- `PageIntro`: entrada escalonada (classe `rise`), como na home.

## 2026-11-06 — Nova homepage "Nome cinético" e tema aplicado a todo o site

Só design: textos, rotas, formulários, Avaliador, SEO e dados ficam iguais.

**Home** (vinda da pasta `nova-homepage-mateus`, já apagada)
- `src/components/views/HomeView.tsx` substituído; novos `src/components/home/KineticName.tsx` (nome gigante, Bricolage Grotesque com eixos de peso/largura) e `src/components/home/home.css`; fundos `public/hero/topo-light.webp` e `topo-dark.webp`.
- Conteúdo da home antiga que a versão nova deixava cair foi recuperado com o visual novo: link "Marcar chamada" (com Cal), "Comparar com um concorrente", nota do Avaliador, aviso de projetos-conceito, secção "Provas verificáveis" (+ métricas medidas quando existirem), teaser do quiz e a origem `home` no link do WhatsApp.

**Tema partilhado**
- `home.css` passa a ser importado no `layout.tsx` (classes `home-hl`, `home-dot`, `home-contact*` e novas `theme-intro-bg`, `theme-card`, `theme-row`, `theme-faq`).
- Componentes redesenhados: `PageIntro` (barra de estado + fundo topográfico + título gigante), `SectionHeading` (título grande, índice chartreuse), `Button` (pílulas com hairline 1.5px), `CtaPanel` (bloco final escuro / chartreuse no tema escuro; `eyebrow` opcional). Novo `FaqAccordion` (`<details>` nativo, respostas sempre no HTML).
- Páginas atualizadas: Projetos (+ `ProjectCatalog`), detalhe de projeto, Serviços (o scroll horizontal do processo passou a lista como na home), Sobre, Contacto, Avaliador, Privacidade, 404, e os componentes interativos/formulários (cantos arredondados, paleta antiga castanha do terminal trocada pelos tokens `--code-*`).
- Verificado: `tsc`, `eslint` e 54 testes a passar; todas as rotas respondem 200 (404 na rota inexistente).
- Por fazer: revisão visual no browser (claro/escuro e mobile). `FloatingElements`, `TextReveal3D` e `TiltCard3D` deixaram de ser usados nestas páginas (ficheiros mantidos).

## 2026-10-27 — Publicação na Vercel e correção do PDF em produção

- Projeto `portofolio-mateus` na Vercel, ligado ao GitHub (produção = ramo `main`). URL: https://portofolio-mateus.vercel.app. Região das funções: `cdg1` (`vercel.json`). Variáveis configuradas em production + preview (as chaves como segredos). `NEXT_PUBLIC_SITE_URL` = URL da Vercel até haver domínio próprio (é inlined na build: mudar e **fazer redeploy** quando ligar `mateusmendes.pt`).
- **Bug só visível em produção:** o PDF dava 410 porque a cache da análise é em memória e na Vercel cada instância tem a sua. Agora `/api/audit` assina o resultado (HMAC, `src/lib/audit/signature.ts`) e `/api/audit/report` gera o PDF a partir do resultado assinado enviado pelo browser. Testes novos (54 no total).
- Continuam em memória por instância (aceitável para já): cache da análise, limites de pedidos (contacto, marcação, newsletter, avaliador). Se houver abuso, passar para Upstash/Redis.
- `.vercelignore` exclui o vault e o graphify do deploy.

## 2026-10-27 — Verificação de produção: build e CLS das páginas Avaliador/Contacto

- `npm run build` passa (31 páginas), testado numa cópia sem `.env.local`.
- **Bug encontrado na build:** `/avaliador` e `/contacto` saíam **sem conteúdo no HTML** (CSR bailout por `useSearchParams` + Suspense) e tinham CLS 0,80 (o rodapé saltava). Corrigido lendo `searchParams` no servidor (`src/app/avaliador/page.tsx`, `src/app/contacto/page.tsx`); as views recebem `initialUrl/initialCompare/initialUrlB` e `initialTab` por props. Passam a ser páginas dinâmicas (`ƒ`).
- Lighthouse local (mobile, build de produção): home 83, avaliador 65 → **89**, contacto 65 → **88**; CLS 0; acessibilidade, boas práticas e SEO a 100.
- Ainda com `useSearchParams`: `/newsletter/obrigado` e `/newsletter/cancelar` (páginas sem SEO, aceitável).

## 2026-10-27 — Cancelamento da newsletter e otimização de 3 projetos

**Newsletter**
- Ligação de cancelamento **assinada** (HMAC, `src/lib/newsletter-token.ts`) no email de boas-vindas, página `/newsletter/cancelar` (noindex, só age ao clicar) e `POST /api/newsletter/unsubscribe`. O pedido tenta marcar o contacto como cancelado na audiência do Resend e **avisa o dono por email** (funciona com chaves só de envio).
- Cabeçalhos `List-Unsubscribe` / `List-Unsubscribe-Post` (cancelamento com um clique no Gmail/Apple Mail).
- A rota `/api/newsletter` passou a validar `Origin` e a limitar pedidos (10/hora por IP).
- Testes: `src/lib/newsletter-token.test.ts` (51 testes no total).
- Nota: o site **não guarda lista de subscritores** (só se `RESEND_AUDIENCE_ID` estiver definido e a chave o permitir); para campanhas futuras usar Resend Broadcasts.

**Projetos lentos** (repos separados, ramo `perf/carregamento` em cada um, por fazer merge)
- Forja: fontes saíram do `@import` do CSS e a imagem principal ficou responsiva (410 KB → 35 KB). Local: 67 → 92.
- Dentilusa: fundo da hero self-hosted em WebP (800/1400 px) + fontes sem bloquear. Local: 84 → 98.
- Torra Lusa: reserva do espaço do cabeçalho injetado por JS (CLS ~0,17 → ~0,05) + fontes sem bloquear.
- Depois do merge e deploy: `npx tsx --env-file=.env.local scripts/measure-sites.ts forja dentilusa torra-lusa` para atualizar `site-metrics.ts`.

## 2026-10-27 — README e screenshots novos

- `README.md` reescrito: descreve o Avaliador (PDF, comparação, simulador), a marcação de chamadas (Cal.com), a newsletter, as medições reais dos projetos, variáveis de ambiente, endpoints e estrutura atuais. Removidos o badge e a tabela de Lighthouse antigos (não eram verificáveis).
- Prints novos em `docs/` (home, avaliador com relatório, contacto com calendário, projetos, sobre, serviços, telemóvel), tirados com Playwright + Edge ao site local. Apagados os `*-detalhe.jpg` antigos.
- Corrigido "Outubro De 2026" → "Outubro de 2026" na grelha da marcação.

## 2026-10-27 — Marcação rápida (hora numa caixa de combinação)

- O separador "Marcar chamada" passou a ter **marcação rápida** por omissão: escolher o dia numa **grelha mensal compacta** (`MonthGrid.tsx`; só os dias com horários livres são selecionáveis), escrever ou escolher a hora (`TimeCombobox.tsx`, ARIA combobox: "14", "1430" ou "14:30"), nome + email. Botão "Primeiro horário livre". O calendário completo do Cal.com continua disponível ("Usar o calendário completo").
- Servidor: `GET /api/booking/slots` (horários via API pública do Cal.com) e `POST /api/booking` (cria a marcação; origem, honeypot, limite de 5/hora e sem PII nos logs). Helpers em `src/lib/cal-booking.ts`; componentes `CallBooking.tsx`, `QuickBooking.tsx`.
- Causa da lista longa: a disponibilidade no Cal.com está muito larga (72 horários/dia, 02:00–19:45, e sábados). Corrigir **no Cal.com** (Disponibilidade) – ver [[Pendentes]].
- Por testar com uma marcação real: o `POST /api/booking` ao Cal.com (só validado com pedidos inválidos).

## 2026-10-27 — Contacto: calendário Cal.com integrado

- `/contacto` ganhou dois separadores: **Enviar mensagem** (formulário) e **Marcar chamada** (calendário do Cal.com embebido, com as cores do site em claro e escuro). Deep link: `/contacto?aba=chamada`.
- Componente `src/components/contact/CallScheduler.tsx` (pacote `@calcom/embed-react`); só carrega o Cal.com quando o separador é aberto e mostra a nota de serviço externo + ligação para abrir no Cal.com.
- Botão "Marcar chamada de 15 min" no topo do contacto, no cartão de contactos e na home (agora leva ao separador em vez de abrir o Cal.com noutro site).
- Só aparece com `NEXT_PUBLIC_CAL_URL` (15 min) e, opcionalmente, `NEXT_PUBLIC_CAL_URL_30` (30 min; mostra seletor 15/30 min). Ver `.env.local.example`. Sem variáveis, `/contacto` fica como estava.

## 2026-10-27 — Newsletter e checklist em PDF

- `scripts/generate-lead-magnet.ts` reescrito: identidade atual (preto + verde-limão), PT-PT com acentos, 12 pontos alinhados com as verificações do Avaliador. Removidas estatísticas sem fonte ("53%", "até 40%", "-7% por 100 ms"). Regenerar com `npx tsx scripts/generate-lead-magnet.ts` → `public/lead-magnet/checklist-conversao.pdf`.
- `src/app/api/newsletter/route.ts`: remetente passa a ser o `RESEND_FROM` (o domínio por defeito não estava verificado), mensagem clara quando o Resend está em modo de teste e **PDF anexado ao email** (o link dependia de o site estar online).
- Pendente: cancelamento de subscrição funcional (o link é `#`) e proteção anti-spam na rota. Ver [[Pendentes]].

## 2026-10-27 — Email de contacto

- Email do site e do formulário passou a `mateusmm.dev@gmail.com` (`src/lib/constants.ts`, `README.md` e `CONTACT_EMAIL` no `.env.local`).

## 2026-10-27 — Avaliador: correções, PDF, comparação, medições reais e simulador

**Removido**
- Blog: páginas `/blog`, componentes, conteúdo, item do menu e entradas do sitemap.

**Avaliador — correções** (ver [[docs/avaliador-metodologia]])
- Nota geral deixa de ser inflacionada quando o PageSpeed não responde (categoria "Indisponível" sai da média).
- Corrigidos falsos positivos: mixed content, `alt=""`, telefone/email lidos do HTML bruto, pontos fortes errados.
- Timeout do PageSpeed 20 s → 45 s; logs `[pagespeed]` com o motivo real da falha.
- Barra de progresso por fases em `AvaliadorView.tsx`.

**Novas funcionalidades**
1. Home: secção do Avaliador logo a seguir ao topo, com as 7 categorias e pesos reais (`HomeView.tsx`).
2. Relatório em PDF: `POST /api/audit/report` (`src/app/api/audit/report/route.ts`), gerado com `pdf-lib` em `src/lib/audit/pdf.ts` a partir da cache (`src/lib/audit/cache.ts`, via `globalThis`). Descarregar ou enviar por email (Resend, com consentimento; avisa também o dono como lead). UI em `src/components/audit/ReportActions.tsx`.
3. Comparação lado a lado com um concorrente: `?modo=comparar` ou caixa no formulário (`CompareResults.tsx`, `streamAudit.ts`). Gasta 2 das 5 análises/hora.
4. Números reais nos projetos: `scripts/measure-sites.ts` mede cada site publicado (Avaliador + PageSpeed) e grava `src/content/site-metrics.ts`; mostrado por `MeasuredMetrics.tsx` em cada projeto.
7. "Provas verificáveis" na home (código aberto, números medidos, ferramenta para testar) em vez de testemunhos — ainda não há clientes. Ver [[Pendentes]].
8. "Este site, medido": aparece na home quando existir a medição `site` (só depois de o site estar online).
9. Simulador "quanto vale converter melhor" (`LossCalculator.tsx`) no fim de `/avaliador`: só aritmética com valores do visitante.

**Como atualizar as medições:** `npx tsx --env-file=.env.local scripts/measure-sites.ts` (todos) ou `... torra-lusa` (um). Requer `PAGESPEED_API_KEY`.

## 2026-10-26 — Redesign do hero da home

Ficheiro: `src/components/views/HomeView.tsx` (secção 01).

- Hero passou a **full-bleed**, com altura de um ecrã (`100svh` menos o header) e a foto `public/hero-bg.png` a toda a largura, com gradientes para garantir leitura do texto.
- A secção usa a classe `dark` para ter sempre texto claro sobre a foto, independentemente do tema do site.
- Promessa (título, subtítulo, CTAs) à esquerda; título com a segunda linha em chartreuse (`text-highlight`).
- Cartão de vidro (`backdrop-blur`) à direita com o projeto publicado em rotação (mantém pausa em hover/foco e o aviso legal).
- Estatísticas (publicados, localização, resposta) numa faixa no fundo do hero.
- Para trocar a foto: substituir `public/hero-bg.png` (ideal: 2400×1400 ou maior, com zona mais escura à esquerda).

Relacionado: [[docs/avaliador-metodologia]]

## 2026-10-26 — Fundo do hero: hero-bg.png

- O hero passou a usar `public/hero-bg.png` (grelha técnica escura com wireframe de browser à direita) em vez do `hero-bg.jpg` antigo.
- Gradientes reduzidos para não apagar a imagem; o cartão do projeto fica sobre o wireframe.

## 2026-10-26 — Hero simplificado

- Título bem mais pequeno (`text-h2`), sem animação 3D e sem linha a verde-limão.
- Removidos do hero: cartão do projeto em rotação, faixa de estatísticas e o selo com caixa. Os projetos continuam na secção "Projetos selecionados".
- Ficou: etiqueta de disponibilidade, título, subtítulo, dois botões, tudo alinhado à esquerda sobre `hero-bg.png`.

## 2026-10-26 — Redesign completo do hero (v3)

- Abandonado o hero escuro com `hero-bg.png`; o hero agora segue o tema claro/escuro do site.
- Fundo: grelha técnica desenhada em CSS (`.hero-grid` em `globals.css`) com máscara radial, mais um brilho verde-limão desfocado no canto.
- Esquerda: etiqueta, título (máx. ~68px), subtítulo, dois botões.
- Direita: janela de browser com a capa do primeiro projeto em destaque, sobre um bloco verde-limão deslocado (sombra dura). Aviso legal mantido por baixo.
- `public/hero-bg.png` deixou de ser usado.

## 2026-10-26 — Redesign v4: intro compacta, projetos primeiro

Pesquisa a portefólios de programadores: o padrão é uma apresentação curta (nome/papel numa linha) e os projetos logo no primeiro ecrã, em vez de um título gigante.

- Hero: etiqueta de disponibilidade, título pequeno (`text-h3`), subtítulo, dois botões, linha de meta (localização, resposta).
- Logo abaixo, no mesmo bloco: os 3 projetos em destaque (capa + nome + categoria). A antiga secção "04 — Projetos selecionados" foi removida da home por duplicar; secções seguintes renumeradas.
- Removido o CSS `.hero-grid` e o uso de `hero-bg.png`.

## 2026-10-26 — Redesign v5: tema violeta (referência Pinterest)

Referência: `public/referencia.png` (portefólio escuro azul-marinho com brilhos violeta, vidro e links com ↗).

- `globals.css`: bloco `:root:has(.violet-home)` com a paleta violeta (bg `#05040f`, acento `#7c4dff`, ink `#f4f2ff`). Aplica-se a header e rodapé só enquanto a home está montada; as outras páginas mantêm a paleta Sinal/Oficina.
- Home: dois brilhos violeta desfocados nos cantos do hero, título com gradiente violeta, ponto de disponibilidade com glow, cartões de projeto em vidro (`rounded-2xl`, `backdrop-blur`) com seta ↗.

## 2026-10-26 — Reposta a paleta original

- Removido o tema violeta (`:root:has(.violet-home)` e os brilhos, gradiente e cartões de vidro da home). O site volta à paleta Sinal/Oficina (papel, tinta, verde-limão).
- Mantém-se o layout v4: intro compacta e projetos logo no primeiro ecrã.

## 2026-10-26 — Animações na home (CSS puro, só transform/opacity)

- `globals.css`: keyframes `rise` (fade + subida), `rise-y` (só subida, sem opacity para não atrasar o LCP das capas) e `marquee`; classes `.rise`, `.rise-y`, `.marquee` (com `prefers-reduced-motion` a desligar o loop).
- Hero: entrada escalonada (etiqueta → título → subtítulo → botões → meta → cabeçalho dos projetos → cartões com 110ms entre eles); ponto de disponibilidade com `animate-ping`; cartões sobem 4px no hover.
- Nova faixa em loop com as tecnologias dos serviços (`keywords` em `HomeView.tsx`), pausa em hover.
- Nenhuma biblioteca nova; as secções abaixo continuam com o `ScrollReveal` existente.

## 2026-10-27 — Novas funcionalidades

- **Avaliador no hero:** campo "Avalie o seu site grátis" na home; envia para `/avaliador?url=...`, que lê o parâmetro com `useSearchParams` (página envolvida em `Suspense`) e pré-preenche o campo. Strings em `home.hero.audit` (PT/EN).
- **Processo em 4 passos** e **FAQ** na home, reutilizando `t.services.process` e `t.services.faq`. Linha do processo desenha-se ao entrar no ecrã (framer-motion `whileInView`); FAQ com `<details>` nativo.
- **Blog:** `/blog` e `/blog/[slug]` (`src/content/blog.ts`, `BlogView`, `BlogPostView`), 3 artigos PT/EN sem estatísticas inventadas; item "Blog" no menu; entradas no sitemap; JSON-LD `BlogPosting`.
- **Não implementado de propósito:** testemunhos (os textos existentes em `home.testimonials` parecem inventados e os projetos são marcas fictícias), números antes/depois nos estudos de caso (não há dados reais) e botão de marcar chamada (falta o link de agenda).

Secções da home renumeradas: 05 quiz, 06 processo, 07 FAQ.

## 2026-10-27 — Cal.com

- Ligação direta à página de agendamento (sem script de embed, sem peso extra). `CAL_URL` em `src/lib/constants.ts`, lida de `NEXT_PUBLIC_CAL_URL` (só aceita `https://`); sem valor, nada aparece.
- Home: ligação "Marcar chamada de 15 min ↗" por baixo dos botões do hero. Contacto: novo cartão "Marcar chamada" entre os métodos de contacto.
- Para ativar: pôr `NEXT_PUBLIC_CAL_URL=...` em `.env.local` (e na Vercel) e reiniciar o servidor.

## 2026-10-27 — Formulário de contacto sem emails

- Causa: não existia `.env.local`, logo `RESEND_API_KEY` estava vazia. Em desenvolvimento a rota `/api/contact` valida e devolve "sucesso" sem enviar (`sem-chave`); em produção devolve erro 500.
- Criado `.env.local` (ignorado pelo git) com `CONTACT_EMAIL=mateuslm799@gmail.com`; falta colar a `RESEND_API_KEY`.
- Com `onboarding@resend.dev` o Resend só entrega ao email da conta; para outros destinatários é preciso verificar um domínio e mudar `RESEND_FROM`.
- Produção (Vercel): definir as mesmas variáveis em Settings → Environment Variables e fazer redeploy.

## 2026-10-27 — Novos logótipos

- Novo componente `src/components/ui/Logo.tsx`: mostra a versão clara ou escura conforme a classe `.dark` (CSS `.logo-light` / `.logo-dark` em `globals.css`); a versão escondida é lazy e não é descarregada.
- Header: ícone (`logo-pro-icone-*`) abaixo de 640px, logótipo horizontal (`logo-pro-horizontal-*`, h-12) a partir daí. Rodapé e menu móvel: horizontal. O nome e o "Desenvolvimento Web" em texto saíram porque o logótipo já os inclui.
- Ícones gerados com sharp a partir do ícone escuro: `public/icon-192.png`, `public/icon-512.png` (PWA), `src/app/apple-icon.png` (180px) e `src/app/favicon.ico` (48px, PNG embebido).
- JSON-LD do `layout.tsx` passou a apontar para `logo-pro-icone-claro.png`. Apagados `public/logo.jpg` e `public/logo.png`.

## 2026-10-27 — Marca em texto + ícone

- Os logótipos horizontais (PNG) deixaram de ser usados no site. Novo `BrandLockup` em `src/components/ui/Logo.tsx`: ícone MM (claro/escuro por tema), divisor vertical e "MATEUS MENDES" com "WEB DEVELOPER" por baixo, em texto real.
- Usado no header, rodapé e menu móvel. "Web Developer" só aparece a partir de 640px.
