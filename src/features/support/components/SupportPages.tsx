import { useState } from "react";
import {
  Archive,
  ArrowLeft,
  CheckCheck,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Forward,
  Inbox,
  Mail,
  MailOpen,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Reply,
  Search,
  Send,
  ShieldAlert,
  Smile,
  Star,
  Tag,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { DemoPage, DemoSection, fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";

type ChatMessage = { id: number; from: "them" | "me"; text: string; time: string };

type Conversation = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  avatarClass: string;
  messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
  {
    id: "ava",
    name: "Ava Mitchell",
    initials: "AM",
    preview: "Perfect, thank you!",
    time: "2m",
    unread: 2,
    online: true,
    avatarClass: "bg-accent/15 text-accent-light",
    messages: [
      { id: 1, from: "them", text: "Hi! I just reviewed the new dashboard build. The layout feels much cleaner now.", time: "09:12" },
      { id: 2, from: "me", text: "Thanks Ava! We also tightened up the spacing on the sidebar and cards.", time: "09:14" },
      { id: 3, from: "them", text: "Nice. One thing - can we make the export button a little more visible?", time: "09:15" },
      { id: 4, from: "me", text: "Good call. I'll switch it to the accent colour and ship it this afternoon.", time: "09:18" },
      { id: 5, from: "them", text: "Perfect, thank you!", time: "09:19" },
    ],
  },
  {
    id: "noah",
    name: "Noah Bennett",
    initials: "NB",
    preview: "Invoice #2041 has been settled.",
    time: "18m",
    unread: 0,
    online: false,
    avatarClass: "bg-green-500/15 text-green-500",
    messages: [
      { id: 1, from: "them", text: "Just a quick note that invoice #2041 has been settled this morning.", time: "08:54" },
      { id: 2, from: "me", text: "Appreciated, Noah. I've marked the account as up to date.", time: "09:01" },
    ],
  },
  {
    id: "mia",
    name: "Mia Carter",
    initials: "MC",
    preview: "Could you resend the onboarding deck?",
    time: "1h",
    unread: 1,
    online: true,
    avatarClass: "bg-blue-500/15 text-blue-500",
    messages: [
      { id: 1, from: "them", text: "Could you resend the onboarding deck? The link in my invite expired.", time: "08:30" },
      { id: 2, from: "me", text: "Sent a fresh link to your work address. It stays valid for seven days.", time: "08:36" },
      { id: 3, from: "them", text: "Got it, thanks for the quick turnaround.", time: "08:38" },
    ],
  },
  {
    id: "liam",
    name: "Liam Foster",
    initials: "LF",
    preview: "All tests are passing on staging.",
    time: "3h",
    unread: 0,
    online: false,
    avatarClass: "bg-yellow-500/15 text-yellow-500",
    messages: [
      { id: 1, from: "them", text: "All tests are passing on staging, including the new checkout flow.", time: "06:45" },
      { id: 2, from: "me", text: "Great news. I'll queue the release notes for tomorrow's deploy.", time: "07:02" },
    ],
  },
  {
    id: "sophia",
    name: "Sophia Reed",
    initials: "SR",
    preview: "Let's catch up tomorrow morning.",
    time: "Yesterday",
    unread: 0,
    online: false,
    avatarClass: "bg-red-500/15 text-red-500",
    messages: [
      { id: 1, from: "them", text: "Let's catch up tomorrow morning and walk through the roadmap.", time: "16:20" },
      { id: 2, from: "me", text: "Works for me. I'll send a calendar invite for 9:30.", time: "16:24" },
    ],
  },
];

export function ChatPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState("ava");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const active = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];

  const openConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((conversation) => (conversation.id === id ? { ...conversation, unread: 0 } : conversation)),
    );
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const message: ChatMessage = { id: Date.now(), from: "me", text, time: "Now" };
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === active.id
          ? {
              ...conversation,
              preview: text,
              time: "now",
              messages: [...conversation.messages, message],
            }
          : conversation,
      ),
    );
    setDraft("");
  };

  const visibleConversations = conversations.filter((conversation) => {
    const term = query.trim().toLowerCase();
    return !term || conversation.name.toLowerCase().includes(term) || conversation.preview.toLowerCase().includes(term);
  });

  return (
    <DemoPage title="Chat" description="Real-time conversations with customers and teammates.">
      <DemoSection className="p-0 overflow-hidden">
        <div className="grid h-[640px] grid-cols-1 md:grid-cols-[280px_1fr]">
          <aside className="hidden min-h-0 flex-col border-r border-app-border md:flex">
            <div className="border-b border-app-border p-4">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search conversations"
                  className="w-full rounded-lg border border-app-border bg-app-bg py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {visibleConversations.length === 0 && (
                <p className="px-3 py-6 text-center text-xs text-text-muted">No conversations match your search.</p>
              )}
              {visibleConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => openConversation(conversation.id)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    conversation.id === active.id ? "bg-app-hover" : "hover:bg-app-hover/60"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${conversation.avatarClass}`}
                  >
                    {conversation.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-text-primary">{conversation.name}</span>
                      <span className="shrink-0 text-[10px] text-text-muted">{conversation.time}</span>
                    </span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-text-muted">{conversation.preview}</span>
                      {conversation.unread > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex min-h-0 flex-col bg-app-surface">
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-app-border px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${active.avatarClass}`}>
                    {active.initials}
                  </span>
                  {active.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-app-surface bg-green-500" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">{active.name}</p>
                  <p className={`text-[11px] ${active.online ? "text-green-500" : "text-text-muted"}`}>
                    {active.online ? "Online now" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Start voice call"
                  className="rounded-lg p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                >
                  <Phone size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Start video call"
                  className="rounded-lg p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                >
                  <Video size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Conversation options"
                  className="rounded-lg p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                >
                  <MoreVertical size={17} />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wide text-text-muted">
                <span className="h-px flex-1 bg-app-border" />
                Today
                <span className="h-px flex-1 bg-app-border" />
              </div>
              {active.messages.map((message) => (
                <div key={message.id} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      message.from === "me"
                        ? "rounded-br-sm bg-accent text-white"
                        : "rounded-bl-sm bg-app-hover text-text-primary"
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                    <p
                      className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                        message.from === "me" ? "text-white/70" : "text-text-muted"
                      }`}
                    >
                      {message.time}
                      {message.from === "me" && <CheckCheck size={12} />}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex shrink-0 items-center gap-2 border-t border-app-border p-3"
            >
              <button
                type="button"
                aria-label="Attach file"
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
              >
                <Paperclip size={18} />
              </button>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Message ${active.name.split(" ")[0]}...`}
                className="min-w-0 flex-1 rounded-full border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                aria-label="Add emoji"
                onClick={() => setDraft((current) => `${current}🙂`)}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
              >
                <Smile size={18} />
              </button>
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </section>
        </div>
      </DemoSection>
    </DemoPage>
  );
}

type TicketPriority = "High" | "Medium" | "Low";
type TicketStatus = "Open" | "In Progress" | "Resolved";
type StatusFilter = "All" | TicketStatus;

type Ticket = {
  id: string;
  subject: string;
  customer: string;
  initials: string;
  priority: TicketPriority;
  status: TicketStatus;
  updated: string;
  avatarClass: string;
};

const initialTickets: Ticket[] = [
  {
    id: "SUP-4821",
    subject: "Dashboard export fails for large date ranges",
    customer: "Ava Mitchell",
    initials: "AM",
    priority: "High",
    status: "Open",
    updated: "12 min ago",
    avatarClass: "bg-accent/15 text-accent-light",
  },
  {
    id: "SUP-4818",
    subject: "Billing invoice shows a duplicate charge",
    customer: "Noah Bennett",
    initials: "NB",
    priority: "High",
    status: "In Progress",
    updated: "48 min ago",
    avatarClass: "bg-green-500/15 text-green-500",
  },
  {
    id: "SUP-4812",
    subject: "Cannot invite teammates on the Pro plan",
    customer: "Mia Carter",
    initials: "MC",
    priority: "Medium",
    status: "Open",
    updated: "2 hours ago",
    avatarClass: "bg-blue-500/15 text-blue-500",
  },
  {
    id: "SUP-4807",
    subject: "Dark mode contrast issue on settings page",
    customer: "Liam Foster",
    initials: "LF",
    priority: "Low",
    status: "Resolved",
    updated: "5 hours ago",
    avatarClass: "bg-yellow-500/15 text-yellow-500",
  },
  {
    id: "SUP-4799",
    subject: "Webhook retries are delayed by several minutes",
    customer: "Sophia Reed",
    initials: "SR",
    priority: "Medium",
    status: "In Progress",
    updated: "Yesterday",
    avatarClass: "bg-red-500/15 text-red-500",
  },
  {
    id: "SUP-4791",
    subject: "Feature request: CSV import for contacts",
    customer: "Ethan Brooks",
    initials: "EB",
    priority: "Low",
    status: "Resolved",
    updated: "Yesterday",
    avatarClass: "bg-blue-500/15 text-blue-500",
  },
  {
    id: "SUP-4786",
    subject: "SSO login loop after password reset",
    customer: "Olivia Grant",
    initials: "OG",
    priority: "High",
    status: "Open",
    updated: "2 days ago",
    avatarClass: "bg-green-500/15 text-green-500",
  },
];

const priorityStyles: Record<TicketPriority, string> = {
  High: "border-red-500/30 bg-red-500/10 text-red-500",
  Medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  Low: "border-green-500/30 bg-green-500/10 text-green-500",
};

const ticketStatusStyles: Record<TicketStatus, string> = {
  Open: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  "In Progress": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  Resolved: "border-green-500/30 bg-green-500/10 text-green-500",
};

export function TicketListPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");

  const filters: StatusFilter[] = ["All", "Open", "In Progress", "Resolved"];
  const filtered = tickets.filter((ticket) => {
    const matchesStatus = filter === "All" || ticket.status === filter;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [ticket.id, ticket.subject, ticket.customer].some((value) => value.toLowerCase().includes(term));
    return matchesStatus && matchesQuery;
  });

  const stats = [
    { label: "Open", value: tickets.filter((ticket) => ticket.status === "Open").length, icon: Inbox, tone: "bg-blue-500/10 text-blue-500" },
    { label: "In Progress", value: tickets.filter((ticket) => ticket.status === "In Progress").length, icon: Clock, tone: "bg-yellow-500/10 text-yellow-500" },
    { label: "Resolved", value: tickets.filter((ticket) => ticket.status === "Resolved").length, icon: CheckCircle2, tone: "bg-green-500/10 text-green-500" },
  ];

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <DemoPage title="Ticket List" description="Track, prioritise and resolve customer support requests.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-app-border bg-app-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-text-muted">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">{stat.value}</p>
              </div>
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.tone}`}>
                <stat.icon size={19} />
              </span>
            </div>
            <p className="mt-3 text-[11px] text-text-muted">Across all support channels</p>
          </div>
        ))}
      </div>

      <DemoSection className="p-0 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-app-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter size={14} className="mr-1 text-text-muted" />
            {filters.map((item) => {
              const count = item === "All" ? tickets.length : tickets.filter((ticket) => ticket.status === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === item
                      ? "bg-accent text-white"
                      : "border border-app-border bg-app-bg text-text-secondary hover:bg-app-hover"
                  }`}
                >
                  {item}
                  <span className={`ml-1.5 ${filter === item ? "text-white/70" : "text-text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tickets"
                className="w-full rounded-lg border border-app-border bg-app-bg py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent sm:w-56"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              <Plus size={14} /> New Ticket
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-app-border bg-app-deep/60">
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">ID</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">Subject</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">Customer</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">Priority</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">Status</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-text-muted">Updated</th>
                <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="transition-colors hover:bg-app-hover/50">
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-accent-light">{ticket.id}</td>
                  <td className="max-w-[260px] px-4 py-3.5">
                    <p className="truncate text-sm text-text-primary">{ticket.subject}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${ticket.avatarClass}`}>
                        {ticket.initials}
                      </span>
                      <span className="text-xs text-text-secondary">{ticket.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityStyles[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${ticketStatusStyles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs text-text-muted">{ticket.updated}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Open ${ticket.id}`}
                        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-app-active hover:text-accent-light"
                      >
                        <MailOpen size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${ticket.id}`}
                        onClick={() => removeTicket(ticket.id)}
                        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center">
                    <p className="text-sm text-text-primary">No tickets found</p>
                    <p className="mt-1 text-xs text-text-muted">Try a different status filter or search term.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-app-border px-4 py-3">
          <span className="text-xs text-text-muted">
            Showing {filtered.length} of {tickets.length} tickets
          </span>
          <span className="text-[11px] text-text-muted">Median first response: 24 minutes</span>
        </div>
      </DemoSection>
    </DemoPage>
  );
}

type TicketReplyMessage = {
  id: number;
  author: string;
  initials: string;
  role: "Customer" | "Support Agent";
  time: string;
  body: string;
  internal?: boolean;
  avatarClass: string;
};

const initialReplies: TicketReplyMessage[] = [
  {
    id: 1,
    author: "Ava Mitchell",
    initials: "AM",
    role: "Customer",
    time: "Today at 09:12",
    body: "Hi team, when I try to export more than 90 days of analytics data the download spins for a few minutes and then fails. Smaller ranges work fine, so I'm not sure if it's a size limit or a timeout.",
    avatarClass: "bg-accent/15 text-accent-light",
  },
  {
    id: 2,
    author: "Jordan Lee",
    initials: "JL",
    role: "Support Agent",
    time: "Today at 09:26",
    body: "Hi Ava, thanks for the details. That behaviour matches a known timeout on large exports. Could you confirm which browser you're using and whether the report includes the events breakdown? That will help us reproduce it.",
    avatarClass: "bg-blue-500/15 text-blue-500",
  },
  {
    id: 3,
    author: "Ava Mitchell",
    initials: "AM",
    role: "Customer",
    time: "Today at 09:41",
    body: "I tried it in Chrome and Firefox, and both failed. The report does include the events breakdown. Happy to jump on a call if that's easier.",
    avatarClass: "bg-accent/15 text-accent-light",
  },
];

export function TicketReplyPage() {
  const [messages, setMessages] = useState(initialReplies);
  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  const sendReply = () => {
    const text = reply.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "Jordan Lee",
        initials: "JL",
        role: "Support Agent",
        time: "Just now",
        body: text,
        internal: internalNote,
        avatarClass: "bg-blue-500/15 text-blue-500",
      },
    ]);
    setReply("");
    setAttachment(null);
  };

  return (
    <DemoPage title="Ticket Reply" description="Respond to a customer request and keep the full context in one place.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div className="rounded-lg border border-app-border bg-app-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-accent-light">#SUP-4821</span>
                  <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-500">
                    Open
                  </span>
                  <span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
                    High priority
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-text-primary">
                  Dashboard export fails for large date ranges
                </h2>
                <p className="mt-1 text-xs text-text-muted">
                  Created 14 Oct 2026 at 09:12 · Last updated 12 minutes ago
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-3 py-1.5 text-xs text-text-secondary hover:bg-app-hover"
              >
                <Clock size={14} /> Add reminder
              </button>
            </div>
          </div>

          <DemoSection title="Conversation" description="3 messages in this thread" className="p-5">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.internal ? "rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3" : ""}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${message.avatarClass}`}>
                    {message.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">{message.author}</span>
                      <span className="rounded bg-app-hover px-1.5 py-0.5 text-[10px] text-text-muted">{message.role}</span>
                      {message.internal && (
                        <span className="rounded bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-500">
                          Internal note
                        </span>
                      )}
                      <span className="ml-auto text-[11px] text-text-muted">{message.time}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{message.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-app-border pt-5">
              <label htmlFor="ticket-reply" className={labelClass}>
                Reply to customer
              </label>
              <textarea
                id="ticket-reply"
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                rows={4}
                placeholder="Write your response..."
                className={`${fieldClass} resize-none`}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary">
                    <Paperclip size={15} />
                    {attachment ?? "Attach file"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => setAttachment(event.target.files?.[0]?.name ?? null)}
                    />
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-text-secondary">
                    <input
                      type="checkbox"
                      checked={internalNote}
                      onChange={(event) => setInternalNote(event.target.checked)}
                      className="h-3.5 w-3.5 accent-accent"
                    />
                    Internal note
                    <span className="text-[11px] text-text-muted">(not visible to customer)</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={sendReply}
                  disabled={!reply.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm text-white hover:opacity-90 disabled:opacity-40"
                >
                  <Send size={15} /> Send reply
                </button>
              </div>
            </div>
          </DemoSection>
        </div>

        <aside className="space-y-5">
          <DemoSection title="Customer" className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-light">
                AM
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">Ava Mitchell</p>
                <p className="flex items-center gap-1 text-[11px] text-text-muted">
                  <User size={11} /> Business plan
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Email</p>
                <p className="mt-0.5 text-text-secondary">ava.mitchell@northwind.io</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Phone</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-text-secondary">
                  <Phone size={12} /> +1 (415) 555-0182
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-text-muted">Location</p>
                <p className="mt-0.5 text-text-secondary">San Francisco, CA</p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1 text-[10px] uppercase tracking-wide text-text-muted">
                  <Tag size={11} /> Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] text-accent-light">Analytics</span>
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-500">Enterprise</span>
                  <span className="rounded bg-green-500/10 px-2 py-0.5 text-[10px] text-green-500">Verified</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 text-xs text-text-primary hover:bg-app-hover"
            >
              View full profile
            </button>
          </DemoSection>

          <DemoSection title="Ticket details" className="p-5">
            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">Assignee</dt>
                <dd className="text-text-secondary">Jordan Lee</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">Team</dt>
                <dd className="text-text-secondary">Product Support</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">Channel</dt>
                <dd className="text-text-secondary">Email</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">First response</dt>
                <dd className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 size={12} /> 14 min
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">Previous tickets</dt>
                <dd className="text-text-secondary">12</dd>
              </div>
            </dl>
          </DemoSection>
        </aside>
      </div>
    </DemoPage>
  );
}

type Email = {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  snippet: string;
  time: string;
  unread: boolean;
  starred: boolean;
  attachment: boolean;
  avatarClass: string;
};

const initialEmails: Email[] = [
  {
    id: 1,
    sender: "Harper Lewis",
    initials: "HL",
    subject: "Q4 campaign assets are ready",
    snippet: "I've uploaded the final banners and the updated brand guidelines...",
    time: "9:42 AM",
    unread: true,
    starred: true,
    attachment: true,
    avatarClass: "bg-accent/15 text-accent-light",
  },
  {
    id: 2,
    sender: "Marcus Chen",
    initials: "MC",
    subject: "Re: Contract renewal",
    snippet: "Legal has approved the redlines. We can sign as soon as...",
    time: "8:15 AM",
    unread: true,
    starred: false,
    attachment: true,
    avatarClass: "bg-blue-500/15 text-blue-500",
  },
  {
    id: 3,
    sender: "Priya Patel",
    initials: "PP",
    subject: "Weekly product sync notes",
    snippet: "Sharing the highlights from yesterday's roadmap review...",
    time: "Yesterday",
    unread: false,
    starred: false,
    attachment: false,
    avatarClass: "bg-green-500/15 text-green-500",
  },
  {
    id: 4,
    sender: "Daniel Kim",
    initials: "DK",
    subject: "Staging deployment complete",
    snippet: "Build 482 is live on staging. All smoke tests passed...",
    time: "Yesterday",
    unread: false,
    starred: true,
    attachment: false,
    avatarClass: "bg-yellow-500/15 text-yellow-500",
  },
  {
    id: 5,
    sender: "Elena Rossi",
    initials: "ER",
    subject: "Invoice #INV-2094",
    snippet: "Please find the attached invoice for the October billing cycle...",
    time: "Oct 24",
    unread: false,
    starred: false,
    attachment: true,
    avatarClass: "bg-blue-500/15 text-blue-500",
  },
  {
    id: 6,
    sender: "Tomas Novak",
    initials: "TN",
    subject: "Design review feedback",
    snippet: "A few small notes on the new settings layout and spacing...",
    time: "Oct 23",
    unread: false,
    starred: false,
    attachment: false,
    avatarClass: "bg-red-500/15 text-red-500",
  },
  {
    id: 7,
    sender: "Grace Okafor",
    initials: "GO",
    subject: "Welcome to the team!",
    snippet: "We're thrilled to have you join the support organisation...",
    time: "Oct 22",
    unread: false,
    starred: false,
    attachment: false,
    avatarClass: "bg-yellow-500/15 text-yellow-500",
  },
];

const folders = [
  { label: "Inbox", icon: Inbox, count: 12 },
  { label: "Starred", icon: Star, count: 3 },
  { label: "Sent", icon: Send, count: 0 },
  { label: "Drafts", icon: Mail, count: 2 },
  { label: "Spam", icon: ShieldAlert, count: 0 },
  { label: "Trash", icon: Trash2, count: 0 },
];

function FolderRail({ active, onSelect }: { active: string; onSelect: (label: string) => void }) {
  return (
    <div className="rounded-lg border border-app-border bg-app-surface p-2">
      <p className="px-2.5 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">Mailbox</p>
      <nav className="space-y-0.5">
        {folders.map((folder) => (
          <button
            key={folder.label}
            type="button"
            onClick={() => onSelect(folder.label)}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
              active === folder.label
                ? "bg-app-hover text-text-primary"
                : "text-text-secondary hover:bg-app-hover/60"
            }`}
          >
            <folder.icon size={15} className={active === folder.label ? "text-accent-light" : "text-text-muted"} />
            <span className="flex-1 text-left">{folder.label}</span>
            {folder.count > 0 && <span className="text-[10px] text-text-muted">{folder.count}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-3 rounded-md border border-app-border bg-app-bg p-2.5">
        <p className="text-[10px] font-medium text-text-secondary">Storage</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-app-hover">
          <div className="h-full w-[42%] rounded-full bg-accent" />
        </div>
        <p className="mt-1.5 text-[10px] text-text-muted">4.2 GB of 10 GB used</p>
      </div>
    </div>
  );
}

export function EmailInboxPage() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [folder, setFolder] = useState("Inbox");
  const [synced, setSynced] = useState(false);

  const allSelected = emails.length > 0 && selectedIds.length === emails.length;

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : emails.map((email) => email.id));
  };

  const toggleStar = (id: number) => {
    setEmails((prev) => prev.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)));
  };

  const removeSelected = () => {
    setEmails((prev) => prev.filter((email) => !selectedIds.includes(email.id)));
    setSelectedIds([]);
  };

  const markRead = () => {
    setEmails((prev) => prev.map((email) => (selectedIds.includes(email.id) ? { ...email, unread: false } : email)));
    setSelectedIds([]);
  };

  return (
    <DemoPage title="Email Inbox" description="A familiar mailbox layout with folders, bulk actions and quick starring.">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[200px_1fr]">
        <FolderRail active={folder} onSelect={setFolder} />

        <div className="overflow-hidden rounded-lg border border-app-border bg-app-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app-border p-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                aria-label="Select all emails"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 accent-accent"
              />
              <span className="text-xs text-text-muted">
                {selectedIds.length > 0 ? `${selectedIds.length} selected` : `${emails.length} messages`}
              </span>
              <div className="ml-2 flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Archive selected"
                  onClick={removeSelected}
                  disabled={selectedIds.length === 0}
                  className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary disabled:opacity-40"
                >
                  <Archive size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Delete selected"
                  onClick={removeSelected}
                  disabled={selectedIds.length === 0}
                  className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-40"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Mark selected as read"
                  onClick={markRead}
                  disabled={selectedIds.length === 0}
                  className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary disabled:opacity-40"
                >
                  <MailOpen size={15} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {synced && <span className="text-[10px] text-green-500">Updated just now</span>}
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  placeholder="Search mail"
                  className="w-44 rounded-lg border border-app-border bg-app-bg py-1.5 pl-8 pr-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSynced(true);
                  setSelectedIds([]);
                }}
                className="rounded-lg border border-app-border bg-app-bg px-2.5 py-1.5 text-[11px] text-text-secondary hover:bg-app-hover"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="divide-y divide-app-border">
            {emails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedId(email.id)}
                className={`flex cursor-pointer items-start gap-3 px-3 py-3.5 transition-colors ${
                  selectedId === email.id ? "bg-app-active" : email.unread ? "bg-app-bg/40 hover:bg-app-hover/60" : "hover:bg-app-hover/60"
                }`}
              >
                <input
                  type="checkbox"
                  aria-label={`Select ${email.subject}`}
                  checked={selectedIds.includes(email.id)}
                  onChange={() => toggleSelected(email.id)}
                  onClick={(event) => event.stopPropagation()}
                  className="mt-1 h-4 w-4 shrink-0 accent-accent"
                />
                <button
                  type="button"
                  aria-label={email.starred ? "Remove star" : "Add star"}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className={`mt-0.5 shrink-0 transition-colors ${
                    email.starred ? "text-yellow-500" : "text-text-dim hover:text-text-primary"
                  }`}
                >
                  <Star size={15} fill={email.starred ? "currentColor" : "none"} />
                </button>
                <span className={`mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold sm:flex ${email.avatarClass}`}>
                  {email.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className={`truncate text-sm ${email.unread ? "font-semibold text-text-primary" : "font-medium text-text-secondary"}`}>
                      {email.sender}
                    </p>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {email.attachment && <Paperclip size={12} className="text-text-muted" />}
                      <span className={`text-[10px] ${email.unread ? "font-medium text-accent-light" : "text-text-muted"}`}>
                        {email.time}
                      </span>
                    </div>
                  </div>
                  <p className={`mt-0.5 truncate text-xs ${email.unread ? "font-medium text-text-primary" : "text-text-secondary"}`}>
                    {email.subject}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-text-muted">{email.snippet}</p>
                </div>
                {email.unread && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
              </div>
            ))}
            {emails.length === 0 && (
              <div className="px-4 py-16 text-center">
                <p className="text-sm text-text-primary">Your inbox is empty</p>
                <p className="mt-1 text-xs text-text-muted">New messages will appear here.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-app-border px-3 py-2.5">
            <span className="text-[11px] text-text-muted">
              {selectedId ? `Reading: ${emails.find((email) => email.id === selectedId)?.subject ?? "message"}` : "No message selected"}
            </span>
            <span className="text-[11px] text-text-muted">1 of 1 page</span>
          </div>
        </div>
      </div>
    </DemoPage>
  );
}

const emailAttachments = [
  { name: "q4-campaign-banners.zip", size: "24.8 MB" },
  { name: "brand-guidelines-v3.pdf", size: "3.2 MB" },
];

export function EmailDetailPage() {
  const [folder, setFolder] = useState("Inbox");
  const [starred, setStarred] = useState(true);
  const [archived, setArchived] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  const sendReply = () => {
    if (!reply.trim()) return;
    setReply("");
    setSent(true);
  };

  return (
    <DemoPage title="Email Detail" description="Read a message, open attachments and reply without leaving the inbox.">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[200px_1fr]">
        <FolderRail active={folder} onSelect={setFolder} />

        <div className="overflow-hidden rounded-lg border border-app-border bg-app-surface">
          <div className="border-b border-app-border p-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
            >
              <ArrowLeft size={14} /> Back to inbox
            </button>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-text-primary">Q4 campaign assets are ready</h2>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-text-muted">
                  <Tag size={11} /> Marketing · Campaigns
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={starred ? "Remove star" : "Add star"}
                  onClick={() => setStarred((value) => !value)}
                  className={`rounded-md p-2 transition-colors hover:bg-app-hover ${
                    starred ? "text-yellow-500" : "text-text-muted"
                  }`}
                >
                  <Star size={16} fill={starred ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  aria-label={archived ? "Unarchive message" : "Archive message"}
                  onClick={() => setArchived((value) => !value)}
                  className={`rounded-md p-2 transition-colors hover:bg-app-hover ${
                    archived ? "bg-app-active text-accent-light" : "text-text-muted"
                  }`}
                >
                  <Archive size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Delete message"
                  className="rounded-md p-2 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  aria-label="More actions"
                  className="rounded-md p-2 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {archived && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] text-accent-light">
                <Archive size={12} /> This conversation is archived.
              </p>
            )}
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-light">
                  HL
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Harper Lewis</p>
                  <p className="text-xs text-text-muted">harper.lewis@northwind.io</p>
                </div>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1.5 text-xs text-text-secondary">
                  <Clock size={12} /> Today, 9:42 AM
                </p>
                <p className="mt-1 text-[11px] text-text-muted">To: Jordan Lee · CC: design@northwind.io</p>
              </div>
            </div>

            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary">
              <p>Hi Jordan,</p>
              <p>
                The Q4 campaign assets are ready for review. I've uploaded the final banner set, the updated brand
                guidelines, and the social copy deck to the shared drive.
              </p>
              <p>
                A few things to flag: the 1200x628 variants have a new headline treatment, and the dark background
                versions now use the updated accent colour. Please make sure the web team picks up the latest files
                before Thursday's launch.
              </p>
              <div className="rounded-lg border-l-2 border-accent bg-app-bg px-4 py-3 text-xs text-text-secondary">
                Launch checklist: final legal review by Wednesday 5 PM, CDN upload by Thursday 9 AM, and a monitoring
                window through the weekend.
              </div>
              <p>Let me know if anything looks off and I'll turn it around the same day.</p>
              <p>
                Best,
                <br />
                Harper
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-app-border bg-app-bg p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-text-primary">
                <Paperclip size={14} /> 2 attachments
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {emailAttachments.map((file) => (
                  <div key={file.name} className="flex items-center justify-between gap-3 rounded-md border border-app-border bg-app-surface px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-text-primary">{file.name}</p>
                      <p className="mt-0.5 text-[10px] text-text-muted">{file.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDownloaded(file.name)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-app-border px-2 py-1 text-[10px] text-text-secondary hover:bg-app-hover"
                    >
                      {downloaded === file.name ? (
                        <>
                          <CheckCircle2 size={11} className="text-green-500" /> Saved
                        </>
                      ) : (
                        <>
                          <Download size={11} /> Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-app-border pt-5">
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-2.5 py-1.5 text-xs text-text-secondary hover:bg-app-hover"
                >
                  <Reply size={13} /> Reply
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-2.5 py-1.5 text-xs text-text-secondary hover:bg-app-hover"
                >
                  <Forward size={13} /> Forward
                </button>
              </div>
              <label htmlFor="email-reply" className={labelClass}>
                Reply to Harper
              </label>
              <textarea
                id="email-reply"
                value={reply}
                onChange={(event) => {
                  setReply(event.target.value);
                  setSent(false);
                }}
                rows={4}
                placeholder="Write your reply..."
                className={`${fieldClass} resize-none`}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <Paperclip size={14} /> Attach a file
                  {sent && <span className="ml-2 text-green-500">Reply sent to Harper Lewis.</span>}
                </div>
                <button
                  type="button"
                  onClick={sendReply}
                  disabled={!reply.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm text-white hover:opacity-90 disabled:opacity-40"
                >
                  <Send size={15} /> Send reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoPage>
  );
}
