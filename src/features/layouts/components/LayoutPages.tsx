import type { ReactNode } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  Columns3,
  LayoutDashboard,
  Menu,
  PanelLeft,
  PanelTop,
  Rows3,
  Search,
  Settings,
  Sidebar,
} from "lucide-react";
import { DemoPage, DemoSection } from "../../../shared/components/layout/DemoPage";

function PreviewFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-app-border bg-app-bg p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-app-border bg-app-surface">
        {children}
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-light">
            <Check size={10} strokeWidth={3} />
          </span>
          <span className="leading-5">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LayoutOnePage() {
  return (
    <DemoPage
      title="Layout One"
      description="A classic admin shell: persistent left sidebar, horizontal header, and a flexible content canvas."
    >
      <DemoSection
        title="Preview"
        description="Sidebar navigation paired with a fixed top header and card-based content."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Sidebar + Header">
          <div className="flex min-h-[290px]">
            <aside className="hidden w-36 shrink-0 border-r border-app-border bg-app-deep p-3 sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
                  <PanelLeft size={14} />
                </span>
                <span className="text-[11px] font-semibold text-text-primary">Acme Admin</span>
              </div>
              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                Sidebar
              </p>
              <div className="mt-2 space-y-1">
                {["Dashboard", "Analytics", "Orders", "Customers", "Settings"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[10px] ${
                        index === 0
                          ? "bg-accent/10 text-accent-light"
                          : "text-text-muted"
                      }`}
                    >
                      <span>{item}</span>
                      {index === 0 && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 rounded-md border border-app-border bg-app-surface p-2">
                <div className="h-1.5 w-12 rounded-full bg-app-active" />
                <div className="mt-1.5 h-1.5 w-16 rounded-full bg-app-hover" />
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 shrink-0 items-center gap-2 border-b border-app-border bg-app-surface px-3">
                <Menu size={14} className="text-text-muted sm:hidden" />
                <div className="flex flex-1 items-center gap-2 rounded-md border border-app-border bg-app-bg px-2 py-1.5 text-[10px] text-text-dim">
                  <Search size={12} />
                  <span>Search pages...</span>
                </div>
                <Bell size={14} className="text-text-muted" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-accent/15 text-[9px] font-semibold text-accent-light">
                  AL
                </span>
              </div>

              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-text-primary">Dashboard</p>
                    <p className="mt-0.5 text-[9px] text-text-dim">Header / page title</p>
                  </div>
                  <span className="rounded-md bg-accent px-2 py-1 text-[9px] font-medium text-white">
                    New report
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "Revenue", value: "$48.2k" },
                    { label: "Orders", value: "1,284" },
                    { label: "Visitors", value: "9,431" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-app-border bg-app-surface p-2"
                    >
                      <p className="text-[8px] uppercase tracking-wider text-text-dim">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold text-text-primary">
                        {stat.value}
                      </p>
                      <div className="mt-1.5 h-1 w-8 rounded-full bg-green-500/30" />
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid gap-2 sm:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-md border border-app-border bg-app-surface p-2.5">
                    <div className="flex items-center justify-between text-[9px] text-text-muted">
                      <span>Content / chart</span>
                      <span>Last 7 days</span>
                    </div>
                    <div className="mt-3 flex h-20 items-end gap-1.5">
                      {[42, 68, 54, 82, 60, 94, 72].map((height, index) => (
                        <div
                          key={index}
                          style={{ height: `${height}%` }}
                          className={`flex-1 rounded-t ${
                            index === 5 ? "bg-accent" : "bg-accent/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-app-border bg-app-surface p-2.5">
                    <p className="text-[9px] text-text-muted">Recent activity</p>
                    <div className="mt-2 space-y-2">
                      {[0, 1, 2, 3].map((row) => (
                        <div key={row} className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full bg-app-hover" />
                          <div className="flex-1">
                            <div className="h-1.5 w-full rounded-full bg-app-active" />
                            <div className="mt-1 h-1 w-2/3 rounded-full bg-app-hover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="Best suited to data-dense products with many top-level sections."
      >
        <FeatureList
          items={[
            "Persistent sidebar keeps primary navigation one click away.",
            "Fixed header holds search, notifications, and the account menu.",
            "Content area scales from single-column forms to dense tables.",
            "Sidebar collapses into a drawer below the small breakpoint.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}

export function LayoutTwoPage() {
  return (
    <DemoPage
      title="Layout Two"
      description="A topbar-only shell that gives the content the full width of the window."
    >
      <DemoSection
        title="Preview"
        description="Horizontal navigation with centered marketing content and no sidebar."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Top navigation only">
          <div className="min-h-[290px] bg-app-bg">
            <div className="flex h-12 items-center gap-2 border-b border-app-border bg-app-surface px-3">
              <Menu size={14} className="text-text-muted sm:hidden" />
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
                <PanelTop size={14} />
              </span>
              <span className="text-[11px] font-semibold text-text-primary">Northwind</span>
              <div className="ml-4 hidden items-center gap-3 text-[10px] text-text-muted md:flex">
                <span className="text-text-primary">Overview</span>
                <span>Projects</span>
                <span>Team</span>
                <span>Reports</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-md border border-app-border bg-app-bg px-2 py-1.5 text-[10px] text-text-dim sm:flex">
                  <Search size={12} />
                  Search
                </div>
                <Bell size={14} className="text-text-muted" />
                <span className="flex items-center gap-1 text-[10px] text-text-secondary">
                  Ava
                  <ChevronDown size={11} />
                </span>
                <span className="h-6 w-6 rounded-full border border-accent/30 bg-accent/15" />
              </div>
            </div>

            <div className="px-4 py-6">
              <div className="mx-auto max-w-sm text-center">
                <span className="inline-flex rounded-full border border-app-border bg-app-surface px-2 py-0.5 text-[9px] uppercase tracking-wider text-text-dim">
                  Header / top navigation
                </span>
                <div className="mx-auto mt-3 h-3 w-44 rounded-full bg-app-active" />
                <div className="mx-auto mt-2 h-2 w-56 rounded-full bg-app-hover" />
                <div className="mx-auto mt-1.5 h-2 w-40 rounded-full bg-app-hover" />
                <div className="mt-4 flex justify-center gap-2">
                  <span className="h-7 w-20 rounded-md bg-accent" />
                  <span className="h-7 w-20 rounded-md border border-app-border bg-app-surface" />
                </div>
              </div>

              <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2">
                {["Content", "Content", "Content"].map((label, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-app-border bg-app-surface p-2"
                  >
                    <span className="block h-5 w-5 rounded bg-accent/15" />
                    <p className="mt-2 text-[9px] text-text-muted">{label}</p>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-app-active" />
                    <div className="mt-1 h-1.5 w-2/3 rounded-full bg-app-hover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="Ideal for marketing pages, documentation, and simpler dashboards."
      >
        <FeatureList
          items={[
            "Navigation sits in the header, leaving the full width for content.",
            "No sidebar means fewer chrome elements on small screens.",
            "A centered content column keeps long-form pages readable.",
            "Header links flatten naturally into a mobile menu.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}

export function LayoutThreePage() {
  return (
    <DemoPage
      title="Layout Three"
      description="A mirrored admin shell with navigation on the right and the workspace on the left."
    >
      <DemoSection
        title="Preview"
        description="Right-aligned sidebar with table-first content and a compact header."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Right sidebar">
          <div className="flex min-h-[290px] flex-row-reverse">
            <aside className="hidden w-36 shrink-0 border-l border-app-border bg-app-deep p-3 sm:block">
              <div className="flex items-center justify-end gap-2">
                <span className="text-[11px] font-semibold text-text-primary">Acme</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
                  <Sidebar size={14} />
                </span>
              </div>
              <p className="mt-4 text-right text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                Sidebar
              </p>
              <div className="mt-2 space-y-1">
                {["Overview", "Projects", "Invoices", "Reports", "Support"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`rounded-md px-2 py-1.5 text-right text-[10px] ${
                        index === 1
                          ? "border-r-2 border-accent bg-accent/10 text-accent-light"
                          : "text-text-muted"
                      }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 rounded-md border border-app-border bg-app-surface p-2">
                <div className="ml-auto h-1.5 w-14 rounded-full bg-app-active" />
                <div className="ml-auto mt-1.5 h-1.5 w-10 rounded-full bg-app-hover" />
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 shrink-0 items-center gap-2 border-b border-app-border bg-app-surface px-3">
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">Projects</p>
                  <p className="text-[9px] text-text-dim">Header / breadcrumb</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="flex h-6 items-center gap-1.5 rounded-md border border-app-border bg-app-bg px-2 text-[9px] text-text-dim">
                    <Search size={11} />
                    Search
                  </div>
                  <span className="h-6 w-6 rounded-full border border-app-border bg-app-hover" />
                </div>
              </div>

              <div className="flex-1 p-3">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 rounded-md border border-app-border bg-app-surface px-2 py-1 text-[9px] text-text-muted">
                    All projects
                  </div>
                  <span className="rounded-md bg-accent px-2 py-1 text-[9px] text-white">
                    Add project
                  </span>
                </div>

                <div className="mt-3 overflow-hidden rounded-md border border-app-border bg-app-surface">
                  <div className="grid grid-cols-[1.6fr_0.8fr_0.6fr] gap-2 border-b border-app-border bg-app-hover px-2.5 py-1.5 text-[8px] uppercase tracking-wider text-text-dim">
                    <span>Content / project</span>
                    <span>Status</span>
                    <span className="text-right">Owner</span>
                  </div>
                  {[
                    ["Website refresh", "Active", "AL"],
                    ["Mobile app", "Review", "MC"],
                    ["Design system", "Active", "SK"],
                    ["Billing portal", "Paused", "JD"],
                  ].map(([name, status, owner]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[1.6fr_0.8fr_0.6fr] items-center gap-2 border-b border-app-border px-2.5 py-2 last:border-b-0"
                    >
                      <span className="text-[10px] text-text-secondary">{name}</span>
                      <span
                        className={`w-fit rounded-full px-1.5 py-0.5 text-[8px] ${
                          status === "Active"
                            ? "bg-green-500/15 text-green-500"
                            : status === "Review"
                              ? "bg-yellow-500/15 text-yellow-500"
                              : "bg-app-hover text-text-muted"
                        }`}
                      >
                        {status}
                      </span>
                      <span className="text-right text-[9px] text-text-dim">{owner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="Useful when the main workspace benefits from extra horizontal room."
      >
        <FeatureList
          items={[
            "Navigation on the right keeps the primary canvas left-aligned.",
            "The sidebar can host filters or contextual tools instead of navigation.",
            "Table-heavy screens gain width without losing persistent controls.",
            "Mirrors cleanly for right-to-left locale support.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}

export function LayoutFourPage() {
  return (
    <DemoPage
      title="Layout Four"
      description="A compact icon-only rail that maximizes space for dashboards and dense tables."
    >
      <DemoSection
        title="Preview"
        description="Narrow icon rail, slim header, and a wide content area with summary cards."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Compact icon rail">
          <div className="flex min-h-[290px]">
            <aside className="flex w-14 shrink-0 flex-col items-center gap-2 border-r border-app-border bg-app-deep py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white">
                A
              </span>
              <div className="mt-2 flex flex-col gap-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent-light">
                  <LayoutDashboard size={14} />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted">
                  <Search size={14} />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted">
                  <Bell size={14} />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted">
                  <Settings size={14} />
                </span>
              </div>
              <span className="mt-2 text-[7px] uppercase tracking-[0.14em] text-text-dim">
                Rail
              </span>
              <span className="mt-auto h-6 w-6 rounded-full border border-app-border bg-app-hover" />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-11 items-center gap-2 border-b border-app-border bg-app-surface px-3">
                <Menu size={14} className="text-text-muted" />
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">Operations</p>
                  <p className="text-[8px] text-text-dim">Header / workspace</p>
                </div>
                <span className="ml-auto rounded-md border border-app-border bg-app-bg px-2 py-1 text-[9px] text-text-muted">
                  Filter
                </span>
              </div>

              <div className="flex-1 p-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { label: "Uptime", value: "99.98%" },
                    { label: "Latency", value: "82ms" },
                    { label: "Errors", value: "0.4%" },
                    { label: "Jobs", value: "312" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-app-border bg-app-surface p-2"
                    >
                      <p className="text-[8px] uppercase tracking-wider text-text-dim">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-text-primary">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 rounded-md border border-app-border bg-app-surface p-2.5">
                  <div className="flex items-center justify-between text-[9px] text-text-muted">
                    <span>Content / system load</span>
                    <span>Live</span>
                  </div>
                  <div className="mt-2 flex items-end gap-1">
                    {[30, 48, 36, 62, 50, 74, 58, 88, 66, 78, 54, 70].map(
                      (height, index) => (
                        <div
                          key={index}
                          style={{ height: `${height * 0.55}px` }}
                          className={`flex-1 rounded-sm ${
                            index === 7 ? "bg-accent" : "bg-accent/30"
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[0, 1].map((card) => (
                    <div
                      key={card}
                      className="rounded-md border border-app-border bg-app-surface p-2.5"
                    >
                      <div className="h-1.5 w-16 rounded-full bg-app-active" />
                      <div className="mt-2 h-1.5 w-full rounded-full bg-app-hover" />
                      <div className="mt-1 h-1.5 w-4/5 rounded-full bg-app-hover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="A good fit for power users who already know the navigation."
      >
        <FeatureList
          items={[
            "Icon rail returns roughly 90px of width to the content area.",
            "Active state uses accent tint and border for quick orientation.",
            "Tooltips can surface labels without expanding the rail.",
            "Scales well on laptops and narrow desktop windows.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}

export function LayoutFivePage() {
  return (
    <DemoPage
      title="Layout Five"
      description="A two-column split where a secondary panel sits beside the primary workspace."
    >
      <DemoSection
        title="Preview"
        description="List-detail split with a tinted secondary panel for context and actions."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Split workspace">
          <div className="flex min-h-[300px]">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 items-center gap-2 border-b border-app-border bg-app-surface px-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
                  <Columns3 size={14} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">Inbox</p>
                  <p className="text-[9px] text-text-dim">Primary column / header</p>
                </div>
                <span className="ml-auto rounded-md border border-app-border bg-app-bg px-2 py-1 text-[9px] text-text-muted">
                  12 open
                </span>
              </div>

              <div className="flex-1 space-y-1.5 p-3">
                {[
                  ["Design review notes", "2m ago"],
                  ["Invoice #4821", "18m ago"],
                  ["New workspace invite", "1h ago"],
                  ["Weekly metrics digest", "3h ago"],
                ].map(([title, time], index) => (
                  <div
                    key={title}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-2 ${
                      index === 0
                        ? "border-accent/40 bg-accent/10"
                        : "border-app-border bg-app-surface"
                    }`}
                  >
                    <span className="h-5 w-5 shrink-0 rounded-full bg-app-hover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] text-text-primary">{title}</p>
                      <div className="mt-1 h-1 w-3/5 rounded-full bg-app-active" />
                    </div>
                    <span className="text-[8px] text-text-dim">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="hidden w-48 shrink-0 border-l border-accent/40 bg-accent/10 p-3 sm:block">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                Secondary panel
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-8 w-8 rounded-full border border-accent/40 bg-app-surface" />
                <div>
                  <p className="text-[10px] font-semibold text-text-primary">Design review</p>
                  <p className="text-[8px] text-text-muted">Shared with 4 people</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-app-active" />
                <div className="h-1.5 w-5/6 rounded-full bg-app-hover" />
                <div className="h-1.5 w-2/3 rounded-full bg-app-hover" />
              </div>
              <div className="mt-4 rounded-md border border-app-border bg-app-surface p-2">
                <div className="h-1.5 w-14 rounded-full bg-app-active" />
                <div className="mt-1.5 h-1.5 w-20 rounded-full bg-app-hover" />
              </div>
              <span className="mt-4 flex h-7 items-center justify-center rounded-md bg-accent text-[9px] font-medium text-white">
                Open details
              </span>
              <div className="mt-3 space-y-1.5">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    <div className="h-1.5 flex-1 rounded-full bg-app-active/60" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="Designed for inboxes, ticketing tools, and record inspectors."
      >
        <FeatureList
          items={[
            "Primary and secondary panes stay visible without navigation.",
            "The tinted panel separates context, previews, and quick actions.",
            "Selection in the list drives the detail panel contents.",
            "Collapses to a single column on small screens.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}

export function LayoutSixPage() {
  return (
    <DemoPage
      title="Layout Six"
      description="A minimal centered layout with restrained chrome and a single content column."
    >
      <DemoSection
        title="Preview"
        description="Centered canvas with a slim header and a focused, distraction-free body."
        className="p-4 sm:p-6"
      >
        <PreviewFrame label="Minimal centered content">
          <div className="min-h-[300px] bg-app-bg">
            <div className="flex h-10 items-center justify-center gap-4 border-b border-app-border bg-app-surface px-3">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-text-primary">
                <Rows3 size={12} className="text-accent-light" />
                Minimal
              </span>
              <div className="hidden items-center gap-3 text-[9px] text-text-muted sm:flex">
                <span className="text-text-primary">Home</span>
                <span>Notes</span>
                <span>About</span>
              </div>
            </div>

            <div className="flex flex-col items-center px-4 py-8 text-center">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent-light">
                Content canvas
              </span>
              <div className="mt-4 h-3 w-48 max-w-full rounded-full bg-app-active" />
              <div className="mt-2 h-2 w-64 max-w-full rounded-full bg-app-hover" />
              <div className="mt-2 h-2 w-56 max-w-full rounded-full bg-app-hover" />
              <div className="mt-5 flex items-center gap-2">
                <span className="h-7 w-24 rounded-md bg-accent" />
                <span className="h-7 w-24 rounded-md border border-app-border bg-app-surface" />
              </div>

              <div className="mt-7 grid w-full max-w-sm grid-cols-2 gap-2">
                {[0, 1].map((card) => (
                  <div
                    key={card}
                    className="rounded-md border border-app-border bg-app-surface p-2.5 text-left"
                  >
                    <span className="block h-4 w-4 rounded bg-accent/15" />
                    <div className="mt-2 h-1.5 w-3/4 rounded-full bg-app-active" />
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-app-hover" />
                    <div className="mt-1 h-1.5 w-2/3 rounded-full bg-app-hover" />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-[8px] text-text-dim">
                <span className="h-px w-8 bg-app-border" />
                Footer / secondary content
                <span className="h-px w-8 bg-app-border" />
              </div>
            </div>
          </div>
        </PreviewFrame>
      </DemoSection>

      <DemoSection
        title="Layout features"
        description="Well suited to focused writing tools, settings flows, and onboarding."
      >
        <FeatureList
          items={[
            "A single centered column keeps attention on the task at hand.",
            "Slim header preserves orientation without competing for space.",
            "Comfortable max-width improves readability on wide monitors.",
            "Plenty of whitespace keeps simple pages from feeling sparse.",
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}
