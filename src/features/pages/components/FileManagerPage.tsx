import { ChevronRight, Download, FileText, Folder, Image, MoreVertical, Search, Upload } from "lucide-react";
import { useState } from "react";
import { PageShell } from "./PageShell";

const folders = [
  { name: "Documents", count: 24 },
  { name: "Images", count: 86 },
  { name: "Projects", count: 12 },
  { name: "Archive", count: 7 },
];

const files = [
  { name: "project-brief.pdf", type: "PDF", size: "2.4 MB", modified: "Oct 12, 2025", icon: FileText, color: "text-red-400" },
  { name: "hero-banner.png", type: "PNG", size: "1.8 MB", modified: "Oct 10, 2025", icon: Image, color: "text-green-400" },
  { name: "requirements.docx", type: "DOCX", size: "640 KB", modified: "Oct 08, 2025", icon: FileText, color: "text-blue-400" },
  { name: "roadmap.pdf", type: "PDF", size: "980 KB", modified: "Oct 05, 2025", icon: FileText, color: "text-red-400" },
  { name: "wireframes.fig", type: "FIG", size: "4.1 MB", modified: "Oct 01, 2025", icon: FileText, color: "text-purple-400" },
  { name: "team-photo.jpg", type: "JPG", size: "3.2 MB", modified: "Sep 28, 2025", icon: Image, color: "text-green-400" },
];

export function FileManagerPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <PageShell title="File Manager" description="Browse, upload and organise your files.">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
        <div className="rounded-lg border border-app-border bg-app-surface p-4 space-y-5">
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-white">
            <Upload size={15} /> Upload File
          </button>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-2">Folders</p>
            <div className="space-y-1">
              {folders.map((folder, i) => (
                <button
                  key={folder.name}
                  className={`w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
                    i === 0 ? "bg-app-hover text-text-primary" : "text-text-secondary hover:bg-app-hover"
                  }`}
                >
                  <Folder size={15} className="text-accent-light" />
                  <span className="flex-1 text-left truncate">{folder.name}</span>
                  <span className="text-[10px] text-text-muted">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Storage</p>
              <span className="text-[10px] text-text-muted">68%</span>
            </div>
            <div className="h-2 rounded-full bg-app-hover overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-accent" />
            </div>
            <p className="text-[10px] text-text-muted mt-1.5">34 GB of 50 GB used</p>
          </div>
        </div>

        <div className="rounded-lg border border-app-border bg-app-surface overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app-border p-4">
            <nav className="flex items-center gap-1.5 text-xs text-text-muted">
              <span className="hover:text-text-primary cursor-pointer">Home</span>
              <ChevronRight size={12} />
              <span className="text-text-primary">Documents</span>
            </nav>
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                placeholder="Search files"
                className="w-52 rounded-lg border border-app-border bg-app-bg pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="divide-y divide-app-border">
            <div className="hidden md:grid grid-cols-[1fr_80px_100px_120px_40px] gap-3 px-4 py-2 text-[11px] uppercase tracking-wide text-text-muted">
              <span>Name</span>
              <span>Type</span>
              <span>Size</span>
              <span>Modified</span>
              <span />
            </div>
            {files.map((file) => (
              <div
                key={file.name}
                onClick={() => setSelected(file.name === selected ? null : file.name)}
                className={`grid grid-cols-1 md:grid-cols-[1fr_80px_100px_120px_40px] gap-3 px-4 py-3 items-center cursor-pointer transition-colors ${
                  selected === file.name ? "bg-app-hover" : "hover:bg-app-hover/60"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <file.icon size={16} className={file.color} />
                  <span className="text-sm text-text-primary truncate">{file.name}</span>
                </div>
                <span className="text-xs text-text-muted">{file.type}</span>
                <span className="text-xs text-text-muted">{file.size}</span>
                <span className="text-xs text-text-muted">{file.modified}</span>
                <button className="text-text-muted hover:text-text-primary justify-self-end">
                  <MoreVertical size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-app-border px-4 py-3">
            <span className="text-xs text-text-muted">Showing 6 of 24 files</span>
            <button className="inline-flex items-center gap-1.5 text-xs text-accent-light hover:underline">
              <Download size={13} /> Download all
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
