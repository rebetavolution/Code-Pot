import { BarChart3, RotateCcw, ShoppingBag, TrendingUp } from "lucide-react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, BarChart, monthsShort, Panel, ProgressRow, SimpleTable, StatTile } from "./primitives";

const channels = [
  { label: "Online store", value: "75", pct: 75, color: "var(--color-accent)" },
  { label: "Marketplace", value: "52", pct: 52, color: "oklch(0.72 0.14 200)" },
  { label: "Retail partners", value: "34", pct: 34, color: "oklch(0.75 0.14 90)" },
  { label: "Direct sales", value: "21", pct: 21, color: "oklch(0.7 0.15 160)" },
];

const countries = [
  { code: "US", country: "United States", value: "$4,280", pct: 82 },
  { code: "DE", country: "Germany", value: "$2,940", pct: 56 },
  { code: "MY", country: "Malaysia", value: "$1,860", pct: 38 },
  { code: "JP", country: "Japan", value: "$1,020", pct: 22 },
];

const products = [
  ["Macbook Pro 13”", "Laptop", "412", "$38,420", "+12.4%"],
  ["iPhone 15 Pro Max", "Smartphone", "386", "$29,860", "+8.1%"],
  ["Apple Watch Ultra", "Wearable", "284", "$14,208", "-2.4%"],
  ["iPad Pro 3rd Gen", "Tablet", "192", "$11,840", "+4.6%"],
];

export function SalesDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Sales Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <StatTile label="Total Revenue" value="$10,590" delta="+9.4%" up caption="vs last month" icon={<TrendingUp size={20} />} tone="bg-emerald-500/15 text-emerald-400" />
        <StatTile label="Total Sales" value="1,320" delta="+6.1%" up caption="orders this month" icon={<ShoppingBag size={20} />} tone="bg-sky-500/15 text-sky-400" />
        <StatTile label="Conversion Rate" value="4.38%" delta="+0.42%" up caption="vs last month" icon={<BarChart3 size={20} />} tone="bg-violet-500/15 text-violet-400" />
        <StatTile label="Refund Rate" value="1.2%" delta="+0.3%" up={false} caption="vs last month" icon={<RotateCcw size={20} />} tone="bg-rose-500/15 text-rose-400" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Users & Revenue Statistics"
          subtitle="Revenue against purchasing customers"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">View report</button>}
        >
          <div className="flex flex-wrap items-center gap-5 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-text-dim" /> Customers
            </span>
            <span className="ml-auto">
              This month <span className="font-semibold text-text-primary">$10,590</span>
            </span>
          </div>
          <AreaChart
            className="mt-4"
            height={260}
            values={[22, 28, 25, 34, 31, 38, 36, 46, 42, 51, 49, 58]}
            secondary={[18, 22, 20, 28, 26, 32, 30, 38, 35, 42, 40, 47]}
            labels={monthsShort}
          />
        </Panel>

        <Panel title="User Retention" subtitle="Customers who bought again" bodyClassName="p-5 sm:p-6">
          <div className="relative mx-auto h-40 w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--color-app-hover)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${0.24 * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-text-primary">24%</span>
              <span className="text-[10px] text-text-muted">repeat buyers</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Week 1", value: "38%" },
              { label: "Week 2", value: "31%" },
              { label: "Week 3", value: "26%" },
            ].map((row) => (
              <div key={row.label} className="rounded-lg border border-app-border bg-app-bg p-2">
                <p className="text-[10px] text-text-muted">{row.label}</p>
                <p className="text-sm font-semibold text-text-primary">{row.value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Sales by Channel" subtitle="Orders per channel" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{channel.label}</span>
                  <span className="text-text-primary">{channel.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-app-hover">
                  <div className="h-full rounded-full" style={{ width: `${channel.pct}%`, background: channel.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-app-border pt-4">
            <BarChart
              height={130}
              values={[52, 64, 48, 72, 61, 80, 69]}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              color="oklch(0.7 0.15 200)"
            />
          </div>
        </Panel>

        <Panel title="Sales by Country" subtitle="Revenue by market" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            {countries.map((country) => (
              <div key={country.code} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-app-hover text-[9px] font-semibold text-text-secondary">
                  {country.code}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{country.country}</span>
                    <span className="text-text-primary">{country.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${country.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <ProgressRow label="International share" value="46%" pct={46} color="oklch(0.75 0.14 90)" />
          </div>
        </Panel>
      </div>

      <Panel title="Top Products" subtitle="Best sellers this month" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Product", "Category", "Units", "Revenue", "Growth"]}
          rows={products.map((product) => [
            <span className="font-medium text-text-primary">{product[0]}</span>,
            product[1],
            product[2],
            product[3],
            <span className={product[4].startsWith("-") ? "text-rose-400" : "text-emerald-400"}>{product[4]}</span>,
          ])}
        />
      </Panel>

      <Panel title="Channel Metrics" subtitle="Performance summary" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Channels", "Metric", "Total"]}
          rows={[
            ["Online store", "Conversion rate", "4.82%"],
            ["Marketplace", "Average order value", "$184.20"],
            ["Retail partners", "Sell-through", "72%"],
            ["Direct sales", "Win rate", "38.2%"],
          ]}
        />
      </Panel>
    </div>
  );
}
