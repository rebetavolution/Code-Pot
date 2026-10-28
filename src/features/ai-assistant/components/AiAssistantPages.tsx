import { Check, Copy, Download, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { DemoPage, DemoSection, fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";

function GeneratorShell({
  title,
  description,
  controls,
  output,
  onGenerate,
  generating,
  history,
}: {
  title: string;
  description: string;
  controls: React.ReactNode;
  output: React.ReactNode;
  onGenerate: () => void;
  generating: boolean;
  history: string[];
}) {
  return (
    <DemoPage title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          <DemoSection>
            {controls}
            <button
              onClick={onGenerate}
              disabled={generating}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
            >
              {generating ? <RefreshCw size={15} className="animate-spin" /> : <Wand2 size={15} />}
              {generating ? "Generating..." : "Generate"}
            </button>
          </DemoSection>

          <DemoSection title="Result" description="Generated output appears here.">
            {output}
          </DemoSection>
        </div>

        <div className="space-y-6">
          <DemoSection title="Prompt tips">
            <ul className="space-y-2 text-xs text-text-secondary">
              {[
                "Be specific about the desired format.",
                "Include audience and tone.",
                "Mention length constraints.",
                "Add examples for better results.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </DemoSection>

          <DemoSection title="Recent">
            <div className="space-y-2">
              {history.map((item, i) => (
                <button key={i} className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-left text-xs text-text-secondary hover:bg-app-hover">
                  {item}
                </button>
              ))}
            </div>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}

export function TextGeneratorPage() {
  const [prompt, setPrompt] = useState("Write a product description for a smart home hub.");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setGenerating(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(
        `Meet the Hub — the quiet centre of your connected home.\n\nOne small device, one simple app, and every room finally speaks the same language. The Hub links your lights, locks, sensors and speakers over a local network, so routines run instantly and keep working even when the internet doesn't.\n\nSet it up in under five minutes, then let it fade into the background — exactly where good technology belongs.`,
      );
      setGenerating(false);
    }, 900);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <GeneratorShell
      title="Text Generator"
      description="Draft copy, summaries and ideas with AI."
      generating={generating}
      onGenerate={generate}
      history={["Product description for smart hub", "Weekly team update email", "LinkedIn launch post"]}
      controls={
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Prompt</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className={`${fieldClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className={fieldClass}>
                {["Professional", "Friendly", "Playful", "Formal"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Length</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className={fieldClass}>
                {["Short", "Medium", "Long"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      }
      output={
        output ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">
                <Check size={10} /> Ready · {tone} · {length}
              </span>
              <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary">
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="whitespace-pre-line rounded-lg border border-app-border bg-app-bg p-4 text-sm leading-relaxed text-text-secondary">
              {output}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg py-14 text-center">
            <Sparkles size={22} className="text-text-muted" />
            <p className="mt-2 text-xs text-text-muted">Your generated text will appear here.</p>
          </div>
        )
      }
    />
  );
}

export function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("Minimal workspace with warm morning light, soft shadows");
  const [style, setStyle] = useState("Photographic");
  const [ratio, setRatio] = useState("1:1");
  const [count, setCount] = useState(2);
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<number[]>([]);

  const generate = () => {
    setGenerating(true);
    setImages([]);
    setTimeout(() => {
      setImages(Array.from({ length: count }, (_, i) => i));
      setGenerating(false);
    }, 1100);
  };

  const gradients = [
    "from-indigo-600/60 via-purple-600/40 to-slate-900",
    "from-emerald-500/60 via-teal-600/40 to-slate-900",
    "from-orange-500/60 via-rose-600/40 to-slate-900",
    "from-sky-500/60 via-blue-600/40 to-slate-900",
  ];

  return (
    <GeneratorShell
      title="Image Generator"
      description="Create concept imagery from a text prompt."
      generating={generating}
      onGenerate={generate}
      history={["Minimal workspace concept", "Abstract gradient hero", "Product mockup on marble"]}
      controls={
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Prompt</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className={`${fieldClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Style</label>
            <div className="flex flex-wrap gap-2">
              {["Photographic", "Illustration", "3D Render", "Watercolor"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`rounded-full px-3 py-1.5 text-xs ${
                    style === s ? "bg-accent text-white" : "border border-app-border bg-app-bg text-text-secondary hover:bg-app-hover"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Aspect ratio</label>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)} className={fieldClass}>
                {["1:1", "16:9", "4:3", "9:16"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Variations</label>
              <select value={count} onChange={(e) => setCount(Number(e.target.value))} className={fieldClass}>
                {[1, 2, 3, 4].map((c) => (
                  <option key={c} value={c}>
                    {c} image{c > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      }
      output={
        images.length > 0 ? (
          <div className={`grid gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {images.map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border border-app-border">
                <div className={`bg-gradient-to-br ${gradients[i % gradients.length]} ${ratio === "9:16" ? "aspect-[9/16]" : "aspect-square"} flex items-end p-3`}>
                  <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white/80">
                    {style} · {ratio}
                  </span>
                </div>
                <button className="absolute top-2 right-2 w-7 h-7 rounded-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg py-14 text-center">
            <Sparkles size={22} className="text-text-muted" />
            <p className="mt-2 text-xs text-text-muted">Generated images will appear here.</p>
          </div>
        )
      }
    />
  );
}

export function CodeGeneratorPage() {
  const [prompt, setPrompt] = useState("Create a React hook that debounces a value.");
  const [language, setLanguage] = useState("TypeScript");
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setGenerating(true);
    setCode(null);
    setTimeout(() => {
      setCode(`import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`);
      setGenerating(false);
    }, 900);
  };

  const copy = () => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <GeneratorShell
      title="Code Generator"
      description="Generate snippets, hooks and helper functions."
      generating={generating}
      onGenerate={generate}
      history={["Debounce hook", "Pagination component", "Fetch wrapper with retry"]}
      controls={
        <div className="space-y-4">
          <div>
            <label className={labelClass}>What should the code do?</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className={`${fieldClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={fieldClass}>
                {["TypeScript", "JavaScript", "Python", "Rust", "SQL"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Framework</label>
              <select className={fieldClass}>
                {["React", "Vue", "Svelte", "None"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      }
      output={
        code ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-text-muted">{language}</span>
              <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary">
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-app-border bg-app-deep p-4 text-[12px] leading-relaxed text-text-secondary">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg py-14 text-center">
            <Sparkles size={22} className="text-text-muted" />
            <p className="mt-2 text-xs text-text-muted">Generated code will appear here.</p>
          </div>
        )
      }
    />
  );
}

export function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("Slow pan across a modern office lobby at sunrise");
  const [duration, setDuration] = useState("10s");
  const [ratio, setRatio] = useState("16:9");
  const [generating, setGenerating] = useState(false);
  const [ready, setReady] = useState(false);

  const generate = () => {
    setGenerating(true);
    setReady(false);
    setTimeout(() => {
      setReady(true);
      setGenerating(false);
    }, 1200);
  };

  return (
    <GeneratorShell
      title="Video Generator"
      description="Turn prompts into short concept clips."
      generating={generating}
      onGenerate={generate}
      history={["Office lobby sunrise", "Product rotating on pedestal", "Abstract particles intro"]}
      controls={
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Prompt</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className={`${fieldClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className={fieldClass}>
                {["5s", "10s", "15s", "30s"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Aspect ratio</label>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)} className={fieldClass}>
                {["16:9", "9:16", "1:1"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      }
      output={
        ready ? (
          <div>
            <div className={`relative overflow-hidden rounded-lg border border-app-border bg-gradient-to-br from-slate-800 via-slate-900 to-black ${ratio === "9:16" ? "aspect-[9/16] max-w-[240px]" : "aspect-video"}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center text-white/80">▶</span>
              </div>
              <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white/80">
                {duration} · {ratio}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-text-muted">Preview generated · 1080p</p>
              <button className="inline-flex items-center gap-1.5 text-xs text-accent-light hover:underline">
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg py-14 text-center">
            <Sparkles size={22} className="text-text-muted" />
            <p className="mt-2 text-xs text-text-muted">Your generated clip will appear here.</p>
          </div>
        )
      }
    />
  );
}

export function AiSettingsPage() {
  const [model, setModel] = useState("balanced");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [system, setSystem] = useState("You are a concise assistant for an admin dashboard product.");
  const [streaming, setStreaming] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <DemoPage title="AI Settings" description="Configure model behaviour and generation defaults.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <DemoSection title="Model" description="Choose the default model for new requests.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "fast", name: "Fast", desc: "Lowest latency, shorter answers." },
                { id: "balanced", name: "Balanced", desc: "Good quality and speed." },
                { id: "quality", name: "Quality", desc: "Best output, slower and costlier." },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setModel(option.id)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    model === option.id
                      ? "border-accent/60 bg-accent/5 ring-1 ring-accent/20"
                      : "border-app-border bg-app-bg hover:bg-app-hover"
                  }`}
                >
                  <p className="text-sm text-text-primary">{option.name}</p>
                  <p className="text-[11px] text-text-muted mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </DemoSection>

          <DemoSection title="Generation">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-text-secondary">Temperature</label>
                  <span className="text-xs text-text-muted">{temperature.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)]"
                />
                <p className="text-[11px] text-text-muted mt-1">Lower values produce more predictable output.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Max tokens</label>
                  <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(Number(e.target.value))}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Response language</label>
                  <select className={fieldClass}>
                    <option>English</option>
                    <option>Bahasa Melayu</option>
                    <option>Indonesian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>System prompt</label>
                <textarea value={system} onChange={(e) => setSystem(e.target.value)} rows={3} className={`${fieldClass} resize-none`} />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-app-border bg-app-bg px-4 py-3">
                <div>
                  <p className="text-sm text-text-primary">Stream responses</p>
                  <p className="text-[11px] text-text-muted">Show tokens as they are generated.</p>
                </div>
                <button
                  onClick={() => setStreaming(!streaming)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${streaming ? "bg-accent" : "bg-app-hover border border-app-border"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${streaming ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-app-border">
              <button className="rounded-lg border border-app-border px-4 py-2 text-sm text-text-secondary hover:bg-app-hover">Reset</button>
              <button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 1800);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:opacity-90"
              >
                {saved && <Check size={14} />}
                {saved ? "Saved" : "Save changes"}
              </button>
            </div>
          </DemoSection>
        </div>

        <div className="space-y-6">
          <DemoSection title="Usage">
            <div className="space-y-3 text-xs">
              {[
                { label: "Requests today", value: "1,284", pct: 64 },
                { label: "Tokens this month", value: "2.4M", pct: 48 },
                { label: "Storage", value: "6.1 GB", pct: 31 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-text-muted">{row.label}</span>
                    <span className="text-text-primary">{row.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-app-hover overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          <DemoSection title="API access">
            <p className="text-xs text-text-secondary">Use your existing API key for programmatic access.</p>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-app-border bg-app-bg px-3 py-2">
              <code className="text-[11px] text-text-muted">sk_live_•••••8f2c</code>
              <button className="text-[11px] text-accent-light hover:underline">Manage</button>
            </div>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}
