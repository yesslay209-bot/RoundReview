import Link from "next/link";
import { ArrowRight, CalendarDays, TrendingUp } from "lucide-react";

/** Static mini-dashboard mockup rendered inside a browser chrome frame. */
function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-[#E7E8F2] bg-white p-2 shadow-[0_32px_80px_-28px_rgb(76_82_166/0.35)]">
      <div className="overflow-hidden rounded-xl border border-[#ECEDF5] bg-[#FBFBFE]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-[#ECEDF5] bg-[#F4F5FB] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#F1867A]" />
          <span className="size-2.5 rounded-full bg-[#F5C66B]" />
          <span className="size-2.5 rounded-full bg-[#7ED8A3]" />
          <span className="ml-3 hidden rounded-md bg-white px-3 py-0.5 text-[10px] text-[#9AA0B5] sm:block">
            app.roundreview.io/dashboard
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Upcoming tournament */}
          <div className="rounded-lg border border-[#D9DCFA] bg-gradient-to-br from-[#EEF0FF] to-[#F6F1FE] p-3.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B5BD6]">
                  Next Tournament
                </p>
                <p className="mt-1 text-sm font-bold text-[#171B2E]">California Invitational</p>
                <p className="text-[11px] text-[#8A90A5]">Oct 18–19 · Irvine, CA</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-[#5B5BD6]">34</p>
                <p className="text-[10px] text-[#8A90A5]">days away</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#ECEDF5] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0B5]">
              Season Record
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#171B2E]">
              14<span className="text-[#C6C9D9]">–</span>6
            </p>
            <p className="text-[11px] font-semibold text-[#12915B]">70% win rate</p>
          </div>

          <div className="rounded-lg border border-[#ECEDF5] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0B5]">
              Avg Speaker Points
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#171B2E]">27.9</p>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#12915B]">
              <TrendingUp className="size-3" aria-hidden /> +0.9 this season
            </div>
          </div>

          <div className="rounded-lg border border-[#ECEDF5] bg-white p-3.5 sm:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0B5]">
              Recent Judge Feedback
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#5B6178]">
              “Strong evidence comparison — this won you the round. Keep varying your pace in
              rebuttals…”
            </p>
            <div className="mt-2 flex gap-1.5">
              {["Delivery", "Evidence", "Rebuttal"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[#F0EAFE] px-2 py-0.5 text-[9px] font-bold text-[#7C5CD6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#ECEDF5] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0B5]">
              Improvement Areas
            </p>
            <div className="mt-2 space-y-1.5">
              {[
                ["Delivery", 85],
                ["Rebuttal", 62],
                ["Cross-Ex", 48],
              ].map(([label, w]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-14 text-[9px] text-[#8A90A5]">{label}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-[#EEF0FF]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#ECEDF5] bg-white p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0B5]">
              Tournament Checklist
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[#171B2E]">
              18<span className="text-[#C6C9D9]">/</span>24
            </p>
            <div className="mt-1.5 h-1.5 rounded-full bg-[#EEF0FF]">
              <div className="h-full w-3/4 rounded-full bg-[#12A96B]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FBFBFE]">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div
        className="absolute -top-32 left-1/4 h-[420px] w-[560px] rounded-full bg-[#E4E7FF] blur-[110px]"
        aria-hidden
      />
      <div
        className="absolute -top-16 right-0 h-[300px] w-[360px] rounded-full bg-[#FDE7F1] blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div className="rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D9DCFA] bg-white px-3.5 py-1.5 text-xs font-bold text-[#5B5BD6] shadow-sm">
            <CalendarDays className="size-3.5" aria-hidden />
            Built for the 2026–27 season
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#131834] sm:text-5xl lg:text-6xl">
            Prepare smarter.
            <br />
            <span className="bg-gradient-to-r from-[#5B5BD6] via-[#8B5CF6] to-[#EC5C9B] bg-clip-text text-transparent">
              Debate better.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5B6178]">
            Turn every tournament, ballot, and judge comment into actionable improvement.
            Track your season, analyze your performance, prepare for tournaments, and walk
            into every round ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#5B5BD6] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgb(91_91_214/0.6)] transition-all hover:bg-[#4747C2] hover:shadow-[0_12px_36px_-8px_rgb(91_91_214/0.75)] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-[#D9DBEA] bg-white px-6 py-3.5 text-sm font-semibold text-[#3A3F55] transition-colors hover:border-[#B9BDDC] hover:text-[#131834]"
            >
              Explore Features
            </a>
          </div>
          <p className="mt-8 text-xs text-[#9AA0B5]">
            Free to use · Works on your laptop and your phone
          </p>
        </div>

        <div className="rise" style={{ animationDelay: "0.15s" }}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
