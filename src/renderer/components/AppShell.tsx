import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TitleBar } from "./TitleBar";

interface AppShellProps {
  children: ReactNode;
  activeScreen: string;
  onNavigate: (id: string) => void;
}

export function AppShell({ children, activeScreen, onNavigate }: AppShellProps) {
  return (
    <div className="h-screen flex flex-col bg-app-bg">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeScreen={activeScreen} onScreenChange={onNavigate} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
