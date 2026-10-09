"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PROJECTS } from "@/content/projects";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";

export function HomeView() {
  const { isEnglish } = useLanguage();

  // Top 3 featured projects
  const featuredProjects = PROJECTS.slice(0, 3);

  const renderScreenContent = () => (
    <>
      {/* Reflexo de luz no ecrã (apenas visível no 3D mas inofensivo no 2D) */}
      <div className="laptop-screen-glow hidden sm:block" />

      {/* Barra do Navegador no Ecrã */}
      <div className="laptop-screen-content flex items-center justify-between p-2 sm:p-3 border-b border-white/10 text-[10px] text-[#8E7D70] bg-[#2A2421]/50">
        {/* 3 Botões macOS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#E05252]" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#E5A93B]" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#52BA69]" />
        </div>

        {/* Barra de Endereço URL Minimalista */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-md bg-[#1C1816] border border-white/10 text-[9px] sm:text-xs font-mono text-[#C0AEA0] shadow-sm">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          <span>mateusmendes.pt</span>
        </div>

        <div className="w-6 sm:w-8" />
      </div>

      {/* Conteúdo Dentro do Ecrã */}
      <div className="laptop-screen-content flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 space-y-4 sm:space-y-6 bg-[#1C1816]">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#2A2421]/80 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#C0AEA0] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {isEnglish ? "Available for New Projects" : "Disponível para Novos Projetos"}
          </span>
        </div>

        {/* Título */}
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight !text-[#E6D5C3] leading-tight">
          {isEnglish ? (
            <>
              Websites & Digital Solutions <br className="hidden sm:inline" />
              <span className="!text-[#C98E6C]">Engineered for Growth</span>
            </>
          ) : (
            <>
              Websites & Soluções Web <br className="hidden sm:inline" />
              <span className="!text-[#C98E6C]">Focadas em Resultados</span>
            </>
          )}
        </h1>

        {/* Subtítulo */}
        <p className="text-[11px] sm:text-sm lg:text-base text-[#C0AEA0] leading-relaxed max-w-[250px] sm:max-w-md mx-auto font-normal">
          {isEnglish
            ? "Bespoke development with clean code, sub-second speeds, and direct communication."
            : "Desenvolvimento à medida com código limpo, carregamento rápido e contacto direto."}
        </p>

        {/* Botões */}
        <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 scale-90 sm:scale-100">
          <Link href="/contacto">
            <Button variant="contact" size="sm" withArrow className="[&>span.relative]:!bg-[#E6D5C3] [&>span.relative]:!text-[#1C1816] hover:[&>span.relative]:!bg-[#D8C4AF]">
              {isEnglish ? "Get in Touch" : "Falar Comigo"}
            </Button>
          </Link>
          <Link href="/projetos">
            <Button variant="secondary" size="sm" className="bg-[#2A2421] text-[#E6D5C3] border border-white/10 hover:bg-[#372F2B]">
              {isEnglish ? "View Projects" : "Ver Projetos"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* ==============================================================
          1. HERO SECTION: 100% FULL-SCREEN COM PORTÁTIL A ABRIR
          ============================================================== */}
      <section className="relative w-full min-h-screen -mt-[84px] sm:-mt-[88px] pt-[84px] sm:pt-[88px] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo em Ecrã Total (Otimizada para LCP) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/hero-bg.jpg"
            alt="Hero Background"
            fill
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-1000 scale-100 hover:scale-[1.01]"
          />
        </div>

        {/* Gradiente sutil na base para transição perfeita para o fundo do site */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent via-65% to-bg pointer-events-none" />

        {/* ── Portátil 3D com Animação de Abertura (Desktop) ── */}
        <div className="relative z-10 w-full max-w-[340px] sm:max-w-[500px] lg:max-w-[750px] px-4 mx-auto select-none laptop-perspective hidden sm:block">
          <div className="laptop-wrapper">
            {/* Tampa / Ecrã do Portátil (Abre de fechado → aberto) */}
            <div className="laptop-lid">
              {/* Parte de trás da tampa (superfície metálica visível quando fechado) */}
              <div className="laptop-lid-back" />

              {/* Parte da frente da tampa (ecrã, visível quando aberto) */}
              <div className="laptop-lid-screen">
                <div className="w-full aspect-[16/10] bg-[#161311]/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">

                  {renderScreenContent()}
                </div>
              </div>
            </div>

            {/* Base / Teclado do Portátil — Multi-camada para profundidade 3D */}
            <div className="laptop-base">
              <div className="laptop-hinge" />
              <div className="laptop-base-top relative">
                <div className="laptop-base-notch" />
              </div>
              <div className="laptop-base-front" />
            </div>

            {/* Sombra debaixo do portátil */}
            <div className="laptop-shadow" />
          </div>
        </div>

        {/* ── Ecrã Plano para Mobile (Performance LCP/TBT) ── */}
        <div className="relative z-10 w-full px-4 mx-auto select-none sm:hidden max-w-[340px]">
          <div className="w-full aspect-[4/5] bg-[#161311]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-fade-in-up sm:bg-[#161311]/90 sm:backdrop-blur-xl">
            {renderScreenContent()}
          </div>
        </div>
      </section>





      {/* ==============================================================
          2. BARRA DE MÉTRICAS & RIGOR TÉCNICO (COM VIDA & MICRO-WIDGETS)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" stagger={0.12}>
          {/* Card 1: Velocidade & Performance */}
          <StaggerItem><TiltCard3D className="h-full">
          <div className="group relative rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full shimmer-scan">
            {/* Brilho Ambiente no Hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Cabeçalho do Card: Ícone Monocromático + Badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface border border-border group-hover:border-accent/50 group-hover:bg-accent-subtle text-text-primary group-hover:text-accent transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PageSpeed 100
                </span>
              </div>

              {/* Métrica & Título */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left flex items-baseline gap-1.5">
                  <span>&lt; 0.8s</span>
                  <span className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider">
                    {isEnglish ? "Load time" : "Carregamento"}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary mt-1.5 group-hover:text-accent transition-colors">
                  {isEnglish ? "Lightning Fast Loading" : "Carregamento Relâmpago"}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {isEnglish
                    ? "Zero visitor drop-off from slow pages. Certified top scores on Google Core Web Vitals."
                    : "Nenhum cliente desiste por lentidão. Pontuação máxima nos Core Web Vitals do Google."}
                </p>
              </div>
            </div>

            {/* Micro-Widget Visual na Base */}
            <div className="relative z-10 mt-5 pt-3 border-t border-border/60">
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mb-1.5">
                <span>Score Google</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">100 / 100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-surface-hover overflow-hidden">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-accent to-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
          </TiltCard3D></StaggerItem>

          {/* Card 2: Código Sob Medida */}
          <StaggerItem><TiltCard3D className="h-full">
          <div className="group relative rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full shimmer-scan">
            {/* Brilho Ambiente no Hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Cabeçalho do Card */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface border border-border group-hover:border-accent/50 group-hover:bg-accent-subtle text-text-primary group-hover:text-accent transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface px-2.5 py-0.5 text-[10px] font-bold text-text-secondary">
                  {isEnglish ? "Zero Bloat" : "Sem Bloatware"}
                </span>
              </div>

              {/* Métrica & Título */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left flex items-baseline gap-1.5">
                  <span>100%</span>
                  <span className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider">
                    {isEnglish ? "Bespoke" : "Sob Medida"}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary mt-1.5 group-hover:text-accent transition-colors">
                  {isEnglish ? "Tailor-Made Code" : "Código Sob Medida"}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {isEnglish
                    ? "No sluggish generic WordPress templates or builder bloat. Written cleanly from scratch."
                    : "Sem templates reciclados ou plugins lentos. Construído de raiz com Next.js e TypeScript."}
                </p>
              </div>
            </div>

            {/* Micro-Widget Visual na Base */}
            <div className="relative z-10 mt-5 pt-3 border-t border-border/60">
              <div className="rounded-xl bg-[#1A1614] border border-white/5 px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono text-[#E6D5C3]">
                <span className="text-[#C98E6C]">stack</span>
                <span className="text-emerald-400">Next.js 16 • TS</span>
              </div>
            </div>
          </div>
          </TiltCard3D></StaggerItem>

          {/* Card 3: Zero Intermediários */}
          <StaggerItem><TiltCard3D className="h-full">
          <div className="group relative rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full shimmer-scan">
            {/* Brilho Ambiente no Hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Cabeçalho do Card */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface border border-border group-hover:border-accent/50 group-hover:bg-accent-subtle text-text-primary group-hover:text-accent transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-subtle px-2.5 py-0.5 text-[10px] font-bold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  {isEnglish ? "Direct Contact" : "Linha Direta"}
                </span>
              </div>

              {/* Métrica & Título */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left flex items-baseline gap-1.5">
                  <span>0</span>
                  <span className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider">
                    {isEnglish ? "Middlemen" : "Intermediários"}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary mt-1.5 group-hover:text-accent transition-colors">
                  {isEnglish ? "Direct Dialogue" : "Zero Intermediários"}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {isEnglish
                    ? "Speak directly with the software engineer creating your website. Rapid same-day updates."
                    : "Fala diretamente com quem programa o site. Acompanhamento contínuo e canal aberto."}
                </p>
              </div>
            </div>

            {/* Micro-Widget Visual na Base */}
            <div className="relative z-10 mt-5 pt-3 border-t border-border/60">
              <div className="flex items-center justify-between text-[10px] text-text-muted">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {isEnglish ? "1-on-1 Dialogue" : "Canal 1-para-1"}
                </span>
                <span className="font-medium">{isEnglish ? "WhatsApp & Calls" : "WhatsApp & Chamada"}</span>
              </div>
            </div>
          </div>
          </TiltCard3D></StaggerItem>

          {/* Card 4: Google SEO de Raiz */}
          <StaggerItem><TiltCard3D className="h-full">
          <div className="group relative rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full shimmer-scan">
            {/* Brilho Ambiente no Hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Cabeçalho do Card */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface border border-border group-hover:border-accent/50 group-hover:bg-accent-subtle text-text-primary group-hover:text-accent transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface px-2.5 py-0.5 text-[10px] font-bold text-accent">
                  Google SEO
                </span>
              </div>

              {/* Métrica & Título */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left flex items-baseline gap-1.5">
                  <span>#1</span>
                  <span className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider">
                    {isEnglish ? "Google Reach" : "No Google"}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary mt-1.5 group-hover:text-accent transition-colors">
                  {isEnglish ? "Google SEO by Default" : "Google SEO de Raiz"}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {isEnglish
                    ? "Schema.org rich snippets, XML sitemaps, and semantic tags engineered to attract clients."
                    : "Arquitetura semântica, Schema.org e sitemaps feitos para atrair tráfego orgânico gratuito."}
                </p>
              </div>
            </div>

            {/* Micro-Widget Visual na Base */}
            <div className="relative z-10 mt-5 pt-3 border-t border-border/60">
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span className="truncate">google.com/search</span>
                <span className="text-accent font-bold shrink-0">★ Top Posição</span>
              </div>
            </div>
          </div>
          </TiltCard3D></StaggerItem>
        </StaggerContainer>
      </section>


      {/* ==============================================================
          3. SERVIÇOS EM DESTAQUE (SERVIÇOS RESUMO)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-accent">
              {isEnglish ? "Specialized Services" : "O Que Faço"}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary mt-1">
              <TextReveal3D>{isEnglish ? "Crafted for Real Business Growth" : "Soluções Digitais Sob Medida"}</TextReveal3D>
            </h2>
            <p className="text-sm text-text-secondary mt-1.5 max-w-2xl">
              {isEnglish
                ? "Bespoke digital architecture tailored to turn visitors into inquiries and clients."
                : "Cada projeto é desenhado e programado do zero para posicionar a sua marca com máxima autoridade."}
            </p>
          </div>
          <Link
            href="/servicos"
            className="text-xs sm:text-sm font-bold text-accent hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>{isEnglish ? "Explore all services" : "Conhecer todos os serviços"}</span>
            <span>→</span>
          </Link>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.15}>
          {/* Card 1: Websites & Landing Pages */}
          <StaggerItem rotateX={8}><Card
            badge={isEnglish ? "High Conversion" : "Alta Conversão"}
            badgeVariant="accent"
            subtitle={isEnglish ? "Design & SEO" : "Design & SEO"}
            title={isEnglish ? "Websites & Landing Pages" : "Websites & Landing Pages"}
            description={
              isEnglish
                ? "Unique bespoke design, lightning load speeds (< 1s), and complete mobile and Google SEO optimization."
                : "Criados para converter visitantes em clientes. Design único, carregamento ultra-rápido (< 1s) e otimização total para telemóveis e Google."
            }
            metrics={{
              label: isEnglish ? "Performance Guaranteed" : "Performance Garantida",
              value: "Score 100/100 PageSpeed",
            }}
            tags={
              isEnglish
                ? ["Next.js", "Tailwind CSS", "Google SEO", "Framer Motion"]
                : ["Next.js", "Tailwind CSS", "SEO Otimizado", "Animações Framer Motion"]
            }
            actionText={isEnglish ? "Build My Website" : "Criar o Meu Website"}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            }
            preview={
              <div className="p-3.5 bg-surface/90 border border-border/70 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-1.5 pb-2 border-b border-border/60">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  <div className="ml-2 flex-1 rounded-md bg-surface px-2 py-0.5 text-[9px] font-mono text-text-muted border border-border/50 truncate">
                    mateusmendes.pt
                  </div>
                </div>
                <div className="rounded-lg bg-surface/50 border border-border/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-16 rounded bg-accent/40" />
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      100 PageSpeed
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-border/60" />
                  <div className="h-1.5 w-3/4 rounded bg-border/40" />
                </div>
              </div>
            }
          /></StaggerItem>

          {/* Card 2: Lojas Online */}
          <StaggerItem rotateX={8}><Card
            featured
            badge={isEnglish ? "Automated Sales" : "Vendas Automáticas"}
            badgeVariant="success"
            subtitle={isEnglish ? "Frictionless Checkout" : "Pagamentos & Checkout"}
            title={isEnglish ? "Online Stores & E-Commerce" : "Lojas Online & E-Commerce"}
            description={
              isEnglish
                ? "Full-featured e-commerce platforms with integrated payments (Cards, Apple Pay, MB WAY) and seamless order management."
                : "Plataformas de venda completas com pagamentos integrados (MB WAY, Multibanco, Cartão) e gestão simples de encomendas e catálogo."
            }
            metrics={{
              label: isEnglish ? "Secure Checkout" : "Pagamentos Seguros",
              value: isEnglish ? "Stripe • Local Payments • Invoicing" : "Stripe • MB WAY • Faturação",
            }}
            tags={
              isEnglish
                ? ["E-Commerce", "Stripe", "Fast Checkout", "Catalog Management"]
                : ["E-Commerce", "Stripe", "Checkout Rápido", "Catálogo Dinâmico"]
            }
            actionText={isEnglish ? "Launch My Online Store" : "Criar a Minha Loja Online"}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            preview={
              <div className="p-3.5 bg-gradient-to-br from-surface to-accent-subtle/50 border border-accent/25 rounded-2xl space-y-3">
                <div className="rounded-xl bg-gradient-to-r from-[#2A2421] to-[#1C1816] p-3 text-white shadow-md border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-5 rounded bg-amber-400/80 border border-amber-300/40" />
                    <span className="text-[9px] font-mono text-white/70">MB WAY / VISA</span>
                  </div>
                  <p className="font-mono text-xs tracking-widest text-white/90">•••• 4242</p>
                  <div className="flex items-center justify-between text-[9px] text-white/60">
                    <span>MATEUS MENDES</span>
                    <span>12/28</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-surface/90 border border-border/70 p-2 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-[10px] font-semibold text-text-primary">
                      {isEnglish ? "Order Approved" : "Encomenda Aprovada"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {isEnglish ? "Confirmed" : "Confirmada"}
                  </span>
                </div>
              </div>
            }
          /></StaggerItem>

          {/* Card 3: Aplicações Web Sob Medida */}
          <StaggerItem rotateX={8}><Card
            badge={isEnglish ? "Custom Software" : "Sistemas à Medida"}
            badgeVariant="default"
            subtitle={isEnglish ? "Workflows & Automation" : "Automação & Processos"}
            title={isEnglish ? "Web Applications & Portals" : "Aplicações Web & Portais"}
            description={
              isEnglish
                ? "Custom web software, interactive dashboards, and client portals that automate manual operations and save your team countless hours."
                : "Sistemas web personalizados, dashboards interativos e portais de clientes que automatizam processos manuais e poupam horas diárias à sua equipa."
            }
            metrics={{
              label: isEnglish ? "Modern Architecture" : "Tecnologia Moderna",
              value: isEnglish ? "TypeScript & Cloud Databases" : "TypeScript & Bases de Dados",
            }}
            tags={
              isEnglish
                ? ["TypeScript", "Databases", "Authentication", "Dashboards"]
                : ["TypeScript", "Bases de Dados", "Autenticação", "Painéis de Controlo"]
            }
            actionText={isEnglish ? "Discuss Custom Solution" : "Discutir Solução à Medida"}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
            preview={
              <div className="p-3.5 bg-surface/90 border border-border/70 rounded-2xl space-y-2.5 font-mono text-[10px]">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/50 text-[9px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    app.service.ts
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">● 99.9% Uptime</span>
                </div>
                <div className="space-y-1 text-text-secondary bg-[#1C1816] text-[#E6D5C3] p-2.5 rounded-lg border border-white/5">
                  <p>
                    <span className="text-[#C98E6C]">const</span> api = <span className="text-[#9E6747] dark:text-[#C98E6C]">deploy</span>({`{`}
                  </p>
                  <p className="pl-3 text-emerald-400">
                    status: <span className="text-white">&quot;online&quot;</span>,
                  </p>
                  <p className="pl-3 text-sky-400">
                    latency: <span className="text-white">&quot;12ms&quot;</span>
                  </p>
                  <p>{`}`});</p>
                </div>
                <div className="flex items-center justify-between pt-0.5 text-[9px] text-text-muted">
                  <span>{isEnglish ? "Scalable Traffic" : "Tráfego Escalável"}</span>
                  <span className="font-bold text-text-primary">10k+ req/min</span>
                </div>
              </div>
            }
          /></StaggerItem>
        </StaggerContainer>
      </section>

      {/* ==============================================================
          4. PROJETOS EM DESTAQUE (PORTFÓLIO RESUMO)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-accent">
              {isEnglish ? "Selected Case Studies" : "Portfólio Selecionado"}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary mt-1">
              <TextReveal3D>{isEnglish ? "Recent Projects & Measurable Results" : "Projetos em Destaque & Resultados"}</TextReveal3D>
            </h2>
            <p className="text-sm text-text-secondary mt-1.5 max-w-2xl">
              {isEnglish
                ? "Discover how clean code and strategic digital design generated real business impact."
                : "Descubra como o design estratégico e engenharia de software criaram valor tangível para estes clientes."}
            </p>
          </div>
          <Link
            href="/projetos"
            className="text-xs sm:text-sm font-bold text-accent hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>{isEnglish ? "View all portfolio projects" : "Ver todos os projetos"}</span>
            <span>→</span>
          </Link>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
          {featuredProjects.map((project) => {
            const title = isEnglish && project.titleEn ? project.titleEn : project.title;
            const desc = isEnglish && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription;
            const category = isEnglish && project.categoryLabelEn ? project.categoryLabelEn : project.categoryLabel;
            const topResult = isEnglish && project.resultsEn && project.resultsEn[0] ? project.resultsEn[0] : project.results[0];

            return (
              <StaggerItem key={project.slug}><TiltCard3D className="h-full">
              <div
                className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-accent/40 transition-all duration-300 h-full"
              >
                <div>
                  {/* Categoria & Ano */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent-subtle">
                      {category}
                    </span>
                    <span className="text-text-muted">{project.year}</span>
                  </div>

                  {/* Título */}
                  <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-2">
                    {title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Métrica de Impacto */}
                  {topResult && (
                    <div className="mb-5 rounded-xl border border-border/60 bg-surface-hover/60 p-2.5 text-xs font-semibold text-text-primary flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">{topResult}</span>
                    </div>
                  )}
                </div>

                {/* Rodapé do Card com Tags e Link */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-text-muted px-2 py-0.5 rounded-md bg-surface border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projetos/${project.slug}`}
                    className="text-xs font-bold text-accent group-hover:underline inline-flex items-center gap-1"
                  >
                    <span>Case Study</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
              </TiltCard3D></StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ==============================================================
          5. PORQUÊ TRABALHAR COMIGO (SOBRE / METODOLOGIA RESUMO)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={40} scale={0.97}>
        <div className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative morphing blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 morph-blob pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/3 morph-blob pointer-events-none" style={{ animationDelay: '-5s' }} />
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-wider font-bold text-accent">
              {isEnglish ? "Why Work With Me" : "Diferenciais de Trabalho"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
              {isEnglish
                ? "Direct Engineering, Zero Fluff, Total Accountability"
                : "Engenharia Direta, Rigor Técnico e Transparência Total"}
            </h2>
            <p className="text-sm text-text-secondary mt-1.5">
              {isEnglish
                ? "When you hire me, you don't get routed to account managers or outsourced teams. You get a dedicated technical partner."
                : "Não há gestores de conta nem equipas subcontratadas. Trabalha diretamente com quem planeia, desenha e programa cada pixel da sua solução."}
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                num: "01",
                title: isEnglish ? "Direct Contact" : "Contacto Direto",
                desc: isEnglish
                  ? "Talk directly with the engineer building your platform via WhatsApp, email, or scheduled call."
                  : "Fala diretamente com o programador da sua plataforma por WhatsApp, chamada ou email em qualquer fase.",
              },
              {
                num: "02",
                title: isEnglish ? "Full Code Ownership" : "Propriedade Total",
                desc: isEnglish
                  ? "100% of source code, domains, and credentials are completely yours upon completion."
                  : "100% do código fonte, domínio e acessos de administração são entregues inteiramente a si após a conclusão.",
              },
              {
                num: "03",
                title: isEnglish ? "Legal Tax Compliance" : "Faturação Legal Completa",
                desc: isEnglish
                  ? "Every project is legally invoiced with official tax compliance under Portuguese and EU standards."
                  : "Todos os serviços prestados são legalmente faturados com NIF de acordo com a legislação fiscal portuguesa.",
              },
            ].map((pillar) => (
              <StaggerItem key={pillar.num}>
              <div
                className="rounded-2xl border border-border/70 bg-surface/70 p-6 space-y-3 hover:border-accent/40 transition-all duration-300"
              >
                <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-full bg-accent-subtle">
                  {pillar.num}
                </span>
                <h3 className="font-heading text-base font-bold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-text-muted">
              {isEnglish
                ? "Want to inspect my code standards and technical philosophy?"
                : "Quer conhecer a fundo a minha stack e princípios de código?"}
            </p>
            <Link
              href="/sobre"
              className="text-xs sm:text-sm font-bold text-accent hover:underline inline-flex items-center gap-1"
            >
              <span>{isEnglish ? "Read about Mateus & methodology" : "Saber mais sobre o Mateus"}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ==============================================================
          6. TEASER DO ASSISTENTE INTERATIVO (QUIZ RESUMO)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={35} scale={0.96}>
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-surface to-accent-subtle/30 p-8 sm:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden animate-gradient-mesh">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/8 morph-blob pointer-events-none" />
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent-subtle">
              {isEnglish ? "Interactive Solution Finder" : "Assistente Interativo"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              {isEnglish
                ? "Unsure what digital solution your business needs?"
                : "Não sabe ao certo qual a solução ideal para o seu projeto?"}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {isEnglish
                ? "Answer 3 quick questions in our interactive advisor to discover the most effective roadmap for your goals and budget."
                : "Responda a 3 perguntas rápidas no nosso assistente interativo e receba uma recomendação técnica adaptada aos seus objetivos."}
            </p>
          </div>

          <Link href="/sobre" className="shrink-0">
            <Button variant="primary" size="lg" withArrow>
              {isEnglish ? "Start Solution Quiz" : "Iniciar Assistente"}
            </Button>
          </Link>
        </div>
        </ScrollReveal>
      </section>

      {/* ==============================================================
          7. BANNER FINAL DE CONTACTO (CONVERSÃO MÁXIMA)
          ============================================================== */}
      <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={50} scale={0.95}>
        <div className="relative rounded-3xl sm:rounded-[2.5rem] border border-accent/40 bg-surface/90 backdrop-blur-xl p-8 sm:p-14 text-center shadow-xl space-y-6 overflow-hidden">
          {/* Floating 3D elements in CTA */}
          <FloatingElements count={3} variant="minimal" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            {isEnglish ? "Let's Build Together" : "Vamos Conversar"}
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary max-w-2xl mx-auto">
            {isEnglish
              ? "Ready to elevate your digital presence?"
              : "Pronto para elevar a presença digital da sua empresa?"}
          </h2>

          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            {isEnglish
              ? "Let's discuss your project goals without any obligation. Contact me via form, scheduled call, or direct message."
              : "Vamos conversar sem qualquer compromisso sobre os seus objetivos. Entre em contacto por formulário, chamada ou mensagem direta."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contacto">
              <Button variant="contact" size="lg" withArrow>
                {isEnglish ? "Start Conversation" : "Iniciar Conversa"}
              </Button>
            </Link>

            <a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
                isEnglish
                  ? "Hello Mateus, I saw your portfolio and would like to talk about a project!"
                  : "Olá Mateus, vi o teu website e gostaria de conversar sobre um projeto!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-surface border border-border px-6 py-3.5 text-xs sm:text-sm font-bold text-text-primary hover:text-accent hover:border-accent transition-all shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{isEnglish ? "Chat on WhatsApp" : "Falar no WhatsApp"}</span>
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
