import { ExternalLink } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function LinksPage() {
  return (
    <UiPage title="Links" description="Inline and standalone hyperlink styles.">
      <Section title="Text Links">
        <p className="text-sm text-text-secondary leading-relaxed">
          This is a paragraph with an <a href="#" className="text-accent-light hover:underline">inline link</a> and another{" "}
          <a href="#" className="text-accent-light underline underline-offset-2">underlined link</a> inside text content.
        </p>
      </Section>

      <Section title="Link Colors">
        <div className="flex flex-wrap gap-5 text-sm">
          <a href="#" className="text-accent-light hover:underline">Primary link</a>
          <a href="#" className="text-green-400 hover:underline">Success link</a>
          <a href="#" className="text-yellow-400 hover:underline">Warning link</a>
          <a href="#" className="text-red-400 hover:underline">Danger link</a>
          <a href="#" className="text-text-muted hover:text-text-primary">Muted link</a>
        </div>
      </Section>

      <Section title="Link With Icon">
        <div className="flex flex-col gap-3 text-sm">
          <a href="#" className="inline-flex items-center gap-1.5 text-accent-light hover:underline">
            Open documentation <ExternalLink size={14} />
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary">
            Visit website <ExternalLink size={14} />
          </a>
        </div>
      </Section>

      <Section title="Block Links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Getting started", "Components reference", "API documentation", "Release notes"].map((label) => (
            <a
              key={label}
              href="#"
              className="flex items-center justify-between rounded-lg border border-app-border bg-app-bg px-4 py-3 text-sm text-text-secondary hover:border-accent/40 hover:text-text-primary transition-colors"
            >
              {label}
              <ExternalLink size={14} className="text-text-muted" />
            </a>
          ))}
        </div>
      </Section>
    </UiPage>
  );
}
