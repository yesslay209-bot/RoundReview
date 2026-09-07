import { BRAND } from "@/lib/brand";
import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Lightbulb,
  MessageSquareQuote,
  Timer,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareQuote,
    title: "Judge Feedback Journal",
    body: "Save every ballot with the tournament, round, judge, result, speaker points, and improvement tags. Search and filter your entire season in seconds.",
    accent: "from-[#3e5bff]/20 to-transparent",
  },
  {
    icon: CalendarDays,
    title: "Tournament Calendar",
    body: "Plan your season with statuses from Planning to Completed, registration deadlines, and a live countdown to your next competition.",
    accent: "from-[#7c5cff]/20 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    body: "Win rate, speaker point trends, side performance, and tournament-by-tournament records — all charted automatically from your rounds.",
    accent: "from-[#2fbf7f]/20 to-transparent",
  },
  {
    icon: Lightbulb,
    title: "Improvement Insights",
    body: "See which areas judges mention most, where you're strongest, and exactly what to practice before the next tournament.",
    accent: "from-[#f0b13f]/20 to-transparent",
  },
  {
    icon: Timer,
    title: "Debate Timer",
    body: "Preset speech times for LD, Public Forum, Policy, and Parliamentary — plus custom formats, prep tracking, and a final-30-seconds warning.",
    accent: "from-[#3e5bff]/20 to-transparent",
  },
  {
    icon: ClipboardCheck,
    title: "Pre-Tournament Checklist",
    body: "Evidence, logistics, tech, personal items, and mental prep — organized, checkable, and saved so nothing gets forgotten on tournament morning.",
    accent: "from-[#7c5cff]/20 to-transparent",
  },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8ea0ff]">Features</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Everything between this round and your next win
        </h2>
        <p className="mt-4 text-white/55">
          Every ballot tells you something. {BRAND.name} makes sure you hear it.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${f.accent}`}
              aria-hidden
            />
            <div className="relative">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <f.icon className="size-5 text-[#8ea0ff]" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
