import { UiPage, Section } from "./UiPage";

export function BadgePage() {
  return (
    <UiPage title="Badge" description="Small status descriptors for labels and counts.">
      <Section title="Solid Badges">
        <div className="flex flex-wrap gap-2">
          {[
            ["Primary", "bg-accent text-white"],
            ["Success", "bg-green-500/15 text-green-400 border border-green-500/30"],
            ["Warning", "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"],
            ["Error", "bg-red-500/15 text-red-400 border border-red-500/30"],
            ["Info", "bg-blue-500/15 text-blue-400 border border-blue-500/30"],
            ["Light", "bg-app-hover text-text-secondary border border-app-border"],
            ["Dark", "bg-app-deep text-text-primary border border-app-border"],
          ].map(([label, cls]) => (
            <span key={label} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
              {label}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Badge With Dot">
        <div className="flex flex-wrap gap-3">
          {[
            ["Active", "bg-green-500"],
            ["Pending", "bg-yellow-500"],
            ["Inactive", "bg-gray-500"],
            ["Failed", "bg-red-500"],
          ].map(([label, dot]) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-bg px-2.5 py-1 text-xs text-text-secondary">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Badge On Button">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm text-white">
            Notifications
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">12</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3.5 py-2 text-sm text-text-secondary">
            Messages
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent-light">4</span>
          </button>
        </div>
      </Section>

      <Section title="Badge Sizes">
        <div className="flex items-center gap-3">
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-white">XS</span>
          <span className="rounded bg-accent px-2 py-0.5 text-xs text-white">SM</span>
          <span className="rounded bg-accent px-2.5 py-1 text-sm text-white">MD</span>
        </div>
      </Section>
    </UiPage>
  );
}
