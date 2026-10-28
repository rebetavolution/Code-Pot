import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm">
          <li className="text-text-muted">Home</li>
          <li>
            <ChevronRight size={14} className="text-text-dim" />
          </li>
          <li className="text-text-primary">{title}</li>
        </ol>
      </nav>
    </div>
  );
}
