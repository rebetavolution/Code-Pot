import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { useId, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "p-5 sm:p-6",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`rounded-2xl border border-app-border bg-app-surface ${className}`}>
      {(title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-text-muted">{subtitle}</p>}
          </div>
          {action ?? (
            <button className="text-text-muted transition-colors hover:text-text-primary" aria-label="Card options">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function Delta({ value, up, className = "" }: { value: string; up: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
      } ${className}`}
    >
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {value}
    </span>
  );
}

export function StatTile({
  label,
  value,
  delta,
  up,
  caption,
  icon,
  tone = "bg-app-hover text-text-secondary",
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  caption?: string;
  icon?: ReactNode;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-app-border bg-app-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-text-muted">{label}</p>
          <h4 className="mt-2 text-2xl font-bold text-text-primary">{value}</h4>
        </div>
        {icon && <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>{icon}</span>}
      </div>
      {(delta || caption) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {delta && up !== undefined && <Delta value={delta} up={up} />}
          {caption && <span className="text-[11px] text-text-muted">{caption}</span>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

const toPoints = (values: number[], height: number, pad = 2) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });
};

export function AreaChart({
  values,
  labels,
  height = 260,
  color = "var(--color-accent)",
  secondary,
  className = "",
}: {
  values: number[];
  labels: string[];
  height?: number;
  color?: string;
  secondary?: number[];
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const viewHeight = 100;
  const points = toPoints(values, viewHeight);
  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const secondaryLine = secondary
    ? toPoints(secondary, viewHeight)
        .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ")
    : null;

  return (
    <div className={className}>
      <div style={{ height }} className="w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--color-app-border)" strokeWidth="0.25" strokeDasharray="1.5 1.5" />
          ))}
          <polygon points={`0,100 ${line} 100,100`} fill={`url(#area-${id})`} />
          {secondaryLine && (
            <polyline
              points={secondaryLine}
              fill="none"
              stroke="var(--color-text-dim)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <polyline points={line} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-text-muted">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  values,
  labels,
  height = 240,
  color = "var(--color-accent)",
  secondary,
  stacked = false,
  className = "",
}: {
  values: number[];
  labels: string[];
  height?: number;
  color?: string;
  secondary?: number[];
  stacked?: boolean;
  className?: string;
}) {
  const max = Math.max(...values.map((v, i) => v + (secondary ? secondary[i] : 0)), 1);
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-1.5" style={{ height }}>
        {values.map((value, index) => (
          <div key={`${labels[index]}-${index}`} className="group flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="rounded bg-app-deep px-1 text-[9px] text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
              {value}
            </span>
            <div className="flex w-full flex-col justify-end" style={{ height: `${(value / max) * 100}%` }}>
              {secondary && (
                <div
                  className="w-full rounded-t-sm bg-accent-light/60"
                  style={{ height: `${((secondary[index] ?? 0) / (value + (secondary[index] ?? 0) || 1)) * 100}%` }}
                />
              )}
              <div
                className={`w-full ${stacked ? "" : "rounded-t-md"} transition-opacity group-hover:opacity-80`}
                style={{ height: secondary ? `${((value - (secondary[index] ?? 0)) / value) * 100}%` : "100%", background: color }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-text-muted">
        {labels.map((label, index) => (
          <span key={`${label}-${index}`} className="flex-1 text-center">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ values, up = true, width = 96, height = 32 }: { values: number[]; up?: boolean; width?: number; height?: number }) {
  const points = toPoints(values, height).map(([x, y]) => `${(x / 100) * width},${y}`).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={up ? "oklch(0.7 0.15 160)" : "oklch(0.65 0.18 20)"}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Donut({
  segments,
  centerValue,
  centerLabel,
  size = 180,
}: {
  segments: { label: string; value: number; color: string }[];
  centerValue?: string;
  centerLabel?: string;
  size?: number;
}) {
  const total = segments.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
          <circle cx="75" cy="75" r={radius} fill="none" stroke="var(--color-app-hover)" strokeWidth="16" />
          {segments.map((segment) => {
            const length = (segment.value / total) * circumference;
            const dash = `${length} ${circumference - length}`;
            const circle = (
              <circle
                key={segment.label}
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="16"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += length;
            return circle;
          })}
        </svg>
        {centerValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-text-primary">{centerValue}</span>
            {centerLabel && <span className="text-[10px] text-text-muted">{centerLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function Legend({ items }: { items: { label: string; value: string; color: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-text-secondary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            {item.label}
          </span>
          <span className="font-medium text-text-primary">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProgressRow({
  label,
  value,
  pct,
  color = "var(--color-accent)",
  hint,
}: {
  label: string;
  value: string;
  pct: number;
  color?: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2 text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
      </div>
      {hint && <p className="mt-1 text-[10px] text-text-muted">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function Avatar({ label, tone = "from-accent to-accent-light", size = "h-9 w-9" }: { label: string; tone?: string; size?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tone} ${size} text-[11px] font-semibold text-white`}
    >
      {label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tones: Record<string, string> = {
    Delivered: "bg-emerald-500/15 text-emerald-400",
    Active: "bg-emerald-500/15 text-emerald-400",
    Paid: "bg-emerald-500/15 text-emerald-400",
    Completed: "bg-emerald-500/15 text-emerald-400",
    Success: "bg-emerald-500/15 text-emerald-400",
    Won: "bg-emerald-500/15 text-emerald-400",
    Pending: "bg-amber-500/15 text-amber-400",
    Processing: "bg-amber-500/15 text-amber-400",
    Trial: "bg-amber-500/15 text-amber-400",
    Delayed: "bg-amber-500/15 text-amber-400",
    Negotiation: "bg-amber-500/15 text-amber-400",
    Proposal: "bg-sky-500/15 text-sky-400",
    "In Transit": "bg-sky-500/15 text-sky-400",
    Scheduled: "bg-sky-500/15 text-sky-400",
    Qualified: "bg-app-hover text-text-secondary",
    Cancelled: "bg-rose-500/15 text-rose-400",
    Canceled: "bg-rose-500/15 text-rose-400",
    Failed: "bg-rose-500/15 text-rose-400",
    Due: "bg-rose-500/15 text-rose-400",
    "Past due": "bg-rose-500/15 text-rose-400",
    Inactive: "bg-app-hover text-text-muted",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tones[status] ?? "bg-app-hover text-text-secondary"}`}>
      {status}
    </span>
  );
}

export function SimpleTable({
  head,
  rows,
  className = "",
}: {
  head: string[];
  rows: ReactNode[][];
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr className="border-y border-app-border">
            {head.map((heading) => (
              <th key={heading} className="whitespace-nowrap px-4 py-2.5 text-left text-[11px] font-medium text-text-muted first:pl-0 last:pr-0">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-app-border">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-app-hover/40">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-4 py-3 text-sm text-text-secondary first:pl-0 last:pr-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const toolButton =
  "inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-app-hover hover:text-text-primary";
