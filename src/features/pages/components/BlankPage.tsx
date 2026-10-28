import { PageShell } from "./PageShell";

export function BlankPage() {
  return (
    <PageShell title="Blank Page" description="A clean starting point for new content.">
      <div className="min-h-[50vh] rounded-lg border border-dashed border-app-border bg-app-surface/40 flex items-center justify-center">
        <p className="text-sm text-text-muted">This page is intentionally blank.</p>
      </div>
    </PageShell>
  );
}
