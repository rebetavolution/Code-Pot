import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "./PageShell";

const faqs = [
  {
    q: "How do I reset my password?",
    a: "Open Settings → Security, click Change Password, and follow the verification steps sent to your email address.",
    category: "Account",
  },
  {
    q: "Can I invite team members?",
    a: "Yes. Go to Settings → Team, click Invite member, and enter the email addresses of the people you want to add.",
    category: "Team",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept all major credit cards, bank transfers, and PayPal. Enterprise customers can also pay by invoice.",
    category: "Billing",
  },
  {
    q: "How do I export my data?",
    a: "Navigate to Settings → Data and click Export. You will receive a download link by email once the export is ready.",
    category: "Data",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes a 14-day free trial. No credit card is required to get started.",
    category: "Billing",
  },
  {
    q: "How can I contact support?",
    a: "Use the Support Ticket page in the sidebar, or email support@example.com. Priority plans get a 2-hour response time.",
    category: "Support",
  },
];

export function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0].q);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filtered = useMemo(
    () =>
      faqs.filter(
        (f) =>
          (category === "All" || f.category === category) &&
          (f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, category],
  );

  return (
    <PageShell title="FAQ" description="Frequently asked questions and answers.">
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-lg border border-app-border bg-app-surface pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              category === cat
                ? "bg-accent text-white"
                : "border border-app-border bg-app-surface text-text-secondary hover:bg-app-hover"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((faq) => {
          const isOpen = open === faq.q;
          return (
            <div key={faq.q} className="rounded-lg border border-app-border bg-app-surface overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : faq.q)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm text-text-primary">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-app-border px-5 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-lg border border-app-border bg-app-surface p-8 text-center">
            <p className="text-sm text-text-secondary">No questions match your search.</p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface p-6 text-center">
        <p className="text-sm text-text-primary">Still have questions?</p>
        <p className="text-xs text-text-muted mt-1">Our support team is happy to help.</p>
        <button className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:opacity-90">Contact support</button>
      </div>
    </PageShell>
  );
}
