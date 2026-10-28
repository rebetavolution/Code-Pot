import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function TooltipsPage() {
  const [hover, setHover] = useState<string | null>(null);

  const tips = [
    { id: "top", label: "Tooltip on top", pos: "bottom-full left-1/2 -translate-x-1/2 mb-2" },
    { id: "bottom", label: "Tooltip on bottom", pos: "top-full left-1/2 -translate-x-1/2 mt-2" },
    { id: "left", label: "Tooltip on left", pos: "right-full top-1/2 -translate-y-1/2 mr-2" },
    { id: "right", label: "Tooltip on right", pos: "left-full top-1/2 -translate-y-1/2 ml-2" },
  ];

  return (
    <UiPage title="Tooltips" description="Contextual hints shown on hover or focus.">
      <Section title="Tooltip Placement">
        <div className="flex flex-wrap items-center gap-10 py-6">
          {tips.map((tip) => (
            <div key={tip.id} className="relative">
              <button
                onMouseEnter={() => setHover(tip.id)}
                onMouseLeave={() => setHover(null)}
                className="rounded-lg border border-app-border bg-app-bg px-4 py-2 text-sm text-text-secondary hover:bg-app-hover"
              >
                {tip.id.charAt(0).toUpperCase() + tip.id.slice(1)}
              </button>
              {hover === tip.id && (
                <div className={`absolute z-20 whitespace-nowrap rounded-md bg-app-deep border border-app-border px-2.5 py-1.5 text-[11px] text-text-primary shadow-lg ${tip.pos}`}>
                  {tip.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tooltip On Icon">
        <div className="flex items-center gap-6">
          {["Edit", "Copy", "Delete"].map((label) => (
            <div key={label} className="relative">
              <button
                onMouseEnter={() => setHover(label)}
                onMouseLeave={() => setHover(null)}
                className="w-9 h-9 rounded-lg border border-app-border bg-app-bg flex items-center justify-center text-text-muted hover:text-text-primary"
              >
                <span className="text-xs">{label[0]}</span>
              </button>
              {hover === label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-app-deep border border-app-border px-2.5 py-1.5 text-[11px] text-text-primary shadow-lg">
                  {label}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tooltip With Arrow">
        <div className="relative inline-block py-8">
          <button
            onMouseEnter={() => setHover("arrow")}
            onMouseLeave={() => setHover(null)}
            className="rounded-lg bg-accent px-4 py-2 text-sm text-white"
          >
            Hover me
          </button>
          {hover === "arrow" && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
              <div className="rounded-md bg-accent px-3 py-1.5 text-[11px] text-white shadow-lg">With arrow</div>
              <div className="mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-accent" />
            </div>
          )}
        </div>
      </Section>
    </UiPage>
  );
}
