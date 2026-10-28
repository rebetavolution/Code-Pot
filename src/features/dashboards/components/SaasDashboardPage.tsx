import { ArrowRight, CircleDollarSign, CreditCard, TrendingDown, Users } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Avatar, BarChart, monthsShort, Panel, ProgressRow, SimpleTable, StatTile, StatusBadge } from "./primitives";

const invoices = [
  ["INV-2091", "Oct 28, 2026", "Acme Corp", "$1,480.00", "Paid"],
  ["INV-2090", "Oct 27, 2026", "Northwind", "$240.00", "Paid"],
  ["INV-2089", "Oct 26, 2026", "Globex", "$49.00", "Pending"],
  ["INV-2088", "Oct 25, 2026", "Initech", "$240.00", "Past due"],
  ["INV-2087", "Oct 24, 2026", "Umbrella Co.", "$980.00", "Paid"],
];

const activities = [
  { initials: "FG", tone: "from-violet-500 to-indigo-600", name: "Francisco Grbbs", action: "upgraded to Enterprise", time: "4 min ago" },
  { initials: "CH", tone: "from-orange-500 to-rose-600", name: "Courtney Henry", action: "invited 3 teammates", time: "22 min ago" },
  { initials: "BC", tone: "from-sky-500 to-blue-600", name: "Bessie Cooper", action: "started a free trial", time: "1 hr ago" },
  { initials: "TW", tone: "from-emerald-500 to-teal-600", name: "Theresa Webb", action: "renewed annual plan", time: "3 hr ago" },
];

export function SaasDashboardPage() {
  const [period, setPeriod] = useState<"Monthly" | "Quarterly">("Monthly");
  const growth = period === "Monthly" ? [28, 34, 31, 42, 38, 48, 44, 56, 52, 61, 58, 68] : [42, 48, 55, 62];
  const growthLabels = period === "Monthly" ? monthsShort : ["Q1", "Q2", "Q3", "Q4"];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="SaaS Dashboard" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Overview</h2>
          <p className="text-xs text-text-muted">Subscription health for October 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-app-border px-3 py-2 text-xs text-text-secondary hover:bg-app-hover">
          <CreditCard size={14} /> Manage billing
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <StatTile
          label="Monthly Recurring Revenue"
          value="$200,458.70"
          delta="+6.4%"
          up
          caption="vs last month"
          icon={<CircleDollarSign size={20} />}
          tone="bg-emerald-500/15 text-emerald-400"
        />
        <StatTile
          label="Active Subscriptions"
          value="9,528"
          delta="+3.2%"
          up
          caption="1,842 accounts"
          icon={<Users size={20} />}
          tone="bg-sky-500/15 text-sky-400"
        />
        <StatTile
          label="Average Revenue Per Account"
          value="$849.54"
          delta="+2.1%"
          up
          caption="vs last month"
          icon={<ArrowRight size={20} />}
          tone="bg-violet-500/15 text-violet-400"
        />
        <StatTile
          label="Churn Rate"
          value="4.26%"
          delta="+0.3%"
          up={false}
          caption="vs last month"
          icon={<TrendingDown size={20} />}
          tone="bg-rose-500/15 text-rose-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="User Growth"
          subtitle="Net new subscribers per period"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
              {(["Monthly", "Quarterly"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setPeriod(option)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    period === option ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          }
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-text-primary">3,768</p>
              <p className="text-[11px] text-text-muted">New subscribers this year</p>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <p className="text-text-muted">Activation</p>
                <p className="font-semibold text-text-primary">62.4%</p>
              </div>
              <div>
                <p className="text-text-muted">Net retention</p>
                <p className="font-semibold text-text-primary">108.2%</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <BarChart values={growth} labels={growthLabels} height={240} />
          </div>
        </Panel>

        <Panel title="Conversion Funnel" subtitle="Trial to paid conversion" bodyClassName="p-5 sm:p-6">
          <div className="space-y-3">
            {[
              { label: "Visitors", value: "8,490", pct: 100, tone: "bg-accent" },
              { label: "Sign-ups", value: "2,950", pct: 72, tone: "bg-sky-400" },
              { label: "Activated", value: "950", pct: 46, tone: "bg-violet-400" },
              { label: "Paid", value: "572", pct: 28, tone: "bg-emerald-400" },
            ].map((step) => (
              <div key={step.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{step.label}</span>
                  <span className="font-medium text-text-primary">{step.value}</span>
                </div>
                <div className="h-7 overflow-hidden rounded-lg bg-app-hover">
                  <div className={`flex h-full items-center justify-end rounded-lg px-2 ${step.tone}`} style={{ width: `${step.pct}%` }}>
                    <span className="text-[9px] font-semibold text-white">{step.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
            Paid conversion improved 1.4 points after the onboarding checklist shipped.
          </p>
        </Panel>
      </div>

      <Panel
        title="Recent Invoices"
        subtitle="Latest billing activity"
        bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
        action={<button className="text-xs text-accent-light hover:underline">All invoices</button>}
      >
        <SimpleTable
          head={["Serial No:", "Close Date", "User", "Amount", "Status"]}
          rows={invoices.map((invoice) => [
            <span className="font-medium text-text-primary">{invoice[0]}</span>,
            invoice[1],
            invoice[2],
            invoice[3],
            <StatusBadge status={invoice[4]} />,
          ])}
        />
      </Panel>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Product Performance" subtitle="Usage and revenue by plan" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Starter", accounts: "790", revenue: "$2,950" },
              { label: "Growth", accounts: "572", revenue: "$8,490" },
              { label: "Professional", accounts: "950", revenue: "$59,410" },
              { label: "Enterprise", accounts: "8,490", revenue: "$129,608" },
            ].map((plan) => (
              <div key={plan.label} className="rounded-xl border border-app-border bg-app-bg p-3">
                <p className="text-[10px] text-text-muted">{plan.label}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{plan.revenue}</p>
                <p className="text-[10px] text-text-muted">{plan.accounts} accounts</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            <ProgressRow label="Seats used" value="8,490 / 12,000" pct={71} />
            <ProgressRow label="Storage used" value="5.9K GB" pct={59} color="oklch(0.72 0.14 200)" />
            <ProgressRow label="API quota" value="2.1M / 4M calls" pct={52} color="oklch(0.75 0.14 90)" />
          </div>
        </Panel>

        <Panel
          title="Activities"
          subtitle="Latest customer events"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">View all</button>}
        >
          <div className="space-y-3">
            {activities.map((item) => (
              <div key={item.name} className="flex items-start gap-3">
                <Avatar label={item.initials} tone={item.tone} size="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed text-text-secondary">
                    <span className="font-medium text-text-primary">{item.name}</span> {item.action}
                  </p>
                  <p className="text-[10px] text-text-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
