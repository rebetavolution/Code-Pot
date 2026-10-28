import {
  ChevronRight,
  Download,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderPlus,
  Grid2X2,
  Home,
  List,
  MoreVertical,
  Search,
  Star,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "../../../shared/components/Card";
import { PageHeader } from "../../../shared/components/layout/PageHeader";

type EntryKind = "folder" | "image" | "code" | "doc" | "sheet" | "archive" | "file";

interface Entry {
  id: string;
  name: string;
  kind: EntryKind;
  size: string;
  modified: string;
  owner: string;
  starred?: boolean;
  children?: Entry[];
}

const tree: Entry[] = [
  {
    id: "documents",
    name: "Documents",
    kind: "folder",
    size: "—",
    modified: "Today, 09:41",
    owner: "Musharof",
    children: [
      {
        id: "documents/contracts",
        name: "Contracts",
        kind: "folder",
        size: "—",
        modified: "Yesterday, 16:20",
        owner: "Musharof",
        children: [
          {
            id: "documents/contracts/nda-2026.pdf",
            name: "nda-2026.pdf",
            kind: "doc",
            size: "184 KB",
            modified: "Yesterday, 16:20",
            owner: "Musharof",
            starred: true,
          },
          {
            id: "documents/contracts/vendor-terms.docx",
            name: "vendor-terms.docx",
            kind: "doc",
            size: "92 KB",
            modified: "Oct 21, 11:02",
            owner: "Alena",
          },
        ],
      },
      {
        id: "documents/reports",
        name: "Reports",
        kind: "folder",
        size: "—",
        modified: "Today, 08:15",
        owner: "Musharof",
        children: [
          {
            id: "documents/reports/q4-summary.xlsx",
            name: "q4-summary.xlsx",
            kind: "sheet",
            size: "318 KB",
            modified: "Today, 08:15",
            owner: "Jocelyn",
          },
          {
            id: "documents/reports/roadmap.md",
            name: "roadmap.md",
            kind: "file",
            size: "12 KB",
            modified: "Oct 25, 14:48",
            owner: "Musharof",
          },
        ],
      },
      {
        id: "documents/notes.txt",
        name: "notes.txt",
        kind: "file",
        size: "4 KB",
        modified: "Oct 24, 19:30",
        owner: "Musharof",
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    kind: "folder",
    size: "—",
    modified: "Today, 10:12",
    owner: "Terry",
    children: [
      {
        id: "design/mockups",
        name: "Mockups",
        kind: "folder",
        size: "—",
        modified: "Today, 10:12",
        owner: "Terry",
        children: [
          {
            id: "design/mockups/dashboard-dark.png",
            name: "dashboard-dark.png",
            kind: "image",
            size: "1.8 MB",
            modified: "Today, 10:12",
            owner: "Terry",
            starred: true,
          },
          {
            id: "design/mockups/dashboard-light.png",
            name: "dashboard-light.png",
            kind: "image",
            size: "1.7 MB",
            modified: "Today, 10:04",
            owner: "Terry",
          },
        ],
      },
      {
        id: "design/tokens.json",
        name: "tokens.json",
        kind: "code",
        size: "26 KB",
        modified: "Oct 26, 09:22",
        owner: "Musharof",
      },
      {
        id: "design/icons.sketch",
        name: "icons.sketch",
        kind: "file",
        size: "6.4 MB",
        modified: "Oct 20, 17:55",
        owner: "Brandon",
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    kind: "folder",
    size: "—",
    modified: "Yesterday, 21:10",
    owner: "Musharof",
    children: [
      {
        id: "projects/tailadmin",
        name: "tailadmin",
        kind: "folder",
        size: "—",
        modified: "Yesterday, 21:10",
        owner: "Musharof",
        children: [
          {
            id: "projects/tailadmin/main.tsx",
            name: "main.tsx",
            kind: "code",
            size: "8 KB",
            modified: "Yesterday, 21:10",
            owner: "Musharof",
          },
          {
            id: "projects/tailadmin/package.json",
            name: "package.json",
            kind: "code",
            size: "2 KB",
            modified: "Oct 22, 12:35",
            owner: "Musharof",
          },
        ],
      },
      {
        id: "projects/backup.zip",
        name: "backup.zip",
        kind: "archive",
        size: "48.2 MB",
        modified: "Oct 18, 03:00",
        owner: "Alena",
      },
    ],
  },
  {
    id: "downloads",
    name: "Downloads",
    kind: "folder",
    size: "—",
    modified: "Today, 07:02",
    owner: "Musharof",
    children: [
      {
        id: "downloads/invoice-2481.pdf",
        name: "invoice-2481.pdf",
        kind: "doc",
        size: "76 KB",
        modified: "Today, 07:02",
        owner: "Musharof",
      },
      {
        id: "downloads/screenshot-2026-10-27.png",
        name: "screenshot-2026-10-27.png",
        kind: "image",
        size: "940 KB",
        modified: "Oct 27, 22:41",
        owner: "Musharof",
      },
    ],
  },
];

const iconFor: Record<EntryKind, typeof File> = {
  folder: Folder,
  image: FileImage,
  code: FileCode,
  doc: FileText,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  file: File,
};

const toneFor: Record<EntryKind, string> = {
  folder: "bg-accent/10 text-accent-light",
  image: "bg-violet-500/15 text-violet-400",
  code: "bg-sky-500/15 text-sky-400",
  doc: "bg-rose-500/15 text-rose-400",
  sheet: "bg-emerald-500/15 text-emerald-400",
  archive: "bg-amber-500/15 text-amber-400",
  file: "bg-app-hover text-text-muted",
};

function flatten(entries: Entry[], trail: string[] = []): { entry: Entry; trail: string[] }[] {
  return entries.flatMap((entry) => [
    { entry, trail },
    ...(entry.children ? flatten(entry.children, [...trail, entry.name]) : []),
  ]);
}

function findFolder(id: string, entries: Entry[] = tree): Entry | null {
  for (const entry of entries) {
    if (entry.id === id) return entry;
    if (entry.children) {
      const match = findFolder(id, entry.children);
      if (match) return match;
    }
  }
  return null;
}

const toolbarButton =
  "inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-app-hover hover:text-text-primary";

export function ExplorerScreen() {
  const [path, setPath] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<string | null>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const currentId = path.length ? path.join("/") : "root";

  const currentEntries = useMemo(() => {
    if (!path.length) return tree;
    const folder = findFolder(path.join("/"));
    return folder?.children ?? [];
  }, [path]);

  const breadcrumb = ["Explorer", ...path];

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return currentEntries;
    return flatten(currentEntries)
      .map((item) => item.entry)
      .filter((entry) => entry.name.toLowerCase().includes(term));
  }, [currentEntries, query]);

  const openFolder = (entry: Entry) => {
    if (entry.kind !== "folder") {
      setSelected(entry.id);
      return;
    }
    setPath(entry.id.split("/"));
    setSelected(null);
    setQuery("");
  };  const jumpTo = (index: number) => {
    setPath(index < 0 ? [] : path.slice(0, index + 1));
    setQuery("");
    setSelected(null);
  };

  const treeFolders = useMemo(() => {
    const rows: { id: string; name: string; depth: number }[] = [];
    const walk = (entries: Entry[], depth: number) => {
      entries
        .filter((entry) => entry.kind === "folder")
        .forEach((entry) => {
          rows.push({ id: entry.id, name: entry.name, depth });
          if (entry.children) walk(entry.children, depth + 1);
        });
    };
    walk(tree, 0);
    return rows;
  }, []);

  const usedStorage = 64;
  const selectedEntry = visible.find((entry) => entry.id === selected) ?? null;

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Explorer" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[250px_1fr] xl:items-start">
        <div className="space-y-6">
          <Card className="p-3">
            <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-text-muted">Folders</p>
            <div className="space-y-0.5">
              <button
                onClick={() => jumpTo(-1)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                  path.length === 0 ? "bg-app-active text-text-primary" : "text-text-secondary hover:bg-app-hover"
                }`}
              >
                <Home size={15} />
                Home
              </button>
              {treeFolders.map((folder) => {
                const active = path.join("/") === folder.id;
                return (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setPath(folder.id.split("/"));
                      setQuery("");
                      setSelected(null);
                    }}
                    style={{ paddingLeft: 8 + folder.depth * 14 }}
                    className={`flex w-full items-center gap-2 rounded-lg py-2 pr-2 text-left text-sm transition-colors ${
                      active ? "bg-app-active text-text-primary" : "text-text-secondary hover:bg-app-hover"
                    }`}
                  >
                    <Folder size={15} className="shrink-0 text-text-muted" />
                    <span className="truncate">{folder.name}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-sm font-medium text-text-primary">Storage</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-app-hover">
              <div className="h-full rounded-full bg-accent" style={{ width: `${usedStorage}%` }} />
            </div>
            <p className="mt-2 text-xs text-text-muted">
              {usedStorage} GB of 100 GB used
              <span className="block text-text-dim">36 GB free</span>
            </p>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-app-border px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm">
              {breadcrumb.map((part, index) => (
                <span key={`${part}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight size={14} className="text-text-dim" />}
                  <button
                    onClick={() => jumpTo(index - 1)}
                    className={
                      index === breadcrumb.length - 1
                        ? "font-medium text-text-primary"
                        : "text-text-muted hover:text-text-primary"
                    }
                  >
                    {part}
                  </button>
                </span>
              ))}
            </nav>

            <div className="ml-auto flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search files..."
                  className="h-9 w-44 rounded-lg border border-app-border bg-app-bg pl-8 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="inline-flex rounded-lg border border-app-border bg-app-bg p-0.5">
                {(
                  [
                    { id: "grid" as const, icon: Grid2X2 },
                    { id: "list" as const, icon: List },
                  ] as const
                ).map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setLayout(option.id)}
                      aria-label={`${option.id} view`}
                      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                        layout === option.id ? "bg-app-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <Icon size={15} />
                    </button>
                  );
                })}
              </div>
              <button className={toolbarButton}>
                <FolderPlus size={14} />
                New folder
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">
                <Upload size={14} />
                Upload
              </button>
            </div>
          </div>

          {selectedEntry && (
            <div className="flex flex-wrap items-center gap-3 border-b border-app-border bg-app-bg/60 px-4 py-2.5">
              <span className={`flex h-8 w-8 items-center justify-center rounded-md ${toneFor[selectedEntry.kind]}`}>
                {(() => {
                  const Icon = iconFor[selectedEntry.kind];
                  return <Icon size={15} />;
                })()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-text-primary">{selectedEntry.name}</p>
                <p className="text-[11px] text-text-muted">
                  {selectedEntry.size} · modified {selectedEntry.modified} · {selectedEntry.owner}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className={toolbarButton} onClick={() => setSelected(null)}>
                  <Star size={13} />
                  Star
                </button>
                <button className={toolbarButton}>
                  <Download size={13} />
                  Download
                </button>
              </div>
            </div>
          )}

          {layout === "grid" ? (
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((entry) => {
                const Icon = iconFor[entry.kind];
                return (
                  <div
                    key={entry.id}
                    onDoubleClick={() => openFolder(entry)}
                    onClick={() => setSelected(entry.id)}
                    className={`group relative cursor-pointer rounded-xl border p-3 transition-colors ${
                      selected === entry.id
                        ? "border-accent/60 bg-accent/5"
                        : "border-app-border bg-app-bg hover:border-accent/40 hover:bg-app-hover"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneFor[entry.kind]}`}>
                        <Icon size={18} />
                      </span>
                      <div className="relative">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setMenuFor(menuFor === entry.id ? null : entry.id);
                          }}
                          className="rounded p-1 text-text-muted hover:bg-app-surface hover:text-text-primary"
                          aria-label={`Actions for ${entry.name}`}
                        >
                          <MoreVertical size={15} />
                        </button>
                        {menuFor === entry.id && (
                          <div className="absolute right-0 top-7 z-20 w-32 rounded-lg border border-app-border bg-app-surface p-1 shadow-lg">
                            {["Open", "Rename", "Share", "Delete"].map((action) => (
                              <button
                                key={action}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setMenuFor(null);
                                  if (action === "Open") openFolder(entry);
                                }}
                                className={`block w-full rounded px-2 py-1.5 text-left text-xs hover:bg-app-hover ${
                                  action === "Delete" ? "text-red-400" : "text-text-secondary"
                                }`}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 truncate text-sm text-text-primary">{entry.name}</p>
                    <p className="text-[11px] text-text-muted">
                      {entry.kind === "folder" ? `${entry.children?.length ?? 0} items` : entry.size}
                    </p>
                    {entry.starred && <Star size={12} className="absolute bottom-3 right-3 fill-amber-400 text-amber-400" />}
                  </div>
                );
              })}
              {visible.length === 0 && (
                <p className="col-span-full py-16 text-center text-sm text-text-muted">
                  {query ? `No files match "${query}".` : "This folder is empty."}
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-app-border bg-app-bg/60">
                  <tr>
                    {["Name", "Owner", "Size", "Modified", ""].map((heading) => (
                      <th key={heading} className="whitespace-nowrap px-4 py-2.5 text-left text-[11px] font-medium text-text-muted">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border">
                  {visible.map((entry) => {
                    const Icon = iconFor[entry.kind];
                    return (
                      <tr
                        key={entry.id}
                        onClick={() => setSelected(entry.id)}
                        onDoubleClick={() => openFolder(entry)}
                        className={`cursor-pointer transition-colors ${
                          selected === entry.id ? "bg-accent/5" : "hover:bg-app-hover"
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-md ${toneFor[entry.kind]}`}>
                              <Icon size={15} />
                            </span>
                            <span className="text-sm text-text-primary">{entry.name}</span>
                            {entry.starred && <Star size={12} className="fill-amber-400 text-amber-400" />}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-text-secondary">{entry.owner}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-text-muted">{entry.size}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-text-muted">{entry.modified}</td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              setMenuFor(menuFor === entry.id ? null : entry.id);
                            }}
                            className="relative rounded p-1 text-text-muted hover:bg-app-surface hover:text-text-primary"
                            aria-label={`Actions for ${entry.name}`}
                          >
                            <MoreVertical size={15} />
                            {menuFor === entry.id && (
                              <div className="absolute right-0 top-7 z-20 w-32 rounded-lg border border-app-border bg-app-surface p-1 text-left shadow-lg">
                                {["Open", "Rename", "Share", "Delete"].map((action) => (
                                  <button
                                    key={action}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setMenuFor(null);
                                      if (action === "Open") openFolder(entry);
                                    }}
                                    className={`block w-full rounded px-2 py-1.5 text-left text-xs hover:bg-app-hover ${
                                      action === "Delete" ? "text-red-400" : "text-text-secondary"
                                    }`}
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-sm text-text-muted">
                        {query ? `No files match "${query}".` : "This folder is empty."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-app-border px-4 py-2.5 text-[11px] text-text-muted">
            <span>
              {visible.length} item{visible.length === 1 ? "" : "s"}
              {query ? ` matching "${query}"` : ""}
            </span>
            <span className="truncate">/{currentId === "root" ? "" : path.join("/")}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
