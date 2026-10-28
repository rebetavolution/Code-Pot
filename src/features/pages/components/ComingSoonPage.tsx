import { ArrowRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function ComingSoonPage() {
  const [target] = useState(() => Date.now() + 14 * 86400000 + 6 * 3600000);
  const [time, setTime] = useState(() => getRemaining(target));
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex min-h-[65vh] items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] text-accent-light">
          Launching soon
        </span>
        <h1 className="mt-5 text-3xl font-bold text-text-primary">We're almost ready</h1>
        <p className="mt-2 text-sm text-text-muted">
          Something great is coming. Leave your email and we'll let you know the moment we go live.
        </p>

        <div className="mt-7 grid grid-cols-4 gap-3">
          {units.map((unit) => (
            <div key={unit.label} className="rounded-lg border border-app-border bg-app-surface py-3">
              <p className="text-xl font-semibold text-text-primary tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-text-muted mt-0.5">{unit.label}</p>
            </div>
          ))}
        </div>

        {subscribed ? (
          <div className="mt-7 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Thanks! We'll notify you at <span className="font-medium">{email}</span>.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
            className="mt-7 flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-app-border bg-app-surface pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">
              Notify me <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
