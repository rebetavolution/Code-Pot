import { ChevronDown, Megaphone, MousePointerClick, Target, Wallet } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Avatar, BarChart, monthsShort, Panel, SimpleTable, StatTile } from "./primitives";

const campaigns = [
  { creator: "Musharof Chowdhury", initials: "MC", tone: "from-violet-500 to-indigo-600", campaign: "Autumn Product Launch", channel: "Email", status: "Active", budget: "$4,200" },
  { creator: "Alena Franci", initials: "AF", tone: "from-orange-500 to-rose-600", campaign: "Retargeting Q4", channel: "Paid search", status: "Active", budget: "$2,850" },
  { creator: "Jocelyn Kenter", initials: "JK", tone: "from-sky-500 to-blue-600", campaign: "Webinar Series", channel: "Social", status: "Paused", budget: "$1,900" },
  { creator: "Brandon Philips", initials: "BP", tone: "from-emerald-500 to-teal-600", campaign: "Partner Program", channel: "Referral", status: "Scheduled", budget: "$980" },
];

const trafficRows = [
  ["Google Ads", "Cost per click", "$1.24"],
  ["Meta Ads", "Cost per click", "$0.98"],
  ["LinkedIn", "Cost per lead", "$4.60"],
  ["Newsletter", "Open rate", "38.2%"],
  ["Affiliates", "Conversion", "2.9%"],
];

const statusTone: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Paused: "bg-amber-500/15 text-amber-400",
  Scheduled: "bg-sky-500/15 text-sky-400",
};

export function MarketingDashboardPage() {
  const [period, setPeriod] = useState<"Weekly" | "Monthly">("Monthly");

  const values = period === "Monthly" ? [42, 55, 48, 63, 58, 72, 68, 81, 76, 92, 88, 104] : [38, 46, 41, 58, 63, 55, 71];
  const labels = period === "Monthly" ? monthsShort : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Marketing Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <StatTile
          label="Campaign Score"
          value="7.8/10"
          delta="+0.6"
          up
          caption="Compared to last month"
          icon={<Target size={20} />}
          tone="bg-violet-500/15 text-violet-400"
        />
        <StatTile
          label="Total Clicks"
          value="5,934"
          delta="+14.2%"
          up
          caption="Vs last month"
          icon={<MousePointerClick size={20} />}
          tone="bg-sky-500/15 text-sky-400"
        />
        <StatTile
          label="Ad Spend"
          value="$9,758"
          delta="+3.1%"
          up={false}
          caption="Budget used 62%"
          icon={<Wallet size={20} />}
          tone="bg-amber-500/15 text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Impression & Data Traffic"
          subtitle="Campaign performance across all channels"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-2.5 py-1.5 text-[11px] text-text-secondary hover:bg-app-hover">
                All channels <ChevronDown size={12} />
              </button>
              <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
                {(["Weekly", "Monthly"] as const).map((option) => (
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
            </div>
          }
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-text-primary">$9,758.00</p>
              <p className="text-[11px] text-text-muted">Total attributed revenue</p>
            </div>
            <div className="flex gap-6">
              {[
                { label: "Impressions", value: "567K", tone: "bg-accent" },
                { label: "Clicks", value: "276K", tone: "bg-sky-400" },
                { label: "Conversions", value: "285", tone: "bg-emerald-400" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
                    <span className={`h-2 w-2 rounded-full ${item.tone}`} /> {item.label}
                  </span>
                  <p className="mt-0.5 text-sm font-semibold text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <BarChart values={values} labels={labels} height={240} color="var(--color-accent)" />
          </div>
        </Panel>

        <Panel
          title="Traffic Stats"
          subtitle="Funnel from impression to conversion"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">Details</button>}
        >
          <div className="space-y-3">
            {[
              { label: "Impressions", value: "567K", pct: 100, tone: "bg-accent" },
              { label: "Clicks", value: "276K", pct: 49, tone: "bg-sky-400" },
              { label: "Leads", value: "18.4K", pct: 26, tone: "bg-violet-400" },
              { label: "Conversions", value: "285", pct: 12, tone: "bg-emerald-400" },
            ].map((row) => (
              <div key={row.label} className="rounded-xl border border-app-border bg-app-bg p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="font-semibold text-text-primary">{row.value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-app-hover">
                  <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5">
            <Megaphone size={15} className="text-emerald-400" />
            <p className="text-[11px] leading-relaxed text-text-secondary">
              Cost per acquisition dropped 8.4% this month.
            </p>
          </div>
        </Panel>
      </div>

      <Panel
        title="Featured Campaigns"
        subtitle="Campaigns currently running or scheduled"
        bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
        action={
          <button className="rounded-lg border border-app-border px-3 py-1.5 text-[11px] text-text-secondary hover:bg-app-hover">
            See all campaigns
          </button>
        }
      >
        <SimpleTable
          head={["Creator", "Campaign", "Channel", "Budget", "Status", ""]}
          rows={campaigns.map((campaign) => [
            <div className="flex items-center gap-2.5">
              <Avatar label={campaign.initials} tone={campaign.tone} size="h-8 w-8" />
              <span className="text-text-primary">{campaign.creator}</span>
            </div>,
            campaign.campaign,
            campaign.channel,
            campaign.budget,
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusTone[campaign.status]}`}>
              {campaign.status}
            </span>,
            <div className="flex items-center gap-1">
              {["View", "Edit"].map((action) => (
                <button
                  key={action}
                  className="rounded px-1.5 py-0.5 text-[10px] text-text-muted hover:bg-app-hover hover:text-text-primary"
                >
                  {action}
                </button>
              ))}
            </div>,
          ])}
        />
      </Panel>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Top Traffic Source" subtitle="Cost and conversion metrics by channel" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <SimpleTable head={["Channels", "Metric", "Total"]} rows={trafficRows.map((row) => [row[0], row[1], <span className="text-text-primary">{row[2]}</span>])} />
        </Panel>

        <Panel title="Audience Growth" subtitle="New followers per week" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-text-primary">24,892</p>
              <p className="text-[11px] text-text-muted">Total audience</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">+8.2% WoW</span>
          </div>
          <div className="mt-4">
            <BarChart
              height={180}
              values={[32, 46, 38, 55, 48, 62, 58, 71]}
              labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]}
              color="oklch(0.7 0.15 200)"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
