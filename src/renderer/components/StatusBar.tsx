export function StatusBar() {
  return (
    <div className="h-6 bg-app-surface flex items-center px-3 text-xs text-text-muted" style={{ borderTop: "1px solid var(--color-border)" }}>
      <span>Ready</span>
    </div>
  );
}

