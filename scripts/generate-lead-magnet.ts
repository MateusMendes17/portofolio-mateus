/**
 * Gera public/lead-magnet/checklist-conversao.pdf (oferecido na newsletter).
 *
 * Uso (na pasta do projeto):  npx tsx scripts/generate-lead-magnet.ts
 *
 * Regras de conteúdo:
 * - Sem estatísticas sem fonte. Os limiares vêm da Google (Core Web Vitals), da WCAG
 *   ou das verificações reais do Avaliador de Sites (docs/avaliador-metodologia.md).
 * - Texto em PT-PT. A fonte padrão do PDF só codifica Latin-1 (acentos ok; sem setas/símbolos).
 */
import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";
import { SITE_CONFIG } from "../src/lib/constants";

const YEAR = 2026;
const INK = rgb(0.043, 0.043, 0.047); // #0b0b0c
const MUTED = rgb(0.392, 0.392, 0.369); // #64645e
const LINE = rgb(0.851, 0.839, 0.796); // #d9d6cb
const PAPER = rgb(0.957, 0.949, 0.918); // #f4f2ea
const ACCENT = rgb(0.843, 1, 0.247); // #d7ff3f

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;

const HOST = new URL(SITE_CONFIG.url).host;
const AUDIT_URL = `${HOST}/avaliador`;

interface Point {
  title: string;
  desc: string;
  check: string;
}

const POINTS: Point[] = [
  {
    title: "Velocidade no telemóvel",
    desc: "Teste a página inicial em pagespeed.web.dev. Os limiares \"bons\" da Google são LCP até 2,5 s, TBT até 200 ms e CLS até 0,1.",
    check: "LCP até 2,5 s  |  TBT até 200 ms  |  CLS até 0,1",
  },
  {
    title: "Proposta de valor imediata",
    desc: "Em poucos segundos, um desconhecido tem de perceber o que faz, para quem e porque o deve escolher. Sem jargão.",
    check: "Título claro  |  Subtítulo com benefício  |  Para quem é",
  },
  {
    title: "Chamada à ação visível",
    desc: "Um botão principal logo no topo, com contraste e um verbo: \"Pedir orçamento\", \"Marcar chamada\", \"Falar connosco\".",
    check: "Botão acima da dobra  |  Verbo de ação  |  Um único objetivo",
  },
  {
    title: "Prova social verdadeira",
    desc: "Testemunhos reais, com nome e autorização. Ainda sem clientes? Mostre o que é verificável: código aberto, projetos publicados e medições datadas.",
    check: "Testemunhos reais  |  Projetos visíveis  |  Números com data",
  },
  {
    title: "Formulário de contacto simples",
    desc: "Peça só o essencial (nome, email, mensagem). Cada campo tem label, há mensagem de sucesso clara e proteção contra spam.",
    check: "Poucos campos  |  Labels  |  Confirmação de envio",
  },
  {
    title: "Contacto direto com um toque",
    desc: "No telemóvel, o telefone tem de ser um link tel:, o email um mailto: e o WhatsApp um link wa.me. Indique o horário de atendimento.",
    check: "tel:  |  mailto:  |  WhatsApp  |  Horário e morada",
  },
  {
    title: "SEO técnico básico",
    desc: "Título com 30 a 60 caracteres, descrição com 70 a 160, um único H1 e hierarquia de títulos sem saltos. Adicione canonical, Open Graph, sitemap.xml e robots.txt.",
    check: "Title/H1/Description  |  Canonical  |  Open Graph  |  Sitemap",
  },
  {
    title: "Mobile a sério",
    desc: "Meta viewport com width=device-width, alvos táteis confortáveis (cerca de 44 px), texto legível e nenhum scroll horizontal.",
    check: "Viewport  |  Alvos táteis  |  Sem scroll horizontal",
  },
  {
    title: "Acessibilidade básica",
    desc: "Texto alternativo nas imagens (alt vazio nas decorativas), labels nos campos, idioma declarado, link para saltar para o conteúdo e contraste mínimo de 4,5:1.",
    check: "Alt  |  Labels  |  lang  |  Skip link  |  Contraste 4,5:1",
  },
  {
    title: "Medir o que importa",
    desc: "Ligue o Google Search Console e uma ferramenta de analytics que respeite o RGPD. Registe os eventos que contam: pedidos de contacto e cliques no WhatsApp.",
    check: "Search Console  |  Analytics  |  Eventos de contacto",
  },
  {
    title: "Segurança e confiança",
    desc: "HTTPS em todo o site e sem conteúdo misto. Cabeçalhos HSTS e X-Content-Type-Options. Política de privacidade acessível e aviso de cookies se usar cookies não essenciais.",
    check: "HTTPS + HSTS  |  Sem mixed content  |  Privacidade  |  Cookies",
  },
  {
    title: "Leveza e manutenção",
    desc: "HTML leve, poucos ficheiros de scripts e estilos, imagens com width e height e lazy loading. Volte a testar todos os meses e depois de cada alteração grande.",
    check: "Poucos pedidos  |  Imagens com dimensões  |  Teste mensal",
  },
];

const STEPS: Array<{ title: string; desc: string }> = [
  {
    title: "1. Faça o teste automático",
    desc: `Em ${AUDIT_URL} cola o endereço do seu site e, em cerca de 30 segundos, recebe um relatório com o que está bom e o que corrigir primeiro. É gratuito e não precisa de registo.`,
  },
  {
    title: "2. Resolva primeiro o que é rápido",
    desc: "Título e descrição, links de telefone e email, texto alternativo nas imagens e um botão de contacto visível. Tudo isto costuma levar menos de uma hora.",
  },
  {
    title: "3. Deixe o técnico para depois",
    desc: "Velocidade, cabeçalhos de segurança, dados estruturados e acessibilidade pedem mais cuidado. Se precisar de ajuda, é aqui que eu entro.",
  },
  {
    title: "4. Volte a medir",
    desc: "Repita o teste depois de cada alteração e compare a nota. Se quiser, compare o seu site com o de um concorrente na mesma ferramenta.",
  },
];

/** Troca caracteres fora de Latin-1 (a fonte padrão não os codifica). */
function safe(text: string): string {
  return text
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\u0009\u000A -~ -ÿ]/g, "?");
}

function wrapLines(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of safe(text).split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function generate() {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Checklist de Conversão ${YEAR} - 12 pontos`);
  pdf.setAuthor(SITE_CONFIG.name);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const newPage = (): PDFPage => {
    const p = pdf.addPage([PAGE_W, PAGE_H]);
    p.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: PAPER });
    p.drawRectangle({ x: 0, y: PAGE_H - 10, width: PAGE_W, height: 10, color: ACCENT });
    return p;
  };

  /** Desenha texto quebrado e devolve a altura usada. */
  const paragraph = (
    p: PDFPage,
    text: string,
    x: number,
    top: number,
    o: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; width?: number; leading?: number }
  ): number => {
    const font = o.font ?? regular;
    const size = o.size ?? 10.5;
    const leading = size * (o.leading ?? 1.5);
    const lines = wrapLines(text, font, size, o.width ?? CONTENT_W);
    lines.forEach((line, i) => p.drawText(line, { x, y: top - size - i * leading, size, font, color: o.color ?? INK }));
    return lines.length * leading;
  };

  // ───────── Capa ─────────
  let page = newPage();
  let y = PAGE_H - MARGIN - 10;
  page.drawText("MATEUS MENDES", { x: MARGIN, y, size: 12, font: bold, color: INK });
  page.drawText("Programador web", { x: MARGIN + 110, y, size: 10, font: regular, color: MUTED });
  y -= 70;

  page.drawText("Checklist de Conversão", { x: MARGIN, y, size: 38, font: bold, color: INK });
  y -= 46;
  page.drawText(`${YEAR}  |  12 pontos essenciais`, { x: MARGIN, y, size: 22, font: regular, color: MUTED });
  y -= 22;
  page.drawRectangle({ x: MARGIN, y: y - 4, width: 90, height: 6, color: ACCENT });
  y -= 36;

  y -= paragraph(page, "Audite o seu site em meia hora. Perceba o que está a afastar visitantes e o que corrigir primeiro.", MARGIN, y, {
    size: 15,
    color: INK,
    leading: 1.5,
  });
  y -= 14;
  y -= paragraph(
    page,
    "Um site raramente falha por falta de design. Falha porque o visitante não percebe depressa o que fazer, a página demora a abrir no telemóvel ou falta confiança no momento de contactar. Estes 12 pontos cobrem o que mais pesa, com critérios que pode verificar sozinho.",
    MARGIN,
    y,
    { size: 11, color: MUTED, leading: 1.6 }
  );
  y -= 30;

  const stats = [
    { value: "12", label: "pontos a verificar" },
    { value: "7", label: "categorias no Avaliador" },
    { value: "~30 s", label: "para testar o seu site" },
  ];
  const boxW = (CONTENT_W - 32) / 3;
  stats.forEach((s, i) => {
    const x = MARGIN + i * (boxW + 16);
    page.drawRectangle({ x, y: y - 74, width: boxW, height: 74, borderColor: INK, borderWidth: 1, color: PAPER });
    page.drawText(s.value, { x: x + 16, y: y - 38, size: 26, font: bold, color: INK });
    page.drawText(s.label, { x: x + 16, y: y - 58, size: 9.5, font: regular, color: MUTED });
  });
  y -= 110;

  page.drawText("Como usar", { x: MARGIN, y, size: 13, font: bold, color: INK });
  y -= 8;
  paragraph(page, "Marque cada ponto que o seu site já cumpre. Cada ponto por marcar é uma oportunidade de melhoria. Para as medições, use o teste gratuito em " + AUDIT_URL + ".", MARGIN, y, {
    size: 10.5,
    color: MUTED,
  });

  // ───────── Os 12 pontos ─────────
  page = newPage();
  y = PAGE_H - MARGIN - 10;
  page.drawText("OS 12 PONTOS", { x: MARGIN, y, size: 10, font: bold, color: MUTED });
  y -= 36;
  page.drawText("Checklist de auditoria", { x: MARGIN, y, size: 26, font: bold, color: INK });
  y -= 40;

  const textX = MARGIN + 44;
  const textW = CONTENT_W - 44 - 30;

  POINTS.forEach((point, i) => {
    const descLines = wrapLines(point.desc, regular, 10, textW).length;
    const checkLines = wrapLines(point.check, italic, 9, textW).length;
    const height = 22 + descLines * 15 + 6 + checkLines * 12.5 + 18;

    if (y - height < MARGIN + 24) {
      page = newPage();
      y = PAGE_H - MARGIN - 10;
    }

    page.drawCircle({ x: MARGIN + 14, y: y - 12, size: 14, color: ACCENT, borderColor: INK, borderWidth: 1 });
    const num = String(i + 1).padStart(2, "0");
    page.drawText(num, { x: MARGIN + 14 - bold.widthOfTextAtSize(num, 10) / 2, y: y - 16, size: 10, font: bold, color: INK });

    page.drawText(safe(point.title), { x: textX, y: y - 8, size: 12.5, font: bold, color: INK });
    let cursor = y - 14;
    cursor -= paragraph(page, point.desc, textX, cursor, { size: 10, color: MUTED, width: textW, leading: 1.5 });
    cursor -= 4;
    paragraph(page, point.check, textX, cursor, { font: italic, size: 9, color: INK, width: textW, leading: 1.4 });

    page.drawRectangle({ x: PAGE_W - MARGIN - 16, y: y - 18, width: 16, height: 16, borderColor: INK, borderWidth: 1.2 });

    y -= height;
    page.drawLine({ start: { x: textX, y: y + 8 }, end: { x: PAGE_W - MARGIN, y: y + 8 }, thickness: 0.5, color: LINE });
  });

  // ───────── Próximos passos ─────────
  page = newPage();
  y = PAGE_H - MARGIN - 10;
  page.drawText("O QUE FAZER AGORA", { x: MARGIN, y, size: 10, font: bold, color: MUTED });
  y -= 36;
  page.drawText("Próximos passos", { x: MARGIN, y, size: 26, font: bold, color: INK });
  y -= 44;

  STEPS.forEach((step) => {
    page.drawText(safe(step.title), { x: MARGIN, y, size: 13.5, font: bold, color: INK });
    y -= 10;
    y -= paragraph(page, step.desc, MARGIN, y, { size: 11, color: MUTED, leading: 1.55 });
    y -= 22;
  });

  y -= 6;
  const boxH = 128;
  page.drawRectangle({ x: MARGIN, y: y - boxH, width: CONTENT_W, height: boxH, color: INK });
  page.drawRectangle({ x: MARGIN, y: y - 6, width: 70, height: 6, color: ACCENT });
  page.drawText("Precisa de ajuda a implementar?", { x: MARGIN + 28, y: y - 38, size: 17, font: bold, color: PAPER });
  paragraph(
    page,
    "Construo sites rápidos, acessíveis e pensados para gerar contactos. Diga-me o que quer melhorar e respondo-lhe com os próximos passos.",
    MARGIN + 28,
    y - 50,
    { size: 10.5, color: rgb(0.85, 0.85, 0.82), width: CONTENT_W - 56, leading: 1.5 }
  );
  page.drawText(`${SITE_CONFIG.email}   |   ${AUDIT_URL}`, { x: MARGIN + 28, y: y - boxH + 22, size: 10.5, font: bold, color: ACCENT });

  // Rodapé em todas as páginas
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawText(safe(`${HOST}  |  Checklist de Conversão ${YEAR}  |  ${i + 1}/${pages.length}`), {
      x: MARGIN,
      y: 30,
      size: 8.5,
      font: regular,
      color: MUTED,
    });
  });

  const bytes = await pdf.save();
  const outDir = path.join(process.cwd(), "public", "lead-magnet");
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, "checklist-conversao.pdf");
  fs.writeFileSync(out, bytes);
  console.log(`PDF gerado: ${out} (${(bytes.length / 1024).toFixed(1)} KB, ${pages.length} páginas)`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
