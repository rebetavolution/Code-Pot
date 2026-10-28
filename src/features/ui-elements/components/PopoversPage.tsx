import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function PopoversPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <UiPage title="Popovers" description="Floating panels anchored to an element.">
      <Section title="Basic Popover">
        <div className="relative inline-block">
          <button
            onClick={() => setOpen(open === "top" ? null : "top")}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white"
          >
            Click to open popover
          </button>
          {open === "top" && (
            <div className="absolute left-0 mt-2 w-64 rounded-lg border border-app-border bg-app-surface p-4 shadow-xl z-20">
              <h4 className="text-sm font-semibold text-text-primary">Popover title</h4>
              <p className="text-xs text-text-muted mt-1.5">
                And here's some amazing content. It's very engaging. Right?
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section title="Popover With Placement">
        <div className="flex flex-wrap items-center gap-3">
          {["Top", "Bottom", "Left", "Right"].map((placement) => (
            <div key={placement} className="relative">
              <button
                onClick={() => setOpen(open === placement ? null : placement)}
                className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover"
              >
                {placement}
              </button>
              {open === placement && (
                <div className="absolute left-0 mt-2 w-52 rounded-lg border border-app-border bg-app-surface p-3 shadow-xl z-20">
                  <p className="text-xs text-text-secondary">
                    This popover is anchored to the <span className="text-accent-light">{placement.toLowerCase()}</span> trigger.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rich Popover">
        <div className="relative inline-block">
          <button
            onClick={() => setOpen(open === "rich" ? null : "rich")}
            className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover"
          >
            Account details
          </button>
          {open === "rich" && (
            <div className="absolute left-0 mt-2 w-64 rounded-lg border border-app-border bg-app-surface shadow-xl z-20">
              <div className="flex items-center gap-3 border-b border-app-border p-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-xs font-medium">
                  MC
                </div>
                <div>
                  <p className="text-sm text-text-primary">Musharof Chowdhury</p>
                  <p className="text-xs text-text-muted">Team Manager</p>
                </div>
              </div>
              <div className="p-4 text-xs text-text-secondary space-y-1.5">
                <p>Email: randomuser@pimjo.com</p>
                <p>Location: Arizona, US</p>
                <p>Member since 2021</p>
              </div>
            </div>
          )}
        </div>
      </Section>
    </UiPage>
  );
}
