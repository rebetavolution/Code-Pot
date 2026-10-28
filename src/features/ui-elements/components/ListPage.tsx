import { Check } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function ListPage() {
  return (
    <UiPage title="List" description="Ordered, unordered and styled list layouts.">
      <Section title="Unordered List">
        <ul className="space-y-2 text-sm text-text-secondary">
          {["Dashboard overview", "User management", "Report generation", "System settings"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Ordered List">
        <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
          <li>Create your account</li>
          <li>Verify your email address</li>
          <li>Complete your profile</li>
          <li>Start using the dashboard</li>
        </ol>
      </Section>

      <Section title="List With Icons">
        <ul className="space-y-2">
          {["Two-factor authentication enabled", "Backup completed today", "All services operational"].map((item) => (
            <li key={item} className="flex items-center gap-2.5 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-secondary">
              <span className="w-5 h-5 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center">
                <Check size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="List Group">
        <div className="rounded-lg border border-app-border overflow-hidden divide-y divide-app-border">
          {[
            { title: "Notifications", desc: "Manage push and email alerts" },
            { title: "Privacy", desc: "Control who can see your activity" },
            { title: "Billing", desc: "Invoices and payment methods" },
          ].map((row) => (
            <button key={row.title} className="w-full text-left px-4 py-3 bg-app-bg hover:bg-app-hover transition-colors">
              <p className="text-sm text-text-primary">{row.title}</p>
              <p className="text-xs text-text-muted mt-0.5">{row.desc}</p>
            </button>
          ))}
        </div>
      </Section>
    </UiPage>
  );
}
