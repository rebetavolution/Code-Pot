import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function PaginationPage() {
  const [page, setPage] = useState(1);
  const total = 8;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <UiPage title="Pagination" description="Page navigation for paged content and tables.">
      <Section title="Numbered Pagination">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-app-border text-text-secondary hover:bg-app-hover disabled:opacity-40"
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                p === page
                  ? "bg-accent text-white"
                  : "border border-app-border text-text-secondary hover:bg-app-hover"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(total, page + 1))}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-app-border text-text-secondary hover:bg-app-hover disabled:opacity-40"
            disabled={page === total}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </Section>

      <Section title="Simple Pagination">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Page {page} of {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              className="rounded-md border border-app-border px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(total, page + 1))}
              className="rounded-md border border-app-border px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover"
            >
              Next
            </button>
          </div>
        </div>
      </Section>

      <Section title="Pagination With Ellipsis">
        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 rounded-lg border border-app-border text-text-secondary hover:bg-app-hover flex items-center justify-center">
            <ChevronLeft size={16} />
          </button>
          <button className="w-9 h-9 rounded-lg bg-accent text-sm text-white">1</button>
          <button className="w-9 h-9 rounded-lg border border-app-border text-sm text-text-secondary hover:bg-app-hover">2</button>
          <button className="w-9 h-9 rounded-lg border border-app-border text-sm text-text-secondary hover:bg-app-hover">3</button>
          <span className="w-9 h-9 flex items-center justify-center text-text-muted text-sm">…</span>
          <button className="w-9 h-9 rounded-lg border border-app-border text-sm text-text-secondary hover:bg-app-hover">12</button>
          <button className="w-9 h-9 rounded-lg border border-app-border text-text-secondary hover:bg-app-hover flex items-center justify-center">
            <ChevronRight size={16} />
          </button>
        </div>
      </Section>

      <Section title="Pagination With Table Footer">
        <div className="rounded-lg border border-app-border overflow-hidden">
          <div className="p-4 text-sm text-text-muted">Showing 1–10 of 120 results</div>
          <div className="flex items-center justify-between border-t border-app-border px-4 py-3">
            <span className="text-xs text-text-muted">Rows per page: 10</span>
            <div className="flex items-center gap-1.5">
              <button className="rounded-md border border-app-border px-2.5 py-1.5 text-xs text-text-secondary hover:bg-app-hover">Prev</button>
              <button className="rounded-md bg-accent px-2.5 py-1.5 text-xs text-white">1</button>
              <button className="rounded-md border border-app-border px-2.5 py-1.5 text-xs text-text-secondary hover:bg-app-hover">2</button>
              <button className="rounded-md border border-app-border px-2.5 py-1.5 text-xs text-text-secondary hover:bg-app-hover">Next</button>
            </div>
          </div>
        </div>
      </Section>
    </UiPage>
  );
}
