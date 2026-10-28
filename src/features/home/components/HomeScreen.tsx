import { ArrowDownRight, ArrowUpRight, MoreVertical, Package, Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const salesValues = [35, 52, 44, 61, 58, 74, 69, 82, 76, 91, 86, 104];

const orderRows = [
  { id: 1, name: "Macbook pro 13”", variants: "2 Variants", category: "Laptop", price: "$2399.00", status: "Delivered" },
  { id: 2, name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending" },
  { id: 3, name: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: "$1869.00", status: "Delivered" },
  { id: 4, name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1699.00", status: "Canceled" },
  { id: 5, name: "Airpods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered" },
];

const orderBadge: Record<string, string> = {
  Delivered: "bg-green-500/15 text-green-400",
  Pending: "bg-yellow-500/15 text-yellow-400",
  Canceled: "bg-red-500/15 text-red-400",
};

const tiles = [
  "from-slate-600 to-slate-800",
  "from-orange-500 to-rose-600",
  "from-sky-500 to-blue-700",
  "from-violet-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
];

const actionButton =
  "inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-app-hover hover:text-text-primary";

const productInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl border border-app-border bg-app-surface ${className}`}>{children}</div>;
}

function MetricCard({
  label,
  value,
  delta,
  up,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: ReactNode;
}) {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-app-hover text-text-primary">{icon}</div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-sm text-text-muted">{label}</span>
          <h4 className="mt-2 text-3xl font-bold text-text-primary">{value}</h4>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium ${
            up ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          }`}
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {delta}
        </span>
      </div>
    </Card>
  );
}

function SalesChart() {
  const max = 110;
  return (
    <div className="mt-6">
      <div className="flex h-64 items-end gap-1.5 sm:gap-3">
        {salesValues.map((value, index) => (
          <div key={months[index]} className="group relative flex flex-1 flex-col items-center justify-end gap-2">
            <span className="pointer-events-none absolute -top-2 rounded-md bg-app-deep px-1.5 py-0.5 text-[10px] text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
              ${value}k
            </span>
            <div
              className="w-full rounded-t-md bg-accent/25 transition-colors group-hover:bg-accent"
              style={{ height: `${(value / max) * 100}%` }}
              title={`${months[index]}: $${value}k`}
            />
            <span className="text-[10px] text-text-muted">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TargetGauge({ percent }: { percent: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="var(--color-app-hover)" strokeWidth="12" />
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-text-primary">{percent}%</span>
        <span className="text-xs text-text-muted">Target</span>
      </div>
    </div>
  );
}

function StatisticsChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 36 - ((value - min) / Math.max(1, max - min)) * 28;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div>
      <div className="relative h-56 w-full">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
          {[8, 16, 24, 32].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--color-app-border)" strokeWidth="0.15" />
          ))}
          <polygon points={`0,40 ${points} 100,40`} fill="var(--color-accent)" opacity="0.12" />
          <polyline
            points={points}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-text-muted">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}

function DemographicMap() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-app-border bg-app-bg/40 p-2">
      <svg viewBox="0 0 320 180" className="h-auto w-full">
        <path
          d="M28 52c14-16 44-18 60-6 14 10 8 26-6 34-16 9-42 4-50-8-6-8-8-14-4-20Z"
          fill="var(--color-accent)"
          opacity="0.35"
        />
        <path
          d="M66 96c10-6 24-2 27 9 3 14-7 32-17 35-9 3-14-9-14-20 0-10 1-19 4-24Z"
          fill="var(--color-accent)"
          opacity="0.25"
        />
        <path
          d="M140 34c12-7 28-3 33 6 4 9-6 16-17 16-11 0-22-9-16-22Z"
          fill="var(--color-accent)"
          opacity="0.3"
        />
        <path
          d="M148 62c15-5 29 2 31 15 2 16-9 34-20 36-11 2-17-13-17-26 0-11 2-21 6-25Z"
          fill="var(--color-accent)"
          opacity="0.22"
        />
        <path
          d="M182 32c24-9 52-4 64 8 13 12 1 27-14 31-18 4-36-2-47-14-9-9-10-20-3-25Z"
          fill="var(--color-accent)"
          opacity="0.32"
        />
        <path
          d="M250 112c13-5 26 2 26 11 0 9-11 15-22 13-11-2-15-18-4-24Z"
          fill="var(--color-accent)"
          opacity="0.28"
        />
        <circle cx="74" cy="58" r="5" fill="var(--color-accent)" />
        <circle cx="74" cy="58" r="10" fill="var(--color-accent)" opacity="0.25" />
        <circle cx="158" cy="50" r="4" fill="var(--color-accent-light)" />
        <circle cx="158" cy="50" r="8" fill="var(--color-accent-light)" opacity="0.25" />
      </svg>
      <span className="absolute left-[16%] top-[24%] rounded-md bg-app-surface px-1.5 py-0.5 text-[10px] text-text-secondary shadow-sm">
        USA
      </span>
      <span className="absolute left-[46%] top-[18%] rounded-md bg-app-surface px-1.5 py-0.5 text-[10px] text-text-secondary shadow-sm">
        France
      </span>
    </div>
  );
}

export function HomeScreen() {
  const [range, setRange] = useState<"Overview" | "Sales" | "Revenue">("Overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const statistics: Record<typeof range, number[]> = {
    Overview: [42, 55, 48, 63, 58, 72, 68, 81, 76, 92, 88, 104],
    Sales: [58, 49, 66, 54, 71, 62, 78, 69, 84, 74, 91, 86],
    Revenue: [31, 45, 39, 52, 47, 58, 55, 66, 61, 72, 68, 79],
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="eCommerce Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <MetricCard label="Customers" value="3,782" delta="11.01%" up icon={<Users size={24} />} />
        <MetricCard label="Orders" value="5,359" delta="9.05%" up={false} icon={<Package size={24} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-5 sm:p-6 xl:col-span-2">
          <div className="relative flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Monthly Sales</h3>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-text-muted transition-colors hover:text-text-primary"
              aria-label="Sales options"
            >
              <MoreVertical size={20} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 z-20 w-36 space-y-1 rounded-xl border border-app-border bg-app-surface p-2 shadow-lg">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-text-muted hover:bg-app-hover hover:text-text-primary"
                >
                  View report
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-text-muted hover:bg-app-hover hover:text-text-primary"
                >
                  Export CSV
                </button>
              </div>
            )}
          </div>
          <SalesChart />
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-text-primary">Monthly Target</h3>
          <p className="text-xs text-text-muted">Target you've set for each month</p>
          <div className="mt-6">
            <TargetGauge percent={75} />
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2.5">
            <span className="rounded-full bg-green-500/15 px-1.5 py-0.5 text-[10px] font-medium text-green-400">+10%</span>
            <p className="text-[11px] leading-relaxed text-text-muted">
              You earn $3,287 today, it's higher than last month.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-app-border pt-4 text-center">
            {[
              { label: "Target", value: "$20K" },
              { label: "Revenue", value: "$20K" },
              { label: "Today", value: "$20K" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] text-text-muted">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-text-primary">Statistics</h3>
          <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-1">
            {(["Overview", "Sales", "Revenue"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setRange(tab)}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  range === tab ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs text-text-muted">Target you've set for each month</p>
        <div className="mt-6">
          <StatisticsChart values={statistics[range]} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-text-primary">Customers Demographic</h3>
          <p className="text-xs text-text-muted">Number of customers based on country</p>
          <div className="mt-4">
            <DemographicMap />
          </div>
          <div className="mt-4 space-y-3">
            {[
              { code: "US", country: "USA", customers: "2,379 Customers", pct: 79 },
              { code: "FR", country: "France", customers: "589 Customers", pct: 23 },
            ].map((item) => (
              <div key={item.country}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-app-hover text-[8px] font-semibold text-text-secondary">
                      {item.code}
                    </span>
                    {item.country}
                  </span>
                  <span className="text-text-muted">{item.customers}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
            <div className="flex items-center gap-3">
              <button className={actionButton}>Filter</button>
              <button className={actionButton}>See all</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-y border-app-border">
                <tr>
                  {["Products", "Category", "Price", "Status"].map((heading) => (
                    <th key={heading} className="whitespace-nowrap px-6 py-3 text-left first:pl-5 sm:first:pl-6">
                      <p className="text-xs font-medium text-text-muted">{heading}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {orderRows.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-3 first:pl-5 sm:first:pl-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                            tiles[order.id % tiles.length]
                          } text-xs font-semibold text-white`}
                        >
                          {productInitials(order.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{order.name}</p>
                          <p className="text-xs text-text-muted">{order.variants}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">{order.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">{order.price}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${orderBadge[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
