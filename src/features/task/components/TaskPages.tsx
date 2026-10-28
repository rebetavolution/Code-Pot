import { Check, Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoPage, DemoSection } from "../../../shared/components/layout/DemoPage";

type Priority = "High" | "Medium" | "Low";

interface Task {
  id: number;
  title: string;
  project: string;
  priority: Priority;
  due: string;
  assignee: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: "Update dashboard analytics widgets", project: "Design System", priority: "High", due: "Oct 30, 2025", assignee: "MC", done: false },
  { id: 2, title: "Fix responsive issues on tables", project: "Web App", priority: "Medium", due: "Oct 31, 2025", assignee: "AF", done: false },
  { id: 3, title: "Write onboarding documentation", project: "Docs", priority: "Low", due: "Nov 02, 2025", assignee: "JK", done: false },
  { id: 4, title: "Review pull request #482", project: "Web App", priority: "High", due: "Oct 29, 2025", assignee: "BP", done: true },
  { id: 5, title: "Prepare release notes", project: "Release", priority: "Medium", due: "Nov 04, 2025", assignee: "MC", done: false },
  { id: 6, title: "Migrate legacy icons to lucide", project: "Design System", priority: "Low", due: "Nov 06, 2025", assignee: "TF", done: true },
];

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const avatarColor = (initials: string) => {
  const colors = ["from-violet-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-orange-500 to-red-600", "from-sky-500 to-blue-600", "from-pink-500 to-rose-600"];
  return colors[initials.charCodeAt(0) % colors.length];
};

export function TaskListPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"All" | "Open" | "Completed">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (filter === "All" || (filter === "Open" ? !t.done : t.done)) &&
          t.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [tasks, filter, query],
  );

  const toggle = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const openCount = tasks.filter((t) => !t.done).length;

  return (
    <DemoPage title="Task List" description="Track work items by priority and due date.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total tasks", value: tasks.length, color: "text-text-primary" },
          { label: "Open", value: openCount, color: "text-yellow-400" },
          { label: "Completed", value: tasks.length - openCount, color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-app-border bg-app-surface p-5">
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <DemoSection>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks"
                className="w-56 rounded-lg border border-app-border bg-app-bg pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="inline-flex rounded-lg border border-app-border overflow-hidden">
              {(["All", "Open", "Completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 text-xs ${
                    filter === f ? "bg-accent text-white" : "bg-app-bg text-text-secondary hover:bg-app-hover"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-3 py-2 text-xs text-text-secondary hover:bg-app-hover">
              <Filter size={13} /> Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs text-white hover:opacity-90">
              <Plus size={13} /> New task
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((task) => (
            <div
              key={task.id}
              className={`flex flex-wrap items-center gap-3 rounded-lg border border-app-border px-4 py-3 transition-colors ${
                task.done ? "bg-app-bg/60" : "bg-app-bg hover:bg-app-hover/60"
              }`}
            >
              <button
                onClick={() => toggle(task.id)}
                className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                  task.done ? "bg-accent border-accent text-white" : "border-app-border text-transparent hover:border-accent"
                }`}
              >
                <Check size={12} />
              </button>
              <div className="flex-1 min-w-[200px]">
                <p className={`text-sm ${task.done ? "text-text-muted line-through" : "text-text-primary"}`}>{task.title}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{task.project}</p>
              </div>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] ${priorityStyle[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-[11px] text-text-muted w-24">{task.due}</span>
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColor(task.assignee)} flex items-center justify-center text-[10px] font-medium text-white`}>
                {task.assignee}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-text-muted">No tasks match your filters.</p>
          )}
        </div>
      </DemoSection>
    </DemoPage>
  );
}

interface KanbanCard {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  due: string;
  assignee: string;
  comments: number;
}

const columns = ["Backlog", "In Progress", "Review", "Done"] as const;
type Column = (typeof columns)[number];

const initialBoard: Record<Column, KanbanCard[]> = {
  Backlog: [
    { id: "c1", title: "Design new settings page", tag: "Design", tagColor: "bg-purple-500/15 text-purple-400", due: "Nov 04", assignee: "AF", comments: 3 },
    { id: "c2", title: "Research competitor onboarding", tag: "Research", tagColor: "bg-blue-500/15 text-blue-400", due: "Nov 06", assignee: "JK", comments: 1 },
    { id: "c3", title: "Prepare Q4 roadmap", tag: "Planning", tagColor: "bg-yellow-500/15 text-yellow-400", due: "Nov 10", assignee: "MC", comments: 5 },
  ],
  "In Progress": [
    { id: "c4", title: "Build data table filters", tag: "Frontend", tagColor: "bg-green-500/15 text-green-400", due: "Oct 30", assignee: "BP", comments: 4 },
    { id: "c5", title: "Integrate payment gateway", tag: "Backend", tagColor: "bg-orange-500/15 text-orange-400", due: "Nov 02", assignee: "TF", comments: 2 },
  ],
  Review: [
    { id: "c6", title: "Update icon library", tag: "Frontend", tagColor: "bg-green-500/15 text-green-400", due: "Oct 29", assignee: "MC", comments: 6 },
  ],
  Done: [
    { id: "c7", title: "Set up CI pipeline", tag: "DevOps", tagColor: "bg-sky-500/15 text-sky-400", due: "Oct 24", assignee: "JK", comments: 2 },
    { id: "c8", title: "Launch marketing landing page", tag: "Marketing", tagColor: "bg-pink-500/15 text-pink-400", due: "Oct 22", assignee: "AF", comments: 7 },
  ],
};

export function KanbanPage() {
  const [board, setBoard] = useState<Record<Column, KanbanCard[]>>(initialBoard);
  const [dragging, setDragging] = useState<{ cardId: string; from: Column } | null>(null);

  const drop = (to: Column) => {
    if (!dragging) return;
    const { cardId, from } = dragging;
    if (from === to) return setDragging(null);
    setBoard((prev) => {
      const card = prev[from].find((c) => c.id === cardId);
      if (!card) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((c) => c.id !== cardId),
        [to]: [...prev[to], card],
      };
    });
    setDragging(null);
  };

  return (
    <DemoPage title="Task Kanban" description="Drag cards between columns to update status.">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columns.map((column) => (
          <div
            key={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => drop(column)}
            className="rounded-lg border border-app-border bg-app-surface p-3 min-h-[300px]"
          >
            <div className="flex items-center justify-between px-1 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    column === "Backlog"
                      ? "bg-gray-400"
                      : column === "In Progress"
                        ? "bg-blue-400"
                        : column === "Review"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                  }`}
                />
                <h3 className="text-sm font-medium text-text-primary">{column}</h3>
                <span className="rounded-full bg-app-hover px-1.5 py-0.5 text-[10px] text-text-muted">
                  {board[column].length}
                </span>
              </div>
              <button className="text-text-muted hover:text-text-primary">
                <Plus size={15} />
              </button>
            </div>

            <div className="space-y-2.5">
              {board[column].map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => setDragging({ cardId: card.id, from: column })}
                  onDragEnd={() => setDragging(null)}
                  className={`cursor-grab active:cursor-grabbing rounded-lg border border-app-border bg-app-bg p-3 transition-opacity ${
                    dragging?.cardId === card.id ? "opacity-40" : ""
                  }`}
                >
                  <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] ${card.tagColor}`}>{card.tag}</span>
                  <p className="mt-2 text-sm text-text-primary leading-snug">{card.title}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColor(card.assignee)} flex items-center justify-center text-[9px] font-medium text-white`}>
                      {card.assignee}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted">
                      <span>{card.due}</span>
                      <span>·</span>
                      <span>{card.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
              {board[column].length === 0 && (
                <div className="rounded-lg border border-dashed border-app-border py-8 text-center text-[11px] text-text-muted">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DemoPage>
  );
}
