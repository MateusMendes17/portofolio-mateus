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
    <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-10">
      <div className="max-w-2xl mb-8">
        <span className="font-mono text-sm text-muted">
          {t.terminal.badge}
        </span>
        <h2 className="mt-3 font-heading text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
          {t.terminal.title}
        </h2>
        <p className="mt-4 text-base text-muted">
          {t.terminal.description}
        </p>
      </div>

      {/* Janela de Terminal / IDE */}
      <div className="rounded-[20px] border border-border/90 bg-[var(--code-bg)] text-[var(--code-ink)] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Barra Superior da Janela */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--code-surface)] border-b border-white/10 select-none">
          {/* Bolinhas estilo macOS */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#E05252]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#E5A93B]/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#52BA69]/80 inline-block" />
            <span className="ml-2 text-xs text-[var(--code-muted)] hidden sm:inline">
              mateus@workstation: ~/portfolio/{t.terminal.path}
            </span>
          </div>

          {/* Botão de Copiar Conteúdo */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-[var(--code-muted)] hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>
              {copied ? t.terminal.copied : t.terminal.copy}
            </span>
          </button>
        </div>

        {/* Separadores de Ficheiro (Tabs) */}
        <div className="flex items-center overflow-x-auto bg-[var(--code-surface)] border-b border-white/10 px-2 pt-2 scrollbar-none select-none">
          {files.map((file) => {
            const isActive = activeFile.id === file.id;
            return (
              <button
                key={file.id}
                type="button"
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs rounded-t-xl transition-all border-t border-x ${
                  isActive
                    ? "bg-[var(--code-bg)] text-[var(--code-ink)] border-white/10 font-bold"
                    : "bg-transparent text-[var(--code-muted)] border-transparent hover:text-[var(--code-accent)]"
                }`}
              >
                <span className="text-[var(--code-accent)] text-xs">
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
              className="leading-relaxed text-[var(--code-ink)] selection:bg-[var(--code-accent)]/30"
            >
              <code>{activeFile.content}</code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Rodapé do Terminal */}
        <div className="px-4 py-2 bg-[var(--code-surface)] border-t border-white/10 text-xs text-[var(--code-muted)] flex items-center justify-between">
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
