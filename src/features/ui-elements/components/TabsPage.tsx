import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function TabsPage() {
  const [active, setActive] = useState("overview");
  const [pill, setPill] = useState("all");
  const [vertical, setVertical] = useState("general");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <UiPage title="Tabs" description="Tabbed navigation for switching between views.">
      <Section title="Underline Tabs">
        <div className="border-b border-app-border flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`pb-3 text-sm transition-colors border-b-2 -mb-px ${
                active === tab.id
                  ? "border-accent text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pt-4 text-sm text-text-secondary">
          {active === "overview" && "Overview content for the selected tab."}
          {active === "activity" && "Recent activity and event history."}
          {active === "settings" && "Configuration options for this section."}
        </div>
      </Section>

      <Section title="Pill Tabs">
        <div className="inline-flex items-center rounded-lg border border-app-border bg-app-bg p-1">
          {["all", "active", "archived"].map((id) => (
            <button
              key={id}
              onClick={() => setPill(id)}
              className={`px-4 py-1.5 text-sm rounded-md capitalize transition-colors ${
                pill === id ? "bg-app-surface text-text-primary" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
        <p className="pt-4 text-sm text-text-secondary">Showing: {pill}</p>
      </Section>

      <Section title="Tabs With Badge">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Inbox", count: 12 },
            { label: "Sent", count: 4 },
            { label: "Drafts", count: 2 },
          ].map((tab, i) => (
            <button
              key={tab.label}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm ${
                i === 0 ? "bg-accent text-white" : "border border-app-border bg-app-bg text-text-secondary hover:bg-app-hover"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${i === 0 ? "bg-white/20" : "bg-app-hover"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Vertical Tabs">
        <div className="flex gap-6">
          <div className="flex flex-col gap-1 w-40 shrink-0 border-r border-app-border pr-3">
            {[
              { id: "general", label: "General" },
              { id: "privacy", label: "Privacy" },
              { id: "advanced", label: "Advanced" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVertical(tab.id)}
                className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  vertical === tab.id ? "bg-app-hover text-text-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 text-sm text-text-secondary">
            Content for <span className="text-text-primary capitalize">{vertical}</span> settings.
          </div>
        </div>
      </Section>
    </UiPage>
  );
}
