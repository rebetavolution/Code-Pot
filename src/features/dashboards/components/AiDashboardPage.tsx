import { Activity, Coins, Database, Users } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, BarChart, monthsShort, Panel, ProgressRow, SimpleTable, StatTile, StatusBadge } from "./primitives";

const tokenRows = [
  { label: "GPT-5 mini", value: "18.4M", pct: 62, color: "var(--color-accent)" },
  { label: "Claude Sonnet", value: "7.9M", pct: 34, color: "oklch(0.72 0.14 200)" },
  { label: "DeepSeek V3", value: "3.2M", pct: 18, color: "oklch(0.75 0.14 90)" },
  { label: "Local Llama", value: "1.4M", pct: 8, color: "oklch(0.7 0.15 160)" },
];

const transactions = [
  ["TXN-AI-9012", "GPT-5 mini", "Text generation", "1,248", "$12.40", "Completed"],
  ["TXN-AI-9011", "Claude Sonnet", "Code generation", "2,412", "$28.90", "Completed"],
  ["TXN-AI-9010", "DeepSeek V3", "Image analysis", "—", "$4.20", "Processing"],
  ["TXN-AI-9009", "GPT-5 mini", "Video generation", "—", "$31.00", "Failed"],
];

export function AiDashboardPage() {
  const [range, setRange] = useState<"7d" | "30d" | "12m">("12m");
  const series: Record<typeof range, { users: number[]; revenue: number[]; labels: string[] }> = {
    "7d": {
      users: [42, 48, 45, 58, 54, 66, 62],
      revenue: [30, 36, 32, 44, 41, 52, 49],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "30d": {
      users: [38, 44, 40, 52, 47, 58, 54, 66, 61, 72],
      revenue: [26, 32, 29, 38, 35, 44, 41, 52, 48, 57],
      labels: ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28"],
    },
    "12m": {
      users: [18, 26, 22, 34, 31, 42, 38, 52, 48, 58, 54, 66],
      revenue: [12, 18, 16, 24, 22, 31, 28, 38, 35, 44, 41, 52],
      labels: monthsShort,
    },
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="AI Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <StatTile label="Total Users" value="10,590" delta="+22.4%" up caption="vs last month" icon={<Users size={20} />} tone="bg-sky-500/15 text-sky-400" />
        <StatTile label="Sessions" value="15,682" delta="+18.1%" up caption="vs last month" icon={<Activity size={20} />} tone="bg-violet-500/15 text-violet-400" />
        <StatTile label="Revenue" value="$90,369" delta="+12.6%" up caption="vs last month" icon={<Coins size={20} />} tone="bg-emerald-500/15 text-emerald-400" />
        <StatTile label="API Tokens" value="520" delta="+9.4%" up caption="active keys" icon={<Database size={20} />} tone="bg-amber-500/15 text-amber-400" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Users & Revenue Statistics"
          subtitle="Growth of both metrics over time"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
              {(["7d", "30d", "12m"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setRange(option)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    range === option ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          }
        >
          <div className="flex flex-wrap items-center gap-5 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" /> Users
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-text-dim" /> Revenue
            </span>
            <span className="ml-auto text-text-secondary">
              Peak <span className="font-semibold text-text-primary">4,925</span> users in a day
            </span>
          </div>
          <AreaChart
            className="mt-4"
            height={270}
            values={series[range].users}
            secondary={series[range].revenue}
            labels={series[range].labels}
          />
        </Panel>

        <Panel title="API Token Usages" subtitle="Consumption by model" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            {tokenRows.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="text-text-primary">{row.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                  <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-app-border bg-app-bg p-3">
            <p className="text-[10px] text-text-muted">Monthly budget</p>
            <div className="mt-1 flex items-baseline justify-between">
              <p className="text-sm font-semibold text-text-primary">$2,840 / $4,000</p>
              <span className="text-[10px] text-emerald-400">71%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-app-hover">
              <div className="h-full rounded-full bg-accent" style={{ width: "71%" }} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="User Analytics" subtitle="Daily active and new users" bodyClassName="p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Active", value: "10,590" },
              { label: "New", value: "15,682" },
              { label: "Returning", value: "305" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-app-border bg-app-bg p-2.5 text-center">
                <p className="text-[10px] text-text-muted">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <BarChart height={160} values={[42, 55, 48, 63, 58, 72, 68]} labels={["M", "T", "W", "T", "F", "S", "S"]} />
          </div>
        </Panel>

        <Panel title="Projects Analytics" subtitle="Usage across workspaces" bodyClassName="p-5 sm:p-6">
          <div className="space-y-3">
            <ProgressRow label="Production" value="15,682 calls" pct={92} />
            <ProgressRow label="Staging" value="3,835 calls" pct={48} color="oklch(0.72 0.14 200)" />
            <ProgressRow label="Sandbox" value="392 calls" pct={18} color="oklch(0.75 0.14 90)" />
            <ProgressRow label="Archived" value="120 calls" pct={8} color="oklch(0.65 0.18 20)" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-app-border bg-app-bg p-3">
            <div>
              <p className="text-[10px] text-text-muted">Avg. latency</p>
              <p className="text-sm font-semibold text-text-primary">820 ms</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">−64 ms</span>
          </div>
        </Panel>

        <Panel title="Usage Breakdown" subtitle="Requests by feature" bodyClassName="p-5 sm:p-6">
          <div className="space-y-2.5">
            {[
              { label: "Chat", value: "4,925", pct: 62 },
              { label: "Summaries", value: "12,489", pct: 44 },
              { label: "Embeddings", value: "3,835", pct: 28 },
            ].map((row) => (
              <div key={row.label} className="rounded-lg border border-app-border bg-app-bg p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="font-medium text-text-primary">{row.value}</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-app-hover">
                  <div className="h-full rounded-full bg-accent-light" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent Transactions" subtitle="Billing events for model usage" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Reference", "Model", "Feature", "Tokens", "Cost", "Status"]}
          rows={transactions.map((row) => [
            <span className="font-medium text-text-primary">{row[0]}</span>,
            row[1],
            row[2],
            row[3],
            row[4],
            <StatusBadge status={row[5]} />,
          ])}
        />
      </Panel>
    </div>
  );
}
