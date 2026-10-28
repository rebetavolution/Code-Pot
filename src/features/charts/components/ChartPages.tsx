import { useState } from "react";
import { Calendar, Download, MoreVertical, TrendingDown, TrendingUp } from "lucide-react";
import { DemoPage, DemoSection } from "../../../shared/components/layout/DemoPage";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const incomeSeries = [32, 41, 38, 52, 47, 61, 58, 72, 66, 78, 74, 86];
const expenseSeries = [22, 26, 24, 31, 29, 35, 33, 38, 36, 41, 39, 44];

function StatCard({
  label,
  value,
  change,
  direction = "up",
}: {
  label: string;
  value: string;
  change: string;
  direction?: "up" | "down";
}) {
  const positive = direction === "up";
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-lg border border-app-border bg-app-surface p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold text-text-primary">{value}</p>
      <span
        className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
          positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}
      >
        <Icon className="h-3 w-3" />
        {change}
      </span>
    </div>
  );
}

function Legend({ items }: { items: { label: string; dot: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
          <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function LineChartPage() {
  const [rangeLabel, setRangeLabel] = useState("Last 12 months");
  const rangeOptions = [
    { label: "Last 12 months", count: 12 },
    { label: "Last 6 months", count: 6 },
    { label: "This quarter", count: 3 },
  ];
  const range = rangeOptions.find((option) => option.label === rangeLabel) ?? rangeOptions[0];
  const visibleMonths = months.slice(-range.count);
  const visibleIncome = incomeSeries.slice(-range.count);
  const visibleExpense = expenseSeries.slice(-range.count);

  const width = 760;
  const height = 320;
  const padLeft = 48;
  const padRight = 16;
  const padTop = 16;
  const padBottom = 36;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const maxValue = Math.ceil(Math.max(...visibleIncome, ...visibleExpense) / 20) * 20;
  const x = (index: number) => padLeft + (index * plotWidth) / Math.max(visibleMonths.length - 1, 1);
  const y = (value: number) => padTop + (1 - value / maxValue) * plotHeight;
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const areaPath = `M ${x(0)} ${y(0)} L ${visibleIncome
    .map((value, index) => `${x(index)} ${y(value)}`)
    .join(" L ")} L ${x(visibleIncome.length - 1)} ${y(0)} Z`;
  const weekly = [
    { day: "Mon", orders: 42 },
    { day: "Tue", orders: 58 },
    { day: "Wed", orders: 51 },
    { day: "Thu", orders: 74 },
    { day: "Fri", orders: 63 },
    { day: "Sat", orders: 86 },
    { day: "Sun", orders: 71 },
  ];

  return (
    <DemoPage title="Line Chart" description="Monthly revenue and expense trends across the current fiscal year.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total revenue" value="$148,320" change="12.4% vs last year" />
        <StatCard label="Operating expenses" value="$61,840" change="3.2% vs last year" direction="down" />
        <StatCard label="Net profit" value="$86,480" change="18.9% vs last year" />
      </div>

      <DemoSection>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Revenue overview</h2>
            <p className="mt-0.5 text-xs text-text-muted">Gross income compared with operating costs.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary hover:bg-app-hover sm:inline-flex">
              <Calendar className="h-4 w-4 text-text-muted" />
              Jan – Dec 2026
            </button>
            <select
              value={rangeLabel}
              onChange={(event) => setRangeLabel(event.target.value)}
              className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {rangeOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <Legend
            items={[
              { label: "Revenue", dot: "bg-accent" },
              { label: "Expenses", dot: "bg-green-500" },
            ]}
          />
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="h-[320px] w-full" role="img" aria-label="Monthly revenue and expense line chart">
          <defs>
            <linearGradient id="lineIncomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.26" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((tick) => {
            const value = (maxValue / 4) * (4 - tick);
            const lineY = padTop + (tick * plotHeight) / 4;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={lineY}
                  x2={width - padRight}
                  y2={lineY}
                  className="stroke-app-border"
                  strokeDasharray="4 6"
                />
                <text x={padLeft - 10} y={lineY + 4} textAnchor="end" className="fill-text-muted text-[10px]">
                  {Math.round(value)}k
                </text>
              </g>
            );
          })}
          {visibleMonths.map((month, index) => (
            <text
              key={month}
              x={x(index)}
              y={height - 14}
              textAnchor="middle"
              className="fill-text-muted text-[10px]"
            >
              {month}
            </text>
          ))}
          <path d={areaPath} fill="url(#lineIncomeFill)" />
          <polyline
            points={points(visibleIncome)}
            fill="none"
            className="stroke-accent"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={points(visibleExpense)}
            fill="none"
            className="stroke-green-500"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {visibleIncome.map((value, index) => (
            <circle
              key={`income-${visibleMonths[index]}`}
              cx={x(index)}
              cy={y(value)}
              r={3.5}
              className="fill-app-surface stroke-accent"
              strokeWidth={2}
            >
              <title>{`${visibleMonths[index]} revenue: $${value},000`}</title>
            </circle>
          ))}
          {visibleExpense.map((value, index) => (
            <circle
              key={`expense-${visibleMonths[index]}`}
              cx={x(index)}
              cy={y(value)}
              r={3.5}
              className="fill-app-surface stroke-green-500"
              strokeWidth={2}
            >
              <title>{`${visibleMonths[index]} expenses: $${value},000`}</title>
            </circle>
          ))}
        </svg>
      </DemoSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Weekly orders</h2>
              <p className="mt-0.5 text-xs text-text-muted">Saturday peaked at 86 orders.</p>
            </div>
            <button className="rounded-lg border border-app-border bg-app-bg p-2 text-text-muted hover:bg-app-hover hover:text-text-primary">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <div className="flex h-40 items-end justify-between gap-3">
            {weekly.map((entry) => (
              <div key={entry.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end rounded-md bg-app-bg">
                  <div
                    title={`${entry.day}: ${entry.orders} orders`}
                    className={`w-full rounded-md ${entry.orders === 86 ? "bg-accent" : "bg-accent/40"}`}
                    style={{ height: `${(entry.orders / 90) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-text-muted">{entry.day}</span>
              </div>
            ))}
          </div>
        </DemoSection>

        <DemoSection>
          <h2 className="text-sm font-semibold text-text-primary">Performance snapshot</h2>
          <p className="mt-0.5 text-xs text-text-muted">Storefront metrics for the selected period.</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Average order value", value: "$64.20", change: "+6.1%", good: true },
              { label: "Returning customers", value: "38.4%", change: "+2.8%", good: true },
              { label: "Cart abandonment", value: "21.7%", change: "-4.3%", good: true },
              { label: "Refund rate", value: "1.8%", change: "+0.2%", good: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-app-border pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-text-secondary">{row.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{row.value}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      row.good ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {row.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DemoSection>
      </div>
    </DemoPage>
  );
}

const barData = [
  { month: "Jan", online: 28, retail: 18 },
  { month: "Feb", online: 34, retail: 22 },
  { month: "Mar", online: 31, retail: 26 },
  { month: "Apr", online: 42, retail: 24 },
  { month: "May", online: 38, retail: 31 },
  { month: "Jun", online: 47, retail: 29 },
  { month: "Jul", online: 52, retail: 35 },
];

export function BarChartPage() {
  const [mode, setMode] = useState<"grouped" | "stacked">("grouped");
  const width = 760;
  const height = 320;
  const padLeft = 48;
  const padRight = 16;
  const padTop = 16;
  const chartHeight = 240;
  const baseline = padTop + chartHeight;
  const plotWidth = width - padLeft - padRight;
  const slot = plotWidth / barData.length;
  const maxValue = 100;

  return (
    <DemoPage title="Bar Chart" description="Channel sales performance with grouped and stacked comparisons.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total sales" value="$246,800" change="18.2% vs last period" />
        <StatCard label="Orders processed" value="3,842" change="9.6% vs last period" />
        <StatCard label="Average order" value="$64.20" change="6.1% vs last period" />
        <StatCard label="Refund rate" value="1.8%" change="0.4% vs last period" direction="down" />
      </div>

      <DemoSection>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Sales by channel</h2>
            <p className="mt-0.5 text-xs text-text-muted">Online and retail revenue in thousands of dollars.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-app-border bg-app-bg p-1">
              {(["grouped", "stacked"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setMode(option)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    mode === option ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Legend
            items={[
              { label: "Online sales", dot: "bg-accent" },
              { label: "Retail sales", dot: "bg-blue-500" },
            ]}
          />
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="h-[320px] w-full" role="img" aria-label="Sales by channel bar chart">
          {[0, 25, 50, 75, 100].map((tick) => {
            const lineY = baseline - (tick / maxValue) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={lineY}
                  x2={width - padRight}
                  y2={lineY}
                  className="stroke-app-border"
                  strokeDasharray="4 6"
                />
                <text x={padLeft - 10} y={lineY + 4} textAnchor="end" className="fill-text-muted text-[10px]">
                  ${tick}k
                </text>
              </g>
            );
          })}

          {barData.map((entry, index) => {
            const center = padLeft + slot * (index + 0.5);
            const onlineHeight = (entry.online / maxValue) * chartHeight;
            const retailHeight = (entry.retail / maxValue) * chartHeight;
            return (
              <g key={entry.month}>
                <title>{`${entry.month}: online $${entry.online}k, retail $${entry.retail}k`}</title>
                {mode === "grouped" ? (
                  <>
                    <rect
                      x={center - 21}
                      y={baseline - onlineHeight}
                      width={18}
                      height={onlineHeight}
                      rx={3}
                      className="fill-accent"
                    />
                    <rect
                      x={center + 3}
                      y={baseline - retailHeight}
                      width={18}
                      height={retailHeight}
                      rx={3}
                      className="fill-blue-500"
                    />
                  </>
                ) : (
                  <>
                    <rect
                      x={center - 16}
                      y={baseline - onlineHeight}
                      width={32}
                      height={onlineHeight}
                      rx={3}
                      className="fill-accent"
                    />
                    <rect
                      x={center - 16}
                      y={baseline - onlineHeight - retailHeight}
                      width={32}
                      height={retailHeight}
                      rx={3}
                      className="fill-blue-500"
                    />
                  </>
                )}
                <text x={center} y={height - 14} textAnchor="middle" className="fill-text-muted text-[10px]">
                  {entry.month}
                </text>
              </g>
            );
          })}
        </svg>
      </DemoSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection>
          <h2 className="text-sm font-semibold text-text-primary">Orders by device</h2>
          <p className="mt-0.5 text-xs text-text-muted">Share of completed checkouts this month.</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Mobile", value: 54, color: "bg-accent" },
              { label: "Desktop", value: 31, color: "bg-blue-500" },
              { label: "Tablet", value: 11, color: "bg-green-500" },
              { label: "Other", value: 4, color: "bg-yellow-500" },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{row.label}</span>
                  <span className="text-xs text-text-muted">{row.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-app-hover">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DemoSection>

        <DemoSection>
          <h2 className="text-sm font-semibold text-text-primary">Monthly breakdown</h2>
          <p className="mt-0.5 text-xs text-text-muted">Latest month compared with the previous average.</p>
          <div className="mt-5 space-y-3">
            {[
              { label: "Online sales", current: "$52,000", previous: "$44,300", up: true },
              { label: "Retail sales", current: "$35,000", previous: "$31,800", up: true },
              { label: "Units sold", current: "1,284", previous: "1,190", up: true },
              { label: "Returns", current: "23", previous: "31", up: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-lg border border-app-border bg-app-bg px-3 py-2.5">
                <span className="text-sm text-text-secondary">{row.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{row.current}</span>
                  <span className={`text-xs ${row.up ? "text-green-500" : "text-red-500"}`}>
                    {row.up ? "up" : "down"} from {row.previous}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DemoSection>
      </div>
    </DemoPage>
  );
}

const trafficSources = [
  { label: "Direct", value: 38, users: "18,436", stroke: "stroke-accent", dot: "bg-accent" },
  { label: "Referrals", value: 27, users: "13,102", stroke: "stroke-green-500", dot: "bg-green-500" },
  { label: "Social", value: 21, users: "10,190", stroke: "stroke-yellow-500", dot: "bg-yellow-500" },
  { label: "Email", value: 14, users: "6,790", stroke: "stroke-blue-500", dot: "bg-blue-500" },
];

export function PieChartPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  const segments = trafficSources.map((source) => {
    const length = (source.value / 100) * circumference;
    const segment = { ...source, length, offset: cumulative };
    cumulative += length;
    return segment;
  });

  return (
    <DemoPage title="Pie Chart" description="Traffic acquisition mix and campaign performance for the last 30 days.">
      <div className="grid gap-6 lg:grid-cols-3">
        <DemoSection className="p-6 lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Traffic sources</h2>
              <p className="mt-0.5 text-xs text-text-muted">48,518 sessions across all acquisition channels.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary hover:bg-app-hover">
                <Calendar className="h-4 w-4 text-text-muted" />
                Last 30 days
              </button>
              <button className="rounded-lg border border-app-border bg-app-bg p-2 text-text-muted hover:bg-app-hover hover:text-text-primary">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div className="relative mx-auto w-full max-w-[260px]">
              <svg viewBox="0 0 240 240" className="w-full" role="img" aria-label="Traffic source distribution donut chart">
                <circle cx={120} cy={120} r={radius} fill="none" className="stroke-app-hover" strokeWidth={24} />
                {segments.map((segment, index) => (
                  <circle
                    key={segment.label}
                    cx={120}
                    cy={120}
                    r={radius}
                    fill="none"
                    className={`${segment.stroke} cursor-pointer transition-[stroke-width]`}
                    strokeWidth={selected === index ? 28 : 24}
                    strokeDasharray={`${segment.length} ${circumference - segment.length}`}
                    strokeDashoffset={-segment.offset}
                    transform="rotate(-90 120 120)"
                    onClick={() => setSelected(selected === index ? null : index)}
                  >
                    <title>{`${segment.label}: ${segment.value}% (${segment.users} users)`}</title>
                  </circle>
                ))}
                <text x={120} y={114} textAnchor="middle" className="fill-text-primary text-[26px] font-semibold">
                  {selected === null ? "48.5k" : `${trafficSources[selected].value}%`}
                </text>
                <text x={120} y={136} textAnchor="middle" className="fill-text-muted text-[11px]">
                  {selected === null ? "Total visitors" : trafficSources[selected].label}
                </text>
              </svg>
            </div>

            <div className="space-y-2">
              {segments.map((segment, index) => (
                <button
                  key={segment.label}
                  onClick={() => setSelected(selected === index ? null : index)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    selected === index
                      ? "border-accent/40 bg-accent/10"
                      : "border-app-border bg-app-bg hover:bg-app-hover"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className={`h-2.5 w-2.5 rounded-full ${segment.dot}`} />
                    {segment.label}
                  </span>
                  <span className="text-sm font-medium text-text-primary">{segment.value}%</span>
                </button>
              ))}
              <p className="pt-1 text-xs text-text-muted">Select a segment to inspect its share of sessions.</p>
            </div>
          </div>
        </DemoSection>

        <DemoSection>
          <h2 className="text-sm font-semibold text-text-primary">Top channels</h2>
          <p className="mt-0.5 text-xs text-text-muted">Ranked by attributed conversions.</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Google Organic", value: "4,218", change: "+12.8%", icon: true },
              { label: "Direct / None", value: "3,906", change: "+8.4%", icon: true },
              { label: "LinkedIn Ads", value: "2,741", change: "+21.3%", icon: true },
              { label: "Product Hunt", value: "1,988", change: "-2.1%", icon: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-app-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-text-primary">{row.label}</p>
                  <p className="text-xs text-text-muted">{row.value} conversions</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    row.icon ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {row.icon ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {row.change}
                </span>
              </div>
            ))}
          </div>
        </DemoSection>
      </div>

      <DemoSection>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Campaign performance</h2>
            <p className="mt-0.5 text-xs text-text-muted">Attribution for active campaigns in October.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary hover:bg-app-hover">
            <Download className="h-4 w-4 text-text-muted" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-xs text-text-muted">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Sessions</th>
                <th className="pb-3 font-medium">Conversion</th>
                <th className="pb-3 font-medium">Revenue</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Autumn launch", source: "Email", sessions: "8,420", rate: "4.8%", revenue: "$18,240", status: "Active", tone: "bg-green-500" },
                { name: "Retargeting Q4", source: "Social", sessions: "6,108", rate: "3.1%", revenue: "$12,860", status: "Active", tone: "bg-green-500" },
                { name: "Partner referral", source: "Referral", sessions: "4,762", rate: "5.6%", revenue: "$9,410", status: "Active", tone: "bg-green-500" },
                { name: "Brand awareness", source: "Direct", sessions: "3,284", rate: "2.2%", revenue: "$4,120", status: "Paused", tone: "bg-yellow-500" },
                { name: "Holiday preview", source: "Social", sessions: "1,904", rate: "1.4%", revenue: "$1,680", status: "Draft", tone: "bg-text-dim" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-app-border last:border-0">
                  <td className="py-3 font-medium text-text-primary">{row.name}</td>
                  <td className="py-3 text-text-secondary">{row.source}</td>
                  <td className="py-3 text-text-secondary">{row.sessions}</td>
                  <td className="py-3 text-text-secondary">{row.rate}</td>
                  <td className="py-3 text-text-secondary">{row.revenue}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-app-bg px-2 py-0.5 text-xs text-text-secondary">
                      <span className={`h-1.5 w-1.5 rounded-full ${row.tone}`} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>
    </DemoPage>
  );
}

const radarMetrics = ["Revenue", "Traffic", "Conversion", "Retention", "Growth", "Engagement"];
const currentScores = [82, 74, 68, 88, 61, 77];
const previousScores = [65, 58, 72, 70, 54, 62];
const radarCx = 200;
const radarCy = 180;
const radarRadius = 112;

function radarPoint(index: number, radius: number) {
  const angle = (Math.PI * 2 * index) / radarMetrics.length - Math.PI / 2;
  return { x: radarCx + Math.cos(angle) * radius, y: radarCy + Math.sin(angle) * radius };
}

function radarPolygon(values: number[], scale = 1) {
  return values
    .map((value, index) => {
      const point = radarPoint(index, (value / 100) * radarRadius * scale);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export function RadarChartPage() {
  return (
    <DemoPage title="Radar Chart" description="Multi-metric comparison of performance against the previous year.">
      <div className="grid gap-6 xl:grid-cols-3">
        <DemoSection className="p-6 xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Performance profile</h2>
              <p className="mt-0.5 text-xs text-text-muted">Normalized scores across six business metrics.</p>
            </div>
            <button className="rounded-lg border border-app-border bg-app-bg p-2 text-text-muted hover:bg-app-hover hover:text-text-primary">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-2">
            <Legend
              items={[
                { label: "This year", dot: "bg-accent" },
                { label: "Last year", dot: "bg-green-500" },
              ]}
            />
          </div>

          <svg viewBox="0 0 400 370" className="mx-auto h-[370px] w-full max-w-[480px]" role="img" aria-label="Radar chart comparing this year with last year">
            {[0.25, 0.5, 0.75, 1].map((ring) => (
              <polygon
                key={ring}
                points={radarMetrics.map((_, index) => {
                  const point = radarPoint(index, radarRadius * ring);
                  return `${point.x},${point.y}`;
                }).join(" ")}
                fill="none"
                className="stroke-app-border"
                strokeDasharray={ring === 1 ? undefined : "3 5"}
              />
            ))}
            {radarMetrics.map((metric, index) => {
              const end = radarPoint(index, radarRadius);
              return (
                <line
                  key={metric}
                  x1={radarCx}
                  y1={radarCy}
                  x2={end.x}
                  y2={end.y}
                  className="stroke-app-border"
                  strokeOpacity={0.7}
                />
              );
            })}
            <polygon
              points={radarPolygon(previousScores)}
              className="fill-green-500/10 stroke-green-500"
              strokeWidth={2}
            />
            <polygon
              points={radarPolygon(currentScores)}
              className="fill-accent/20 stroke-accent"
              strokeWidth={2.5}
            />
            {currentScores.map((value, index) => {
              const point = radarPoint(index, (value / 100) * radarRadius);
              return (
                <circle key={radarMetrics[index]} cx={point.x} cy={point.y} r={3.5} className="fill-accent stroke-app-surface" strokeWidth={2}>
                  <title>{`${radarMetrics[index]}: ${value} / 100`}</title>
                </circle>
              );
            })}
            {radarMetrics.map((metric, index) => {
              const label = radarPoint(index, radarRadius + 28);
              const anchor = label.x > radarCx + 8 ? "start" : label.x < radarCx - 8 ? "end" : "middle";
              return (
                <text
                  key={metric}
                  x={label.x}
                  y={label.y + 3}
                  textAnchor={anchor}
                  className="fill-text-secondary text-[11px]"
                >
                  {metric}
                </text>
              );
            })}
          </svg>
        </DemoSection>

        <div className="space-y-6">
          <DemoSection>
            <h2 className="text-sm font-semibold text-text-primary">Score breakdown</h2>
            <p className="mt-0.5 text-xs text-text-muted">Current period versus previous period.</p>
            <div className="mt-5 space-y-4">
              {radarMetrics.map((metric, index) => (
                <div key={metric}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{metric}</span>
                    <span className="text-xs text-text-muted">
                      {currentScores[index]} / {previousScores[index]}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${currentScores[index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          <DemoSection>
            <h2 className="text-sm font-semibold text-text-primary">Highlights</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-app-border bg-app-bg p-3">
                <p className="text-xs text-text-muted">Strongest metric</p>
                <p className="mt-1 text-sm font-medium text-text-primary">Retention · 88 / 100</p>
                <p className="mt-1 text-xs text-green-500">+18 points year over year</p>
              </div>
              <div className="rounded-lg border border-app-border bg-app-bg p-3">
                <p className="text-xs text-text-muted">Focus area</p>
                <p className="mt-1 text-sm font-medium text-text-primary">Growth · 61 / 100</p>
                <p className="mt-1 text-xs text-yellow-500">+7 points year over year</p>
              </div>
            </div>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}

const gauges = [
  { label: "Revenue target", detail: "$412k of $500k", color: "stroke-accent", dot: "bg-accent" },
  { label: "New customers", detail: "1,360 of 2,000", color: "stroke-green-500", dot: "bg-green-500" },
  { label: "Customer retention", detail: "91% renewal rate", color: "stroke-blue-500", dot: "bg-blue-500" },
  { label: "Support SLA", detail: "74% within 2 hours", color: "stroke-yellow-500", dot: "bg-yellow-500" },
];

const periodData = {
  "Q4 2026": [82, 68, 91, 74],
  "Q3 2026": [76, 72, 88, 69],
  "Q2 2026": [71, 64, 84, 72],
} as const;

type Period = keyof typeof periodData;

export function RadialChartPage() {
  const [period, setPeriod] = useState<Period>("Q4 2026");
  const values = periodData[period];
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <DemoPage title="Radial Chart" description="Quarterly goal attainment across revenue, customers, retention, and support.">
      <DemoSection>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Goal progress</h2>
            <p className="mt-0.5 text-xs text-text-muted">Weighted attainment across the four primary objectives.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs text-text-muted">
              <Calendar className="h-4 w-4" />
              Reporting period
            </span>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value as Period)}
              className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {Object.keys(periodData).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {gauges.map((gauge, index) => {
            const value = values[index];
            return (
              <div key={gauge.label} className="rounded-lg border border-app-border bg-app-bg p-5 text-center">
                <div className="relative mx-auto w-[140px]">
                  <svg viewBox="0 0 140 140" className="w-full" role="img" aria-label={`${gauge.label}: ${value}%`}>
                    <circle cx={70} cy={70} r={radius} fill="none" className="stroke-app-hover" strokeWidth={10} />
                    <circle
                      cx={70}
                      cy={70}
                      r={radius}
                      fill="none"
                      className={gauge.color}
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
                      transform="rotate(-90 70 70)"
                    >
                      <title>{`${gauge.label}: ${value}%`}</title>
                    </circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-text-primary">{value}%</span>
                    <span className="text-[10px] text-text-muted">attained</span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-text-primary">{gauge.label}</p>
                <p className="mt-0.5 text-xs text-text-muted">{gauge.detail}</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${gauge.dot}`} />
                  On track
                </div>
              </div>
            );
          })}
        </div>
      </DemoSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Progress by team</h2>
              <p className="mt-0.5 text-xs text-text-muted">Share of quarterly objectives completed.</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +9.4%
            </span>
          </div>
          <div className="space-y-4">
            {[
              { label: "Sales", value: 86, color: "bg-accent" },
              { label: "Marketing", value: 72, color: "bg-blue-500" },
              { label: "Customer success", value: 94, color: "bg-green-500" },
              { label: "Operations", value: 63, color: "bg-yellow-500" },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{row.label}</span>
                  <span className="text-xs text-text-muted">{row.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-app-hover">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DemoSection>

        <DemoSection>
          <h2 className="text-sm font-semibold text-text-primary">Period summary</h2>
          <p className="mt-0.5 text-xs text-text-muted">Blended attainment for {period}.</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-app-border bg-app-bg p-4">
              <p className="text-xs text-text-muted">Blended score</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">
                {Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)}%
              </p>
              <p className="mt-1 text-xs text-green-500">Above 75% target</p>
            </div>
            <div className="rounded-lg border border-app-border bg-app-bg p-4">
              <p className="text-xs text-text-muted">Objectives</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">18 / 24</p>
              <p className="mt-1 text-xs text-text-muted">6 remaining</p>
            </div>
            <div className="rounded-lg border border-app-border bg-app-bg p-4">
              <p className="text-xs text-text-muted">Best performer</p>
              <p className="mt-1 text-sm font-medium text-text-primary">Customer success</p>
              <p className="mt-1 text-xs text-green-500">94% attained</p>
            </div>
            <div className="rounded-lg border border-app-border bg-app-bg p-4">
              <p className="text-xs text-text-muted">Needs attention</p>
              <p className="mt-1 text-sm font-medium text-text-primary">Operations</p>
              <p className="mt-1 text-xs text-yellow-500">63% attained</p>
            </div>
          </div>
        </DemoSection>
      </div>
    </DemoPage>
  );
}
