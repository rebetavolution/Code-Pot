import { ArrowRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";

export function SuccessPage() {
  const [copied, setCopied] = useState(false);
  const orderId = "ORD-2025-10482";

  const copy = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex min-h-[65vh] items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400">
          <Check size={28} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-text-primary">Payment successful</h1>
        <p className="mt-2 text-sm text-text-muted">
          Your order has been confirmed. A receipt has been sent to your email address.
        </p>

        <div className="mt-6 rounded-lg border border-app-border bg-app-surface divide-y divide-app-border text-left">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-text-muted">Order ID</span>
            <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-text-primary hover:text-accent-light">
              {orderId}
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-text-muted">Amount paid</span>
            <span className="text-xs text-text-primary">$149.00</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-text-muted">Payment method</span>
            <span className="text-xs text-text-primary">Visa •••• 4242</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-text-muted">Date</span>
            <span className="text-xs text-text-primary">Oct 28, 2025</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">
            <Download size={15} /> Download receipt
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover">
            Continue <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
