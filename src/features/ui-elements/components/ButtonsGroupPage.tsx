import { Bold, ChevronDown, Italic, Link2, Underline } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function ButtonsGroupPage() {
  return (
    <UiPage title="Buttons Group" description="Grouped buttons for segmented controls and toolbars.">
      <Section title="Basic Group">
        <div className="inline-flex rounded-lg overflow-hidden border border-app-border">
          {["Left", "Middle", "Right"].map((label, i) => (
            <button
              key={label}
              className={`px-4 py-2 text-sm ${i > 0 ? "border-l border-app-border" : ""} ${
                i === 1 ? "bg-accent text-white" : "bg-app-bg text-text-secondary hover:bg-app-hover"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Toolbar Group">
        <div className="inline-flex rounded-lg overflow-hidden border border-app-border">
          {[Bold, Italic, Underline, Link2].map((Icon, i) => (
            <button
              key={i}
              className={`w-10 h-10 inline-flex items-center justify-center text-text-secondary hover:bg-app-hover hover:text-text-primary ${
                i > 0 ? "border-l border-app-border" : ""
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </Section>

      <Section title="Split Button">
        <div className="inline-flex rounded-lg overflow-hidden">
          <button className="bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">Save Changes</button>
          <button className="bg-accent/90 px-2.5 border-l border-white/20 text-white hover:opacity-90">
            <ChevronDown size={16} />
          </button>
        </div>
      </Section>

      <Section title="Group With Icons">
        <div className="inline-flex rounded-lg overflow-hidden border border-app-border">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-app-bg text-text-secondary hover:bg-app-hover">
            Day
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-app-hover text-text-primary border-l border-app-border">
            Week
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-app-bg text-text-secondary hover:bg-app-hover border-l border-app-border">
            Month
          </button>
        </div>
      </Section>
    </UiPage>
  );
}
