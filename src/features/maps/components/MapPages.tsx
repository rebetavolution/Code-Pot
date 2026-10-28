import { useState } from "react";
import {
  Compass,
  Download,
  Filter,
  Globe,
  Layers,
  MapPin,
  Minus,
  MoreVertical,
  Navigation,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import { DemoPage, DemoSection } from "../../../shared/components/layout/DemoPage";

const locations = [
  {
    id: "austin",
    name: "Austin HQ",
    city: "Austin, TX",
    x: 40,
    y: 54,
    status: "Open",
    team: 128,
    revenue: "$84.2k",
    hours: "6am – 8pm",
  },
  {
    id: "denver",
    name: "Denver Studio",
    city: "Denver, CO",
    x: 34,
    y: 36,
    status: "Busy",
    team: 42,
    revenue: "$36.8k",
    hours: "7am – 6pm",
  },
  {
    id: "seattle",
    name: "Seattle Lab",
    city: "Seattle, WA",
    x: 18,
    y: 22,
    status: "Open",
    team: 31,
    revenue: "$28.4k",
    hours: "8am – 5pm",
  },
  {
    id: "chicago",
    name: "Chicago Office",
    city: "Chicago, IL",
    x: 57,
    y: 33,
    status: "Open",
    team: 57,
    revenue: "$51.6k",
    hours: "7am – 7pm",
  },
  {
    id: "newyork",
    name: "New York Hub",
    city: "New York, NY",
    x: 78,
    y: 42,
    status: "Busy",
    team: 96,
    revenue: "$72.1k",
    hours: "8am – 9pm",
  },
  {
    id: "miami",
    name: "Miami Studio",
    city: "Miami, FL",
    x: 72,
    y: 74,
    status: "Closed",
    team: 24,
    revenue: "$19.3k",
    hours: "9am – 5pm",
  },
];

const minZoom = 1;
const maxZoom = 1.8;

export function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("austin");
  const [showLabels, setShowLabels] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);

  const filtered = locations.filter((location) =>
    `${location.name} ${location.city}`.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];

  const zoomIn = () => setZoom((value) => Math.min(maxZoom, Number((value + 0.2).toFixed(1))));
  const zoomOut = () => setZoom((value) => Math.max(minZoom, Number((value - 0.2).toFixed(1))));

  return (
    <DemoPage title="Map" description="Regional offices, field activity, and live coverage across North America.">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <DemoSection className="p-4">
          <div className="relative h-[560px] overflow-hidden rounded-lg border border-app-border bg-app-deep">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 28% 22%, rgba(99, 102, 241, 0.16), transparent 52%), radial-gradient(circle at 72% 68%, rgba(34, 197, 94, 0.10), transparent 48%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148, 163, 184, 0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.10) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
            >
              <svg
                viewBox="0 0 800 560"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <g className="fill-app-hover" opacity="0.28">
                  <rect x="70" y="90" width="110" height="64" rx="8" />
                  <rect x="210" y="120" width="86" height="52" rx="8" />
                  <rect x="320" y="80" width="120" height="70" rx="8" />
                  <rect x="470" y="110" width="92" height="58" rx="8" />
                  <rect x="600" y="90" width="110" height="66" rx="8" />
                  <rect x="120" y="250" width="96" height="60" rx="8" />
                  <rect x="260" y="300" width="120" height="72" rx="8" />
                  <rect x="430" y="260" width="104" height="62" rx="8" />
                  <rect x="580" y="300" width="128" height="76" rx="8" />
                  <rect x="170" y="430" width="108" height="62" rx="8" />
                  <rect x="360" y="420" width="132" height="70" rx="8" />
                  <rect x="560" y="440" width="112" height="58" rx="8" />
                </g>

                <g className="fill-green-500" opacity="0.08">
                  <path d="M80 360 C 130 330, 190 340, 220 380 C 240 410, 205 450, 160 448 C 110 446, 70 410, 80 360 Z" />
                  <path d="M620 190 C 660 170, 720 182, 740 216 C 756 246, 730 274, 690 268 C 648 262, 610 226, 620 190 Z" />
                </g>

                <g fill="none" strokeLinecap="round">
                  <path
                    d="M-20 420 C 120 380, 190 430, 310 372 S 530 306, 640 336 S 760 280, 820 296"
                    className="stroke-blue-500"
                    strokeOpacity="0.22"
                    strokeWidth="26"
                  />
                  <path
                    d="M-20 420 C 120 380, 190 430, 310 372 S 530 306, 640 336 S 760 280, 820 296"
                    className="stroke-blue-500"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                  />
                  <path d="M-20 220 C 140 188, 260 246, 400 206 S 640 146, 820 176" className="stroke-app-border" strokeWidth="12" />
                  <path d="M-20 220 C 140 188, 260 246, 400 206 S 640 146, 820 176" className="stroke-app-hover" strokeWidth="6" />
                  <path d="M120 -20 C 200 150, 320 262, 470 580" className="stroke-app-border" strokeWidth="10" />
                  <path d="M120 -20 C 200 150, 320 262, 470 580" className="stroke-app-hover" strokeWidth="5" />
                  <path d="M560 -20 C 520 160, 580 300, 700 580" className="stroke-app-border" strokeWidth="8" />
                  <path d="M560 -20 C 520 160, 580 300, 700 580" className="stroke-app-hover" strokeWidth="4" />
                  <g className="stroke-app-border" strokeOpacity="0.55" strokeWidth="2">
                    <path d="M40 120 L 760 140" />
                    <path d="M20 300 L 780 280" />
                    <path d="M30 480 L 770 500" />
                    <path d="M200 20 L 230 540" />
                    <path d="M400 10 L 420 550" />
                    <path d="M620 20 L 660 540" />
                  </g>
                  {showTraffic && (
                    <g strokeWidth="3" strokeOpacity="0.65">
                      <path d="M-20 220 C 140 188, 260 246, 400 206" className="stroke-green-500" />
                      <path d="M400 206 S 640 146, 820 176" className="stroke-yellow-500" />
                      <path d="M120 -20 C 200 150, 320 262, 470 580" className="stroke-red-500" strokeOpacity="0.5" />
                    </g>
                  )}
                </g>
              </svg>

              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedId(location.id)}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-full"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  aria-label={`Select ${location.name}`}
                >
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-app-surface shadow-lg transition-transform group-hover:scale-110 ${
                      selectedId === location.id ? "scale-110 bg-accent text-white" : "bg-app-surface text-accent"
                    }`}
                  >
                    {selectedId === location.id && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
                    )}
                    <MapPin className="relative h-4 w-4" />
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-app-border bg-app-surface px-2 py-0.5 text-[10px] text-text-primary shadow-sm ${
                      showLabels || selectedId === location.id
                        ? "opacity-100"
                        : "opacity-0 transition-opacity group-hover:opacity-100"
                    }`}
                  >
                    {location.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="absolute left-4 right-4 top-4 z-20 flex items-center gap-2 sm:right-auto sm:w-[340px]">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-app-border bg-app-surface/95 px-3 py-2 shadow-sm backdrop-blur">
                <Search className="h-4 w-4 shrink-0 text-text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search locations..."
                  className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-[10px] text-text-muted hover:text-text-primary"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                title="Filter results"
                className="rounded-lg border border-app-border bg-app-surface/95 p-2.5 text-text-muted shadow-sm backdrop-blur hover:text-text-primary"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute right-4 top-20 z-20 flex flex-col gap-2 sm:top-4">
              <button
                onClick={() => setShowLabels((value) => !value)}
                title="Toggle labels"
                aria-pressed={showLabels}
                className={`rounded-lg border border-app-border p-2.5 shadow-sm backdrop-blur transition-colors ${
                  showLabels ? "bg-accent text-white" : "bg-app-surface/95 text-text-muted hover:text-text-primary"
                }`}
              >
                <Layers className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowTraffic((value) => !value)}
                title="Toggle traffic layer"
                aria-pressed={showTraffic}
                className={`rounded-lg border border-app-border p-2.5 shadow-sm backdrop-blur transition-colors ${
                  showTraffic ? "bg-app-active text-text-primary" : "bg-app-surface/95 text-text-muted"
                }`}
              >
                <Compass className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-4 right-4 z-20 flex flex-col overflow-hidden rounded-lg border border-app-border bg-app-surface/95 shadow-sm backdrop-blur">
              <button
                onClick={zoomIn}
                disabled={zoom >= maxZoom}
                title="Zoom in"
                className="p-2.5 text-text-muted hover:bg-app-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="border-y border-app-border px-2 py-1 text-center text-[10px] text-text-muted">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomOut}
                disabled={zoom <= minZoom}
                title="Zoom out"
                className="p-2.5 text-text-muted hover:bg-app-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 rounded-md border border-app-border bg-app-surface/90 px-2.5 py-1.5 text-[10px] text-text-muted backdrop-blur">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {(5 / zoom).toFixed(1)} km
              </span>
              <span className="hidden sm:inline">30.2672° N, 97.7431° W</span>
            </div>
          </div>
        </DemoSection>

        <DemoSection className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Locations</h2>
              <p className="mt-0.5 text-xs text-text-muted">{filtered.length} of {locations.length} offices</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button title="Filter" className="rounded-md border border-app-border bg-app-bg p-1.5 text-text-muted hover:text-text-primary">
                <Filter className="h-3.5 w-3.5" />
              </button>
              <button title="Export" className="rounded-md border border-app-border bg-app-bg p-1.5 text-text-muted hover:text-text-primary">
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="max-h-[286px] space-y-1.5 overflow-y-auto pr-1">
            {filtered.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedId(location.id)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  selectedId === location.id
                    ? "border-accent/40 bg-accent/10"
                    : "border-transparent hover:bg-app-hover"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-app-bg text-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-text-primary">{location.name}</span>
                    <span className="block truncate text-xs text-text-muted">{location.city}</span>
                  </span>
                </span>
                <span
                  className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                    location.status === "Open"
                      ? "bg-green-500/10 text-green-500"
                      : location.status === "Busy"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-app-hover text-text-muted"
                  }`}
                >
                  {location.status}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-lg border border-dashed border-app-border p-6 text-center">
                <p className="text-sm text-text-secondary">No locations found</p>
                <p className="mt-1 text-xs text-text-muted">Try a different city or office name.</p>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-app-border bg-app-bg p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{selected.name}</p>
                <p className="mt-0.5 text-xs text-text-muted">{selected.city}</p>
              </div>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-500">
                {selected.hours}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Team</p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">{selected.team} people</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Revenue</p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">{selected.revenue}</p>
              </div>
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm text-white hover:opacity-90">
              <Navigation className="h-4 w-4" />
              Get directions
            </button>
          </div>
        </DemoSection>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active locations", value: "12", detail: "+2 opened this quarter" },
          { label: "Avg. field response", value: "8m 42s", detail: "12 seconds faster than last month" },
          { label: "Regional coverage", value: "94.2%", detail: "Across 38 metro areas" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-app-border bg-app-surface p-4">
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold text-text-primary">{stat.value}</p>
            <p className="mt-1 text-xs text-green-500">{stat.detail}</p>
          </div>
        ))}
      </div>
    </DemoPage>
  );
}

type Region = {
  id: string;
  name: string;
  users: number;
  growth: string;
  share: number;
  path: string;
  pin: [number, number];
  pinClass: string;
  dot: string;
  cities: string[];
};

const regions: Region[] = [
  {
    id: "na",
    name: "North America",
    users: 42860,
    growth: "+18.2%",
    share: 34,
    path: "M62 96 L96 70 L150 62 L186 78 L198 104 L176 118 L162 138 L140 148 L132 174 L112 188 L96 168 L78 158 L70 132 L54 118 Z",
    pin: [128, 120],
    pinClass: "fill-accent",
    dot: "bg-accent",
    cities: ["New York", "San Francisco", "Toronto"],
  },
  {
    id: "sa",
    name: "South America",
    users: 14320,
    growth: "+11.4%",
    share: 11,
    path: "M166 212 L196 204 L214 226 L208 258 L196 288 L182 314 L168 296 L160 262 L156 234 Z",
    pin: [186, 258],
    pinClass: "fill-green-500",
    dot: "bg-green-500",
    cities: ["São Paulo", "Bogotá", "Santiago"],
  },
  {
    id: "eu",
    name: "Europe",
    users: 31420,
    growth: "+14.8%",
    share: 25,
    path: "M330 86 L356 72 L388 76 L406 92 L396 112 L370 120 L348 116 L332 104 Z",
    pin: [368, 98],
    pinClass: "fill-accent",
    dot: "bg-accent",
    cities: ["London", "Berlin", "Amsterdam"],
  },
  {
    id: "af",
    name: "Africa",
    users: 3180,
    growth: "+9.1%",
    share: 2,
    path: "M344 140 L378 130 L410 138 L422 166 L414 204 L396 236 L378 262 L364 240 L352 204 L340 170 Z",
    pin: [380, 190],
    pinClass: "fill-yellow-500",
    dot: "bg-yellow-500",
    cities: ["Lagos", "Nairobi", "Cape Town"],
  },
  {
    id: "asia",
    name: "Asia Pacific",
    users: 28760,
    growth: "+32.8%",
    share: 22,
    path: "M418 78 L470 62 L530 58 L584 68 L620 88 L650 112 L638 138 L606 150 L576 144 L548 158 L512 150 L478 136 L446 118 L424 100 Z",
    pin: [545, 110],
    pinClass: "fill-green-500",
    dot: "bg-green-500",
    cities: ["Singapore", "Tokyo", "Bengaluru"],
  },
  {
    id: "oceania",
    name: "Oceania",
    users: 7940,
    growth: "+16.5%",
    share: 6,
    path: "M596 258 L632 248 L660 258 L670 280 L654 302 L620 306 L598 290 Z",
    pin: [630, 278],
    pinClass: "fill-yellow-500",
    dot: "bg-yellow-500",
    cities: ["Sydney", "Melbourne", "Auckland"],
  },
];

export function VectorMapPage() {
  const [selectedId, setSelectedId] = useState("na");
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0];
  const totalUsers = regions.reduce((sum, region) => sum + region.users, 0);

  return (
    <DemoPage title="Vector Map" description="Worldwide customer distribution, growth markets, and regional rankings.">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-app-border bg-app-surface p-4">
          <p className="text-xs text-text-muted">Total active users</p>
          <p className="mt-1 text-xl font-semibold text-text-primary">128.4k</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="h-3 w-3" />
            14.6% this quarter
          </p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4">
          <p className="text-xs text-text-muted">Markets served</p>
          <p className="mt-1 text-xl font-semibold text-text-primary">24</p>
          <p className="mt-1 text-xs text-text-muted">6 flagged as emerging</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4">
          <p className="text-xs text-text-muted">Fastest growing region</p>
          <p className="mt-1 text-xl font-semibold text-text-primary">Asia Pacific</p>
          <p className="mt-1 text-xs text-green-500">+32.8% year over year</p>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <DemoSection className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
                <Globe className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-text-primary">Global distribution</h2>
                <p className="mt-0.5 text-xs text-text-muted">Click a region or pin to inspect its performance.</p>
              </div>
            </div>
            <button className="rounded-lg border border-app-border bg-app-bg p-2 text-text-muted hover:bg-app-hover hover:text-text-primary">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            {[
              { label: "Active market", dot: "bg-accent" },
              { label: "Growth market", dot: "bg-green-500" },
              { label: "Watchlist", dot: "bg-yellow-500" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
                <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
                {item.label}
              </span>
            ))}
          </div>

          <div className="rounded-lg border border-app-border bg-app-bg p-2">
            <svg viewBox="0 0 760 380" className="w-full" role="img" aria-label="World map with highlighted regions">
              <defs>
                <pattern id="vectorDots" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" className="fill-app-border" />
                </pattern>
              </defs>
              <rect width="760" height="380" fill="url(#vectorDots)" opacity="0.7" />

              <g className="fill-app-hover" opacity="0.7">
                <path d="M232 58 L262 50 L280 66 L270 88 L244 90 L230 74 Z" />
                <path d="M292 96 L306 92 L312 104 L300 112 L290 104 Z" />
                <path d="M678 180 L692 174 L704 184 L698 198 L684 196 Z" />
              </g>

              <g fill="none" className="stroke-accent/40" strokeDasharray="4 6" strokeWidth="1.5">
                <path d="M128 120 Q 250 34 368 98" />
                <path d="M368 98 Q 470 44 545 110" />
                <path d="M128 120 Q 200 210 380 190" />
                <path d="M545 110 Q 620 200 630 278" />
              </g>

              {regions.map((region) => (
                <g key={region.id} onClick={() => setSelectedId(region.id)} className="cursor-pointer">
                  <path
                    d={region.path}
                    strokeWidth="1.5"
                    className={`transition-colors ${
                      selectedId === region.id
                        ? "fill-accent/30 stroke-accent"
                        : "fill-app-hover stroke-app-border hover:fill-app-active"
                    }`}
                  >
                    <title>{`${region.name}: ${region.users.toLocaleString("en-US")} active users`}</title>
                  </path>
                </g>
              ))}

              {regions.map((region) => (
                <g key={`pin-${region.id}`} onClick={() => setSelectedId(region.id)} className="cursor-pointer">
                  <circle cx={region.pin[0]} cy={region.pin[1]} r={12} className={region.pinClass} opacity="0.18" />
                  <circle
                    cx={region.pin[0]}
                    cy={region.pin[1]}
                    r={5}
                    className={`${region.pinClass} stroke-app-surface`}
                    strokeWidth={2}
                  >
                    <title>{region.name}</title>
                  </circle>
                </g>
              ))}

              <g className="fill-text-dim text-[9px]">
                <text x="86" y="206">N. AMERICA</text>
                <text x="166" y="334">S. AMERICA</text>
                <text x="330" y="66">EUROPE</text>
                <text x="352" y="286">AFRICA</text>
                <text x="540" y="178">ASIA PACIFIC</text>
                <text x="592" y="326">OCEANIA</text>
              </g>
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-text-muted">
            <span>Data refreshed 4 minutes ago · Last 30 days</span>
            <button
              onClick={() => setSelectedId("na")}
              className="inline-flex items-center gap-1.5 hover:text-text-primary"
            >
              <MapPin className="h-3 w-3" />
              Reset selection
            </button>
          </div>
        </DemoSection>

        <div className="space-y-6">
          <DemoSection className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-text-primary">Top regions</h2>
                <p className="mt-0.5 text-xs text-text-muted">Ranked by active users</p>
              </div>
              <span className="text-xs text-text-muted">{totalUsers.toLocaleString("en-US")}</span>
            </div>
            <div className="space-y-1.5">
              {[...regions]
                .sort((a, b) => b.users - a.users)
                .map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedId(region.id)}
                    className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      selectedId === region.id
                        ? "border-accent/40 bg-accent/10"
                        : "border-transparent hover:bg-app-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className={`h-2 w-2 rounded-full ${region.dot}`} />
                        {region.name}
                      </span>
                      <span className="text-xs text-text-primary">{region.users.toLocaleString("en-US")}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-app-hover">
                        <div className={`h-full rounded-full ${region.dot}`} style={{ width: `${region.share * 2.6}%` }} />
                      </div>
                      <span className="w-9 text-right text-[10px] text-text-muted">{region.share}%</span>
                    </div>
                  </button>
                ))}
            </div>
          </DemoSection>

          <DemoSection className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-text-muted">Selected region</p>
                <h2 className="mt-0.5 text-base font-semibold text-text-primary">{selected.name}</h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-500">
                <TrendingUp className="h-3 w-3" />
                {selected.growth}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-app-border bg-app-bg p-3">
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Active users</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  {selected.users.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-lg border border-app-border bg-app-bg p-3">
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Global share</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">{selected.share}%</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-wide text-text-muted">Top cities</p>
            <div className="mt-2 space-y-2">
              {selected.cities.map((city, index) => (
                <div key={city} className="flex items-center justify-between rounded-md bg-app-bg px-2.5 py-2">
                  <span className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-app-hover text-[9px] text-text-muted">
                      {index + 1}
                    </span>
                    {city}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {Math.round(selected.users / (index + 3)).toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-app-border bg-app-bg px-3.5 py-2 text-sm text-text-primary hover:bg-app-hover">
              <Download className="h-4 w-4 text-text-muted" />
              Download region report
            </button>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}
