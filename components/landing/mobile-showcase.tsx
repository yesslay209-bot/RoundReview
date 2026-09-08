"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Screen {
  key: string;
  label: string;
  title: string;
  body: string;
}

/**
 * Screens map 1:1 to screenshot files dropped into /public/mobile/<key>.png.
 * Images are shown untouched — the phone frame masks them with CSS only.
 */
const SCREENS: Screen[] = [
  {
    key: "home",
    label: "Home",
    title: "Your season at a glance",
    body: "Tournaments, win rate, and feedback counts the moment you open the app — plus a daily tip and your pre-tournament checklist one tap away.",
  },
  {
    key: "tournaments",
    label: "Tournaments",
    title: "Every tournament, organized",
    body: "Filter by event type, jump into any tournament, and see your record and average speaks build round by round.",
  },
  {
    key: "feedback",
    label: "Feedback",
    title: "Ballots you can search",
    body: "Every judge comment is saved, tagged, and searchable — so the lesson from round 3 is still with you at the next tournament.",
  },
  {
    key: "goals",
    label: "Goals",
    title: "Improvement goals that stick",
    body: "Turn recurring judge comments into active goals, then mark them complete when the ballots stop mentioning them.",
  },
  {
    key: "more",
    label: "More",
    title: "The full toolkit",
    body: "Debate timer, tournament history import, advanced analytics, and personalized coaching — all from one place.",
  },
];

function PhoneScreen({ screen }: { screen: Screen }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#10162e] px-6 text-center">
        <ImageIcon className="size-8 text-white/25" aria-hidden />
        <p className="text-xs font-semibold text-white/60">{screen.label} screen</p>
        <p className="text-[10px] leading-relaxed text-white/35">
          Drop your app screenshot at{" "}
          <code className="rounded bg-white/10 px-1 py-0.5">public/mobile/{screen.key}.png</code>{" "}
          and it will appear here, uncropped and unedited.
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- untouched user-provided screenshot, unknown dimensions
    <img
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mobile/${screen.key}.png`}
      alt={`${screen.label} screen of the mobile app`}
      className="h-full w-full object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

export function MobileShowcase() {
  const [index, setIndex] = useState(0);
  const screen = SCREENS[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + SCREENS.length) % SCREENS.length);

  return (
    <section id="mobile" className="relative overflow-hidden py-24">
      <div
        className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-[#7c5cff]/15 blur-[100px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Copy + tab controls */}
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#8ea0ff]">
            <Smartphone className="size-4" aria-hidden /> Take it to the tournament
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your whole season, in your pocket
          </h2>
          <p className="mt-4 max-w-lg text-white/55">
            Log rounds between flights, review judge feedback in the hallway, and check your
            record before elims. Tap through the app below.
          </p>

          <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="App screens">
            {SCREENS.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "group rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  i === index
                    ? "border-[#3e5bff]/50 bg-[#3e5bff]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                )}
              >
                <span
                  className={cn(
                    "block text-sm font-bold",
                    i === index ? "text-white" : "text-white/70"
                  )}
                >
                  {s.title}
                </span>
                <AnimatePresence initial={false}>
                  {i === index && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="block overflow-hidden text-xs leading-relaxed text-white/50"
                    >
                      <span className="block pt-1.5">{s.body}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>

        {/* Phone frame */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous screen"
            className="rounded-full border border-white/15 p-2.5 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="relative w-[270px] shrink-0 sm:w-[300px]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.6rem] border-[10px] border-[#1a2038] bg-[#10162e] shadow-[0_30px_90px_-20px_rgb(62_91_255/0.4)]">
              {/* Notch */}
              <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1a2038]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen.key}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full"
                >
                  <PhoneScreen screen={screen} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2" aria-hidden>
              {SCREENS.map((s, i) => (
                <button
                  key={s.key}
                  tabIndex={-1}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-[#8ea0ff]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next screen"
            className="rounded-full border border-white/15 p-2.5 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
