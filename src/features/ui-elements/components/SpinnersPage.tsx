import { UiPage, Section } from "./UiPage";

export function SpinnersPage() {
  return (
    <UiPage title="Spinners" description="Loading indicators for asynchronous operations.">
      <Section title="Border Spinners">
        <div className="flex items-center gap-6">
          {[
            { size: "w-4 h-4 border-2", color: "border-accent border-t-transparent" },
            { size: "w-6 h-6 border-2", color: "border-accent border-t-transparent" },
            { size: "w-9 h-9 border-[3px]", color: "border-accent border-t-transparent" },
            { size: "w-12 h-12 border-4", color: "border-accent border-t-transparent" },
          ].map((s, i) => (
            <div key={i} className={`${s.size} ${s.color} rounded-full animate-spin`} />
          ))}
        </div>
      </Section>

      <Section title="Colored Spinners">
        <div className="flex items-center gap-6">
          {["border-blue-500", "border-green-500", "border-yellow-500", "border-red-500", "border-text-muted"].map((c) => (
            <div key={c} className={`w-9 h-9 border-[3px] ${c} border-t-transparent rounded-full animate-spin`} />
          ))}
        </div>
      </Section>

      <Section title="Spinner With Label">
        <div className="flex flex-col items-center gap-3 w-40">
          <div className="w-10 h-10 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-text-muted">Loading data...</p>
        </div>
      </Section>

      <Section title="Dot Spinner">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </Section>

      <Section title="Skeleton Loading">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-app-hover" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-app-hover" />
            <div className="h-3 w-2/3 rounded bg-app-hover" />
          </div>
        </div>
      </Section>
    </UiPage>
  );
}
