import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { Card } from "../Card";

interface DemoPageProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Standard page shell used by the cloned TailAdmin demo pages. */
export function DemoPage({ title, description, children }: DemoPageProps) {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title={title} />
      {description && <p className="-mt-4 text-sm text-text-muted">{description}</p>}
      {children}
    </div>
  );
}

interface DemoSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Card section with an optional heading. */
export function DemoSection({ title, description, children, className = "p-6" }: DemoSectionProps) {
  return (
    <Card className={className}>
      {title && (
        <div className="mb-4">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </Card>
  );
}

export const fieldClass =
  "w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent";

export const labelClass = "block text-xs font-medium text-text-secondary mb-1.5";
