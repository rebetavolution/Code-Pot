import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { UiPage, Section } from "./UiPage";

export function CardsPage() {
  return (
    <UiPage title="Cards" description="Content containers for grouped information.">
      <Section title="Basic Card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-lg border border-app-border bg-app-bg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-text-muted">Card Title {n}</p>
                  <h3 className="text-xl font-semibold text-text-primary mt-1">24,120</h3>
                </div>
                <span className="rounded-md bg-green-500/15 px-2 py-0.5 text-xs text-green-400">+12%</span>
              </div>
              <p className="text-xs text-text-muted mt-3">Compared to last month performance.</p>
              <button className="mt-4 inline-flex items-center gap-1 text-xs text-accent-light hover:underline">
                View details <ArrowUpRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Card With Image">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["bg-gradient-to-br from-accent/40 to-purple-500/30", "bg-gradient-to-br from-emerald-500/40 to-cyan-500/30"].map((grad, i) => (
            <div key={i} className="rounded-lg border border-app-border overflow-hidden bg-app-bg">
              <div className={`h-40 ${grad} flex items-center justify-center text-white/70 text-sm`}>
                Image preview
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-text-primary">Product design update</h3>
                <p className="text-xs text-text-muted mt-1">
                  A short description of the card content and what the user can expect to find.
                </p>
                <button className="mt-4 rounded-md border border-app-border px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Card With Header Action">
        <div className="rounded-lg border border-app-border bg-app-bg">
          <div className="flex items-center justify-between border-b border-app-border px-5 py-3">
            <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
            <button className="text-text-muted hover:text-text-primary">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="p-5 space-y-3">
            {["Deployment completed", "New member joined", "Billing updated"].map((item, i) => (
              <div key={item} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{item}</span>
                <span className="text-xs text-text-muted">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </UiPage>
  );
}
