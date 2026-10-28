import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function ButtonsPage() {
  return (
    <UiPage title="Buttons" description="Button styles, sizes and states.">
      <Section title="Primary Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            Primary
          </button>
          <button className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-app-hover transition-colors">
            Secondary
          </button>
          <button className="rounded-lg bg-green-500/15 border border-green-500/30 px-4 py-2.5 text-sm font-medium text-green-400 hover:bg-green-500/25 transition-colors">
            Success
          </button>
          <button className="rounded-lg bg-red-500/15 border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/25 transition-colors">
            Danger
          </button>
          <button className="rounded-lg bg-transparent px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-app-hover transition-colors">
            Ghost
          </button>
        </div>
      </Section>

      <Section title="Button Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-md bg-accent px-2.5 py-1.5 text-xs text-white">Extra Small</button>
          <button className="rounded-md bg-accent px-3 py-2 text-sm text-white">Small</button>
          <button className="rounded-md bg-accent px-4 py-2.5 text-sm text-white">Medium</button>
          <button className="rounded-md bg-accent px-5 py-3 text-base text-white">Large</button>
        </div>
      </Section>

      <Section title="Buttons With Icon">
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm text-white">
            <Plus size={16} /> Add Item
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary">
            <Download size={16} /> Download
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
            <Trash2 size={16} /> Delete
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm text-white">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </Section>

      <Section title="Icon Only & States">
        <div className="flex flex-wrap items-center gap-3">
          <button className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-accent text-white">
            <Plus size={18} />
          </button>
          <button className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-app-border bg-app-bg text-text-primary">
            <Download size={18} />
          </button>
          <button disabled className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white opacity-50 cursor-not-allowed">
            Disabled
          </button>
          <button className="rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-secondary opacity-50 cursor-not-allowed" disabled>
            Disabled Outline
          </button>
        </div>
      </Section>
    </UiPage>
  );
}
