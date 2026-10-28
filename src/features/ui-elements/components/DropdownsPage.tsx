import { ChevronDown, Copy, Edit, LogOut, Settings, Trash2, User } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function DropdownsPage() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <UiPage title="Dropdowns" description="Contextual menus for actions and navigation.">
      <Section title="Basic Dropdown">
        <div className="relative inline-block">
          <button
            onClick={() => toggle("basic")}
            className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover"
          >
            Dropdown <ChevronDown size={16} className={`transition-transform ${open === "basic" ? "rotate-180" : ""}`} />
          </button>
          {open === "basic" && (
            <div className="absolute left-0 mt-2 w-48 rounded-lg border border-app-border bg-app-surface shadow-lg py-1 z-20">
              {["Option One", "Option Two", "Option Three"].map((item) => (
                <button key={item} className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section title="Dropdown With Icons">
        <div className="relative inline-block">
          <button
            onClick={() => toggle("icons")}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm text-white"
          >
            Actions <ChevronDown size={16} className={`transition-transform ${open === "icons" ? "rotate-180" : ""}`} />
          </button>
          {open === "icons" && (
            <div className="absolute left-0 mt-2 w-52 rounded-lg border border-app-border bg-app-surface shadow-lg py-1 z-20">
              {[
                { icon: User, label: "View Profile" },
                { icon: Edit, label: "Edit Details" },
                { icon: Copy, label: "Duplicate" },
                { icon: Settings, label: "Settings" },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                  <item.icon size={15} /> {item.label}
                </button>
              ))}
              <div className="my-1 border-t border-app-border" />
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10">
                <Trash2 size={15} /> Delete
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section title="Dropdown Alignment">
        <div className="flex items-center gap-3">
          <div className="relative inline-block">
            <button
              onClick={() => toggle("left")}
              className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover"
            >
              Align Left
            </button>
            {open === "left" && (
              <div className="absolute left-0 mt-2 w-40 rounded-lg border border-app-border bg-app-surface shadow-lg py-1 z-20">
                <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">Item A</button>
                <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">Item B</button>
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <button
              onClick={() => toggle("right")}
              className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover"
            >
              Align Right
            </button>
            {open === "right" && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-app-border bg-app-surface shadow-lg py-1 z-20">
                <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">Item A</button>
                <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">Item B</button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title="User Menu">
        <div className="relative inline-block">
          <button
            onClick={() => toggle("user")}
            className="flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-2 py-1.5 hover:bg-app-hover"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-xs font-medium">
              MC
            </div>
            <span className="text-sm text-text-primary">Musharof</span>
            <ChevronDown size={15} className="text-text-muted" />
          </button>
          {open === "user" && (
            <div className="absolute left-0 mt-2 w-52 rounded-lg border border-app-border bg-app-surface shadow-lg py-1 z-20">
              <div className="px-4 py-2 border-b border-app-border">
                <p className="text-sm text-text-primary">Musharof Chowdhury</p>
                <p className="text-xs text-text-muted">randomuser@pimjo.com</p>
              </div>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">
                <User size={15} /> Profile
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover">
                <Settings size={15} /> Settings
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10">
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </Section>
    </UiPage>
  );
}
