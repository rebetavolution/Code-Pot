import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  Paperclip,
  RefreshCw,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "../../../shared/components/Card";
import { PageHeader } from "../../../shared/components/layout/PageHeader";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

const models = [
  { id: "gpt-5-mini", label: "GPT-5 mini", note: "Fast · general purpose" },
  { id: "claude-sonnet", label: "Claude Sonnet", note: "Long context · writing" },
  { id: "deepseek-v3", label: "DeepSeek V3", note: "Code · reasoning" },
  { id: "local-llama", label: "Llama 3.3 (local)", note: "On-device · private" },
];

const suggestions = [
  "Summarise this week's orders",
  "Draft a release note for v2.4",
  "Explain this SQL query",
  "Write a product description",
];

const replies = [
  "Here's a concise summary based on the workspace data:\n\n• Orders are up 9.05% week over week, led by the Accessories category.\n• Two orders are still pending payment — both older than 48 hours.\n• Refund volume is flat at 0.6% of revenue.\n\nWant me to break this down per region?",
  "Drafted a release note:\n\n**v2.4 — Faster tables, calmer settings**\n- Data tables now render 3× faster on large datasets.\n- Settings moved into a single tabbed page.\n- Fixed sidebar collapsing on small screens.\n\nI kept it under 60 words; say the word if you want a longer changelog.",
  "The query joins `orders` to `customers` on `customer_id`, then filters to the last 30 days. Two things to watch:\n\n1. The `WHERE` clause runs after the join, so it can't use the index on `created_at` alone.\n2. `SUM(total)` will double-count if a customer has multiple addresses.\n\nTry moving the date filter into a subquery first.",
];

const statCards = [
  { label: "Requests today", value: "1,284", delta: "+12.4%" },
  { label: "Tokens used", value: "482K", delta: "+6.1%" },
  { label: "Avg. latency", value: "820 ms", delta: "−14.2%" },
  { label: "Credits left", value: "8,410", delta: "of 20K" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi Musharof — I'm your workspace assistant. I can summarise data, draft copy, explain code, or search across your pages. What are we working on?",
  },
  {
    id: 2,
    role: "user",
    content: "Give me a quick health check on this week's store performance.",
  },
  {
    id: 3,
    role: "assistant",
    content: replies[0],
  },
];

export function AiScreen() {
  const [model, setModel] = useState(models[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down" | undefined>>({});
  const endRef = useRef<HTMLDivElement>(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || thinking) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content }]);
    setDraft("");
    setThinking(true);
    const reply = replies[replyIndex.current % replies.length];
    replyIndex.current += 1;
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: reply }]);
      setThinking(false);
    }, 900);
  };

  const copy = async (message: Message) => {    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(message.id);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="AI Assistant" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-[11px] text-text-muted">{stat.label}</p>
            <p className="mt-1.5 text-xl font-semibold text-text-primary">{stat.value}</p>
            <p className="mt-0.5 text-[11px] text-text-muted">{stat.delta}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px] xl:items-start">
        <Card className="flex h-[620px] flex-col overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-app-border px-4 py-3">
            <div className="relative">
              <button
                onClick={() => setModelOpen(!modelOpen)}
                className="flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2 text-left transition-colors hover:bg-app-hover"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent-light">
                  <Sparkles size={13} />
                </span>
                <span>
                  <span className="block text-xs font-medium text-text-primary">{model.label}</span>
                  <span className="block text-[10px] text-text-muted">{model.note}</span>
                </span>
                <ChevronDown size={14} className="ml-1 text-text-muted" />
              </button>
              {modelOpen && (
                <div className="absolute left-0 top-12 z-30 w-64 rounded-xl border border-app-border bg-app-surface p-1.5 shadow-xl">
                  {models.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setModel(option);
                        setModelOpen(false);
                      }}
                      className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-app-hover"
                    >
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-app-bg text-text-muted">
                        {option.id === model.id ? <Check size={12} className="text-accent-light" /> : <Bot size={12} />}
                      </span>
                      <span>
                        <span className="block text-xs text-text-primary">{option.label}</span>
                        <span className="block text-[10px] text-text-muted">{option.note}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">
              Connected
            </span>

            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => setMessages(initialMessages.slice(0, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                title="New chat"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setMessages([])}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-app-hover hover:text-red-400"
                title="Clear conversation"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-accent to-accent-light text-white"
                      : "border border-app-border bg-app-bg text-accent-light"
                  }`}
                >
                  {message.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </span>

                <div className={`max-w-[85%] sm:max-w-[75%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block whitespace-pre-line rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-tr-sm bg-accent text-white"
                        : "rounded-tl-sm border border-app-border bg-app-bg text-text-secondary"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "assistant" && (
                    <div className="mt-1.5 flex items-center gap-1">
                      <button
                        onClick={() => copy(message)}
                        className="flex items-center gap-1 rounded px-1.5 py-1 text-[10px] text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                      >
                        {copied === message.id ? <Check size={11} /> : <Copy size={11} />}
                        {copied === message.id ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={() =>
                          setFeedback((prev) => ({ ...prev, [message.id]: prev[message.id] === "up" ? undefined : "up" }))
                        }
                        className={`rounded p-1 transition-colors hover:bg-app-hover ${
                          feedback[message.id] === "up" ? "text-green-400" : "text-text-muted"
                        }`}
                        aria-label="Good response"
                      >
                        <ThumbsUp size={11} />
                      </button>
                      <button
                        onClick={() =>
                          setFeedback((prev) => ({ ...prev, [message.id]: prev[message.id] === "down" ? undefined : "down" }))
                        }
                        className={`rounded p-1 transition-colors hover:bg-app-hover ${
                          feedback[message.id] === "down" ? "text-red-400" : "text-text-muted"
                        }`}
                        aria-label="Bad response"
                      >
                        <ThumbsDown size={11} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-app-border bg-app-bg text-accent-light">
                  <Bot size={15} />
                </span>
                <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm border border-app-border bg-app-bg px-4 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-muted"
                      style={{ animationDelay: `${dot * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {messages.length === 0 && !thinking && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-light">
                  <Sparkles size={22} />
                </span>
                <p className="mt-3 text-sm font-medium text-text-primary">Start a new conversation</p>
                <p className="mt-1 max-w-xs text-xs text-text-muted">
                  Ask about your workspace data, draft content, or explain code.
                </p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-app-border p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-0.5">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => send(suggestion)}
                  className="shrink-0 rounded-full border border-app-border bg-app-bg px-3 py-1.5 text-[11px] text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
              className="flex items-end gap-2 rounded-xl border border-app-border bg-app-bg p-2 focus-within:ring-1 focus-within:ring-accent"
            >
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
                title="Attach file"
              >
                <Paperclip size={16} />
              </button>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(draft);
                  }
                }}
                rows={1}
                placeholder={`Message ${model.label}...`}
                className="max-h-28 min-h-8 flex-1 resize-none bg-transparent px-1 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || thinking}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                title="Send"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-text-muted">
              Responses are simulated in this starter. Connect a provider to go live.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-sm font-medium text-text-primary">Prompt library</h2>
            <p className="text-[11px] text-text-muted">Reusable prompts for this workspace.</p>
            <div className="mt-3 space-y-2">
              {[
                { title: "Weekly summary", body: "Summarise orders, revenue and refunds for the last 7 days." },
                { title: "Release notes", body: "Turn merged pull requests into a customer-facing changelog." },
                { title: "Code explainer", body: "Explain this function step by step, then suggest improvements." },
              ].map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => send(preset.body)}
                  className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-left transition-colors hover:border-accent/40 hover:bg-app-hover"
                >
                  <p className="text-xs font-medium text-text-primary">{preset.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">{preset.body}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-sm font-medium text-text-primary">Usage this month</h2>
            <div className="mt-4 space-y-3">
              {[
                { label: "Chat", pct: 62, tone: "bg-accent" },
                { label: "Text generation", pct: 24, tone: "bg-sky-400" },
                { label: "Code", pct: 14, tone: "bg-violet-400" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">{row.label}</span>
                    <span className="text-text-muted">{row.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-app-hover">
                    <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-sm font-medium text-text-primary">Recent chats</h2>
            <div className="mt-2 space-y-0.5">
              {["Store health check", "v2.4 release note", "SQL index question", "Pricing page copy"].map((chat, index) => (
                <button
                  key={chat}
                  className={`block w-full truncate rounded-lg px-2 py-2 text-left text-xs transition-colors ${
                    index === 0 ? "bg-app-active text-text-primary" : "text-text-secondary hover:bg-app-hover"
                  }`}
                >
                  {chat}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
