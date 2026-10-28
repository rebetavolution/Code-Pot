import { ArrowRight, MousePointerClick, Timer, Users } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, BarChart, Donut, Legend, monthsShort, Panel, SimpleTable, StatTile, StatusBadge } from "./primitives";

const ranges = ["12 months", "30 days", "7 days", "24 hours"] as const;

const series: Record<(typeof ranges)[number], number[]> = {
  "12 months": [32, 41, 38, 52, 49, 63, 58, 71, 68, 79, 86, 94],
  "30 days": [44, 38, 52, 47, 58, 54, 66, 61, 72, 69, 78, 74],
  "7 days": [52, 61, 58, 69, 64, 76, 72],
  "24 hours": [24, 18, 14, 22, 36, 48, 61, 72, 68, 74, 66, 52],
};

const rangeLabels: Record<(typeof ranges)[number], string[]> = {
  "12 months": monthsShort,
  "30 days": ["1", "4", "7", "10", "13", "16", "19", "22", "25", "27", "29", "30"],
  "7 days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "24 hours": ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
};

const channels = [
  { source: "Google", visitors: "4.7K" },
  { source: "Facebook", visitors: "3.4K" },
  { source: "Threads", visitors: "2.9K" },
  { source: "Instagram", visitors: "1.5K" },
  { source: "Other", visitors: "820" },
];

const pages = [
  { source: "tailadmin.com", views: "4.7K" },
  { source: "preview.tailadmin.com", views: "3.4K" },
  { source: "docs.tailadmin.com", views: "2.9K" },
  { source: "tailadmin.com/components", views: "1.5K" },
  { source: "tailadmin.com/pricing", views: "640" },
];

const orders = [
  ["#ORD-1048", "Musharof Chowdhury", "Unassigned", "$2,399.00", "Delivered"],
  ["#ORD-1047", "Alena Franci", "Terry Franci", "$879.00", "Pending"],
  ["#ORD-1046", "Jocelyn Kenter", "Brandon Philips", "$1,869.00", "Delivered"],
  ["#ORD-1045", "Brandon Philips", "Alena Franci", "$1,699.00", "Cancelled"],
];

export function AnalyticsDashboardPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("12 months");

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Analytics Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <StatTile label="Unique Visitors" value="24.7K" delta="+20%" up caption="Vs last month" icon={<Users size={20} />} />
        <StatTile label="Total Pageviews" value="55.9K" delta="+4%" up caption="Vs last month" icon={<MousePointerClick size={20} />} />
        <StatTile label="Bounce Rate" value="54%" delta="-1.59%" up={false} caption="Vs last month" icon={<ArrowRight size={20} />} />
        <StatTile label="Visit Duration" value="2m 56s" delta="+7%" up caption="Vs last month" icon={<Timer size={20} />} />
      </div>

      <Panel
        title="Analytics"
        subtitle="Visitor analytics of last 30 days"
        bodyClassName="p-5 pt-4 sm:p-6 sm:pt-4"
        action={
          <div className="flex flex-wrap items-center gap-0.5 rounded-lg border border-app-border bg-app-bg p-0.5">
            {ranges.map((option) => (
              <button
                key={option}
                onClick={() => setRange(option)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === option ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
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
            <p className="text-3xl font-bold text-text-primary">358,820</p>
            <p className="text-xs text-text-muted">Total visits this period</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" /> Visitors
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-text-dim" /> Previous period
            </span>
          </div>
        </div>
        <AreaChart
          className="mt-6"
          height={300}
          values={series[range]}
          labels={rangeLabels[range]}
          secondary={series[range].map((value) => value * 0.72)}
        />
      </Panel>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          title="Top Channels"
          subtitle="Traffic sources"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">View more</button>}
        >
          <div className="flex items-center justify-between border-b border-app-border pb-2.5 text-[11px] text-text-muted">
            <span>Source</span>
            <span>Visitors</span>
          </div>
          {channels.map((row) => (
            <div key={row.source} className="flex items-center justify-between border-b border-app-border py-2.5 text-sm last:border-0">
              <span className="text-text-secondary">{row.source}</span>
              <span className="text-text-primary">{row.visitors}</span>
            </div>
          ))}
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-app-border py-2.5 text-xs font-medium text-text-secondary hover:bg-app-hover">
            Channels report <ArrowRight size={14} />
          </button>
        </Panel>

        <Panel
          title="Top Pages"
          subtitle="Pageviews by URL"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">View more</button>}
        >
          <div className="flex items-center justify-between border-b border-app-border pb-2.5 text-[11px] text-text-muted">
            <span>Source</span>
            <span>Pageview</span>
          </div>
          {pages.map((row) => (
            <div key={row.source} className="flex items-center justify-between border-b border-app-border py-2.5 text-sm last:border-0">
              <span className="truncate pr-2 text-text-secondary">{row.source}</span>
              <span className="shrink-0 text-text-primary">{row.views}</span>
            </div>
          ))}
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-app-border py-2.5 text-xs font-medium text-text-secondary hover:bg-app-hover">
            Pages report <ArrowRight size={14} />
          </button>
        </Panel>

        <Panel title="Active Users" subtitle="Right now on the site" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-text-primary">1,842</p>
              <p className="text-[11px] text-emerald-400">+12.4% vs yesterday</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">Live</span>
          </div>
          <BarChart
            className="mt-4"
            height={150}
            values={[18, 24, 20, 32, 28, 41, 37, 46, 40, 52, 48, 58]}
            labels={["", "", "", "", "", "", "", "", "", "", "", ""]}
            color="var(--color-accent-light)"
          />
          <div className="mt-3 flex justify-between text-[10px] text-text-muted">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Sessions By Device" subtitle="Share of sessions in the last 30 days" bodyClassName="p-5 sm:p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <Donut
              size={190}
              centerValue="55.9K"
              centerLabel="sessions"
              segments={[
                { label: "Desktop", value: 62, color: "var(--color-accent)" },
                { label: "Mobile", value: 28, color: "oklch(0.72 0.14 200)" },
                { label: "Tablet", value: 10, color: "oklch(0.75 0.14 90)" },
              ]}
            />
            <div className="w-full sm:max-w-[220px]">
              <Legend
                items={[
                  { label: "Desktop", value: "62%", color: "var(--color-accent)" },
                  { label: "Mobile", value: "28%", color: "oklch(0.72 0.14 200)" },
                  { label: "Tablet", value: "10%", color: "oklch(0.75 0.14 90)" },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel title="Acquisition Channels" subtitle="New users by channel" bodyClassName="p-5 sm:p-6">
          <div className="space-y-4">
            {[
              { label: "Organic search", value: "9,482", pct: 46 },
              { label: "Direct", value: "5,772", pct: 28 },
              { label: "Social", value: "3,296", pct: 16 },
              { label: "Referral", value: "2,060", pct: 10 },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="text-text-primary">{row.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent Orders" subtitle="Latest transactions from the store" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Order", "Customer", "Assigned", "Amount", "Status"]}
          rows={orders.map((order) => [
            <span className="font-medium text-text-primary">{order[0]}</span>,
            order[1],
            order[2],
            order[3],
            <StatusBadge status={order[4]} />,
          ])}
        />
      </Panel>
    </div>
  );
}
