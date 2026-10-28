const TITLE_BAR_HEIGHT = 32;

export function TitleBar() {
  return (
    <div
      className="flex items-center bg-app-deep text-text-secondary shrink-0 select-none px-2"
      style={{ height: TITLE_BAR_HEIGHT, borderBottom: "0.5px solid var(--color-border)" }}
    >
      <div className="flex-1 flex items-center text-text-muted text-xs px-2">
        Tauri App Starter
      </div>
    </div>
  );
}

