import { ArrowDownLeft, ArrowUpRight, CreditCard, Plus, Send, Wallet } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, Avatar, monthsShort, Panel, ProgressRow, SimpleTable } from "./primitives";

const cards = [
  { name: "Musharof Chy", number: "•••• 4291", expiry: "09/28", tone: "from-violet-600 via-indigo-600 to-blue-700", brand: "VISA" },
  { name: "Jhon Wick", number: "•••• 7734", expiry: "04/27", tone: "from-slate-700 via-slate-800 to-zinc-900", brand: "MC" },
  { name: "Adward John", number: "•••• 1190", expiry: "11/29", tone: "from-emerald-600 via-teal-700 to-cyan-800", brand: "AMEX" },
];

const feed = [
  { title: "Payment received", detail: "From Acme Corp", amount: "+$1,240.00", up: true, time: "Today, 09:12" },
  { title: "Netflix Subscription", detail: "Monthly plan", amount: "-$14.99", up: false, time: "Today, 07:00" },
  { title: "Money received", detail: "From Alena Franci", amount: "+$480.00", up: true, time: "Yesterday" },
  { title: "Google Ads", detail: "Campaign spend", amount: "-$320.40", up: false, time: "Yesterday" },
];

const quickSend = [
  { initials: "AF", tone: "from-orange-500 to-rose-600" },
  { initials: "JK", tone: "from-sky-500 to-blue-600" },
  { initials: "BP", tone: "from-emerald-500 to-teal-600" },
  { initials: "MC", tone: "from-violet-500 to-indigo-600" },
];

const transactions = [
  ["TXN-8842", "Stripe payout", "Income", "+$12,480.00", "Oct 28"],
  ["TXN-8841", "AWS invoice", "Infrastructure", "-$3,240.00", "Oct 27"],
  ["TXN-8840", "Office rent", "Operations", "-$4,800.00", "Oct 26"],
  ["TXN-8839", "Consulting fee", "Income", "+$6,200.00", "Oct 24"],
];

export function FinanceDashboardPage() {
  const [period, setPeriod] = useState<"Week" | "Month" | "Year">("Month");
  const values: Record<typeof period, number[]> = {
    Week: [42, 48, 39, 56, 51, 62, 58],
    Month: [38, 44, 41, 52, 47, 56, 53, 64, 60, 72],
    Year: [52, 58, 55, 64, 61, 69, 66, 74, 71, 79, 76, 82],
  };
  const labels: Record<typeof period, string[]> = {
    Week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    Month: ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28"],
    Year: monthsShort,
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Finance Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-app-border bg-app-surface p-5 md:p-6 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs text-text-muted">Total Balance</p>
              <h4 className="mt-1 text-3xl font-bold text-text-primary">19,857.00</h4>
              <p className="mt-1 text-[11px] text-text-muted">USD · Updated 2 min ago</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white hover:opacity-90">
                <Plus size={14} /> Add money
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-app-border px-3 py-2 text-xs text-text-secondary hover:bg-app-hover">
                <Send size={14} /> Send
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Income", value: "$24,830", delta: "+8.6%", icon: <ArrowDownLeft size={16} />, tone: "bg-emerald-500/15 text-emerald-400" },
              { label: "Expenses", value: "$5,200", delta: "+2.4%", icon: <ArrowUpRight size={16} />, tone: "bg-rose-500/15 text-rose-400" },
              { label: "Savings", value: "$3,831", delta: "26.1%", icon: <Wallet size={16} />, tone: "bg-sky-500/15 text-sky-400" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-app-border bg-app-bg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-muted">{item.label}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-md ${item.tone}`}>{item.icon}</span>
                </div>
                <p className="mt-2 text-base font-semibold text-text-primary">{item.value}</p>
                <p className="text-[10px] text-text-muted">{item.delta} vs last month</p>
              </div>
            ))}
          </div>
        </div>

        <Panel title="Quick Send" subtitle="Transfer to recent contacts" bodyClassName="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            {quickSend.map((person) => (
              <button key={person.initials} className="group flex flex-col items-center gap-1.5">
                <Avatar label={person.initials} tone={person.tone} size="h-10 w-10" />
                <span className="text-[10px] text-text-muted group-hover:text-text-primary">{person.initials}</span>
              </button>
            ))}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-app-border text-text-muted hover:border-accent/50 hover:text-text-primary">
              <Plus size={16} />
            </button>
          </div>
          <div className="mt-5 rounded-xl border border-app-border bg-app-bg p-3">
            <p className="text-[10px] text-text-muted">Growth this quarter</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-lg font-bold text-text-primary">26.1%</p>
              <span className="text-[10px] text-emerald-400">+4.2 pts</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-app-hover">
              <div className="h-full rounded-full bg-accent" style={{ width: "72%" }} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Cashflow Overview"
          subtitle="Money in and out of the account"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
              {(["Week", "Month", "Year"] as const).map((option) => (
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
          }
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-text-primary">$9,758.00</p>
              <p className="text-[11px] text-emerald-400">+$1,284.20 this period</p>
            </div>
            <div className="flex gap-5 text-[11px] text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" /> Inflow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-text-dim" /> Outflow
              </span>
            </div>
          </div>
          <AreaChart
            className="mt-4"
            height={240}
            values={values[period]}
            secondary={values[period].map((value) => value * 0.58)}
            labels={labels[period]}
          />
        </Panel>

        <Panel title="Spending" subtitle="This month by category" bodyClassName="p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-text-primary">$10,758</p>
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-400">68% of budget</span>
          </div>
          <div className="mt-4 space-y-3">
            <ProgressRow label="Payroll" value="$4,948" pct={46} />
            <ProgressRow label="Infrastructure" value="$2,367" pct={22} color="oklch(0.72 0.14 200)" />
            <ProgressRow label="Marketing" value="$2,044" pct={19} color="oklch(0.75 0.14 90)" />
            <ProgressRow label="Other" value="$1,399" pct={13} color="oklch(0.7 0.15 160)" />
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-app-border py-2 text-xs text-text-secondary hover:bg-app-hover">
            <CreditCard size={14} /> Manage budget
          </button>
        </Panel>
      </div>

      <Panel title="My Cards" subtitle="Cards linked to this account" bodyClassName="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.name} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.tone} p-4 text-white`}>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">Debit</span>
                <span className="text-xs font-bold tracking-wide">{card.brand}</span>
              </div>
              <p className="mt-6 text-base font-medium tracking-[0.18em]">{card.number}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase text-white/60">Card holder</p>
                  <p className="text-[11px] font-medium">{card.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase text-white/60">Expires</p>
                  <p className="text-[11px] font-medium">{card.expiry}</p>
                </div>
              </div>
            </div>
          ))}
          <button className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-app-border bg-app-bg text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary">
            <Plus size={20} />
            <span className="text-xs">Virtual Card</span>
          </button>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Recent Activity" subtitle="Money movement on the account" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="space-y-1">
            {feed.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-lg px-1 py-2.5 hover:bg-app-hover/60">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    item.up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                  }`}
                >
                  {item.up ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-text-primary">{item.title}</p>
                  <p className="text-[10px] text-text-muted">
                    {item.detail} · {item.time}
                  </p>
                </div>
                <span className={`text-xs font-medium ${item.up ? "text-emerald-400" : "text-text-secondary"}`}>{item.amount}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent Transactions" subtitle="Latest posted entries" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <SimpleTable
            head={["Reference", "Description", "Category", "Amount", "Date"]}
            rows={transactions.map((row) => [
              <span className="font-medium text-text-primary">{row[0]}</span>,
              row[1],
              row[2],
              <span className={row[3].startsWith("+") ? "text-emerald-400" : "text-text-secondary"}>{row[3]}</span>,
              row[4],
            ])}
          />
        </Panel>
      </div>
    </div>
  );
}
