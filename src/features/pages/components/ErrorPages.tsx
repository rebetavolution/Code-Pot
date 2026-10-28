import { ArrowLeft, LifeBuoy, Search } from "lucide-react";
import { ErrorState } from "./PageShell";

export function Error404Page() {
  return (
    <ErrorState
      code="404"
      title="Page not found"
      description="The page you are looking for doesn't exist or has been moved to another location."
    >
      <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">
        <ArrowLeft size={15} /> Back to dashboard
      </button>
      <button className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover">
        <Search size={15} /> Search pages
      </button>
    </ErrorState>
  );
}

export function Error500Page() {
  return (
    <ErrorState
      code="500"
      title="Internal server error"
      description="Something went wrong on our end. Our team has been notified and is working on a fix."
    >
      <button className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">Try again</button>
      <button className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover">
        <LifeBuoy size={15} /> Contact support
      </button>
    </ErrorState>
  );
}

export function Error503Page() {
  return (
    <ErrorState
      code="503"
      title="Service unavailable"
      description="We are performing scheduled maintenance. The service will be back online shortly."
    >
      <button className="rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:opacity-90">Refresh page</button>
      <button className="rounded-lg border border-app-border px-4 py-2.5 text-sm text-text-primary hover:bg-app-hover">
        Status page
      </button>
    </ErrorState>
  );
}
