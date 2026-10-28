import { Bell, Lock, Palette, User } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../shared/components/Card";
import { fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { useTheme } from "../../../renderer/contexts/ThemeContext";

type TabId = "profile" | "account" | "appearance" | "notifications" | "security";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

function Toggle({ value, onChange, label, description }: { value: boolean; onChange: (next: boolean) => void; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-app-border bg-app-bg px-4 py-3">
      <div>
        <p className="text-sm text-text-primary">{label}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          value ? "bg-accent" : "border border-app-border bg-app-hover"
        }`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsScreen() {
  const [tab, setTab] = useState<TabId>("profile");
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [digest, setDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Settings" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
        <Card className="p-2">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-accent/10 text-accent-light"
                      : "text-text-secondary hover:bg-app-hover hover:text-text-primary"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </Card>

        <Card className="p-6">
          {tab === "profile" && (
            <div>
              <h2 className="text-base font-semibold text-text-primary">Personal information</h2>
              <p className="mt-0.5 text-xs text-text-muted">Update your photo and personal details.</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-xl font-semibold text-white">
                  M
                </div>
                <div>
                  <button className="rounded-lg border border-app-border px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover">
                    Change photo
                  </button>
                  <p className="mt-1.5 text-[11px] text-text-muted">JPG or PNG, max 2 MB.</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>First name</label>
                  <input className={fieldClass} defaultValue="Musharof" />
                </div>
                <div>
                  <label className={labelClass}>Last name</label>
                  <input className={fieldClass} defaultValue="Chowdhury" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Email address</label>
                  <input type="email" className={fieldClass} defaultValue="randomuser@pimjo.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={fieldClass} defaultValue="+60 12 345 6789" />
                </div>
                <div>
                  <label className={labelClass}>Job title</label>
                  <input className={fieldClass} defaultValue="Team Manager" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Bio</label>
                  <textarea rows={3} className={`${fieldClass} resize-none`} defaultValue="Product-minded team lead working on internal tools and design systems." />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 border-t border-app-border pt-4">
                <button className="rounded-lg border border-app-border px-4 py-2 text-sm text-text-secondary hover:bg-app-hover">
                  Cancel
                </button>
                <button onClick={save} className="rounded-lg bg-accent px-4 py-2 text-sm text-white hover:opacity-90">
                  {saved ? "Saved" : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {tab === "account" && (
            <div>
              <h2 className="text-base font-semibold text-text-primary">Account</h2>
              <p className="mt-0.5 text-xs text-text-muted">Manage how your account is identified.</p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Username</label>
                  <input className={fieldClass} defaultValue="musharof" />
                </div>
                <div>
                  <label className={labelClass}>Language</label>
                  <select className={fieldClass}>
                    <option>English</option>
                    <option>Bahasa Melayu</option>
                    <option>Indonesian</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Timezone</label>
                  <select className={fieldClass}>
                    <option>(GMT+08:00) Kuala Lumpur</option>
                    <option>(GMT+07:00) Jakarta</option>
                    <option>(GMT+00:00) London</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Date format</label>
                  <select className={fieldClass}>
                    <option>DD MMM, YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-text-primary">Danger zone</h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
                  <div>
                    <p className="text-sm text-text-primary">Delete account</p>
                    <p className="text-xs text-text-muted">This action is permanent and cannot be undone.</p>
                  </div>
                  <button className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div>
              <h2 className="text-base font-semibold text-text-primary">Appearance</h2>
              <p className="mt-0.5 text-xs text-text-muted">Choose how the app looks on this device.</p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(["light", "dark"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setTheme(option)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      theme === option
                        ? "border-accent/60 bg-accent/5 ring-1 ring-accent/20"
                        : "border-app-border bg-app-bg hover:bg-app-hover"
                    }`}
                  >
                    <div
                      className={`h-20 rounded-md border border-app-border ${
                        option === "light" ? "bg-white" : "bg-[#16181d]"
                      }`}
                    >
                      <div className={`m-3 h-2 w-10 rounded-full ${option === "light" ? "bg-gray-300" : "bg-gray-600"}`} />
                      <div className={`mx-3 h-1.5 w-16 rounded-full ${option === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
                      <div className={`mx-3 mt-1.5 h-1.5 w-12 rounded-full ${option === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
                    </div>
                    <p className="mt-3 text-sm capitalize text-text-primary">{option}</p>
                    <p className="text-[11px] text-text-muted">
                      {option === "light" ? "Bright surfaces, dark text." : "Dim surfaces, light text."}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div>
              <h2 className="text-base font-semibold text-text-primary">Notifications</h2>
              <p className="mt-0.5 text-xs text-text-muted">Decide what you want to be notified about.</p>
              <div className="mt-5 space-y-3">
                <Toggle value={email} onChange={setEmail} label="Email notifications" description="Order updates, invoices and mentions." />
                <Toggle value={push} onChange={setPush} label="Push notifications" description="Real-time alerts on this device." />
                <Toggle value={digest} onChange={setDigest} label="Weekly digest" description="A summary of activity every Monday." />
              </div>
            </div>
          )}

          {tab === "security" && (
            <div>
              <h2 className="text-base font-semibold text-text-primary">Security</h2>
              <p className="mt-0.5 text-xs text-text-muted">Keep your account protected.</p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Current password</label>
                  <input type="password" className={fieldClass} placeholder="••••••••" />
                </div>
                <div>
                  <label className={labelClass}>New password</label>
                  <input type="password" className={fieldClass} placeholder="At least 8 characters" />
                </div>
                <div>
                  <label className={labelClass}>Confirm new password</label>
                  <input type="password" className={fieldClass} placeholder="Repeat password" />
                </div>
              </div>
              <div className="mt-5">
                <Toggle
                  value={twoFactor}
                  onChange={setTwoFactor}
                  label="Two-factor authentication"
                  description="Require a verification code when signing in."
                />
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-medium text-text-primary">Active sessions</h3>
                <div className="mt-2 space-y-2">
                  {[
                    { device: "Chrome · Windows", location: "Kuala Lumpur, MY", current: true },
                    { device: "Safari · iPhone", location: "Kuala Lumpur, MY", current: false },
                  ].map((session) => (
                    <div key={session.device} className="flex items-center justify-between rounded-lg border border-app-border bg-app-bg px-4 py-2.5">
                      <div>
                        <p className="text-sm text-text-primary">{session.device}</p>
                        <p className="text-[11px] text-text-muted">{session.location}</p>
                      </div>
                      {session.current ? (
                        <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">This device</span>
                      ) : (
                        <button className="text-xs text-red-400 hover:underline">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-end border-t border-app-border pt-4">
                <button onClick={save} className="rounded-lg bg-accent px-4 py-2 text-sm text-white hover:opacity-90">
                  {saved ? "Saved" : "Update password"}
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
