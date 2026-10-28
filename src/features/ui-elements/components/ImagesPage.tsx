import { ZoomIn } from "lucide-react";
import { UiPage, Section } from "./UiPage";

const images = [
  { label: "Full Width", h: "h-56", grad: "from-indigo-600/50 to-purple-700/40" },
  { label: "Two Columns", h: "h-40", grad: "from-emerald-600/50 to-teal-700/40" },
  { label: "Two Columns", h: "h-40", grad: "from-orange-600/50 to-red-700/40" },
  { label: "Three Columns", h: "h-32", grad: "from-sky-600/50 to-blue-700/40" },
  { label: "Three Columns", h: "h-32", grad: "from-pink-600/50 to-rose-700/40" },
  { label: "Three Columns", h: "h-32", grad: "from-violet-600/50 to-indigo-700/40" },
];

export function ImagesPage() {
  return (
    <UiPage title="Images" description="Image containers with ratio, rounded and hover states.">
      <Section title="Responsive Images">
        <div className="space-y-4">
          <div className={`relative rounded-lg overflow-hidden border border-app-border bg-gradient-to-br ${images[0].grad} ${images[0].h} flex items-center justify-center group`}>
            <span className="text-white/70 text-sm">Full width image</span>
            <button className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
              <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className={`rounded-lg overflow-hidden border border-app-border bg-gradient-to-br ${img.grad} ${img.h} flex items-center justify-center`}>
                <span className="text-white/70 text-sm">{img.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.slice(3).map((img, i) => (
              <div key={i} className={`rounded-lg overflow-hidden border border-app-border bg-gradient-to-br ${img.grad} ${img.h} flex items-center justify-center`}>
                <span className="text-white/70 text-sm">Thumb</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Rounded Image">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/60 to-cyan-500/40 border border-app-border" />
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/60 to-teal-500/40 border border-app-border" />
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-500/60 to-red-500/40 border border-app-border" />
        </div>
      </Section>

      <Section title="Image With Caption">
        <figure className="max-w-md">
          <div className="h-44 rounded-lg bg-gradient-to-br from-blue-600/50 to-indigo-700/40 border border-app-border" />
          <figcaption className="mt-2 text-xs text-text-muted">
            Figure 1. Example caption describing the image content.
          </figcaption>
        </figure>
      </Section>
    </UiPage>
  );
}
