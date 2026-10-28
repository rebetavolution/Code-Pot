import { AlertTriangle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function AlertsPage() {
  const [visible, setVisible] = useState(true);

  const alerts = [
    { icon: Info, title: "Info Alert", text: "This is an info alert — check it out!", cls: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
    { icon: CheckCircle2, title: "Success Alert", text: "Your changes have been saved successfully.", cls: "border-green-500/40 bg-green-500/10 text-green-400" },
    { icon: AlertTriangle, title: "Warning Alert", text: "Something needs your attention before continuing.", cls: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" },
    { icon: XCircle, title: "Error Alert", text: "An error occurred. Please try again.", cls: "border-red-500/40 bg-red-500/10 text-red-400" },
  ];

  return (
    <UiPage title="Alerts" description="Alert messages for user feedback and system states.">
      <Section title="Default Alerts">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.title} className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${alert.cls}`}>
              <alert.icon size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs opacity-80 mt-0.5">{alert.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dismissible Alert">
        {visible ? (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3">
            <div className="flex items-start gap-3">
              <Info size={18} className="mt-0.5 text-accent-light" />
              <div>
                <p className="text-sm font-medium text-text-primary">New update available</p>
                <p className="text-xs text-text-muted mt-0.5">Version 2.4.0 is ready to install.</p>
              </div>
            </div>
            <button onClick={() => setVisible(false)} className="text-text-muted hover:text-text-primary">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => setVisible(true)} className="text-sm text-accent hover:underline">
            Show alert again
          </button>
        )}
      </Section>

      <Section title="Outline Alerts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["border-blue-500 text-blue-400", "border-green-500 text-green-400", "border-yellow-500 text-yellow-400", "border-red-500 text-red-400"].map((cls) => (
            <div key={cls} className={`rounded-lg border bg-transparent px-4 py-3 text-sm ${cls}`}>
              Outline alert message
            </div>
          ))}
        </div>
      </Section>
    </UiPage>
  );
}
