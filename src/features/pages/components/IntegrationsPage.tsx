import { Check, Link2, Search, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "./PageShell";

const integrations = [
  { name: "Slack", category: "Communication", description: "Send alerts and updates to your channels.", color: "from-purple-500 to-pink-500", letter: "S" },
  { name: "GitHub", category: "Developer", description: "Link commits and pull requests to tasks.", color: "from-gray-600 to-gray-800", letter: "G" },
  { name: "Google Drive", category: "Storage", description: "Attach files from your Drive account.", color: "from-yellow-500 to-green-500", letter: "D" },
  { name: "Stripe", category: "Payments", description: "Sync invoices and subscriptions.", color: "from-indigo-500 to-violet-600", letter: "S" },
  { name: "Figma", category: "Design", description: "Embed live design files in projects.", color: "from-pink-500 to-orange-500", letter: "F" },
  { name: "Notion", category: "Productivity", description: "Import pages and databases.", color: "from-slate-500 to-slate-700", letter: "N" },
  { name: "Zoom", category: "Communication", description: "Create meetings from your calendar.", color: "from-blue-500 to-sky-500", letter: "Z" },
  { name: "Linear", category: "Developer", description: "Two-way sync with issues and cycles.", color: "from-violet-500 to-indigo-600", letter: "L" },
];

export function IntegrationsPage() {
  const [connected, setConnected] = useState<string[]>(["Slack", "GitHub"]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(integrations.map((i) => i.category)))];

  const filtered = useMemo(
    () =>
      integrations.filter(
        (i) =>
          (category === "All" || i.category === category) &&
          i.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  const toggle = (name: string) =>
    setConnected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <PageShell title="Integrations" description="Connect your favourite tools and services.">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations"
            className="w-64 rounded-lg border border-app-border bg-app-surface pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                category === cat
                  ? "bg-accent text-white"
                  : "border border-app-border bg-app-surface text-text-secondary hover:bg-app-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isConnected = connected.includes(item.name);
          return (
            <div key={item.name} className="rounded-lg border border-app-border bg-app-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-sm font-semibold`}>
                    {item.letter}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-muted">{item.category}</p>
                  </div>
                </div>
                {isConnected && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">
                    <Check size={10} /> Connected
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-text-secondary leading-relaxed">{item.description}</p>
              <button
                onClick={() => toggle(item.name)}
                className={`mt-4 w-full rounded-lg px-3 py-2 text-xs transition-colors ${
                  isConnected
                    ? "border border-app-border text-text-secondary hover:bg-app-hover"
                    : "bg-accent text-white hover:opacity-90"
                }`}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-app-border bg-app-surface p-10 text-center">
          <p className="text-sm text-text-secondary">No integrations found.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-app-border bg-app-surface p-5">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-app-hover text-text-secondary flex items-center justify-center">
            <Settings2 size={16} />
          </span>
          <div>
            <p className="text-sm text-text-primary">Build your own integration</p>
            <p className="text-xs text-text-muted">Use our REST API and webhooks to connect anything.</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-3.5 py-2 text-xs text-text-primary hover:bg-app-hover">
          <Link2 size={14} /> View API docs
        </button>
      </div>
    </PageShell>
  );
}
