import { ChevronRight, Home } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function BreadcrumbPage() {
  return (
    <UiPage title="Breadcrumb" description="Navigation trail showing the current page location.">
      <Section title="Default Breadcrumb">
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="flex items-center gap-1.5 text-text-muted hover:text-text-primary">
            <Home size={14} /> Home
          </a>
          <ChevronRight size={14} className="text-text-dim" />
          <a href="#" className="text-text-muted hover:text-text-primary">Dashboard</a>
          <ChevronRight size={14} className="text-text-dim" />
          <span className="text-text-primary">Breadcrumb</span>
        </nav>
      </Section>

      <Section title="Breadcrumb With Background">
        <nav className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm">
          <a href="#" className="text-text-muted hover:text-text-primary">Home</a>
          <ChevronRight size={14} className="text-text-dim" />
          <a href="#" className="text-text-muted hover:text-text-primary">UI Elements</a>
          <ChevronRight size={14} className="text-text-dim" />
          <span className="font-medium text-accent-light">Breadcrumb</span>
        </nav>
      </Section>

      <Section title="Breadcrumb With Icon">
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="flex items-center gap-1.5 text-text-muted hover:text-text-primary">
            <Home size={14} /> Home
          </a>
          <ChevronRight size={14} className="text-text-dim" />
          <a href="#" className="text-text-muted hover:text-text-primary">Components</a>
          <ChevronRight size={14} className="text-text-dim" />
          <span className="text-text-primary">Current</span>
        </nav>
      </Section>
    </UiPage>
  );
}
