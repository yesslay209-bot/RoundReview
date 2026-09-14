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
    chip: "bg-[#EEF0FF] text-[#5B5BD6]",
  },
  {
    icon: CalendarDays,
    title: "Tournament Calendar",
    body: "Plan your season with statuses from Planning to Completed, registration deadlines, and a live countdown to your next competition.",
    chip: "bg-[#F0EAFE] text-[#8B5CF6]",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    body: "Win rate, speaker point trends, side performance, and tournament-by-tournament records — all charted automatically from your rounds.",
    chip: "bg-[#E5F6EE] text-[#12915B]",
  },
  {
    icon: Lightbulb,
    title: "Improvement Insights",
    body: "See which areas judges mention most, where you're strongest, and exactly what to practice before the next tournament.",
    chip: "bg-[#FDF0E0] text-[#D98B12]",
  },
  {
    icon: Timer,
    title: "Debate Timer",
    body: "Preset speech times for LD, Public Forum, Policy, and Parliamentary — plus custom formats, prep tracking, and a final-30-seconds warning.",
    chip: "bg-[#EEF0FF] text-[#5B5BD6]",
  },
  {
    icon: ClipboardCheck,
    title: "Pre-Tournament Checklist",
    body: "Evidence, logistics, tech, personal items, and mental prep — organized, checkable, and saved so nothing gets forgotten on tournament morning.",
    chip: "bg-[#FDEAF3] text-[#D6478A]",
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#5B5BD6]">Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#131834] sm:text-4xl">
            Everything between this round and your next win
          </h2>
          <p className="mt-4 text-[#5B6178]">
            Every ballot tells you something. {BRAND.name} makes sure you hear it.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[#E7E8F2] bg-white p-6 shadow-[0_1px_2px_rgb(19_24_52/0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C7CBFA] hover:shadow-[0_16px_40px_-16px_rgb(76_82_166/0.25)]"
            >
              <div
                className={`mb-4 flex size-11 items-center justify-center rounded-xl ${f.chip}`}
              >
                <f.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#131834]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6178]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
