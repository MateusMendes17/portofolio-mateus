"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TabFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

export function CodePhilosophyTerminal() {
  const { isEnglish } = useLanguage();
  const [copied, setCopied] = useState(false);

  const files: TabFile[] = isEnglish
    ? [
        {
          id: "valores",
          name: "principles.ts",
          language: "typescript",
          content: `// Engineering Philosophy — Mateus Mendes
export const engineeringPrinciples = {
  cleanCode: {
    zeroBloatware: true, // I reject sluggish templates and heavy page builders
    architecture: "Next.js 16 + TypeScript + Tailwind CSS",
    speedTarget: "< 0.8s initial page load",
  },
  clientRelationship: {
    middlemen: 0, // You speak directly with the engineer writing your code
    transparency: "Clear roadmap defined in private consultation with zero hidden fees",
    communication: "Direct channel open throughout the entire project",
  },
  ultimateGoal: "Deliver a revenue engine and undeniable digital authority for your brand.",
};`,
        },
        {
          id: "processo",
          name: "process.json",
          language: "json",
          content: `{
  "phase_01": {
    "name": "Diagnosis & Strategy",
    "goal": "Understand target audience and business objectives."
  },
  "phase_02": {
    "name": "UI/UX Design & Architecture",
    "goal": "Iterative design approval prior to writing production code."
  },
  "phase_03": {
    "name": "Development & Optimization",
    "goal": "Bespoke clean code, strict mobile tests, and top PageSpeed score."
  },
  "phase_04": {
    "name": "Deployment & Handover",
    "goal": "Production launch with SSL and complete client autonomy."
  }
}`,
        },
        {
          id: "garantias",
          name: "guarantees.md",
          language: "markdown",
          content: `# Commitments Upheld in Every Project

✓ 100% Full Code Ownership & Asset Handover upon completion
✓ Compliant Legal Invoicing according to regulations
✓ Deep Technical Google Search Engine Optimization (SEO)
✓ Rigorous responsiveness across iOS, Android, macOS & Windows
✓ Post-launch support and training for autonomous content management`,
        },
      ]
    : [
        {
          id: "valores",
          name: "valores.ts",
          language: "typescript",
          content: `// Filosofia de Desenvolvimento — Mateus Mendes
export const principiosDeEngenharia = {
  codigoLimpo: {
    semBloatware: true, // Recuso templates lentos e construtores pesados
    arquitetura: "Next.js 16 + TypeScript + Tailwind CSS",
    velocidadeAlvo: "< 0.8s de carregamento inicial",
  },
  relacaoComCliente: {
    intermedios: 0, // Fala diretamente com o programador do seu site
    transparencia: "Proposta clara e definida em chamada privada sem taxas escondidas",
    comunicacao: "Acompanhamento direto e canal aberto durante todo o projeto",
  },
  objetivoFinal: "Criar um canal de vendas e autoridade inquestionável para o seu negócio.",
};`,
        },
        {
          id: "processo",
          name: "processo.json",
          language: "json",
          content: `{
  "fase_01": {
    "nome": "Diagnóstico & Estratégia",
    "objetivo": "Compreender os clientes e o modelo de negócio da sua empresa."
  },
  "fase_02": {
    "nome": "Design & Estrutura Visual",
    "objetivo": "Aprovação do layout antes de iniciar o desenvolvimento."
  },
  "fase_03": {
    "nome": "Construção & Otimização",
    "objetivo": "Código sob medida, testes rigorosos em telemóveis e pontuação SEO."
  },
  "fase_04": {
    "nome": "Lançamento & Formação",
    "objetivo": "Colocar no ar com SSL e garantir total autonomia ao cliente."
  }
}`,
        },
        {
          id: "garantias",
          name: "garantias.md",
          language: "markdown",
          content: `# Compromissos Assumidos em Cada Projeto

✓ Faturação Legal Completa (com NIF) de acordo com a lei portuguesa
✓ 100% de Propriedade do Código e Domínio após entrega final
✓ Otimização Técnica para Motores de Busca (Google SEO incluído)
✓ Compatibilidade perfeita testada em iPhone, Android, Mac e Windows
✓ Formação e suporte pós-lançamento para esclarecimento de dúvidas`,
        },
      ];

  const [activeFileId, setActiveFileId] = useState<string>("valores");
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 sm:p-10 shadow-sm">
      <div className="max-w-2xl mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-accent">
          {isEnglish ? "Behind the Scenes & Rigor" : "Bastidores & Rigor Técnico"}
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
          {isEnglish ? "My Engineering Philosophy" : "A Minha Filosofia de Trabalho"}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
          {isEnglish
            ? "Inspect the engineering standards, methodology, and commitments applied to every line of code I craft for you."
            : "Inspecione os padrões de código, metodologia e garantias que aplico em cada linha que escrevo para si."}
        </p>
      </div>

      {/* Janela de Terminal / IDE */}
      <div className="rounded-2xl border border-border/90 bg-[#161311] text-[#E6D5C3] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Barra Superior da Janela */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1C1816] border-b border-white/10 select-none">
          {/* Bolinhas estilo macOS */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#E05252]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#E5A93B]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#52BA69]/80 inline-block" />
            <span className="ml-2 text-[11px] text-[#A8988B] hidden sm:inline">
              mateus@workstation: ~/portfolio/{isEnglish ? "philosophy" : "filosofia"}
            </span>
          </div>

          {/* Botão de Copiar Conteúdo */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] text-[#A8988B] hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>
              {copied
                ? (isEnglish ? "✓ Copied" : "✓ Copiado")
                : (isEnglish ? "Copy" : "Copiar")}
            </span>
          </button>
        </div>

        {/* Separadores de Ficheiro (Tabs) */}
        <div className="flex items-center overflow-x-auto bg-[#181412] border-b border-white/10 px-2 pt-2 scrollbar-none select-none">
          {files.map((file) => {
            const isActive = activeFile.id === file.id;
            return (
              <button
                key={file.id}
                type="button"
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs rounded-t-xl transition-all border-t border-x ${
                  isActive
                    ? "bg-[#161311] text-[#E6D5C3] border-white/10 font-bold"
                    : "bg-transparent text-[#8D7D72] border-transparent hover:text-[#C98E6C]"
                }`}
              >
                <span className="text-accent text-[10px]">
                  {file.name.endsWith(".ts") ? "TS" : file.name.endsWith(".json") ? "{}" : "#"}
                </span>
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo do Ficheiro com Animação */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeFile.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="leading-relaxed text-[#D6C4B2] selection:bg-[#C98E6C]/30"
            >
              <code>{activeFile.content}</code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Rodapé do Terminal */}
        <div className="px-4 py-2 bg-[#1C1816] border-t border-white/10 text-[10px] text-[#8D7D72] flex items-center justify-between">
          <span>UTF-8 • {activeFile.language}</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isEnglish ? "Build succeeded — 0 errors" : "Compilação OK — 0 erros"}
          </span>
        </div>
      </div>
    </div>
  );
}
