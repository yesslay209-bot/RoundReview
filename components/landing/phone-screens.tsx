"use client";

import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  Flag,
  Home,
  Lightbulb,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Live recreations of the RoundReview mobile app screens, matched to the
 * product's design (light surface, indigo primary, pink accent). Rendered
 * as real HTML so the showcase works without image assets.
 */

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "tournaments", label: "Tournam…", icon: Trophy },
  { key: "feedback", label: "Feedback", icon: MessageCircle },
  { key: "goals", label: "Goals", icon: Flag },
  { key: "more", label: "More", icon: Menu },
] as const;

export type ScreenKey = (typeof NAV_ITEMS)[number]["key"];

export function PhoneBottomNav({
  active,
  onSelect,
}: {
  active: ScreenKey;
  onSelect: (k: ScreenKey) => void;
}) {
  return (
    <nav
      aria-label="App tabs"
      className="grid grid-cols-5 border-t border-[#ECEDF5] bg-white px-1 pb-2.5 pt-1.5"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          aria-pressed={active === item.key}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-lg py-1 text-[8px] font-semibold transition-colors",
            active === item.key ? "text-[#5B5BD6]" : "text-[#9AA0B5] hover:text-[#5B6178]"
          )}
        >
          <item.icon className="size-4" aria-hidden />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function Fab({ pink }: { pink?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full text-xl font-light text-white shadow-lg",
        pink ? "bg-[#EC5C9B]" : "bg-[#6366F1]"
      )}
    >
      +
    </div>
  );
}

const screenBody = "relative flex-1 overflow-hidden bg-[#F6F7FB] px-3.5 pt-3";

export function HomeScreen() {
  return (
    <div className={screenBody}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[17px] font-bold text-[#171B2E]">RoundReview</p>
          <p className="text-[9px] text-[#8A90A5]">Your debate performance hub</p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-[#6366F1]">
          <Search className="size-3.5 text-white" aria-hidden />
        </span>
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

      {/* Checklist promo */}
      <div className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-[#EC5C9B] p-2.5 text-white">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/25">
          <CalendarDays className="size-3.5" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-[10.5px] font-bold leading-tight">
            Having a tournament soon?
          </span>
          <span className="block text-[8.5px] text-white/85">Get your pre-tournament checklist</span>
        </span>
        <ChevronRight className="size-3.5 shrink-0" aria-hidden />
      </div>

      {/* Stat tiles */}
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {[
          ["Tournaments", "4", "bg-[#5B7CFA]"],
          ["Win Rate", "70%", "bg-[#38A3E8]"],
          ["Feedback", "12", "bg-[#8B5CF6]"],
        ].map(([label, value, bg]) => (
          <div key={label} className={cn("rounded-xl p-2 text-white", bg)}>
            <p className="text-[7px] font-bold uppercase tracking-wide text-white/80">{label}</p>
            <p className="font-display text-lg font-bold leading-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent tournaments */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11px] font-bold text-[#171B2E]">Recent Tournaments</p>
        <p className="text-[9px] font-semibold text-[#5B5BD6]">View all</p>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {[
          ["Peninsula Season Opener", "Sep 5–6 · 4–1", "LD"],
          ["Valley Summer Classic", "Jun 20–21 · 4–2", "LD"],
        ].map(([name, meta, fmt]) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-xl border border-[#ECEDF5] bg-white p-2"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[8px] font-bold text-[#5B5BD6]">
              {fmt}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-bold text-[#2A2F45]">{name}</span>
              <span className="block text-[8px] text-[#9AA0B5]">{meta}</span>
            </span>
            <ChevronRight className="size-3 shrink-0 text-[#C6C9D9]" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TournamentsScreen() {
  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">Tournaments</p>
      <div className="mt-2 flex gap-1.5">
        {["All", "PF", "LD", "CX", "Speech"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2.5 py-1 text-[8.5px] font-bold",
              i === 2 ? "bg-[#6366F1] text-white" : "border border-[#E3E5F0] bg-white text-[#5B6178]"
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {[
          ["California Invitational", "Oct 18–19 · Irvine, CA", "Registered", "text-[#5B5BD6] bg-[#EEF0FF]"],
          ["Peninsula Season Opener", "Sep 5–6 · 4–1 · 28.4 avg", "Completed", "text-[#12915B] bg-[#E5F6EE]"],
          ["Valley Summer Classic", "Jun 20–21 · 4–2 · 28.0 avg", "Completed", "text-[#12915B] bg-[#E5F6EE]"],
        ].map(([name, meta, status, chip]) => (
          <div key={name} className="rounded-xl border border-[#ECEDF5] bg-white p-2.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10.5px] font-bold leading-tight text-[#2A2F45]">{name}</p>
              <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-bold", chip)}>
                {status}
              </span>
            </div>
            <p className="mt-0.5 text-[8.5px] text-[#9AA0B5]">{meta}</p>
          </div>
        ))}
      </div>
      <Fab />
    </div>
  );
}

export function FeedbackScreen() {
  return (
    <div className={screenBody}>
      <div className="flex items-center justify-between">
        <p className="font-display text-[17px] font-bold text-[#171B2E]">Feedback</p>
        <Star className="size-3.5 text-[#C6C9D9]" aria-hidden />
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-full border border-[#E3E5F0] bg-white px-2.5 py-1.5">
        <Search className="size-3 text-[#9AA0B5]" aria-hidden />
        <span className="text-[9px] text-[#B7BBCB]">Search feedback…</span>
      </div>
      <div className="mt-2 flex gap-1.5">
        {["All", "Delivery", "Evidence", "Rebuttal"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2 py-0.5 text-[8px] font-bold",
              i === 0 ? "bg-[#6366F1] text-white" : "border border-[#E3E5F0] bg-white text-[#5B6178]"
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {[
          ["Sarah Mitchell", "Peninsula · R4 · Win", "“Pacing was controlled, signposting was clean…”"],
          ["James Corrigan", "Peninsula · R1 · Win", "“Strong evidence comparison — this won you the round.”"],
          ["Anita Deshpande", "Valley · R5 · Loss", "“You were winning until the NR — watch time allocation.”"],
        ].map(([judge, meta, quote]) => (
          <div key={judge} className="rounded-xl border border-[#ECEDF5] bg-white p-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-[#2A2F45]">{judge}</p>
              <p className="text-[7.5px] font-semibold text-[#9AA0B5]">{meta}</p>
            </div>
            <p className="mt-1 text-[8.5px] leading-snug text-[#5B6178]">{quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GoalsScreen() {
  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">Improvement Goals</p>
      <div className="mt-2 grid grid-cols-2 rounded-full border border-[#E3E5F0] bg-white p-0.5 text-center text-[9px] font-bold">
        <span className="rounded-full bg-[#6366F1] py-1 text-white">Active (3)</span>
        <span className="py-1 text-[#5B6178]">Completed (2)</span>
      </div>
      <div className="mt-2.5 space-y-2">
        {[
          ["Slow down on key evidence", "From 4 judge ballots", 70, "bg-[#6366F1]"],
          ["Control crossfire pace", "From 3 judge ballots", 45, "bg-[#8B5CF6]"],
          ["Weigh earlier in rebuttals", "From 2 judge ballots", 30, "bg-[#EC5C9B]"],
        ].map(([title, meta, pct, bar]) => (
          <div key={title as string} className="rounded-xl border border-[#ECEDF5] bg-white p-2.5">
            <div className="flex items-center gap-1.5">
              <Flag className="size-3 text-[#5B5BD6]" aria-hidden />
              <p className="text-[10px] font-bold text-[#2A2F45]">{title}</p>
            </div>
            <p className="mt-0.5 text-[8px] text-[#9AA0B5]">{meta}</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF0FF]">
              <div className={cn("h-full rounded-full", bar)} style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <Fab pink />
    </div>
  );
}

export function MoreScreen() {
  const items = [
    [Clock3, "Debate Timer", "Track speech times", "bg-[#E8F1FE] text-[#3B82F6]"],
    [Download, "Import from Tabroom", "Load your tournament history", "bg-[#F0EAFE] text-[#8B5CF6]"],
    [BarChart3, "Advanced Analytics", "Trends & performance stats", "bg-[#E8F1FE] text-[#3B82F6]"],
    [Sparkles, "AI Coach", "Personalized coaching & drills", "bg-[#F0EAFE] text-[#8B5CF6]"],
    [Search, "Search", "Find anything quickly", "bg-[#EEF0FF] text-[#5B5BD6]"],
  ] as const;
  return (
    <div className={screenBody}>
      <p className="font-display text-[17px] font-bold text-[#171B2E]">More</p>
      <div className="mt-2.5 space-y-2">
        {items.map(([Icon, title, sub, chip]) => (
          <div
            key={title}
            className="flex items-center gap-2.5 rounded-xl border border-[#ECEDF5] bg-white p-2.5"
          >
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", chip)}>
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[10px] font-bold text-[#2A2F45]">{title}</span>
              <span className="block text-[8px] text-[#9AA0B5]">{sub}</span>
            </span>
            <ChevronRight className="size-3 shrink-0 text-[#C6C9D9]" aria-hidden />
          </div>
        ))}
      </div>
      <p className="mt-3 text-[8px] font-bold uppercase tracking-wider text-[#B7BBCB]">
        Appearance
      </p>
    </div>
  );
}

export const SCREEN_COMPONENTS: Record<ScreenKey, () => React.JSX.Element> = {
  home: HomeScreen,
  tournaments: TournamentsScreen,
  feedback: FeedbackScreen,
  goals: GoalsScreen,
  more: MoreScreen,
};
