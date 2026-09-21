"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Download,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    title: "Welcome to your season!",
    body: "Your account starts with a clean slate — no placeholder numbers, just your real results. This one-minute tour shows you where everything goes.",
  },
  {
    icon: CalendarDays,
    title: "Step 1 · Add your tournaments",
    body: "Head to Tournaments and add each competition on your calendar — dates, location, format, and registration deadline. Your next tournament gets a live countdown on the dashboard.",
    cta: { label: "Add my first tournament", href: "/tournaments" },
  },
  {
    icon: Download,
    title: "Fastest way: paste from Tabroom",
    body: "Already competed this season? Open your entry page on Tabroom, copy your rounds, and use “Import from Tabroom.” Opponents, sides, results, speaker points, and judges all come in automatically.",
    cta: { label: "Import my results", href: "/tournaments" },
  },
  {
    icon: MessageSquareQuote,
    title: "Step 2 · Save every ballot",
    body: "After each round, add the judge's feedback with tags like Delivery or Evidence. This is where the magic happens — recurring comments become your practice priorities.",
  },
  {
    icon: BarChart3,
    title: "Step 3 · Watch the analytics build",
    body: "Win rate, speaker-point trends, side performance, and your most-mentioned improvement areas all chart themselves from the rounds you log. No spreadsheets required.",
  },
  {
    icon: ClipboardCheck,
    title: "Step 4 · Prepare with the toolkit",
    body: "Before each tournament, run the prep checklist and drill speeches with the debate timer (Space starts and pauses it). You're all set — go build your season!",
  },
];

/** First-run guided tour shown after sign-up. */
export function OnboardingTutorial({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  const goTo = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Getting started tour"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-card shadow-pop"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-violet" aria-hidden />
        <div className="px-6 pb-6 pt-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/10">
                <s.icon className="size-6 text-accent" aria-hidden />
              </div>
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-soft">{s.body}</p>
              {s.cta && (
                <Button size="sm" variant="outline" className="mt-4" onClick={() => goTo(s.cta!.href)}>
                  {s.cta.label} <ArrowRight className="size-3.5" aria-hidden />
                </Button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mt-6 flex items-center gap-1.5" aria-hidden>
            {STEPS.map((_, i) => (
              <button
                key={i}
                tabIndex={-1}
                onClick={() => setStep(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === step ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-faint/50"
                )}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-faint transition-colors hover:text-soft"
            >
              Skip tour
            </button>
            <div className="flex gap-2">
              {step > 0 && (
                <Button size="sm" variant="secondary" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="size-3.5" aria-hidden /> Back
                </Button>
              )}
              <Button size="sm" onClick={() => (last ? onClose() : setStep(step + 1))}>
                {last ? "Start my season" : "Next"}
                {!last && <ArrowRight className="size-3.5" aria-hidden />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
