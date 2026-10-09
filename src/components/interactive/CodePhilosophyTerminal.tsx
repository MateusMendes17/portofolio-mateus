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
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const files: TabFile[] = t.terminal.files;

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
          {t.terminal.badge}
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
          {t.terminal.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
          {t.terminal.description}
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
              mateus@workstation: ~/portfolio/{t.terminal.path}
            </span>
          </div>

          {/* Botão de Copiar Conteúdo */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] text-[#A8988B] hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>
              {copied ? t.terminal.copied : t.terminal.copy}
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
            {t.terminal.status}
          </span>
        </div>
      </div>
    </div>
  );
}
