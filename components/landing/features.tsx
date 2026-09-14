import { Reveal } from "./reveal";
import { Flower, Starburst } from "./decor";
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
  },
  {
    icon: CalendarDays,
    title: "Tournament Calendar",
    body: "Plan your season with statuses from Planning to Completed, registration deadlines, and a live countdown to your next competition.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    body: "Win rate, speaker point trends, side performance, and tournament-by-tournament records — all charted automatically from your rounds.",
  },
  {
    icon: Lightbulb,
    title: "Improvement Insights",
    body: "See which areas judges mention most, where you're strongest, and exactly what to practice before the next tournament.",
  },
  {
    icon: Timer,
    title: "Debate Timer",
    body: "Preset speech times for LD, Public Forum, Policy, and Parliamentary — plus custom formats, prep tracking, and a final-30-seconds warning.",
  },
  {
    icon: ClipboardCheck,
    title: "Pre-Tournament Checklist",
    body: "Evidence, logistics, tech, personal items, and mental prep — organized, checkable, and saved so nothing gets forgotten on tournament morning.",
  },
];

const tints = [
  "bg-[#F6EFE3]",
  "bg-[#F9E3EC]",
  "bg-[#DDE1F8]",
  "bg-[#E3EDE3]",
  "bg-[#F4EBC3]",
  "bg-[#F6EFE3]",
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-white py-24">
      <Starburst className="spin-slow absolute left-8 top-16 hidden w-8 md:block" color="#DDE1F8" />
      <Flower className="absolute -right-4 top-32 hidden w-14 rotate-12 md:block" color="#F9E3EC" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full bg-[#F9E3EC] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#B23A73]">
            Features
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#191817] sm:text-4xl">
            Everything between this round and{" "}
            <span className="font-serif font-normal italic">your next win</span>
          </h2>
          <p className="mt-4 text-[#56534B]">Six tools, one goal: walk into every round ready.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
              <div
                className={`group h-full rounded-2xl border border-[#191817]/8 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[0_20px_44px_-22px_rgb(25_24_23/0.35)] ${tints[i]}`}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-white text-[#191817] shadow-sm transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <f.icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#191817]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4840]">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
