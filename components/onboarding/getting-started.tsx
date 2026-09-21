"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, PartyPopper, X } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { useAppData } from "@/lib/store";
import {
  getDataMode,
  isTutorialPending,
} from "@/lib/repositories/local-repository";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "roundready.gettingstarted.dismissed";
export const TIMER_VISITED_KEY = "roundready.visited.timer";

function flag(key: string) {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

/**
 * Learn-by-doing task list for new accounts. Each task completes itself
 * from real app state, so finishing the list means the season is set up.
 */
export function GettingStarted() {
  const { data } = useAppData();
  const [dismissed, setDismissed] = useState(
    () => getDataMode() !== "own" || flag(DISMISS_KEY)
  );

  if (dismissed) return null;

  const tasks = [
    { label: "Take the quick tour", href: "/dashboard", done: !isTutorialPending() },
    { label: "Add your first tournament", href: "/tournaments", done: data.tournaments.length > 0 },
    { label: "Log a round (or import from Tabroom)", href: "/tournaments", done: data.rounds.length > 0 },
    { label: "Save your first judge ballot", href: "/feedback", done: data.feedback.length > 0 },
    { label: "Check off a prep-checklist item", href: "/checklist", done: data.checklist.some((c) => c.completed) },
    { label: "Try the debate timer", href: "/timer", done: flag(TIMER_VISITED_KEY) },
  ];
  const doneCount = tasks.filter((t) => t.done).length;
  const allDone = doneCount === tasks.length;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-violet" aria-hidden />
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          {allDone ? "You're all set! 🎉" : "Getting Started"}
          <span className="ml-2 font-normal text-faint">
            {doneCount}/{tasks.length}
          </span>
        </CardTitle>
        <button
          onClick={dismiss}
          aria-label="Hide getting-started tasks"
          className="rounded-lg p-1.5 text-faint transition-colors hover:bg-card2 hover:text-ink"
        >
          <X className="size-4" />
        </button>
      </CardHeader>
      <CardBody>
        <ProgressBar
          value={(doneCount / tasks.length) * 100}
          label="Getting started progress"
          barClassName={allDone ? "bg-win" : undefined}
        />
        {allDone ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-soft">
            <PartyPopper className="size-4 text-warn" aria-hidden />
            Your season is set up — every new round makes the analytics smarter.
          </p>
        ) : (
          <ul className="mt-4 grid gap-1 sm:grid-cols-2">
            {tasks.map((t) => (
              <li key={t.label}>
                <Link
                  href={t.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors",
                    t.done ? "text-faint" : "font-semibold hover:bg-card2"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      t.done ? "border-win bg-win text-white" : "border-line bg-card"
                    )}
                  >
                    {t.done && <Check className="size-3" strokeWidth={3.5} />}
                  </span>
                  <span className={cn("flex-1", t.done && "line-through")}>{t.label}</span>
                  {!t.done && (
                    <ChevronRight
                      className="size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
