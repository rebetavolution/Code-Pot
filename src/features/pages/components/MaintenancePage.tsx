import { Wrench } from "lucide-react";

export function MaintenancePage() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light">
          <Wrench size={26} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-text-primary">Under maintenance</h1>
        <p className="mt-2 text-sm text-text-muted">
          We're making some improvements to the platform. We'll be back shortly — thanks for your patience.
        </p>

        <div className="mt-6 rounded-lg border border-app-border bg-app-surface p-4 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Maintenance progress</span>
            <span className="text-text-muted">72%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-app-hover overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-accent" />
          </div>
          <p className="mt-3 text-[11px] text-text-muted">Estimated completion: 02:30 UTC</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">Refresh</button>
          <button className="rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover">
            Status page
          </button>
        </div>
      </div>
    </div>
  );
}
