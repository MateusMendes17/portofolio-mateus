import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

const YEAR = 2026;
const BRAND_COLOR = rgb(158/255, 103/255, 71/255); // #9E6747
const DARK_COLOR = rgb(54/255, 44/255, 36/255); // #362C24
const DARK_MUTED = rgb(92/255, 77/255, 66/255); // #5C4D42
const LIGHT_BG = rgb(230/255, 213/255, 195/255); // #E6D5C3
const WHITE = rgb(1, 1, 1);

async function generateChecklistPDF() {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 dimensions
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 60;
  const contentWidth = pageWidth - 2 * margin;
  const leftColumnX = margin + 50; // Where text starts (after number circle)
  const rightColumnX = margin + contentWidth - 40; // Where checkbox starts

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Helper: draw wrapped text, returns height used
  const drawWrappedText = (
    text: string,
    x: number,
    startY: number,
    options: {
      font: typeof helvetica;
      size: number;
      color: ReturnType<typeof rgb>;
      maxWidth: number;
      lineHeight?: number;
    }
  ): number => {
    const { font, size, color, maxWidth, lineHeight = 1.4 } = options;
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    lines.forEach((line, i) => {
      page.drawText(line, { x, y: startY - i * size * lineHeight, font, size, color });
    });
    return lines.length * size * lineHeight;
  };

  // Helper: add new page if not enough space
  const ensureSpace = (needed: number) => {
    if (y - needed < margin + 20) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      // Draw top accent bar on new page
      page.drawRectangle({
        x: 0,
        y: pageHeight - 8,
        width: pageWidth,
        height: 8,
        color: BRAND_COLOR,
      });
      y -= 20;
    }
  };

  // Helper: draw page header accent bar
  const drawPageHeader = () => {
    page.drawRectangle({
      x: 0,
      y: pageHeight - 8,
      width: pageWidth,
      height: 8,
      color: BRAND_COLOR,
    });
  };

  // ============ PAGE 1: COVER ============
  drawPageHeader();

  // Logo
  page.drawText("MATEUS MENDES", {
    x: margin,
    y,
    font: helveticaBold,
    size: 14,
    color: BRAND_COLOR,
  });
  y -= 50;

  // Main title
  const titleLines = [
    "Checklist de Conversão",
    `${YEAR} -- 12 Pontos Essenciais`,
  ];
  titleLines.forEach((line, i) => {
    page.drawText(line, {
      x: margin,
      y: y - i * 52,
      font: helveticaBold,
      size: 40,
      color: DARK_COLOR,
      lineHeight: 1.1,
    });
  });
  y -= titleLines.length * 52 + 20;

  // Subtitle
  const subtitle = "Audite o seu site hoje. Corrija o que falha. Converta mais visitantes em clientes.";
  const subHeight = drawWrappedText(subtitle, margin, y, {
    font: helvetica,
    size: 15,
    color: DARK_MUTED,
    maxWidth: contentWidth,
    lineHeight: 1.6,
  });
  y -= subHeight + 35;

  // Divider
  page.drawLine({
    start: { x: margin, y },
    end: { x: margin + 120, y },
    thickness: 3,
    color: BRAND_COLOR,
  });
  y -= 35;

  // Intro text
  const intro = `A maioria dos sites falha nao por falta de design, mas por ignorar os fundamentos tecnicos e psicologicos que fazem um visitante agir. Esta checklist cobre os 12 pontos que separam sites que "estao bonitos" de sites que vendem.`;
  const introHeight = drawWrappedText(intro, margin, y, {
    font: helvetica,
    size: 11,
    color: DARK_COLOR,
    maxWidth: contentWidth,
    lineHeight: 1.6,
  });
  y -= introHeight + 30;

  // Stats boxes
  const stats = [
    { label: "Tempo medio de decisao", value: "< 3 seg" },
    { label: "Sites que perdem por velocidade", value: "53%" },
    { label: "Aumento com checklist aplicada", value: "ate 40%" },
  ];

  const boxWidth = (contentWidth - 40) / 3;
  const statsBoxHeight = 70;
  stats.forEach((stat, i) => {
    const x = margin + i * (boxWidth + 20);
    page.drawRectangle({
      x,
      y: y - statsBoxHeight,
      width: boxWidth,
      height: statsBoxHeight,
      color: LIGHT_BG,
      borderColor: BRAND_COLOR,
      borderWidth: 1,
    });
    page.drawText(stat.value, { x: x + 20, y: y - 28, font: helveticaBold, size: 22, color: BRAND_COLOR });
    page.drawText(stat.label, { x: x + 20, y: y - 52, font: helvetica, size: 10, color: DARK_MUTED });
  });
  y -= statsBoxHeight + 30;

  // CTA text
  page.drawText("Pronto para auditar o seu site?", { x: margin, y, font: helveticaBold, size: 15, color: DARK_COLOR });
  y -= 25;
  page.drawText("Marque [x] em cada item. O que falhar = oportunidade de melhoria.", { x: margin, y, font: helveticaOblique, size: 10, color: DARK_MUTED });

  // Footer
  page.drawText(`mateusmendes.pt  *  Checklist de Conversão ${YEAR}`, {
    x: margin,
    y: margin - 10,
    font: helvetica,
    size: 9,
    color: rgb(150/255, 140/255, 130/255),
  });

  // ============ PAGE 2: THE 12 POINTS ============
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  drawPageHeader();
  y = pageHeight - margin - 20;

  page.drawText("OS 12 PONTOS", { x: margin, y: y - 20, font: helveticaBold, size: 11, color: BRAND_COLOR });
  page.drawText("Checklist de Auditoria", { x: margin, y: y - 40, font: helveticaBold, size: 30, color: DARK_COLOR });
  y -= 80;

  const checklistItems = [
    {
      num: "01",
      title: "Velocidade Real (< 1.5s LCP)",
      desc: "Largest Contentful Paint under 1.5s no mobile. Teste em pagespeed.web.dev. Cada 100ms = -7% conversao.",
      check: "LCP mobile < 1.5s  |  TBT < 200ms  |  CLS < 0.1",
    },
    {
      num: "02",
      title: "Proposta de Valor Imediata (Above the Fold)",
      desc: "Em 3 segundos o visitante deve saber: O QUE faz, PARA QUEM, e POR QUE escolher voce. Sem jargao.",
      check: "Titulo claro  |  Subtitulo com beneficio  |  CTA visivel",
    },
    {
      num: "03",
      title: "CTA Primario Irresistivel",
      desc: "Um botao principal acima da dobra. Cor de contraste. Texto orientado a accao: \"Comecar\", \"Obter Orcamento\", \"Ver Demo\".",
      check: "Contraste WCAG AA  |  Texto de accao  |  Posicionamento F-pattern",
    },
    {
      num: "04",
      title: "Prova Social Quantificada",
      desc: "Numeros reais > logos. \"15 projetos em 2025\" > \"Clientes: Empresa A, B, C\". Testemunhos com foto, nome, cargo, empresa.",
      check: ">= 3 testemunhos  |  Metricas reais  |  Fotos/LinkedIn verificaveis",
    },
    {
      num: "05",
      title: "Formulario de Contacto Otimizado",
      desc: "Max 3 campos obrigatorios. Nome, Email, Mensagem. Telefone opcional. Validacao inline. Mensagem de sucesso clara.",
      check: "<= 3 campos  |  Validacao inline  |  honeypot anti-spam",
    },
    {
      num: "06",
      title: "WhatsApp / Click-to-Call Visivel",
      desc: "Portugal usa WhatsApp. Botao flutuante mobile. Mensagem pre-preenchida por pagina. Resposta < 1h.",
      check: "Botao mobile  |  Mensagem contextual  |  Horario de resposta",
    },
    {
      num: "07",
      title: "SEO Tecnico Basico",
      desc: "Title unico < 60 chars. Meta description < 155 chars. H1 unico por pagina. Schema.org (LocalBusiness/Service). Sitemap.xml + robots.txt.",
      check: "Title/H1/Meta  |  Schema.org  |  Sitemap indexado",
    },
    {
      num: "08",
      title: "Mobile-First Real (nao so responsivo)",
      desc: "Teste em iPhone SE, 12, 14 Pro, Android. Touch targets >= 44px. Sem scroll horizontal. Fontes >= 16px. Menu hamburger acessivel.",
      check: "Touch targets 44px  |  Fonte >= 16px  |  Sem overflow-x",
    },
    {
      num: "09",
      title: "Acessibilidade (WCAG 2.1 AA)",
      desc: "Contraste 4.5:1. Alt text em imagens. Navegacao por teclado. Focus visible. Labels em formularios. Skip to content.",
      check: "Contraste 4.5:1  |  Focus visible  |  Skip link",
    },
    {
      num: "10",
      title: "Analytics + Conversao Configurados",
      desc: "GA4 + Enhanced Measurement. Eventos: form_submit, whatsapp_click, cta_click. Meta Pixel se corre anuncios. Search Console verificado.",
      check: "GA4 eventos  |  Meta Pixel  |  Search Console",
    },
    {
      num: "11",
      title: "Seguranca & Confianca",
      desc: "HTTPS forcado. HSTS. CSP headers. Politica de privacidade visivel. Termos de uso. Selos de confianca (SSL, RGPD).",
      check: "HTTPS + HSTS  |  Privacy Policy  |  CSP headers",
    },
    {
      num: "12",
      title: "Plano de Melhoria Continua",
      desc: "Auditoria mensal (velocidade, quebrados, conteudo). A/B test no CTA principal. Atualizacoes de conteudo trimestrais. Backup automatico.",
      check: "Auditoria mensal  |  A/B testing  |  Backup automatico",
    },
  ];

  checklistItems.forEach((item) => {
    // Calculate needed space for this item
    const descHeight = drawWrappedText(item.desc, leftColumnX, 0, {
      font: helvetica,
      size: 10,
      color: DARK_MUTED,
      maxWidth: contentWidth - 60,
      lineHeight: 1.5,
    });
    const checkHeight = drawWrappedText(item.check, leftColumnX, 0, {
      font: helveticaOblique,
      size: 9,
      color: BRAND_COLOR,
      maxWidth: contentWidth - 60,
      lineHeight: 1.4,
    });
    const itemHeight = Math.max(70, 50 + descHeight + checkHeight) + 20;

    ensureSpace(itemHeight);

    // Number circle
    page.drawCircle({
      x: margin + 18,
      y: y - 18,
      size: 18,
      color: BRAND_COLOR,
    });
    page.drawText(item.num, {
      x: margin + 10,
      y: y - 24,
      font: helveticaBold,
      size: 11,
      color: WHITE,
    });

    // Title
    page.drawText(item.title, {
      x: leftColumnX,
      y: y - 5,
      font: helveticaBold,
      size: 13,
      color: DARK_COLOR,
    });

    // Description
    let currentY = y - 25;
    const actualDescHeight = drawWrappedText(item.desc, leftColumnX, currentY, {
      font: helvetica,
      size: 10,
      color: DARK_MUTED,
      maxWidth: contentWidth - 60,
      lineHeight: 1.5,
    });
    currentY -= actualDescHeight + 5;

    // Check items
    const actualCheckHeight = drawWrappedText(item.check, leftColumnX, currentY, {
      font: helveticaOblique,
      size: 9,
      color: BRAND_COLOR,
      maxWidth: contentWidth - 60,
      lineHeight: 1.4,
    });
    currentY -= actualCheckHeight;

    // Checkbox (aligned to right)
    page.drawRectangle({
      x: rightColumnX,
      y: y - 8,
      width: 14,
      height: 14,
      borderColor: BRAND_COLOR,
      borderWidth: 1.5,
    });
    // Draw checkmark inside checkbox (small x)
    page.drawText("x", {
      x: rightColumnX + 2,
      y: y - 12,
      font: helvetica,
      size: 10,
      color: BRAND_COLOR,
    });

    y -= itemHeight;
  });

  // ============ PAGE 3: NEXT STEPS ============
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  drawPageHeader();
  y = pageHeight - margin - 20;

  page.drawText("O QUE FAZER AGORA", { x: margin, y: y - 20, font: helveticaBold, size: 11, color: BRAND_COLOR });
  page.drawText("Proximos Passos", { x: margin, y: y - 40, font: helveticaBold, size: 30, color: DARK_COLOR });
  y -= 80;

  const nextSteps = [
    {
      title: "1. Faca a auditoria agora",
      desc: "Abra o seu site no telemovel. Cronometre: quanto tempo ate ver o que faz e como contactar? Teste no PageSpeed Insights. Anote os 12 pontos.",
    },
    {
      title: "2. Priorize os \"Quick Wins\"",
      desc: "Velocidade (imagens WebP, cache), CTA visivel, WhatsApp a funcionar, Title/H1 corretos. Resolva hoje o que leva < 30 min.",
    },
    {
      title: "3. Corrija o tecnico",
      desc: "Schema.org, Sitemap, Search Console, GA4 eventos, HTTPS headers. Se nao sabe fazer, e aqui que eu entro.",
    },
    {
      title: "4. Teste e meca",
      desc: "Instale Hotjar/Clarity. Veja onde as pessoas travam. A/B teste no CTA principal. Meca taxa de contacto/semana.",
    },
  ];

  nextSteps.forEach((step) => {
    ensureSpace(100);
    page.drawText(step.title, { x: margin, y, font: helveticaBold, size: 14, color: DARK_COLOR });
    y -= 26;
    const h = drawWrappedText(step.desc, margin, y, {
      font: helvetica,
      size: 11,
      color: DARK_MUTED,
      maxWidth: contentWidth,
      lineHeight: 1.6,
    });
    y -= h + 22;
  });

  y -= 20;

  // Final CTA box
  const ctaBoxHeight = 100;
  ensureSpace(ctaBoxHeight + 20);

  page.drawRectangle({
    x: margin,
    y: y - ctaBoxHeight,
    width: contentWidth,
    height: ctaBoxHeight,
    color: BRAND_COLOR,
  });

  page.drawText("Precisa de ajuda a implementar?", {
    x: margin + 30,
    y: y - 30,
    font: helveticaBold,
    size: 18,
    color: WHITE,
  });
  drawWrappedText(
    "Eu construo sites que convertem -- velocidade, SEO e WhatsApp incluidos de raiz. Sem templates, sem intermediarios, codigo limpo.",
    margin + 30,
    y - 55,
    { font: helvetica, size: 11, color: rgb(240/255, 230/255, 225/255), maxWidth: contentWidth - 60, lineHeight: 1.5 }
  );

  // Button visual
  page.drawRectangle({
    x: margin + 30,
    y: y - 85,
    width: 200,
    height: 36,
    color: WHITE,
    borderColor: WHITE,
    borderWidth: 2,
  });
  page.drawText("Falar com o Mateus ->", {
    x: margin + 55,
    y: y - 91,
    font: helveticaBold,
    size: 12,
    color: BRAND_COLOR,
  });

  // Footer
  page.drawText(`mateusmendes.pt  *  Checklist de Conversão ${YEAR}  *  Livre para partilhar`, {
    x: margin,
    y: margin - 10,
    font: helvetica,
    size: 9,
    color: rgb(150/255, 140/255, 130/255),
  });

  // Save
  const pdfBytes = await pdfDoc.save();
  const outputDir = path.join(process.cwd(), "public", "lead-magnet");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, "checklist-conversao.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`PDF gerado: ${outputPath}`);
  console.log(`Tamanho: ${(pdfBytes.length / 1024).toFixed(1)} KB`);
}

generateChecklistPDF().catch(console.error);