import { UiPage, Section } from "./UiPage";

const bars = [
  { label: "Primary", value: 65, color: "bg-accent" },
  { label: "Success", value: 80, color: "bg-green-500" },
  { label: "Warning", value: 45, color: "bg-yellow-500" },
  { label: "Danger", value: 30, color: "bg-red-500" },
];

export function ProgressBarsPage() {
  return (
    <UiPage title="Progress Bars" description="Visual indicators of completion and loading state.">
      <Section title="Basic Progress Bars">
        <div className="space-y-4">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-text-secondary">{bar.label}</span>
                <span className="text-xs text-text-muted">{bar.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-app-hover overflow-hidden">
                <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4">
          <div className="h-1 w-full rounded-full bg-app-hover overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-accent" />
          </div>
          <div className="h-2.5 w-full rounded-full bg-app-hover overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-accent" />
          </div>
          <div className="h-4 w-full rounded-full bg-app-hover overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-accent" />
          </div>
        </div>
      </Section>

      <Section title="Progress With Label Inside">
        <div className="space-y-3">
          <div className="h-7 w-full rounded-lg bg-app-hover overflow-hidden relative">
            <div className="h-full w-[72%] bg-accent flex items-center justify-end pr-2">
              <span className="text-[10px] font-medium text-white">72%</span>
            </div>
          </div>
          <div className="h-7 w-full rounded-lg bg-app-hover overflow-hidden relative">
            <div className="h-full w-[40%] bg-green-500 flex items-center justify-end pr-2">
              <span className="text-[10px] font-medium text-white">40%</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Striped & Animated">
        <div className="h-3 w-full rounded-full bg-app-hover overflow-hidden">
          <div
            className="h-full rounded-full bg-accent animate-pulse"
            style={{
              width: "62%",
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 16px)",
            }}
          />
        </div>
      </Section>
    </UiPage>
  );
}
