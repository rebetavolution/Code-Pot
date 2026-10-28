import { Bell, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { HeaderSearch } from "./HeaderSearch";

interface HeaderProps {
  onToggleSidebar?: () => void;
  onNavigate?: (id: string) => void;
}

const notifications = [
  {
    id: 1,
    initials: "TF",
    name: "Terry Franci",
    text: "requests permission to change Project - Nganter App",
    time: "5 min ago",
    tone: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    initials: "AF",
    name: "Alena Franci",
    text: "requests permission to change Project - Nganter App",
    time: "8 min ago",
    tone: "from-orange-500 to-rose-600",
  },
  {
    id: 3,
    initials: "JK",
    name: "Jocelyn Kenter",
    text: "requests permission to change Project - Nganter App",
    time: "15 min ago",
    tone: "from-sky-500 to-blue-600",
  },
  {
    id: 4,
    initials: "BP",
    name: "Brandon Philips",
    text: "requests permission to change Project - Nganter App",
    time: "1 hr ago",
    tone: "from-violet-500 to-indigo-600",
  },
];

export function Header({ onToggleSidebar, onNavigate }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className="h-16 bg-app-surface flex items-center px-4 shrink-0 w-full gap-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Toggle sidebar"
          >
            <div className="h-8 w-8 rounded-md bg-app-bg border border-app-border flex items-center justify-center">
              <span className="text-xs font-semibold text-text-primary">L</span>
            </div>
            <span className="text-sm font-medium text-text-primary hidden sm:block">Logo</span>
          </button>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex h-9 w-[260px] xl:w-[360px] items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 text-left text-text-muted transition-colors hover:bg-app-hover"
        >
          <Search size={16} />
          <span className="text-sm">Search...</span>
          <span className="ml-auto rounded border border-app-border bg-app-surface px-1.5 py-0.5 text-[10px]">
            ⌘K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-secondary transition-colors"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-secondary transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-app-surface" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-app-surface border border-app-border rounded-lg shadow-lg overflow-hidden z-50">
                <div className="flex items-center justify-between border-b border-app-border px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">Notifications</p>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent-light">
                    {notifications.length} new
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-app-hover"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.tone} text-[11px] font-medium text-white`}
                      >
                        {item.initials}
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs leading-relaxed text-text-secondary">
                          <span className="font-medium text-text-primary">{item.name}</span> {item.text}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-text-muted">{item.time}</span>
                      </span>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    </button>
                  ))}
                </div>
                <button className="w-full border-t border-app-border px-4 py-2.5 text-center text-xs text-accent-light transition-colors hover:bg-app-hover">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
              className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-app-border hover:ring-accent/50 transition-all"
              title="Profile"
            >
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-sm font-medium">
                M
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-app-surface border border-app-border rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-app-border">
                  <p className="text-sm font-medium text-text-primary">Musharof Chowdhury</p>
                  <p className="text-xs text-text-muted">randomuser@pimjo.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                    Edit profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                    Account settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                    Support
                  </button>
                </div>
                <div className="py-1 border-t border-app-border">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-app-hover hover:text-text-primary">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <HeaderSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(id) => onNavigate?.(id)}
      />
    </>
  );
}
