import { CalendarClock, CircleDollarSign, Users } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, BarChart, Donut, Legend, monthsShort, Panel, ProgressRow, SimpleTable, Sparkline, StatusBadge } from "./primitives";

const stats = [
  {
    label: "Total Revenue",
    value: "$120,369",
    delta: "+18.2%",
    caption: "vs last quarter",
    icon: <CircleDollarSign size={20} />,
    tone: "bg-emerald-500/15 text-emerald-400",
    series: [22, 28, 25, 34, 31, 42, 38, 46, 44, 52, 49, 58],
  },
  {
    label: "New Customers",
    value: "874",
    delta: "+9.4%",
    caption: "vs last quarter",
    icon: <Users size={20} />,
    tone: "bg-sky-500/15 text-sky-400",
    series: [12, 18, 15, 22, 19, 26, 24, 31, 28, 34, 32, 41],
  },
  {
    label: "Deals In Pipeline",
    value: "$234,210",
    delta: "+4.6%",
    caption: "vs last quarter",
    icon: <CalendarClock size={20} />,
    tone: "bg-violet-500/15 text-violet-400",
    series: [48, 44, 52, 49, 58, 55, 62, 59, 68, 64, 72, 69],
  },
];

const schedule = [
  { time: "09:00", title: "Pipeline review — APAC", person: "Alena Franci", tone: "from-orange-500 to-rose-600" },
  { time: "11:30", title: "Demo with Nexus Labs", person: "Musharof Chowdhury", tone: "from-violet-500 to-indigo-600" },
  { time: "14:00", title: "Contract call — Brightline", person: "Jocelyn Kenter", tone: "from-sky-500 to-blue-600" },
  { time: "16:30", title: "Q4 forecast sync", person: "Brandon Philips", tone: "from-emerald-500 to-teal-600" },
];

const deals = [
  ["Nexus Labs", "Acme Industries", "$84,000", "Negotiation", "Today"],
  ["Brightline", "Orbit Media", "$62,500", "Proposal", "Tomorrow"],
  ["Vertex Group", "Initech", "$48,200", "Won", "Oct 26"],
  ["Orbit Media", "Globex", "$31,900", "Qualified", "Oct 24"],
  ["Northwind", "Umbrella Co.", "$27,400", "Won", "Oct 22"],
];

export function CrmDashboardPage() {
  const [metric, setMetric] = useState<"Revenue" | "Deals" | "Customers">("Revenue");
  const bars: Record<typeof metric, number[]> = {
    Revenue: [42, 55, 48, 63, 58, 72, 68, 81, 76, 92, 88, 104],
    Deals: [12, 18, 15, 22, 19, 26, 24, 31, 28, 34, 32, 41],
    Customers: [28, 34, 30, 42, 38, 49, 45, 56, 52, 61, 58, 68],
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="CRM Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-app-border bg-app-surface p-5">
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}>{stat.icon}</span>
              <Sparkline values={stat.series} up />
            </div>
            <p className="mt-4 text-xs text-text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="mt-1 text-[11px]">
              <span className="font-medium text-emerald-400">{stat.delta}</span>{" "}
              <span className="text-text-muted">{stat.caption}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Statistics"
          subtitle="Closed-won performance over the last 12 months"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
              {(["Revenue", "Deals", "Customers"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setMetric(option)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    metric === option ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          }
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-text-primary">$212,142.12</p>
              <p className="text-[11px] text-text-muted">Closed-won this year</p>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <p className="text-text-muted">Open pipeline</p>
                <p className="mt-0.5 font-semibold text-text-primary">$30,321.23</p>
              </div>
              <div>
                <p className="text-text-muted">Win rate</p>
                <p className="mt-0.5 font-semibold text-text-primary">38.2%</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <BarChart values={bars[metric]} labels={monthsShort} height={250} />
          </div>
        </Panel>

        <Panel title="Sales Category" subtitle="Revenue split by deal type" bodyClassName="p-5 sm:p-6">
          <div className="flex flex-col items-center gap-5">
            <Donut
              size={180}
              centerValue="$1.24M"
              centerLabel="pipeline"
              segments={[
                { label: "New business", value: 48, color: "var(--color-accent)" },
                { label: "Expansion", value: 32, color: "oklch(0.72 0.14 200)" },
                { label: "Renewal", value: 20, color: "oklch(0.75 0.14 90)" },
              ]}
            />
            <div className="w-full">
              <Legend
                items={[
                  { label: "New business", value: "$595K", color: "var(--color-accent)" },
                  { label: "Expansion", value: "$396K", color: "oklch(0.72 0.14 200)" },
                  { label: "Renewal", value: "$248K", color: "oklch(0.75 0.14 90)" },
                ]}
              />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          title="Upcoming Schedule"
          subtitle="Meetings and follow-ups for today"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">Open calendar</button>}
        >
          <div className="space-y-3">
            {schedule.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-xl border border-app-border bg-app-bg p-3">
                <span className="w-12 shrink-0 text-center text-[11px] font-medium text-text-muted">{item.time}</span>
                <span className="h-8 w-px bg-app-border" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text-primary">{item.title}</p>
                  <p className="text-[11px] text-text-muted">{item.person}</p>
                </div>
                <button className="rounded-lg border border-app-border px-2.5 py-1 text-[10px] text-text-secondary hover:bg-app-hover">
                  Join
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Pipeline Health" subtitle="Value by stage" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            <ProgressRow label="Qualified" value="$420K" pct={76} hint="142 deals" />
            <ProgressRow label="Proposal" value="$310K" pct={58} hint="86 deals" />
            <ProgressRow label="Negotiation" value="$260K" pct={46} hint="54 deals" />
            <ProgressRow label="Closing" value="$180K" pct={32} hint="28 deals" />
          </div>
          <div className="mt-5 rounded-xl border border-app-border bg-app-bg p-3">
            <p className="text-[11px] text-text-muted">Average sales cycle</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-lg font-semibold text-text-primary">28 days</p>
              <span className="text-[10px] text-emerald-400">−3 days vs last quarter</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Recent Orders" subtitle="Deals associated with customer accounts" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Company", "Customer", "Value", "Stage", "Close date"]}
          rows={deals.map((deal) => [
            <span className="font-medium text-text-primary">{deal[0]}</span>,
            deal[1],
            deal[2],
            <StatusBadge status={deal[3]} />,
            deal[4],
          ])}
        />
      </Panel>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Customer Lifetime Value" subtitle="Average CLV per segment" bodyClassName="p-5 sm:p-6">
          <AreaChart
            height={190}
            values={[28, 34, 31, 42, 39, 48, 44, 56, 52, 61, 58, 68]}
            labels={monthsShort}
            color="oklch(0.7 0.15 160)"
          />
        </Panel>
        <Panel title="Support Load" subtitle="Open tickets by priority" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            <ProgressRow label="High priority" value="8 tickets" pct={20} color="oklch(0.65 0.18 20)" />
            <ProgressRow label="Medium priority" value="26 tickets" pct={55} color="oklch(0.75 0.14 90)" />
            <ProgressRow label="Low priority" value="64 tickets" pct={90} color="oklch(0.7 0.15 160)" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
