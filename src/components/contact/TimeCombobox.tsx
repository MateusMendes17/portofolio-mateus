"use client";

import { useId, useMemo, useRef, useState } from "react";

export interface TimeOption {
  value: string;
  /** Texto mostrado, ex.: "14:30". */
  label: string;
}

const digits = (text: string) => text.replace(/\D/g, "");

/**
 * Caixa de combinação (ARIA 1.2) para escolher uma hora: escreve-se "14", "1430" ou "14:30"
 * e a lista filtra; setas + Enter ou clique escolhem.
 */
export function TimeCombobox({
  options,
  value,
  onChange,
  label,
  placeholder,
  emptyText,
}: {
  options: TimeOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  label: string;
  placeholder: string;
  emptyText: string;
}) {
  const id = useId();
  const listId = `${id}-lista`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const selected = options.find((o) => o.value === value) ?? null;
  const shown = open ? query : (selected?.label ?? "");

  const filtered = useMemo(() => {
    const q = digits(query);
    if (!q) return options;
    return options.filter((o) => digits(o.label).startsWith(q));
  }, [options, query]);

  function choose(option: TimeOption) {
    onChange(option.value);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) setOpen(true);
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      const option = filtered[active] ?? filtered[0];
      if (option) choose(option);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="block font-body text-label font-medium text-ink">
        {label}
      </label>
      <div className="mt-2 flex border border-line-strong bg-bg focus-within:border-ink">
        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[active] ? `${id}-op-${active}` : undefined}
          autoComplete="off"
          inputMode="numeric"
          value={shown}
          placeholder={placeholder}
          onFocus={() => {
            setQuery("");
            setActive(0);
            setOpen(true);
          }}
          onBlur={() => {
            // Dá tempo ao clique numa opção antes de fechar.
            setTimeout(() => setOpen(false), 120);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
            if (value) onChange(null);
          }}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 font-body text-sm tabular-nums text-ink outline-none placeholder:text-muted"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={label}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (open) setOpen(false);
            else {
              setQuery("");
              setOpen(true);
              inputRef.current?.focus();
            }
          }}
          className="px-3 text-muted hover:text-ink"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto border border-line-strong bg-surface shadow-md"
        >
          {filtered.length === 0 && <li className="px-4 py-3 font-body text-sm text-muted">{emptyText}</li>}
          {filtered.map((option, i) => (
            <li
              key={option.value}
              id={`${id}-op-${i}`}
              role="option"
              aria-selected={option.value === value}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(option)}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-4 py-2 font-body text-sm tabular-nums ${
                i === active ? "bg-highlight text-accent-ink" : "text-ink"
              } ${option.value === value ? "font-semibold" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
