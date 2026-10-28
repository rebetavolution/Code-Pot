import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-app-surface border border-app-border rounded-lg ${className}`}
      {...props}
    />
  );
}
