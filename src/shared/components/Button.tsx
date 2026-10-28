import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const base = "rounded-md text-sm font-medium transition-colors disabled:opacity-50";
    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2",
    };
    const variants = {
      default: "bg-accent text-white hover:opacity-90",
      secondary: "bg-app-surface border border-app-border text-text-primary hover:bg-app-bg",
      ghost: "text-text-primary hover:bg-app-surface",
    };
    return (
      <button ref={ref} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props} />
    );
  },
);
Button.displayName = "Button";

