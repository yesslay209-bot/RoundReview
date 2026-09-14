"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PhoneBottomNav,
  SCREEN_COMPONENTS,
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
  const [active, setActive] = useState<ScreenKey>("home");
  const Screen = SCREEN_COMPONENTS[active];

  return (
    <section id="mobile" className="relative overflow-hidden bg-white py-24">
      <div
        className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#EEF0FF] blur-[90px]"
        aria-hidden
      />
      <div
        className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[#FDEAF3] blur-[90px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Copy + tab controls */}
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#5B5BD6]">
            <Smartphone className="size-4" aria-hidden /> Works wherever you compete
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#131834] sm:text-4xl">
            Your whole season, in your pocket
          </h2>
          <p className="mt-4 max-w-lg text-[#5B6178]">
            No app store needed — {""}
            the same experience runs in any phone browser. Log rounds between flights, review
            judge feedback in the hallway, and check your record before elims. Try it: tap the
            tabs below, or the nav inside the phone.
          </p>

          <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="App screens">
            {SCREENS.map((s) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={s.key === active}
                onClick={() => setActive(s.key)}
                className={cn(
                  "group rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  s.key === active
                    ? "border-[#C7CBFA] bg-[#EEF0FF] shadow-sm"
                    : "border-[#E7E8F2] bg-white hover:border-[#C7CBFA] hover:bg-[#FAFAFE]"
                )}
              >
                <span
                  className={cn(
                    "block text-sm font-bold",
                    s.key === active ? "text-[#3F3FBF]" : "text-[#3A3F55]"
                  )}
                >
                  {s.title}
                </span>
                <AnimatePresence initial={false}>
                  {s.key === active && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="block overflow-hidden text-xs leading-relaxed text-[#5B6178]"
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
                  <Screen />
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
                    s.key === active
                      ? "w-6 bg-[#5B5BD6]"
                      : "w-1.5 bg-[#D9DBEA] hover:bg-[#B9BDDC]"
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
