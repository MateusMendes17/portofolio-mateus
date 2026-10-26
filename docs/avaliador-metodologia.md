# Avaliador de Sites — Metodologia e Especificação Técnica

Data: 2026-10-26  
Versão: 1.0 (v1)  
Branch: `feature/avaliador`  
Autor: Mateus Mendes

---

## 1. O que é o Avaliador de Sites

O **Avaliador de Sites** (`/avaliador`) é uma ferramenta pública e gratuita desenvolvida para o portfólio de Mateus Mendes. O visitante introduz o URL de um website e recebe em poucos segundos um relatório claro, objetivo e em linguagem de dono de negócio sobre o estado da página inicial: o que está bom, o que precisa de melhorar e o impacto de cada aspeto no desempenho e conversão comercial.

O objetivo primordial é a transparência técnica e a geração qualificada de contactos (leads) sem métricas fictícias ou notas arbitrárias.

---

## 2. Metodologia de Pontuação e Pesos

A pontuação global (0–100) é uma média ponderada das pontuações das categorias de análise:

| Categoria | Peso Ponderado | Descrição |
|---|---:|---|
| **Segurança e base** | 18% | Protocolo HTTPS, cabeçalhos de segurança (HSTS, X-Content-Type-Options), mixed content |
| **SEO Técnico** | 18% | Meta title, description, H1 único, hierarquia de cabeçalhos, canonical, robots, OG, Twitter, JSON-LD, lang |
| **Mobile e usabilidade** | 14% | Meta viewport responsivo, links diretos (tel:, mailto:, WhatsApp), formulário, morada/mapa/horário |
| **Acessibilidade básica** | 12% | Atributos alt em imagens, labels em inputs, idioma declarado, skip links |
| **Conteúdo e conversão** | 12% | Chamada à ação (CTA) visível, prova social, política de privacidade, indício de cookies |
| **Desempenho (PageSpeed)** | 14% | Métricas Google Lighthouse mobile (LCP, CLS, TBT) e oportunidades |
| **Peso da página** | 12% | Tamanho do documento HTML, número de scripts e CSS externos, dimensões e lazy loading de imagens |
| **Total** | **100%** | **Nota geral (0–100)** |

### Penalização por Severidade
Dentro de cada categoria, a pontuação parte de 100 pontos e é subtraída com base nos problemas detetados:
- **Alta (high)**: -25 pontos
- **Média (medium)**: -12 pontos
- **Baixa (low)**: -5 pontos
- **Informativa (info)**: 0 pontos (usada para pontos fortes / destaques positivos)

A pontuação de qualquer categoria nunca desce abaixo de 0 nem ultrapassa 100.

---

## 3. Catálogo de Verificações Implementadas

### A. Segurança e Base (`src/lib/audit/checks/security.ts`)
1. **HTTPS (`security.https.missing`)**: Verifica se o URL final utiliza protocolo `https:`.
2. **HSTS (`security.hsts.missing`)**: Verifica a presença do cabeçalho `Strict-Transport-Security`.
3. **X-Content-Type-Options (`security.xcto.missing`)**: Verifica se está configurado com `nosniff`.
4. **Mixed Content (`security.mixed-content`)**: Deteta scripts, imagens ou folhas de estilo carregadas via `http:` numa página `https:`.

### B. SEO Técnico (`src/lib/audit/checks/seo.ts`)
1. **Title (`seo.title.missing`, `seo.title.short`, `seo.title.long`)**: Existência e comprimento ótimo (ideal entre 20 e 70 caracteres).
2. **Meta Description (`seo.description.missing`, `seo.description.short`, `seo.description.long`)**: Presença e extensão (ideal entre 50 e 160 caracteres).
3. **Cabeçalho H1 (`seo.h1.missing`, `seo.h1.multiple`)**: Garante exatamente um título H1 na página.
4. **Hierarquia de Títulos (`seo.headings.hierarchy`)**: Deteta saltos incorretos na hierarquia (ex.: H1 para H3 sem H2).
5. **Canonical (`seo.canonical.missing`)**: Verifica a presença da tag `<link rel="canonical">`.
6. **Meta Robots (`seo.robots.noindex`)**: Alerta se a página inicial estiver bloqueada com `noindex`.
7. **Open Graph (`seo.og.incomplete`)**: Verifica `og:title`, `og:description` e `og:image`.
8. **Twitter Cards (`seo.twitter.missing`)**: Verifica `twitter:card`.
9. **JSON-LD (`seo.jsonld.missing`, `seo.jsonld.invalid`)**: Deteta e valida a sintaxe de blocos de dados estruturados.
10. **Idioma HTML (`seo.lang.missing`)**: Verifica o atributo `lang` na tag `<html>`.

### C. Mobile e Usabilidade (`src/lib/audit/checks/mobile.ts`)
1. **Viewport (`mobile.viewport.missing`, `mobile.viewport.notResponsive`)**: Existência e inclusão de `width=device-width`.
2. **Telefone clicável (`mobile.tel.missing`)**: Deteta números de telefone em texto sem ligação `tel:`.
3. **Email clicável (`mobile.mailto.missing`)**: Deteta emails sem ligação `mailto:`.
4. **Link WhatsApp (`mobile.whatsapp.missing`)**: Sugere canal WhatsApp caso exista telefone sem ligação wa.me.
5. **Formulário de Contacto (`mobile.form.missing`)**: Deteta presença de `<form>`.
6. **Morada / Mapa (`mobile.map.missing`)**: Verifica indicação geográfica ou mapa integrado se houver morada.
7. **Horário de Funcionamento (`mobile.hours.missing`)**: Verifica visibilidade de horário comercial.

### D. Acessibilidade Básica (`src/lib/audit/checks/accessibility.ts`)
1. **Alt em Imagens (`a11y.img.alt.missing`)**: Deteta imagens sem atributo `alt`.
2. **Labels em Formulários (`a11y.input.label.missing`)**: Verifica inputs sem `<label>` ou `aria-label` associado.
3. **Idioma (`a11y.lang.missing`)**: Valida se o leitor de ecrã consegue identificar a língua do documento.
4. **Skip Link (`a11y.skiplink.missing`)**: Verifica link de salto para o conteúdo principal.

### E. Conteúdo e Conversão (`src/lib/audit/checks/content.ts`)
1. **CTA Visível (`content.cta.aboveFold.missing`)**: Deteta chamadas à ação claras (orçamento, contacto, agendamento).
2. **Prova Social (`content.socialProof.missing`)**: Deteta testemunhos, certificações, casos de estudo ou avaliações.
3. **Política de Privacidade (`content.privacy.missing`)**: Garante conformidade RGPD com link visível no rodapé.
4. **Aviso de Cookies (`content.cookies.notice.missing`)**: Deteta indício de banner ou aviso de cookies.

### F. Peso da Página (`src/lib/audit/checks/weight.ts`)
1. **Tamanho do HTML (`weight.html.large`, `weight.html.medium`)**: Penaliza documentos HTML > 300 KB e alerta > 100 KB.
2. **Contagem de Scripts (`weight.scripts.many`)**: Alerta se houver mais de 15 ficheiros JS externos.
3. **Contagem de CSS (`weight.css.many`)**: Alerta se houver mais de 8 folhas de estilo externas.
4. **Imagens sem Dimensões (`weight.img.noDims`)**: Deteta `<img>` sem `width`/`height` (causadores de Cumulative Layout Shift).
5. **Lazy Loading (`weight.img.noLazy`)**: Deteta imagens sem `loading="lazy"`.

### G. Desempenho Google PageSpeed (`src/lib/audit/pagespeed.ts`)
- Utiliza a API Google PageSpeed Insights v5 com estratégia mobile.
- Extrai notas Lighthouse (Performance, Acessibilidade, Boas Práticas, SEO), métricas Web Vitals (LCP, CLS, TBT) e as 3 a 5 principais oportunidades de otimização.
- **Graceful degradation**: Se a variável `PAGESPEED_API_KEY` não estiver definida, a Google falhar ou o pedido exceder o tempo limite, a análise continua normalmente com as verificações próprias e indica explicitamente *"Dados de desempenho indisponíveis agora"*.

---

## 4. Resumo de Riscos e Proteções Implementadas

| Vetor de Risco | Proteção Implementada |
|---|---|
| **SSRF (Server-Side Request Forgery)** | Validação estrita de protocolo (`http:` e `https:` apenas, portas 80 e 443). Resolução DNS prévia antes de qualquer fetch com bloqueio de: loopback (`127.0.0.0/8`, `::1`), endereços privados RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), link-local (`169.254.0.0/16`, `fe80::/10`), metadados de cloud (`169.254.169.254`), multicast e broadcast. |
| **DNS Rebinding** | Fixação do endereço IP resolvido (IP pinning / custom fetch com agente socket fixado ou revalidação estrita) antes de enviar a requisição HTTP. |
| **Redirecionamentos Maliciosos** | Validação de cada salto de redirecionamento (máximo de 5 redirects). Revalidação do novo URL e do novo IP de destino em cada salto. |
| **Ataques de Negação de Serviço (DoS) e Timeout** | Timeout agressivo de 8 segundos por requisição de fetch. Limite de tamanho máximo de resposta a 2 MB (cancelamento do stream se excedido). Content-Type restrito exclusivamente a `text/html`. |
| **Abuso da API e Força Bruta** | Rate limiting por IP (máximo 5 análises por hora) com janela deslizante e cabeçalho `Retry-After`. Limite global de proteção na instância. |
| **CSRF (Cross-Site Request Forgery)** | Verificação do cabeçalho `Origin` contra o host do servidor no endpoint `/api/audit` e `/api/contact`. |
| **Spam de Formulários** | Campo honeypot silencioso no formulário de contacto e no formulário de auditoria. |
| **Privacidade e Dados Pessoais (RGPD)** | Análise limitada estritamente ao HTML público da página inicial. Relatórios não são guardados em base de dados. Nenhum dado pessoal (nome, email, telefone ou conteúdo livre) é escrito nos registos do servidor (`console.info`). |

---

## 5. Limitações Assumidas na v1

1. **Apenas a página inicial pública**: O avaliador não percorre nem faz crawling das páginas internas do site.
2. **Sem execução de JavaScript (Headless)**: A análise é feita no HTML estático retornado pelo servidor. Aplicações puramente SPA com client-side rendering sem SSR podem ter leituras incompletas de conteúdo.
3. **Contraste de cor não mensurável**: Medir contraste WCAG fiável exige um motor de renderização gráfica completo (ex.: Chromium), que não é executado no servidor por razões de leveza e performance.
4. **Caráter indicativo**: O relatório não substitui uma auditoria de segurança profunda nem constitui aconselhamento legal.

---

## 6. O que Ficou Fora da v1 e Ideias para a v2

- **Rastreio multi-página**: Analisar as 5 páginas mais visitadas do site (ex.: `/sobre`, `/servicos`, `/contacto`, `/blog`).
- **Comparação direta com concorrentes**: Introduzir dois URLs e comparar notas e velocidade lado a lado.
- **Relatório executivo em PDF por email**: Gerar um PDF diagramado e enviá-lo automaticamente para o email do visitante através do Resend.
- **Histórico e acompanhamento com conta**: Possibilidade de reavaliar o site periodicamente e receber alertas de quebra de desempenho.
- **Verificação de contraste e visual com Puppeteer/Playwright**: Executar renderização em background (ex.: AWS Lambda / Cloudflare Workers) para testes visuais e contraste real.
