# Avaliador de Sites — Metodologia

## O que é
Ferramenta de análise automática da página inicial de um website público.
Produz um relatório determinístico, em linguagem de dono de negócio, com
nota geral 0–100, pontuação por categoria, "o que já está bom" e
"o que melhorar", ordenado por prioridade e impacto.

## Limitações assumidas (v1)
- Analisa apenas a página inicial pública (não percorre o site).
- Não mede contraste de cores de forma fiável (exigiria renderização).
- Não executa JavaScript do site (análise do HTML estático).
- Não é aconselhamento legal nem auditoria de segurança profunda.
- Análise automática e indicativa.

## Categorias e pesos
| Categoria | Peso |
|---|---:|
| Segurança e base | 18 |
| SEO | 18 |
| Mobile e usabilidade | 14 |
| Acessibilidade básica | 12 |
| Conteúdo e conversão | 12 |
| Desempenho (PageSpeed) | 14 |
| Peso da página | 12 |
| Total | 100 |

## Severidades e penalização
- high: 25 pontos
- medium: 12 pontos
- low: 5 pontos
- info: 0 pontos

## Verificações (Fase 3)
A implementar: HTTPS/redirecionamento, certificado, cabeçalhos (HSTS, X-Content-Type-Options), mixed content,
title, meta description, h1 único, hierarquia de títulos, canonical, robots meta, OG/Twitter, JSON-LD,
lang, sitemap.xml, robots.txt, viewport, tel:/mailto:/WhatsApp, formulário, mapa, horário, morada,
alt em imagens, labels em inputs, CTA acima da dobra, prova social, política de privacidade, aviso de cookies,
tamanho do HTML, nº de scripts/CSS, imagens sem width/height e sem lazy loading.

## Desempenho
PageSpeed Insights API v5 (estratégia mobile): 4 categorias Lighthouse + LCP/CLS/TBT + 3–5 oportunidades.
Se não houver chave ou timeout, o relatório continua só com as verificações próprias e indica
"dados de desempenho indisponíveis agora".

## Cache
24 h por URL normalizado (em memória, por instância). Não é garantia de atualização.

## Segurança do fetch
Validação de URL, bloqueio de IPs privados/loopback/link-local/metadata, revalidação em redirects (máx. 5),
fixação de IP para evitar DNS rebinding, timeout 8 s, máximo 2 MB, apenas text/html, User-Agent identificado.

## Privacidade
Analisa-se apenas a página inicial pública. O relatório não é guardado. Sem dados pessoais nos logs.
