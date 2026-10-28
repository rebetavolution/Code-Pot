import { AlertTriangle, Bell, CheckCircle2, Info, X } from "lucide-react";
import { useState } from "react";
import { UiPage, Section } from "./UiPage";

const variants = [
  { icon: CheckCircle2, title: "Success", text: "Your profile has been updated.", cls: "border-green-500/40 bg-green-500/10 text-green-400" },
  { icon: Info, title: "Info", text: "A new version is available.", cls: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
  { icon: AlertTriangle, title: "Warning", text: "Your storage is almost full.", cls: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" },
];

export function NotificationsPage() {
  const [items, setItems] = useState(variants);

  return (
    <UiPage title="Notifications" description="Toast and banner notifications for feedback.">
      <Section title="Notification Cards">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.title} className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 ${item.cls}`}>
              <div className="flex items-start gap-3">
                <item.icon size={18} className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs opacity-80 mt-0.5">{item.text}</p>
                </div>
              </div>
              <button
                onClick={() => setItems(items.filter((i) => i.title !== item.title))}
                className="opacity-70 hover:opacity-100"
              >
                <X size={15} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <button onClick={() => setItems(variants)} className="text-sm text-accent hover:underline">
              Reset notifications
            </button>
          )}
        </div>
      </Section>

      <Section title="Notification Dropdown">
        <div className="w-80 rounded-lg border border-app-border bg-app-bg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-app-border px-4 py-3">
            <Bell size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Notifications</span>
            <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] text-accent-light">3 new</span>
          </div>
          <div className="divide-y divide-app-border">
            {[
              { name: "Terry Franci", action: "requests permission to change", time: "5 min ago" },
              { name: "Alena Franci", action: "assigned you a new task", time: "8 min ago" },
              { name: "Jocelyn Kenter", action: "commented on your post", time: "15 min ago" },
            ].map((n) => (
              <div key={n.name} className="px-4 py-3 hover:bg-app-hover cursor-pointer">
                <p className="text-xs text-text-secondary">
                  <span className="text-text-primary font-medium">{n.name}</span> {n.action}
                </p>
                <p className="text-[10px] text-text-muted mt-1">{n.time}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 text-xs text-accent-light hover:bg-app-hover">View all notifications</button>
        </div>
      </Section>

      <Section title="Inline Alert Banner">
        <div className="flex items-center justify-between rounded-lg border border-accent/40 bg-accent/10 px-4 py-3">
          <p className="text-sm text-text-primary">Scheduled maintenance tonight at 02:00 UTC.</p>
          <button className="text-xs text-accent-light hover:underline">Learn more</button>
        </div>
      </Section>
    </UiPage>
  );
}
