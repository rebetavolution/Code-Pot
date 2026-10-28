import { CircleCheck, MapPin, Package, Truck } from "lucide-react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, Avatar, monthsShort, Panel, ProgressRow, SimpleTable, StatTile, StatusBadge } from "./primitives";

const steps = [
  { label: "Picked up", time: "08:12", done: true },
  { label: "In Transit", time: "11:40", done: true },
  { label: "Out for delivery", time: "14:05", done: false },
  { label: "Delivered", time: "—", done: false },
];

const vehicles = [
  { plate: "WXY 4821", driver: "Devid walthen", type: "Box truck", capacity: "82%", tone: "from-violet-500 to-indigo-600" },
  { plate: "JHR 1190", driver: "Alena Franci", type: "Van", capacity: "64%", tone: "from-orange-500 to-rose-600" },
  { plate: "PLK 7734", driver: "Jocelyn Kenter", type: "Box truck", capacity: "91%", tone: "from-sky-500 to-blue-600" },
  { plate: "MNB 2205", driver: "Brandon Philips", type: "Motorbike", capacity: "38%", tone: "from-emerald-500 to-teal-600" },
];

const activities = [
  { title: "Shipment #28745 arrived at hub", place: "Kuala Lumpur", time: "12 min ago" },
  { title: "Customs cleared", place: "Singapore", time: "48 min ago" },
  { title: "Route optimised for WXY 4821", place: "Shah Alam", time: "2 hr ago" },
  { title: "Delivery exception resolved", place: "Jakarta", time: "4 hr ago" },
];

const routes = [
  ["Kuala Lumpur → Singapore", "$1,240.00", "Delivered"],
  ["Shah Alam → Penang", "$860.00", "In Transit"],
  ["Jakarta → Bandung", "$540.00", "Delayed"],
  ["Bangkok → Chiang Mai", "$720.00", "In Transit"],
];

export function LogisticsDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Logistics Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <StatTile label="Total Deliveries" value="12,384" delta="+7.6%" up caption="vs last month" icon={<Package size={20} />} tone="bg-sky-500/15 text-sky-400" />
        <StatTile label="In Transit" value="728" delta="+4.1%" up caption="active shipments" icon={<Truck size={20} />} tone="bg-violet-500/15 text-violet-400" />
        <StatTile label="On-time Delivery" value="96.4%" delta="+1.2%" up caption="vs last month" icon={<CircleCheck size={20} />} tone="bg-emerald-500/15 text-emerald-400" />
        <StatTile label="Exceptions" value="38" delta="+12" up={false} caption="needs review" icon={<MapPin size={20} />} tone="bg-rose-500/15 text-rose-400" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Delivery Statistics"
          subtitle="Volume and revenue for the last 12 months"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">Download report</button>}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-text-primary">$23,445,700</p>
              <p className="text-[11px] text-text-muted">Freight revenue this year</p>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <p className="text-text-muted">Deliveries</p>
                <p className="font-semibold text-text-primary">9,258</p>
              </div>
              <div>
                <p className="text-text-muted">Avg. transit</p>
                <p className="font-semibold text-text-primary">2.4 days</p>
              </div>
            </div>
          </div>
          <AreaChart
            className="mt-5"
            height={250}
            values={[420, 468, 512, 498, 560, 588, 612, 640, 608, 682, 704, 742]}
            labels={monthsShort}
            color="oklch(0.72 0.14 200)"
          />
        </Panel>

        <Panel title="Tracking Delivery" subtitle="#28745-72809bjk" bodyClassName="p-5 sm:p-6">
          <div className="relative overflow-hidden rounded-xl border border-app-border bg-app-bg p-3">
            <svg viewBox="0 0 260 110" className="h-28 w-full">
              <path d="M12 82 C60 70, 74 34, 128 40 S214 66, 248 24" fill="none" stroke="var(--color-app-border)" strokeWidth="4" strokeLinecap="round" />
              <path d="M12 82 C60 70, 74 34, 128 40" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="12" cy="82" r="5" fill="var(--color-accent)" />
              <circle cx="128" cy="40" r="6" fill="var(--color-accent)" />
              <circle cx="128" cy="40" r="12" fill="var(--color-accent)" opacity="0.2" />
              <circle cx="248" cy="24" r="5" fill="var(--color-text-dim)" />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-text-muted">
              <span>Kuala Lumpur</span>
              <span>Singapore</span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-start gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ${
                      step.done ? "bg-emerald-500/20 text-emerald-400" : "border border-app-border bg-app-bg text-text-muted"
                    }`}
                  >
                    {step.done ? "✓" : index + 1}
                  </span>
                  {index < steps.length - 1 && (
                    <span className={`mt-1 h-6 w-px ${step.done ? "bg-emerald-500/40" : "bg-app-border"}`} />
                  )}
                </span>
                <div className="flex flex-1 items-baseline justify-between">
                  <span className={`text-xs ${step.done ? "text-text-primary" : "text-text-muted"}`}>{step.label}</span>
                  <span className="text-[10px] text-text-muted">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-app-border bg-app-bg p-3">
            <Avatar label="DW" tone="from-sky-500 to-blue-700" size="h-8 w-8" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-text-primary">Devid walthen</p>
              <p className="text-[10px] text-text-muted">Driver · WXY 4821</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">On route</span>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          title="Delivery Vehicles"
          subtitle="29 vehicles in the fleet"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">Manage fleet</button>}
        >
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.plate} className="flex items-center gap-3 rounded-xl border border-app-border bg-app-bg p-3">
                <Avatar label={vehicle.plate.slice(0, 2)} tone={vehicle.tone} size="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-text-primary">{vehicle.plate}</p>
                  <p className="text-[10px] text-text-muted">
                    {vehicle.driver} · {vehicle.type}
                  </p>
                </div>
                <div className="w-20">
                  <div className="mb-1 h-1 overflow-hidden rounded-full bg-app-hover">
                    <div className="h-full rounded-full bg-accent" style={{ width: vehicle.capacity }} />
                  </div>
                  <p className="text-right text-[9px] text-text-muted">{vehicle.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Delivery Activities" subtitle="Live hub updates" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.title} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0 flex-1 border-b border-app-border pb-3 last:border-0">
                  <p className="text-xs text-text-secondary">{activity.title}</p>
                  <p className="text-[10px] text-text-muted">
                    {activity.place} · {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <ProgressRow label="Fleet utilisation" value="74%" pct={74} />
          </div>
        </Panel>
      </div>

      <Panel title="Active Routes" subtitle="Route performance and pricing" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Route", "Price", "Status"]}
          rows={routes.map((route) => [route[0], <span className="text-text-primary">{route[1]}</span>, <StatusBadge status={route[2]} />])}
        />
      </Panel>
    </div>
  );
}
