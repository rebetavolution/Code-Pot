import { Check } from "lucide-react";
import { useState } from "react";
import { PageShell } from "./PageShell";

const plans = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 190,
    description: "For individuals getting started.",
    features: ["1 project", "5 GB storage", "Basic analytics", "Email support", "Community access"],
  },
  {
    name: "Professional",
    monthly: 49,
    yearly: 490,
    description: "Best for growing teams.",
    features: ["10 projects", "100 GB storage", "Advanced analytics", "Priority support", "Team collaboration", "Custom domains"],
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: 99,
    yearly: 990,
    description: "For large organisations.",
    features: ["Unlimited projects", "1 TB storage", "Custom reporting", "24/7 support", "SSO & audit logs", "Dedicated manager"],
  },
];

export function PricingTablesPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <PageShell title="Pricing Tables" description="Plan comparison with monthly and yearly billing.">
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm ${!yearly ? "text-text-primary" : "text-text-muted"}`}>Monthly</span>
        <button
          onClick={() => setYearly(!yearly)}
          className={`relative h-6 w-11 rounded-full transition-colors ${yearly ? "bg-accent" : "bg-app-hover border border-app-border"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${yearly ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
        <span className={`text-sm ${yearly ? "text-text-primary" : "text-text-muted"}`}>
          Yearly <span className="text-[10px] text-green-400">save 20%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border bg-app-surface p-6 ${
              plan.highlight ? "border-accent/60 ring-1 ring-accent/20" : "border-app-border"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-white">
                Most popular
              </span>
            )}
            <h3 className="text-sm font-semibold text-text-primary">{plan.name}</h3>
            <p className="text-xs text-text-muted mt-1">{plan.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-text-primary">${yearly ? plan.yearly : plan.monthly}</span>
              <span className="text-xs text-text-muted">/ {yearly ? "year" : "month"}</span>
            </div>
            <button
              className={`mt-5 w-full rounded-lg px-4 py-2.5 text-sm transition-colors ${
                plan.highlight
                  ? "bg-accent text-white hover:opacity-90"
                  : "border border-app-border text-text-primary hover:bg-app-hover"
              }`}
            >
              Choose {plan.name}
            </button>
            <ul className="mt-6 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center shrink-0">
                    <Check size={10} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface p-6 text-center">
        <p className="text-sm text-text-primary">Need a custom plan?</p>
        <p className="text-xs text-text-muted mt-1">Talk to our team about volume pricing and custom requirements.</p>
        <button className="mt-4 rounded-lg border border-app-border px-4 py-2 text-sm text-text-primary hover:bg-app-hover">
          Contact sales
        </button>
      </div>
    </PageShell>
  );
}
