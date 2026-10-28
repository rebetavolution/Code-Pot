import { UiPage, Section } from "./UiPage";

const sizes = [
  { label: "XS", cls: "w-8 h-8 text-xs" },
  { label: "S", cls: "w-10 h-10 text-sm" },
  { label: "M", cls: "w-12 h-12 text-base" },
  { label: "L", cls: "w-16 h-16 text-lg" },
  { label: "XL", cls: "w-20 h-20 text-xl" },
];

export function AvatarsPage() {
  return (
    <UiPage title="Avatars" description="Avatar representations for users and entities.">
      <Section title="Avatar Sizes">
        <div className="flex items-end gap-4 flex-wrap">
          {sizes.map((size, i) => (
            <div key={size.label} className="flex flex-col items-center gap-2">
              <div
                className={`${size.cls} rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-app-border`}
                style={{ background: `linear-gradient(135deg, hsl(${200 + i * 25} 70% 55%), hsl(${230 + i * 25} 70% 45%))` }}
              >
                MC
              </div>
              <span className="text-xs text-text-muted">{size.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar With Status">
        <div className="flex items-center gap-6">
          {[
            { color: "bg-green-500", label: "Online" },
            { color: "bg-yellow-500", label: "Away" },
            { color: "bg-red-500", label: "Busy" },
            { color: "bg-gray-500", label: "Offline" },
          ].map((status) => (
            <div key={status.label} className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-semibold">
                  MC
                </div>
                <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ring-2 ring-app-surface ${status.color}`} />
              </div>
              <span className="text-xs text-text-muted">{status.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar Group">
        <div className="flex items-center">
          {["A", "B", "C", "D", "E"].map((letter, i) => (
            <div
              key={letter}
              className="-ml-3 first:ml-0 w-11 h-11 rounded-full ring-2 ring-app-surface flex items-center justify-center text-sm font-medium text-white"
              style={{ background: `linear-gradient(135deg, hsl(${190 + i * 30} 65% 52%), hsl(${220 + i * 30} 65% 42%))` }}
            >
              {letter}
            </div>
          ))}
          <div className="-ml-3 w-11 h-11 rounded-full ring-2 ring-app-surface bg-app-hover border border-app-border flex items-center justify-center text-xs text-text-secondary">
            +9
          </div>
        </div>
      </Section>

      <Section title="Fallback Avatar">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-app-hover border border-app-border flex items-center justify-center text-text-muted text-sm">
            MC
          </div>
          <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light">
            MC
          </div>
        </div>
      </Section>
    </UiPage>
  );
}
