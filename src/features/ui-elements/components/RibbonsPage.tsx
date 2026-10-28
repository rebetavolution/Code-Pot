import { UiPage, Section } from "./UiPage";

export function RibbonsPage() {
  return (
    <UiPage title="Ribbons" description="Corner labels for highlighting card status.">
      <Section title="Ribbon Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "New", color: "bg-accent" },
            { label: "Sale", color: "bg-green-500" },
            { label: "Hot", color: "bg-red-500" },
          ].map((ribbon) => (
            <div key={ribbon.label} className="relative rounded-lg border border-app-border bg-app-bg p-5 pt-8 overflow-hidden">
              <div className={`absolute -right-8 top-2 rotate-45 ${ribbon.color} px-8 py-0.5 text-[10px] font-semibold text-white text-center`}>
                {ribbon.label}
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Product Card</h3>
              <p className="text-xs text-text-muted mt-1.5">
                A short description for this product card with a corner ribbon.
              </p>
              <button className="mt-4 rounded-md border border-app-border px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover">
                View product
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Top Ribbon">
        <div className="relative rounded-lg border border-app-border overflow-hidden max-w-sm">
          <div className="bg-accent px-4 py-1.5 text-center text-[11px] font-medium text-white">Limited time offer</div>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-text-primary">Premium Plan</h3>
            <p className="text-xs text-text-muted mt-1">Unlock all features for your entire team.</p>
            <p className="text-xl font-semibold text-text-primary mt-3">
              $49 <span className="text-xs text-text-muted font-normal">/ month</span>
            </p>
          </div>
        </div>
      </Section>

      <Section title="Bottom Ribbon">
        <div className="relative rounded-lg border border-app-border overflow-hidden max-w-sm">
          <div className="h-28 bg-gradient-to-br from-indigo-600/50 to-purple-700/40" />
          <div className="p-5">
            <h3 className="text-sm font-semibold text-text-primary">Design Assets</h3>
            <p className="text-xs text-text-muted mt-1">200+ ready-to-use components.</p>
          </div>
          <div className="bg-green-500 px-4 py-1.5 text-center text-[11px] font-medium text-white">Free download</div>
        </div>
      </Section>
    </UiPage>
  );
}
