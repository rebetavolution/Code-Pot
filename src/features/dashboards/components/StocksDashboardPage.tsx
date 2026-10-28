import { ArrowUpRight, Plus, Star } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { AreaChart, Donut, Legend, monthsShort, Panel, SimpleTable, Sparkline } from "./primitives";

const stockCards = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$1,232.00", delta: "+2.4%", up: true, shares: "18 shares", series: [32, 38, 35, 44, 41, 49, 46, 54, 51, 59] },
  { symbol: "PYPL", name: "PayPal Holdings", price: "$965.00", delta: "-1.2%", up: false, shares: "42 shares", series: [48, 44, 47, 41, 43, 38, 40, 36, 38, 34] },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$1,232.00", delta: "+5.8%", up: true, shares: "12 shares", series: [28, 34, 31, 42, 38, 48, 44, 55, 51, 62] },
  { symbol: "AMZN", name: "Amazon.com", price: "$2,567.99", delta: "+0.9%", up: true, shares: "8 shares", series: [36, 33, 38, 35, 41, 39, 44, 42, 47, 45] },
];

const trending = [
  { symbol: "TSLA", name: "Tesla Inc.", price: "$192.53", delta: "+6.2%", up: true },
  { symbol: "AAPL", name: "Apple Inc.", price: "$192.53", delta: "+2.1%", up: true },
  { symbol: "SPOT", name: "Spotify", price: "$192.53", delta: "-0.8%", up: false },
  { symbol: "PYPL", name: "PayPal", price: "$192.53", delta: "+1.4%", up: true },
  { symbol: "AMZN", name: "Amazon", price: "$192.53", delta: "-2.3%", up: false },
];

const watchlist = [
  ["AAPL", "Apple Inc.", "$4,008.65", "+1.24%", "18.4K", "+1.24%"],
  ["SPOT", "Spotify", "$11,689.00", "+3.81%", "9.2K", "+3.81%"],
  ["ABNB", "Airbnb", "$32,227.00", "-0.42%", "4.8K", "-0.42%"],
  ["ENVT", "Enveritas", "$13,895.00", "+0.18%", "2.1K", "+0.18%"],
  ["QIWI", "QIWI plc", "$4,008.65", "+2.96%", "11.4K", "+2.96%"],
];

const transactions = [
  ["BUY", "AAPL", "18 shares", "$4,008.65", "Oct 26, 10:24"],
  ["SELL", "TSLA", "6 shares", "$1,948.20", "Oct 25, 15:02"],
  ["BUY", "AMZN", "8 shares", "$2,567.99", "Oct 24, 09:41"],
  ["DIV", "SPOT", "Quarterly", "$142.80", "Oct 22, 12:00"],
];

export function StocksDashboardPage() {
  const [range, setRange] = useState<"1M" | "6M" | "1Y">("1Y");
  const series: Record<typeof range, number[]> = {
    "1M": [68, 72, 69, 76, 74, 81, 78, 85, 82, 88],
    "6M": [52, 58, 55, 64, 61, 69, 66, 74, 71, 79, 76, 82],
    "1Y": [148, 162, 158, 176, 171, 188, 196, 192, 214, 226, 238, 249],
  };
  const labels: Record<typeof range, string[]> = {
    "1M": ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28"],
    "6M": ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    "1Y": monthsShort,
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Stocks Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {stockCards.map((stock) => (
          <div key={stock.symbol} className="rounded-2xl border border-app-border bg-app-surface p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-app-hover text-[10px] font-bold text-text-primary">
                  {stock.symbol}
                </span>
                <div>
                  <p className="text-sm font-medium text-text-primary">{stock.symbol}</p>
                  <p className="text-[10px] text-text-muted">{stock.name}</p>
                </div>
              </div>
              <button className="text-text-muted hover:text-amber-400" aria-label={`Star ${stock.symbol}`}>
                <Star size={14} />
              </button>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xl font-bold text-text-primary">{stock.price}</p>
                <p className={`text-[11px] ${stock.up ? "text-emerald-400" : "text-rose-400"}`}>{stock.delta} today</p>
              </div>
              <Sparkline values={stock.series} up={stock.up} width={70} height={28} />
            </div>
            <p className="mt-2 text-[10px] text-text-muted">{stock.shares}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Portfolio Performance"
          subtitle="Total value across all holdings"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
                {(["1M", "6M", "1Y"] as const).map((option) => (
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
              <button className="flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1.5 text-[11px] font-medium text-white hover:opacity-90">
                <Plus size={12} /> Trade
              </button>
            </div>
          }
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-text-primary">$248,920.45</p>
              <p className="text-[11px] text-emerald-400">+$3,182.08 (1.29%) today</p>
            </div>
            <div className="flex gap-4 text-[11px] text-text-muted">
              <span>Invested $196,420</span>
              <span>Cash $12,480</span>
            </div>
          </div>
          <AreaChart className="mt-5" height={250} values={series[range]} labels={labels[range]} />
        </Panel>

        <Panel title="Dividend" subtitle="Projected annual income" bodyClassName="p-5 sm:p-6">
          <div className="flex flex-col items-center gap-4">
            <Donut
              size={170}
              centerValue="$5,340"
              centerLabel="per year"
              segments={[
                { label: "Technology", value: 42, color: "var(--color-accent)" },
                { label: "Healthcare", value: 24, color: "oklch(0.72 0.14 200)" },
                { label: "Financials", value: 19, color: "oklch(0.75 0.14 90)" },
                { label: "Energy", value: 15, color: "oklch(0.7 0.15 160)" },
              ]}
            />
            <div className="w-full">
              <Legend
                items={[
                  { label: "Technology", value: "42%", color: "var(--color-accent)" },
                  { label: "Healthcare", value: "24%", color: "oklch(0.72 0.14 200)" },
                  { label: "Financials", value: "19%", color: "oklch(0.75 0.14 90)" },
                  { label: "Energy", value: "15%", color: "oklch(0.7 0.15 160)" },
                ]}
              />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          title="Trending Stocks"
          subtitle="Most traded symbols today"
          bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          action={<button className="text-xs text-accent-light hover:underline">See all</button>}
        >
          <div className="space-y-1">
            {trending.map((stock) => (
              <div key={stock.symbol} className="flex items-center gap-3 rounded-lg px-1 py-2.5 transition-colors hover:bg-app-hover">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-hover text-[9px] font-bold text-text-secondary">
                  {stock.symbol}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-primary">{stock.symbol}</p>
                  <p className="text-[10px] text-text-muted">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-primary">{stock.price}</p>
                  <p className={`text-[10px] ${stock.up ? "text-emerald-400" : "text-rose-400"}`}>{stock.delta}</p>
                </div>
                <ArrowUpRight size={14} className={stock.up ? "text-emerald-400" : "rotate-90 text-rose-400"} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="My Watchlist" subtitle="Symbols you follow" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <SimpleTable head={["Symbol", "Name", "Value", "Day change", "Volume"]} rows={watchlist.map((row) => [row[0], row[1], row[2], row[3], row[4]])} />
        </Panel>
      </div>

      <Panel title="Latest Transactions" subtitle="Orders executed in the last 7 days" bodyClassName="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <SimpleTable
          head={["Type", "Symbol", "Quantity", "Amount", "Date"]}
          rows={transactions.map((row) => [
            <span
              className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                row[0] === "BUY" ? "bg-emerald-500/15 text-emerald-400" : row[0] === "SELL" ? "bg-rose-500/15 text-rose-400" : "bg-sky-500/15 text-sky-400"
              }`}
            >
              {row[0]}
            </span>,
            <span className="font-medium text-text-primary">{row[1]}</span>,
            row[2],
            row[3],
            row[4],
          ])}
        />
      </Panel>
    </div>
  );
}
