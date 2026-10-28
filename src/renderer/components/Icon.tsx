import { ComponentType } from "react";

interface IconProps {
  icon: ComponentType<{ size?: number; className?: string }> | any;
  size?: number;
  className?: string;
}

export function Icon({ icon: IconComponent, size = 16, className = "" }: IconProps) {
  if (!IconComponent) return null;
  const Comp = IconComponent as any;
  return <Comp size={size} className={className} />;
}


