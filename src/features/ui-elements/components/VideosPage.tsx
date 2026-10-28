import { Play } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

export function VideosPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <UiPage title="Videos" description="Video containers with aspect ratios and custom controls.">
      <Section title="Responsive Video">
        <div className="relative aspect-video rounded-lg overflow-hidden border border-app-border bg-gradient-to-br from-slate-800 to-slate-900">
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80 hover:text-white"
            >
              <span className="w-14 h-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/25">
                <Play size={22} className="ml-0.5" />
              </span>
              <span className="text-sm">Play video</span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
              Video playback placeholder
              <button
                onClick={() => setPlaying(false)}
                className="ml-3 rounded border border-white/30 px-2 py-0.5 text-xs text-white/80"
              >
                Stop
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section title="Video Grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((n) => (
            <div key={n} className="rounded-lg overflow-hidden border border-app-border">
              <div className="relative aspect-video bg-gradient-to-br from-indigo-900/60 to-slate-900 flex items-center justify-center">
                <span className="w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center text-white/80">
                  <Play size={16} className="ml-0.5" />
                </span>
              </div>
              <div className="p-3 bg-app-bg">
                <p className="text-sm text-text-primary">Tutorial video {n}</p>
                <p className="text-xs text-text-muted mt-0.5">5:2{n} • Product walkthrough</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Vertical Video">
        <div className="relative w-56 aspect-[9/16] rounded-lg overflow-hidden border border-app-border bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
          <span className="w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center text-white/80">
            <Play size={16} className="ml-0.5" />
          </span>
        </div>
      </Section>
    </UiPage>
  );
}
