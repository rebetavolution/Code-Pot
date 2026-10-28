import { Copy, Eye, EyeOff, KeyRound, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { PageShell } from "./PageShell";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  scope: string;
}

const initialKeys: ApiKey[] = [
  { id: "1", name: "Production App", key: "sk_live_4f7a9c2b8e1d3a6f5c0b", created: "Sep 12, 2025", lastUsed: "2 min ago", scope: "Full access" },
  { id: "2", name: "Staging Server", key: "sk_test_9b2e1f4a7c3d8e5b6a0f", created: "Aug 30, 2025", lastUsed: "3 hours ago", scope: "Read & write" },
  { id: "3", name: "Analytics Worker", key: "sk_live_1c4d7e2a9f5b8c3e0d6a", created: "Jul 18, 2025", lastUsed: "1 day ago", scope: "Read only" },
];

export function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState("Read only");
  const [copied, setCopied] = useState<string | null>(null);

  const createKey = () => {
    if (!name.trim()) return;
    const random = Array.from({ length: 20 }, () => "abcdef0123456789"[Math.floor(Math.random() * 16)]).join("");
    setKeys([
      ...keys,
      {
        id: Date.now().toString(),
        name: name.trim(),
        key: `sk_live_${random}`,
        created: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        lastUsed: "Never",
        scope,
      },
    ]);
    setName("");
    setScope("Read only");
    setShowModal(false);
  };

  const copy = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const mask = (key: string) => key.slice(0, 11) + "••••••••••••" + key.slice(-4);

  return (
    <PageShell title="API Keys" description="Manage keys used to authenticate API requests.">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-text-muted">
          {keys.length} active {keys.length === 1 ? "key" : "keys"}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm text-white hover:opacity-90"
        >
          <Plus size={15} /> Generate key
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-app-border bg-app-surface">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Key</th>
              <th className="px-4 py-3 font-medium">Scope</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Last used</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border">
            {keys.map((item) => (
              <tr key={item.id} className="hover:bg-app-hover/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-accent/15 text-accent-light flex items-center justify-center">
                      <KeyRound size={14} />
                    </span>
                    <span className="text-sm text-text-primary">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-text-secondary font-mono">
                      {visible[item.id] ? item.key : mask(item.key)}
                    </code>
                    <button
                      onClick={() => setVisible({ ...visible, [item.id]: !visible[item.id] })}
                      className="text-text-muted hover:text-text-primary"
                      title={visible[item.id] ? "Hide key" : "Show key"}
                    >
                      {visible[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => copy(item.key)} className="text-text-muted hover:text-text-primary" title="Copy key">
                      <Copy size={14} />
                    </button>
                    {copied === item.key && <span className="text-[10px] text-green-400">Copied!</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-app-border bg-app-bg px-2 py-0.5 text-[10px] text-text-secondary">
                    {item.scope}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-muted">{item.created}</td>
                <td className="px-4 py-3 text-xs text-text-muted">{item.lastUsed}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setKeys(keys.filter((k) => k.id !== item.id))}
                    className="text-text-muted hover:text-red-400"
                    title="Revoke key"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {keys.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-text-muted">
                  No API keys yet. Generate one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-xs text-text-secondary">
          Keep your keys secret. Never expose them in client-side code or public repositories.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-app-border bg-app-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-app-border px-5 py-3.5">
              <h3 className="text-sm font-semibold text-text-primary">Generate new API key</h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Key name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Production App"
                  className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Scope</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option>Read only</option>
                  <option>Read &amp; write</option>
                  <option>Full access</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-app-border px-5 py-3.5">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md border border-app-border px-4 py-2 text-sm text-text-secondary hover:bg-app-hover"
              >
                Cancel
              </button>
              <button
                onClick={createKey}
                disabled={!name.trim()}
                className="rounded-md bg-accent px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
