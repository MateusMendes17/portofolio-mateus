"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { NAV_ITEMS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** Subscribe vazio para `useSyncExternalStore` (o valor não muda durante a sessão). */
const subscribeNoop = () => () => {};

/* ============================================================
   Command Palette (⌘K / Ctrl+K)

   Navegação por teclado a páginas, projetos e ações (tema,
   idioma, copiar email, redes). Os projetos são carregados com
   dynamic import só quando a paleta abre — não pesam no bundle
   inicial de nenhuma página.
   ============================================================ */

type Section = "navigation" | "projects" | "actions";

interface Command {
  id: string;
  label: string;
  section: Section;
  /** Texto adicional pesquisável (keywords) — não é mostrado. */
  keywords?: string;
  /** Texto curto à direita (ex.: "/sobre"). */
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

/** Minúsculas + sem acentos para comparação tolerante. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function score(cmd: Command, query: string): number {
  const label = normalize(cmd.label);
  if (label.startsWith(query)) return 0;
  if (label.includes(query)) return 1;
  if (cmd.keywords && normalize(cmd.keywords).includes(query)) return 2;
  return -1;
}

/* ── Ícones (16px, stroke currentColor) ── */
function Ico({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const NavIcons: Record<string, React.ReactNode> = {
  "/": (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  "/sobre": (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  "/servicos": (
    <>
      <path d="M12 3 3 8v8l9 5 9-5V8l-9-5Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  "/projetos": (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </>
  ),
  "/contacto": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export function CommandPalette() {
  const router = useRouter();
  const { t, isEnglish, toggleLanguage } = useLanguage();
  const { setTheme, resolvedTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [projects, setProjects] = useState<
    Array<{
      slug: string;
      title: string;
      titleEn?: string;
      categoryLabel: string;
      categoryLabelEn?: string;
      tags: string[];
    }>
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /*atalho global ⌘K / Ctrl+K + Esc */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Módulo da plataforma (⌘K vs Ctrl K) — snapshot externo, seguro p/ hidratação */
  const mod = useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => null
  );

  /*
    Reset quando a paleta abre/fecha — padrão "adjusting state when props
    change" (setState durante render, sancionado pelo React) em vez de efeito.
  */
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (!isOpen) {
      setSearch("");
      setActiveIndex(0);
      setCopied(false);
    }
  }

  /* Foco: no input ao abrir; de volta ao gatilho ao fechar (só em transições) */
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  /* Bloqueia o scroll do body enquanto aberta */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Projetos carregados on-demand ao abrir a primeira vez */
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    import("@/content/projects").then((module) => {
      if (!cancelled) setProjects(module.PROJECTS);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  const runExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard
      .writeText(SITE_CONFIG.email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setIsOpen(false), 700);
      })
      .catch(() => setIsOpen(false));
  }, []);

  /* ── Lista de comandos ── */
  const navLabels: Record<string, string> = {
    "/": t.nav.home,
    "/sobre": t.nav.about,
    "/servicos": t.nav.services,
    "/projetos": t.nav.projects,
    "/contacto": t.nav.contact,
  };

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.href}`,
      label: navLabels[item.href] ?? item.label,
      section: "navigation",
      keywords: item.href,
      hint: item.href === "/" ? "/" : item.href,
      icon: <Ico>{NavIcons[item.href]}</Ico>,
      run: () => {
        router.push(item.href);
        setIsOpen(false);
      },
    }));

    const projectCommands: Command[] = projects.map((project) => {
      const title = isEnglish ? (project.titleEn ?? project.title) : project.title;
      const category = isEnglish
        ? (project.categoryLabelEn ?? project.categoryLabel)
        : project.categoryLabel;
      return {
        id: `project-${project.slug}`,
        label: title,
        section: "projects",
        keywords: `${category} ${project.tags.join(" ")}`,
        hint: category,
        icon: (
          <Ico>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
          </Ico>
        ),
        run: () => {
          router.push(`/projetos/${project.slug}`);
          setIsOpen(false);
        },
      };
    });

    const actions: Command[] = [
      {
        id: "action-theme",
        label: t.command.actions.theme,
        section: "actions",
        keywords: "tema theme dark light claro escuro modo",
        icon: (
          <Ico>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </Ico>
        ),
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setIsOpen(false);
        },
      },
      {
        id: "action-language",
        label: t.command.actions.language,
        section: "actions",
        keywords: "idioma language inglês english português pt en",
        icon: (
          <Ico>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
          </Ico>
        ),
        run: () => {
          toggleLanguage();
          setIsOpen(false);
        },
      },
      {
        id: "action-copy-email",
        label: copied ? t.command.actions.copied : t.command.actions.copyEmail,
        section: "actions",
        keywords: `${SITE_CONFIG.email} copiar email`,
        hint: copied ? undefined : SITE_CONFIG.email,
        icon: copied ? (
          <Ico>
            <path d="m4 12 5 5L20 6" />
          </Ico>
        ) : (
          <Ico>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h8" />
          </Ico>
        ),
        run: copyEmail,
      },
      {
        id: "action-whatsapp",
        label: t.command.actions.whatsapp,
        section: "actions",
        keywords: "whatsapp telefone contacto mensagem",
        icon: <WhatsAppIcon className="h-4 w-4 shrink-0" />,
        run: () => runExternal(SOCIAL_LINKS.whatsapp),
      },
      {
        id: "action-github",
        label: t.command.actions.github,
        section: "actions",
        keywords: "github código repositório code",
        icon: <GitHubIcon className="h-4 w-4 shrink-0" />,
        run: () => runExternal(SOCIAL_LINKS.github),
      },
      {
        id: "action-linkedin",
        label: t.command.actions.linkedin,
        section: "actions",
        keywords: "linkedin rede currículo cv",
        icon: <LinkedInIcon className="h-4 w-4 shrink-0" />,
        run: () => runExternal(SOCIAL_LINKS.linkedin),
      },
    ];

    return [...nav, ...projectCommands, ...actions];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, isEnglish, copied, resolvedTheme, t, router]);

  /* ── Filtragem por pesquisa ── */
  const filtered = useMemo(() => {
    const query = normalize(search.trim());
    if (!query) return commands;
    return commands
      .map((cmd) => ({ cmd, s: score(cmd, query) }))
      .filter((entry) => entry.s >= 0)
      .sort((a, b) => a.s - b.s)
      .map((entry) => entry.cmd);
  }, [commands, search]);

  const groups = useMemo(() => {
    const order: Section[] = ["navigation", "projects", "actions"];
    const indexOf = new Map(filtered.map((cmd, index) => [cmd.id, index]));
    return order
      .map((section) => ({
        section,
        items: filtered.filter((cmd) => cmd.section === section),
        indexOf,
      }))
      .filter((group) => group.items.length > 0);
  }, [filtered]);

  const total = filtered.length;

  /* Mantém o item ativo visível dentro da lista */
  useEffect(() => {
    const active = filtered[activeIndex];
    if (active) itemRefs.current[active.id]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, filtered]);

  const activeId = filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined;

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (total === 0 ? 0 : (i + 1) % total));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (total === 0 ? 0 : (i - 1 + total) % total));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  const sectionLabel = (section: Section): string =>
    section === "navigation"
      ? t.command.sections.navigation
      : section === "projects"
        ? t.command.sections.projects
        : t.command.sections.actions;

  return (
    <>
      {/* Gatilho (desktop) */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.command.openAria}
        aria-keyshortcuts="Control+K Meta+K"
        className="hidden xl:inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/70 bg-surface/75 px-3 py-1.5 text-xs font-medium text-text-muted shadow-sm backdrop-blur-lg transition-colors hover:border-accent/50 hover:text-text-primary"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        {/* Label + atalho (a partir de xl o header tem folga para a versão completa) */}
        <span>{t.command.open}</span>
        {mod && (
          <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-text-muted">
            {mod === "⌘" ? "⌘K" : "Ctrl K"}
          </kbd>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
            onMouseDown={close}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={t.command.openAria}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-border px-4">
                <svg
                  className="h-4 w-4 shrink-0 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-palette-list"
                  aria-autocomplete="list"
                  aria-activedescendant={activeId}
                  aria-label={t.command.placeholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={t.command.placeholder}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-12 w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-xs text-text-muted sm:block">
                  Esc
                </kbd>
              </div>

              {/* Lista */}
              <div
                id="command-palette-list"
                role="listbox"
                aria-label={t.command.placeholder}
                className="max-h-[50vh] overflow-y-auto p-2"
              >
                {groups.map((group) => (
                  <div key={group.section} className="mb-1 last:mb-0">
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                      {sectionLabel(group.section)}
                    </p>
                    {group.items.map((cmd) => {
                      const index = group.indexOf.get(cmd.id) ?? 0;
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={cmd.id}
                          ref={(el) => {
                            itemRefs.current[cmd.id] = el;
                          }}
                          id={`cmd-${cmd.id}`}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          tabIndex={-1}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={cmd.run}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            isActive
                              ? "bg-accent-subtle text-text-primary"
                              : "text-text-secondary hover:bg-surface-hover"
                          )}
                        >
                          <span className={cn("shrink-0", isActive ? "text-accent" : "text-text-muted")}>
                            {cmd.icon}
                          </span>
                          <span className="flex-1 truncate">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="shrink-0 truncate text-xs text-text-muted">{cmd.hint}</span>
                          )}
                          {isActive && (
                            <span className="shrink-0 text-xs font-bold text-accent" aria-hidden="true">
                              ↵
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {total === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-text-muted">
                    {t.command.empty} “{search.trim()}”
                  </p>
                )}
              </div>

              {/* Rodapé de atalhos */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-text-muted">
                <span aria-hidden="true">↑↓ / ↵ {t.command.hintSelect}</span>
                <span aria-hidden="true">Esc {t.command.hintClose}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
