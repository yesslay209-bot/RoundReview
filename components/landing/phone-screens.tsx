"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Flag,
  Home,
  Lightbulb,
  Menu,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Live, interactive recreations of the RoundReview mobile app screens.
 * Everything inside the phone actually works: filters filter, search
 * searches, goals complete, and the mini debate timer counts down.
 */

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "tournaments", label: "Tournam…", icon: Trophy },
  { key: "feedback", label: "Feedback", icon: MessageCircle },
  { key: "goals", label: "Goals", icon: Flag },
  { key: "more", label: "More", icon: Menu },
] as const;

export type ScreenKey = (typeof NAV_ITEMS)[number]["key"];
/** Screens reachable inside the phone but not on the tab bar. */
export type PhoneScreenKey = ScreenKey | "timer";

export interface ScreenProps {
  go: (key: PhoneScreenKey) => void;
}

export function PhoneBottomNav({
  active,
  onSelect,
}: {
  active: PhoneScreenKey;
  onSelect: (k: ScreenKey) => void;
}) {
  const highlighted: ScreenKey = active === "timer" ? "more" : active;
  return (
    <nav
      aria-label="App tabs"
      className="grid grid-cols-5 border-t border-[#ECEDF5] bg-white px-1 pb-2.5 pt-1.5"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          aria-pressed={highlighted === item.key}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-lg py-1 text-[8px] font-semibold transition-colors",
            highlighted === item.key ? "text-[#5B5BD6]" : "text-[#9AA0B5] hover:text-[#5B6178]"
          )}
        >
          <item.icon className="size-4" aria-hidden />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

const screenBody = "relative flex-1 overflow-y-auto bg-[#F6F7FB] px-3.5 pt-3 pb-4 scrollbar-thin";

/* ------------------------------- Home ------------------------------- */

export function HomeScreen({ go }: ScreenProps) {
  return (
    <div className={screenBody}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[17px] font-bold text-[#171B2E]">RoundReview</p>
          <p className="text-[9px] text-[#8A90A5]">Your debate performance hub</p>
        </div>
        <button
          onClick={() => go("feedback")}
          aria-label="Search"
          className="flex size-7 items-center justify-center rounded-full bg-[#6366F1] transition-transform active:scale-90"
        >
          <Search className="size-3.5 text-white" aria-hidden />
        </button>
      </div>

      {/* Daily tip */}
      <div className="mt-3 rounded-xl border border-[#DDE0FA] bg-[#EEF0FF] p-2.5">
        <p className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wide text-[#5B5BD6]">
          <Lightbulb className="size-2.5" aria-hidden /> Daily Tip
        </p>
        <p className="mt-1 text-[10px] font-semibold leading-snug text-[#2A2F45]">
          Confidence comes from preparation. You&apos;ve got this.
        </p>
      </div>

      {/* Goals promo — taps through to the Goals screen */}
      <button
        onClick={() => go("goals")}
        className="mt-2.5 flex w-full items-center gap-2.5 rounded-xl bg-[#EC5C9B] p-2.5 text-left text-white transition-transform active:scale-[0.98]"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/25">
          <CalendarDays className="size-3.5" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-[10.5px] font-bold leading-tight">
            Having a tournament soon?
          </span>
          <span className="block text-[8.5px] text-white/85">Review your improvement goals</span>
        </span>
        <ChevronRight className="size-3.5 shrink-0" aria-hidden />
      </button>

      {/* Stat tiles */}
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {[
          ["Tournaments", "4", "bg-[#5B7CFA]", "tournaments"],
          ["Win Rate", "70%", "bg-[#38A3E8]", "tournaments"],
          ["Feedback", "12", "bg-[#8B5CF6]", "feedback"],
        ].map(([label, value, bg, dest]) => (
          <button
            key={label}
            onClick={() => go(dest as PhoneScreenKey)}
            className={cn("rounded-xl p-2 text-left text-white transition-transform active:scale-95", bg)}
          >
            <p className="text-[7px] font-bold uppercase tracking-wide text-white/80">{label}</p>
            <p className="font-display text-lg font-bold leading-tight">{value}</p>
          </button>
        ))}
      </div>

      {/* Recent tournaments */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11px] font-bold text-[#171B2E]">Recent Tournaments</p>
        <button onClick={() => go("tournaments")} className="text-[9px] font-semibold text-[#5B5BD6]">
          View all
        </button>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {[
          ["Peninsula Season Opener", "Sep 5–6 · 4–1", "LD"],
          ["Valley Summer Classic", "Jun 20–21 · 4–2", "LD"],
        ].map(([name, meta, fmt]) => (
          <button
            key={name}
            onClick={() => go("tournaments")}
            className="flex w-full items-center gap-2 rounded-xl border border-[#ECEDF5] bg-white p-2 text-left transition-all hover:border-[#C7CBFA] active:scale-[0.98]"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[8px] font-bold text-[#5B5BD6]">
              {fmt}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-bold text-[#2A2F45]">{name}</span>
              <span className="block text-[8px] text-[#9AA0B5]">{meta}</span>
            </span>
            <ChevronRight className="size-3 shrink-0 text-[#C6C9D9]" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Tournaments ---------------------------- */

const TOURNAMENTS = [
  { name: "California Invitational", meta: "Oct 18–19 · Irvine, CA", fmt: "LD", status: "Registered", chip: "text-[#5B5BD6] bg-[#EEF0FF]" },
  { name: "Peninsula Season Opener", meta: "Sep 5–6 · 4–1 · 28.4 avg", fmt: "LD", status: "Completed", chip: "text-[#12915B] bg-[#E5F6EE]" },
  { name: "Berkeley Round Robin", meta: "Aug 15 · 3–1 · 27.8 avg", fmt: "PF", status: "Completed", chip: "text-[#12915B] bg-[#E5F6EE]" },
  { name: "Valley Summer Classic", meta: "Jun 20–21 · 4–2 · 28.0 avg", fmt: "LD", status: "Completed", chip: "text-[#12915B] bg-[#E5F6EE]" },
];

export function TournamentsScreen() {
  const [filter, setFilter] = useState("All");
  const list = TOURNAMENTS.filter((t) => filter === "All" || t.fmt === filter);
  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">Tournaments</p>
      <div className="mt-2 flex gap-1.5">
        {["All", "LD", "PF", "CX"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full px-2.5 py-1 text-[8.5px] font-bold transition-all active:scale-95",
              filter === f
                ? "bg-[#6366F1] text-white"
                : "border border-[#E3E5F0] bg-white text-[#5B6178] hover:border-[#C7CBFA]"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DDE0FA] bg-white p-4 text-center">
            <p className="text-[10px] font-bold text-[#5B6178]">No {filter} tournaments yet</p>
            <p className="mt-0.5 text-[8.5px] text-[#9AA0B5]">Tap + to add your first one</p>
          </div>
        ) : (
          list.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#ECEDF5] bg-white p-2.5 transition-all hover:border-[#C7CBFA]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10.5px] font-bold leading-tight text-[#2A2F45]">{t.name}</p>
                <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-bold", t.chip)}>
                  {t.status}
                </span>
              </div>
              <p className="mt-0.5 text-[8.5px] text-[#9AA0B5]">
                {t.fmt} · {t.meta}
              </p>
            </div>
          ))
        )}
      </div>
      <div
        aria-hidden
        className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-[#6366F1] text-xl font-light text-white shadow-lg"
      >
        +
      </div>
    </div>
  );
}

/* ------------------------------ Feedback ------------------------------ */

const FEEDBACK = [
  { judge: "Sarah Mitchell", meta: "Peninsula · R4 · Win", quote: "Pacing was controlled, signposting was clean…", tags: ["Delivery"] },
  { judge: "James Corrigan", meta: "Peninsula · R1 · Win", quote: "Strong evidence comparison — this won you the round.", tags: ["Evidence"] },
  { judge: "Anita Deshpande", meta: "Valley · R5 · Loss", quote: "You were winning until the NR — watch time allocation.", tags: ["Rebuttal"] },
];

export function FeedbackScreen() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const list = FEEDBACK.filter((f) => {
    if (tag !== "All" && !f.tags.includes(tag)) return false;
    const q = query.trim().toLowerCase();
    return !q || `${f.judge} ${f.meta} ${f.quote}`.toLowerCase().includes(q);
  });
  return (
    <div className={screenBody}>
      <div className="flex items-center justify-between">
        <p className="font-display text-[17px] font-bold text-[#171B2E]">Feedback</p>
        <Star className="size-3.5 text-[#C6C9D9]" aria-hidden />
      </div>
      <label className="mt-2 flex items-center gap-1.5 rounded-full border border-[#E3E5F0] bg-white px-2.5 py-1.5 transition-colors focus-within:border-[#6366F1]">
        <Search className="size-3 shrink-0 text-[#9AA0B5]" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search feedback…"
          aria-label="Search feedback"
          className="w-full bg-transparent text-[9px] text-[#2A2F45] outline-none placeholder:text-[#B7BBCB]"
        />
      </label>
      <div className="mt-2 flex gap-1.5">
        {["All", "Delivery", "Evidence", "Rebuttal"].map((f) => (
          <button
            key={f}
            onClick={() => setTag(f)}
            aria-pressed={tag === f}
            className={cn(
              "rounded-full px-2 py-0.5 text-[8px] font-bold transition-all active:scale-95",
              tag === f
                ? "bg-[#6366F1] text-white"
                : "border border-[#E3E5F0] bg-white text-[#5B6178] hover:border-[#C7CBFA]"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DDE0FA] bg-white p-4 text-center">
            <p className="text-[10px] font-bold text-[#5B6178]">No matches</p>
            <p className="mt-0.5 text-[8.5px] text-[#9AA0B5]">Try another search or tag</p>
          </div>
        ) : (
          list.map((f) => (
            <div key={f.judge} className="rounded-xl border border-[#ECEDF5] bg-white p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-[#2A2F45]">{f.judge}</p>
                <p className="text-[7.5px] font-semibold text-[#9AA0B5]">{f.meta}</p>
              </div>
              <p className="mt-1 text-[8.5px] leading-snug text-[#5B6178]">“{f.quote}”</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Goals ------------------------------- */

const INITIAL_GOALS = [
  { title: "Slow down on key evidence", meta: "From 4 judge ballots", pct: 70, bar: "bg-[#6366F1]", done: false },
  { title: "Control crossfire pace", meta: "From 3 judge ballots", pct: 45, bar: "bg-[#8B5CF6]", done: false },
  { title: "Weigh earlier in rebuttals", meta: "From 2 judge ballots", pct: 30, bar: "bg-[#EC5C9B]", done: false },
  { title: "Number responses on the flow", meta: "Completed at Peninsula", pct: 100, bar: "bg-[#12915B]", done: true },
];

export function GoalsScreen() {
  const [tab, setTab] = useState<"active" | "done">("active");
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const active = goals.filter((g) => !g.done);
  const done = goals.filter((g) => g.done);
  const list = tab === "active" ? active : done;

  const toggle = (title: string) =>
    setGoals((gs) =>
      gs.map((g) => (g.title === title ? { ...g, done: !g.done, pct: g.done ? 70 : 100 } : g))
    );

  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">Improvement Goals</p>
      <div className="mt-2 grid grid-cols-2 rounded-full border border-[#E3E5F0] bg-white p-0.5 text-center text-[9px] font-bold">
        {(["active", "done"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "rounded-full py-1 transition-colors",
              tab === t ? "bg-[#6366F1] text-white" : "text-[#5B6178]"
            )}
          >
            {t === "active" ? `Active (${active.length})` : `Completed (${done.length})`}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[8px] text-[#9AA0B5]">
        Tap a goal to {tab === "active" ? "mark it complete" : "reactivate it"}
      </p>
      <div className="mt-1.5 space-y-2">
        {list.map((g) => (
          <button
            key={g.title}
            onClick={() => toggle(g.title)}
            className="w-full rounded-xl border border-[#ECEDF5] bg-white p-2.5 text-left transition-all hover:border-[#C7CBFA] active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border transition-colors",
                  g.done ? "border-[#12915B] bg-[#12915B]" : "border-[#C6C9D9]"
                )}
              >
                {g.done && <Check className="size-2.5 text-white" strokeWidth={4} />}
              </span>
              <p
                className={cn(
                  "text-[10px] font-bold",
                  g.done ? "text-[#9AA0B5] line-through" : "text-[#2A2F45]"
                )}
              >
                {g.title}
              </p>
            </div>
            <p className="ml-5.5 mt-0.5 text-[8px] text-[#9AA0B5]">{g.meta}</p>
            <div className="ml-5.5 mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF0FF]">
              <div
                className={cn("h-full rounded-full transition-all duration-500", g.bar)}
                style={{ width: `${g.pct}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- More -------------------------------- */

export function MoreScreen({ go }: ScreenProps) {
  const items = [
    { icon: Clock3, title: "Debate Timer", sub: "Track speech times — try it!", chip: "bg-[#E8F1FE] text-[#3B82F6]", action: () => go("timer") },
    { icon: Download, title: "Import from Tabroom", sub: "Load your tournament history", chip: "bg-[#F0EAFE] text-[#8B5CF6]" },
    { icon: BarChart3, title: "Advanced Analytics", sub: "Trends & performance stats", chip: "bg-[#E8F1FE] text-[#3B82F6]" },
    { icon: Sparkles, title: "AI Coach", sub: "Personalized coaching & drills", chip: "bg-[#F0EAFE] text-[#8B5CF6]" },
    { icon: Search, title: "Search", sub: "Find anything quickly", chip: "bg-[#EEF0FF] text-[#5B5BD6]" },
  ];
  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">More</p>
      <div className="mt-2.5 space-y-2">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            disabled={!item.action}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl border border-[#ECEDF5] bg-white p-2.5 text-left transition-all",
              item.action && "hover:border-[#C7CBFA] active:scale-[0.98]"
            )}
          >
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", item.chip)}>
              <item.icon className="size-3.5" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[10px] font-bold text-[#2A2F45]">{item.title}</span>
              <span className="block text-[8px] text-[#9AA0B5]">{item.sub}</span>
            </span>
            <ChevronRight className="size-3 shrink-0 text-[#C6C9D9]" aria-hidden />
          </button>
        ))}
      </div>
      <p className="mt-3 text-[8px] font-bold uppercase tracking-wider text-[#B7BBCB]">
        Appearance
      </p>
    </div>
  );
}

/* ---------------------------- Mini timer ---------------------------- */

const TIMER_PRESET = 4 * 60; // First Affirmative Rebuttal

export function TimerScreen({ go }: ScreenProps) {
  const [remaining, setRemaining] = useState(TIMER_PRESET);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const m = Math.floor(remaining / 60);
  const s = String(remaining % 60).padStart(2, "0");
  const urgent = remaining <= 30;

  return (
    <div className={cn(screenBody, "flex flex-col")}>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => go("more")}
          aria-label="Back"
          className="rounded-lg p-1 transition-colors hover:bg-white"
        >
          <ChevronLeft className="size-4 text-[#5B6178]" />
        </button>
        <p className="font-display text-[15px] font-bold text-[#171B2E]">Debate Timer</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-[8px] font-bold uppercase tracking-widest text-[#9AA0B5]">
          First Affirmative Rebuttal
        </p>
        <p
          className={cn(
            "mt-2 font-mono text-5xl font-bold tabular-nums transition-colors",
            remaining === 0 ? "text-[#E0442E]" : urgent ? "text-[#E79A17]" : "text-[#171B2E]"
          )}
        >
          {m}:{s}
        </p>
        <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-[#EEF0FF]">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              urgent ? "bg-[#E79A17]" : "bg-[#6366F1]"
            )}
            style={{ width: `${(1 - remaining / TIMER_PRESET) * 100}%` }}
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setRunning((r) => !r && remaining > 0)}
            className="flex items-center gap-1 rounded-full bg-[#6366F1] px-4 py-1.5 text-[10px] font-bold text-white transition-transform active:scale-95"
          >
            {running ? <Pause className="size-3" /> : <Play className="size-3" />}
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setRemaining(TIMER_PRESET);
            }}
            aria-label="Reset timer"
            className="flex items-center gap-1 rounded-full border border-[#E3E5F0] bg-white px-3 py-1.5 text-[10px] font-bold text-[#5B6178] transition-transform active:scale-95"
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        </div>
        <p className="mt-4 text-[8px] text-[#B7BBCB]">
          The full timer supports LD, PF, Policy & custom formats
        </p>
      </div>
    </div>
  );
}

export const SCREEN_COMPONENTS: Record<PhoneScreenKey, (p: ScreenProps) => React.JSX.Element> = {
  home: HomeScreen,
  tournaments: TournamentsScreen,
  feedback: FeedbackScreen,
  goals: GoalsScreen,
  more: MoreScreen,
  timer: TimerScreen,
};
