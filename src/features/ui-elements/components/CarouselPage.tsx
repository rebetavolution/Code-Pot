import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

const slides = [
  { title: "Slide One", grad: "from-accent/50 to-purple-500/40" },
  { title: "Slide Two", grad: "from-emerald-500/50 to-cyan-500/40" },
  { title: "Slide Three", grad: "from-orange-500/50 to-pink-500/40" },
];

export function CarouselPage() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <UiPage title="Carousel" description="Slideshow component for cycling through content.">
      <Section title="Basic Carousel">
        <div className="relative rounded-lg overflow-hidden border border-app-border">
          <div className={`h-64 bg-gradient-to-br ${slides[index].grad} flex items-center justify-center`}>
            <span className="text-white text-xl font-semibold">{slides[index].title}</span>
          </div>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Carousel With Caption">
        <div className="relative rounded-lg overflow-hidden border border-app-border">
          <div className="h-56 bg-gradient-to-br from-blue-600/40 to-indigo-700/40 flex items-end">
            <div className="w-full bg-gradient-to-t from-black/70 to-transparent p-5">
              <h3 className="text-white font-semibold">{slides[index].title}</h3>
              <p className="text-xs text-white/70 mt-1">A short caption describing this slide.</p>
            </div>
          </div>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Section>
    </UiPage>
  );
}
