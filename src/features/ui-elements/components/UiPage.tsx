import type { ReactNode } from "react";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Card } from "../../../shared/components/Card";

interface UiPageProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function UiPage({ title, description, children }: UiPageProps) {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title={title} />
      {description && <p className="-mt-4 text-sm text-text-muted">{description}</p>}
      {children}
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      {children}
    </Card>
  );
}
