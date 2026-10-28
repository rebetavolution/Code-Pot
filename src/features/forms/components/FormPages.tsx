import { Upload } from "lucide-react";
import { useState } from "react";
import { DemoPage, DemoSection, fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";

export function FormElementsPage() {
  const [toggle, setToggle] = useState(true);
  const [notify, setNotify] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [role, setRole] = useState("developer");

  return (
    <DemoPage title="Form Elements" description="Input controls used across the application.">
      <DemoSection title="Text Inputs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full name</label>
            <input className={fieldClass} placeholder="Musharof Chowdhury" />
          </div>
          <div>
            <label className={labelClass}>Email address</label>
            <input type="email" className={fieldClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input type="password" className={fieldClass} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>Disabled</label>
            <input disabled className={`${fieldClass} opacity-60 cursor-not-allowed`} value="Read only value" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Select, Date & File">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Country</label>
            <select className={fieldClass}>
              <option>Malaysia</option>
              <option>Singapore</option>
              <option>Indonesia</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Time</label>
            <input type="time" className={fieldClass} />
          </div>
          <div className="md:col-span-3">
            <label className={labelClass}>Attachment</label>
            <div className="flex items-center gap-3 rounded-lg border border-dashed border-app-border bg-app-bg px-4 py-4">
              <span className="w-9 h-9 rounded-lg bg-app-hover text-text-muted flex items-center justify-center">
                <Upload size={16} />
              </span>
              <div>
                <p className="text-sm text-text-primary">Click to upload or drag and drop</p>
                <p className="text-xs text-text-muted">PNG, JPG or PDF up to 10 MB</p>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Textarea">
        <label className={labelClass}>Description</label>
        <textarea rows={4} className={`${fieldClass} resize-none`} placeholder="Write a short description..." />
        <p className="text-xs text-text-muted mt-1.5">Maximum 500 characters.</p>
      </DemoSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoSection title="Checkboxes">
          <div className="space-y-3">
            {["Email notifications", "SMS alerts", "Weekly digest"].map((label, i) => (
              <label key={label} className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 accent-[var(--color-accent)]" />
                {label}
              </label>
            ))}
            <label className="flex items-center gap-2.5 text-sm text-text-muted cursor-not-allowed">
              <input type="checkbox" disabled className="w-4 h-4 accent-[var(--color-accent)]" />
              Disabled option
            </label>
          </div>
        </DemoSection>

        <DemoSection title="Radio Buttons">
          <div className="space-y-3">
            {[
              { id: "starter", label: "Starter plan" },
              { id: "pro", label: "Professional plan" },
              { id: "enterprise", label: "Enterprise plan" },
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  checked={plan === option.id}
                  onChange={() => setPlan(option.id)}
                  className="w-4 h-4 accent-[var(--color-accent)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </DemoSection>
      </div>

      <DemoSection title="Toggle Switches">
        <div className="space-y-4">
          {[
            { label: "Two-factor authentication", desc: "Require a code when signing in.", value: toggle, set: setToggle },
            { label: "Product updates", desc: "Receive news about new features.", value: notify, set: setNotify },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-lg border border-app-border bg-app-bg px-4 py-3">
              <div>
                <p className="text-sm text-text-primary">{item.label}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  item.value ? "bg-accent" : "bg-app-hover border border-app-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    item.value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Select Role">
        <label className={labelClass}>Role</label>
        <div className="flex flex-wrap gap-2">
          {["developer", "designer", "manager", "support"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-lg px-3.5 py-2 text-xs capitalize transition-colors ${
                role === r
                  ? "bg-accent text-white"
                  : "border border-app-border bg-app-bg text-text-secondary hover:bg-app-hover"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </DemoSection>
    </DemoPage>
  );
}

export function FormLayoutPage() {
  return (
    <DemoPage title="Form Layout" description="Multi-column form layouts with grouped sections.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DemoSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First name</label>
                <input className={fieldClass} placeholder="Musharof" />
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input className={fieldClass} placeholder="Chowdhury" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" className={fieldClass} placeholder="you@example.com" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input className={fieldClass} placeholder="+60 12 345 6789" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Bio</label>
                <textarea rows={3} className={`${fieldClass} resize-none`} placeholder="Tell us about yourself" />
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Street address</label>
                <input className={fieldClass} placeholder="123 Jalan Ampang" />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input className={fieldClass} placeholder="Kuala Lumpur" />
              </div>
              <div>
                <label className={labelClass}>Postcode</label>
                <input className={fieldClass} placeholder="50450" />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <select className={fieldClass}>
                  <option>Selangor</option>
                  <option>Penang</option>
                  <option>Johor</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <select className={fieldClass}>
                  <option>Malaysia</option>
                  <option>Singapore</option>
                  <option>Indonesia</option>
                </select>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Preferences">
            <div className="space-y-3">
              {["Product updates", "Security alerts", "Weekly summary"].map((label, i) => (
                <label key={label} className="flex items-center justify-between gap-4 rounded-lg border border-app-border bg-app-bg px-4 py-3 text-sm text-text-secondary">
                  {label}
                  <input type="checkbox" defaultChecked={i !== 2} className="w-4 h-4 accent-[var(--color-accent)]" />
                </label>
              ))}
            </div>
          </DemoSection>

          <div className="flex items-center justify-end gap-3">
            <button className="rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-secondary hover:bg-app-hover">
              Cancel
            </button>
            <button className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">Save changes</button>
          </div>
        </div>

        <div className="space-y-6">
          <DemoSection title="Summary">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-medium">
                MC
              </div>
              <div>
                <p className="text-sm text-text-primary">Musharof Chowdhury</p>
                <p className="text-xs text-text-muted">Team Manager</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Profile completion</span>
                <span className="text-text-primary">82%</span>
              </div>
              <div className="h-2 rounded-full bg-app-hover overflow-hidden">
                <div className="h-full w-[82%] rounded-full bg-accent" />
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Visibility">
            <div className="space-y-3 text-sm text-text-secondary">
              <label className="flex items-center gap-2.5">
                <input type="radio" name="visibility" defaultChecked className="accent-[var(--color-accent)]" />
                Public profile
              </label>
              <label className="flex items-center gap-2.5">
                <input type="radio" name="visibility" className="accent-[var(--color-accent)]" />
                Team only
              </label>
              <label className="flex items-center gap-2.5">
                <input type="radio" name="visibility" className="accent-[var(--color-accent)]" />
                Private
              </label>
            </div>
          </DemoSection>

          <DemoSection title="Inline Form">
            <label className={labelClass}>Invite by email</label>
            <div className="flex gap-2">
              <input className={fieldClass} placeholder="name@company.com" />
              <button className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm text-white hover:opacity-90">Invite</button>
            </div>
            <p className="text-[11px] text-text-muted mt-2">They will receive an email invitation.</p>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}
