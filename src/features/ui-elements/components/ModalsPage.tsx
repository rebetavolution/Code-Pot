import { X } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className={`w-full ${width} rounded-xl border border-app-border bg-app-surface shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-app-border px-5 py-3.5">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function ModalsPage() {
  const [basic, setBasic] = useState(false);
  const [form, setForm] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <UiPage title="Modals" description="Dialog windows for focused tasks and confirmations.">
      <Section title="Modal Variants">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setBasic(true)} className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white">
            Basic Modal
          </button>
          <button onClick={() => setForm(true)} className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary">
            Form Modal
          </button>
          <button onClick={() => setLarge(true)} className="rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary">
            Large Modal
          </button>
        </div>
      </Section>

      <Section title="Confirmation Dialog">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm text-text-primary">Delete this item permanently?</p>
          <p className="text-xs text-text-muted mt-1">This action cannot be undone.</p>
          <div className="flex items-center gap-2 mt-4">
            <button className="rounded-md bg-red-500 px-3.5 py-2 text-xs font-medium text-white hover:opacity-90">Delete</button>
            <button className="rounded-md border border-app-border px-3.5 py-2 text-xs text-text-secondary hover:bg-app-hover">Cancel</button>
          </div>
        </div>
      </Section>

      <Modal open={basic} onClose={() => setBasic(false)} title="Basic Modal">
        <p className="text-sm text-text-secondary">
          This is a basic modal dialog. Use it to display content that requires the user's attention.
        </p>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={() => setBasic(false)} className="rounded-md border border-app-border px-4 py-2 text-sm text-text-secondary hover:bg-app-hover">
            Close
          </button>
        </div>
      </Modal>

      <Modal open={form} onClose={() => setForm(false)} title="Create New Item">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
            <input
              className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Description</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={() => setForm(false)} className="rounded-md border border-app-border px-4 py-2 text-sm text-text-secondary hover:bg-app-hover">
            Cancel
          </button>
          <button onClick={() => setForm(false)} className="rounded-md bg-accent px-4 py-2 text-sm text-white">
            Save
          </button>
        </div>
      </Modal>

      <Modal open={large} onClose={() => setLarge(false)} title="Large Modal" width="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 rounded-lg border border-app-border bg-app-bg flex items-center justify-center text-xs text-text-muted">
              Content block {n}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={() => setLarge(false)} className="rounded-md bg-accent px-4 py-2 text-sm text-white">
            Done
          </button>
        </div>
      </Modal>
    </UiPage>
  );
}
