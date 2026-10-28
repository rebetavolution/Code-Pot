import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { screens } from "../screens-registry";

interface HeaderSearchProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function HeaderSearch({ open, onClose, onNavigate }: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matched = term
      ? screens.filter((screen) =>
          [screen.label, screen.group ?? "General"].some((value) => value.toLowerCase().includes(term)),
        )
      : screens;
    return matched.slice(0, 9);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const go = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-24"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-app-border px-4">
          <Search size={18} className="text-text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((prev) => Math.min(results.length - 1, prev + 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((prev) => Math.max(0, prev - 1));
              }
              if (event.key === "Enter" && results[active]) go(results[active].id);
            }}
            placeholder="Search pages..."
            className="h-14 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="rounded border border-app-border px-1.5 py-0.5 text-[10px] text-text-muted">esc</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(screen.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  index === active ? "bg-app-hover" : ""
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-app-bg text-text-muted">
                  <Icon size={15} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-text-primary">{screen.label}</span>
                  <span className="block text-[11px] text-text-muted">{screen.group ?? "General"}</span>
                </span>
                {index === active && <CornerDownLeft size={14} className="text-text-muted" />}
              </button>
            );
          })}
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-text-muted">No pages match "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
}
