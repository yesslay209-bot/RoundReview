"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PhoneBottomNav,
  SCREEN_COMPONENTS,
  type PhoneScreenKey,
  type ScreenKey,
} from "./phone-screens";

interface ScreenInfo {
  key: ScreenKey;
  label: string;
  title: string;
  body: string;
}

const SCREENS: ScreenInfo[] = [
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
    body: "Filter by event, jump into any tournament, and watch your record and average speaks build round by round.",
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
    body: "Turn recurring judge comments into active goals with progress you can see, then retire them when the ballots stop mentioning them.",
  },
  {
    key: "more",
    label: "More",
    title: "The full toolkit",
    body: "Debate timer, tournament history import, advanced analytics, and personalized coaching — all from one place.",
  },
];

export function MobileShowcase() {
  const [active, setActive] = useState<PhoneScreenKey>("home");
  const Screen = SCREEN_COMPONENTS[active];
  // The hidden timer screen keeps "More" highlighted in the tab list.
  const listKey: ScreenKey = active === "timer" ? "more" : active;

  return (
    <section id="mobile" className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Copy + tab controls */}
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4F46E5]">
            <Smartphone className="size-4" aria-hidden /> Works wherever you compete
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#191817] sm:text-4xl">
            Your whole season, <span className="font-serif font-normal italic">in your pocket</span>
          </h2>
          <p className="mt-4 max-w-lg text-[#56534B]">
            No app store needed — the same experience runs in any phone browser. This demo is
            fully live: filter the tournaments, search the feedback, complete a goal, even run
            the debate timer from the More tab.
          </p>

          <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="App screens">
            {SCREENS.map((s) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={s.key === listKey}
                onClick={() => setActive(s.key)}
                className={cn(
                  "group rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  s.key === listKey
                    ? "border-[#191817] bg-[#FAF9F5] shadow-sm"
                    : "border-[#E7E4DB] bg-white hover:-translate-y-0.5 hover:border-[#191817]"
                )}
              >
                <span
                  className={cn(
                    "block text-sm font-bold",
                    s.key === listKey ? "text-[#191817]" : "text-[#3A3830]"
                  )}
                >
                  {s.title}
                </span>
                <AnimatePresence initial={false}>
                  {s.key === listKey && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="block overflow-hidden text-xs leading-relaxed text-[#56534B]"
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
        <div className="flex justify-center">
          <div className="relative w-[280px] shrink-0 sm:w-[300px]">
            <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.6rem] border-[10px] border-[#1E2340] bg-[#F6F7FB] shadow-[0_30px_80px_-24px_rgb(37_42_92/0.45)]">
              {/* Notch */}
              <div className="absolute left-1/2 top-2 z-10 h-4.5 w-24 -translate-x-1/2 rounded-full bg-[#1E2340]" />
              {/* Status bar spacer */}
              <div className="h-8 shrink-0 bg-[#F6F7FB]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <Screen go={setActive} />
                </motion.div>
              </AnimatePresence>
              <PhoneBottomNav active={active} onSelect={setActive} />
            </div>
            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2" aria-hidden>
              {SCREENS.map((s) => (
                <button
                  key={s.key}
                  tabIndex={-1}
                  onClick={() => setActive(s.key)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    s.key === listKey
                      ? "w-6 bg-[#191817]"
                      : "w-1.5 bg-[#DDD9CE] hover:bg-[#C9C5B8]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
