---
tags: [changelog]
---

# Changelog

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
