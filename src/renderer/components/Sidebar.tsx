import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Icon } from "./Icon";
import { screens, getScreenGroups, GROUP_ICON, type ScreenDef } from "../screens-registry";

interface SidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  collapsed?: boolean;
}

function NavButton({
  screen,
  active,
  onClick,
  collapsed,
  indent,
}: {
  screen: ScreenDef;
  active: boolean;
  onClick: () => void;
  collapsed?: boolean;
  indent?: boolean;
}) {
  const IconComp = screen.icon;
  return (
    <button
      onClick={onClick}
      aria-label={screen.label}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 rounded-lg transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        collapsed ? "w-9 h-9 justify-center" : `w-full ${indent ? "pl-8 pr-2.5" : "px-2.5"} h-9`
      } ${active ? "bg-app-active" : "hover:bg-app-hover"}`}
      title={collapsed ? screen.label : undefined}
    >
      <span className={active ? "text-accent-light" : "text-text-muted"}>
        <Icon icon={IconComp} size={indent ? 16 : 18} />
      </span>
      {!collapsed && (
        <span className={`text-sm truncate ${active ? "text-accent-light" : "text-text-secondary"}`}>
          {screen.label}
        </span>
      )}
    </button>
  );
}

export function Sidebar({ activeScreen, onScreenChange, collapsed = false }: SidebarProps) {
  const mainItems = screens.filter((s) => s.section === "main" && !s.group);
  const bottomItems = screens.filter((s) => s.section === "bottom");
  const groups = getScreenGroups();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of groups) {
      initial[group.name] = group.items.some((item) => item.id === activeScreen);
    }
    return initial;
  });

  useEffect(() => {
    setOpenGroups(() => {
      const next: Record<string, boolean> = {};
      for (const group of groups) {
        next[group.name] = group.items.some((item) => item.id === activeScreen);
      }
      return next;
    });
  }, [activeScreen]);

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => {
      const next: Record<string, boolean> = {};
      for (const group of groups) {
        next[group.name] = group.name === name ? !prev[name] : false;
      }
      return next;
    });
  };

  return (
    <nav
      aria-label="Primary"
      className={`flex flex-col ${collapsed ? "items-center" : "items-stretch"} py-2 px-1.5 shrink-0 bg-app-surface`}
      style={{ width: collapsed ? "56px" : "240px", borderRight: "1px solid var(--color-border)" }}
    >
      <div className={`flex-1 min-h-0 overflow-y-auto flex flex-col gap-1 ${collapsed ? "items-center" : "items-stretch"}`}>
        {mainItems.map((screen) => (
          <NavButton
            key={screen.id}
            screen={screen}
            active={activeScreen === screen.id}
            onClick={() => onScreenChange(screen.id)}
            collapsed={collapsed}
          />
        ))}

        {groups.map((group) => {
          const GroupIcon = GROUP_ICON[group.name] ?? screenIconFallback;
          const isOpen = !collapsed && !!openGroups[group.name];
          const hasActive = group.items.some((item) => item.id === activeScreen);

          if (collapsed) {
            return (
              <button
                key={group.name}
                onClick={() => onScreenChange(group.items[0]?.id ?? "")}
                aria-label={group.name}
                title={group.name}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  hasActive ? "bg-app-active text-accent-light" : "hover:bg-app-hover text-text-muted"
                }`}
              >
                <Icon icon={GroupIcon} size={18} />
              </button>
            );
          }

          return (
            <div key={group.name} className="flex flex-col gap-1">
              <button
                onClick={() => toggleGroup(group.name)}
                className={`flex items-center gap-2 w-full px-2.5 h-9 rounded-lg transition-colors ${
                  hasActive && !isOpen ? "bg-app-active" : "hover:bg-app-hover"
                }`}
              >
                <span className={hasActive ? "text-accent-light" : "text-text-muted"}>
                  <Icon icon={GroupIcon} size={18} />
                </span>
                <span className={`text-sm flex-1 text-left ${hasActive ? "text-accent-light" : "text-text-secondary"}`}>
                  {group.name}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <NavButton
                      key={item.id}
                      screen={item}
                      active={activeScreen === item.id}
                      onClick={() => onScreenChange(item.id)}
                      indent
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`flex flex-col gap-1 pt-2 mt-1 border-t border-app-border ${collapsed ? "items-center" : "items-stretch"}`}>
        {bottomItems.map((screen) => (
          <NavButton
            key={screen.id}
            screen={screen}
            active={activeScreen === screen.id}
            onClick={() => onScreenChange(screen.id)}
            collapsed={collapsed}
          />
        ))}
      </div>
    </nav>
  );
}

const screenIconFallback = screens[0].icon;
