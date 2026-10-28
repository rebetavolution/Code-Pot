import { useEffect, useState } from "react";
import { Sidebar } from "./renderer/components/Sidebar";
import { Header } from "./renderer/components/Header";
import { StatusBar } from "./renderer/components/StatusBar";
import { ToastProvider } from "./renderer/contexts/ToastContext";
import { ThemeProvider } from "./renderer/contexts/ThemeContext";
import { SCREEN_BY_ID, screens } from "./renderer/screens-registry";


function AppContent() {
  const [activeScreen, setActiveScreen] = useState(screens[0]?.id || "home");
  const [visitedScreens, setVisitedScreens] = useState<Set<string>>(new Set([screens[0]?.id || "home"]));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setVisitedScreens((prev) => {
      if (prev.has(activeScreen)) return prev;
      return new Set(prev).add(activeScreen);
    });
  }, [activeScreen]);

  return (
    <div className="flex flex-col h-screen w-screen bg-app-base">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={setActiveScreen}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} collapsed={sidebarCollapsed} />
        <main className="flex-1 bg-app-bg overflow-auto">
          {Array.from(visitedScreens).map((screenId) => {
            const screen = SCREEN_BY_ID[screenId];
            if (!screen) return null;
            const Screen = screen.component;
            const isActive = screenId === activeScreen;
            return (
              <div key={screenId} style={{ display: isActive ? "contents" : "none" }}>
                <Screen />
              </div>
            );
          })}
        </main>
      </div>
      <StatusBar />
    </div>

  );
}


function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;


