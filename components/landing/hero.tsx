import Link from "next/link";
import {
  ArrowRight,
  MessageSquareQuote,
  Play,
  TrendingUp,
} from "lucide-react";
import { CurlyArrow, Starburst, Sticker } from "./decor";

/** Static mini-dashboard mockup rendered inside a browser chrome frame. */
function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-[#E7E4DB] bg-white p-2 shadow-[0_32px_70px_-32px_rgb(25_24_23/0.35)]">
      <div className="overflow-hidden rounded-xl border border-[#EFEDE6] bg-[#FDFDFB]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-[#EFEDE6] bg-[#F6F5F0] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#DDD9CE]" />
          <span className="size-2.5 rounded-full bg-[#DDD9CE]" />
          <span className="size-2.5 rounded-full bg-[#DDD9CE]" />
          <span className="ml-3 hidden rounded-md bg-white px-3 py-0.5 text-[10px] text-[#9B978C] sm:block">
            app.roundreview.io/dashboard
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Upcoming tournament */}
          <div className="rounded-lg border-l-2 border-[#4F46E5] bg-[#F6F5F0] p-3.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
                  Next Tournament
                </p>
                <p className="mt-1 text-sm font-bold text-[#191817]">California Invitational</p>
                <p className="text-[11px] text-[#9B978C]">Oct 18–19 · Irvine, CA</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-[#191817]">34</p>
                <p className="text-[10px] text-[#9B978C]">days away</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#EFEDE6] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B978C]">
              Season Record
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#191817]">
              14<span className="text-[#C9C5B8]">–</span>6
            </p>
            <p className="text-[11px] font-semibold text-[#2F7A57]">70% win rate</p>
          </div>

          <div className="rounded-lg border border-[#EFEDE6] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B978C]">
              Avg Speaker Points
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#191817]">27.9</p>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#2F7A57]">
              <TrendingUp className="size-3" aria-hidden /> +0.9 this season
            </div>
          </div>

          <div className="rounded-lg border border-[#EFEDE6] bg-white p-3.5 sm:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B978C]">
              Recent Judge Feedback
            </p>
            <p className="mt-1.5 font-serif text-[13px] italic leading-relaxed text-[#56534B]">
              “Strong evidence comparison — this won you the round. Keep varying your pace in
              rebuttals…”
            </p>
            <div className="mt-2 flex gap-1.5">
              {["Delivery", "Evidence", "Rebuttal"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#E7E4DB] px-2 py-0.5 text-[9px] font-bold text-[#56534B]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#EFEDE6] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B978C]">
              Improvement Areas
            </p>
            <div className="mt-2 space-y-1.5">
              {[
                ["Delivery", 85],
                ["Rebuttal", 62],
                ["Cross-Ex", 48],
              ].map(([label, w]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-14 text-[9px] text-[#9B978C]">{label}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-[#F0EEE6]">
                    <div
                      className="h-full rounded-full bg-[#4F46E5]"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#EFEDE6] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B978C]">
              Tournament Checklist
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#191817]">
              18<span className="text-[#C9C5B8]">/</span>24
            </p>
            <div className="mt-1.5 h-1.5 rounded-full bg-[#F0EEE6]">
              <div className="h-full w-3/4 rounded-full bg-[#2F7A57]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hand-drawn underline flourish for the headline. */
function Squiggle() {
  return (
    <svg
      viewBox="0 0 220 12"
      className="absolute -bottom-2 left-0 w-full text-[#E5518D]"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d="M3 9 C 40 2, 75 2, 110 7 S 180 11, 217 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5]">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div className="rise">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9D6CB] bg-white px-3.5 py-1.5 text-xs font-bold text-[#56534B]">
            <span className="spin-slow inline-block text-[#E5518D]" aria-hidden>
              ✦
            </span>
            Built for the 2026–27 season
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-[#191817] sm:text-6xl lg:text-7xl">
            Prepare{" "}
            <span className="rounded-lg bg-[#F4EBC3] px-2 box-decoration-clone">smarter.</span>
            <br />
            <span className="relative inline-block font-serif font-normal italic">
              Debate better.
              <Squiggle />
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#56534B]">
            Turn every tournament, ballot, and judge comment into actionable improvement.
            Track your season, analyze your performance, and walk into every round ready.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#191817] px-7 py-3.5 text-sm font-bold text-[#FAF9F5] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgb(25_24_23/0.5)] active:translate-y-0"
            >
              Get Started
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D9D6CB] bg-white px-7 py-3.5 text-sm font-semibold text-[#191817] transition-all hover:-translate-y-0.5 hover:border-[#191817]"
            >
              <Play
                className="size-4 text-[#4F46E5] transition-transform group-hover:scale-125"
                aria-hidden
              />
              Try the Live Demo
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#9B978C]">
            Free to use · No account needed for the demo
          </p>

          {/* Format coverage */}
          <div className="mt-9 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#9B978C]">Built for every format —</span>
            {["LD", "Public Forum", "Policy", "Parli", "Congress"].map((f) => (
              <span
                key={f}
                className="rounded-full border border-[#D9D6CB] bg-white px-2.5 py-1 text-[11px] font-bold text-[#56534B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="rise relative" style={{ animationDelay: "0.15s" }}>
          <CurlyArrow className="absolute -left-20 top-6 hidden w-16 -scale-y-100 rotate-[160deg] xl:block" />
          <Starburst
            className="spin-slow absolute -right-6 -top-8 hidden w-10 lg:block"
            color="#F4EBC3"
          />
          <div className="absolute -top-4 left-6 z-10 hidden rotate-[-6deg] lg:block">
            <Sticker color="blush">every round counts</Sticker>
          </div>
          <DashboardPreview />

          {/* Floating accents (desktop only, decorative) */}
          <div
            aria-hidden
            className="float-slow absolute -left-8 top-16 hidden rounded-xl border border-[#E7E4DB] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_36px_-16px_rgb(25_24_23/0.3)] backdrop-blur lg:block"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#9B978C]">
              Recent form
            </p>
            <div className="mt-1.5 flex gap-1">
              {["W", "W", "L", "W", "W"].map((r, i) => (
                <span
                  key={i}
                  className={`flex size-6 items-center justify-center rounded-md font-display text-[11px] font-bold ${
                    r === "W" ? "bg-[#E9F2EC] text-[#2F7A57]" : "bg-[#F7EAE6] text-[#C25243]"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="float-slower absolute -bottom-6 -right-4 hidden w-56 rounded-xl border border-[#E7E4DB] bg-white/95 p-3 shadow-[0_16px_36px_-16px_rgb(25_24_23/0.3)] backdrop-blur lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#F0EEE6]">
                <MessageSquareQuote className="size-3.5 text-[#4F46E5]" />
              </span>
              <div>
                <p className="text-[10px] font-bold text-[#191817]">New judge feedback</p>
                <p className="text-[9px] text-[#9B978C]">Sarah Mitchell · Round 4</p>
              </div>
            </div>
            <p className="mt-2 font-serif text-[11px] italic leading-relaxed text-[#56534B]">
              “Night-and-day improvement — pacing was controlled and clean.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
