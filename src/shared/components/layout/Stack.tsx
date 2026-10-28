import { HTMLAttributes } from "react";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
}

export function Stack({ gap = 4, className = "", style, ...props }: StackProps) {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={{ gap: `${gap * 0.25}rem`, ...style }}
      {...props}
    />
  );
}
