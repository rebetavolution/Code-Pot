import type { ReactNode } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";

interface PageShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title={title} />
      {description && <p className="-mt-4 text-sm text-text-muted">{description}</p>}
      {children}
    </div>
  );
}

interface ErrorStateProps {
  code: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ErrorState({ code, title, description, children }: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold tracking-tight text-accent-light">{code}</p>
        <h1 className="mt-4 text-2xl font-semibold text-text-primary">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}
