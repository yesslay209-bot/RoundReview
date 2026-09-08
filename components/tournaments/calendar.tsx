"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Tournament } from "@/lib/types";
import { STATUS_TONES } from "@/components/ui/badge";
import { cn, todayIso } from "@/lib/utils";

const toneDot: Record<string, string> = {
  neutral: "bg-faint",
  accent: "bg-accent",
  win: "bg-win",
  loss: "bg-loss",
  warn: "bg-warn",
  violet: "bg-violet",
};

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function TournamentCalendar({ tournaments }: { tournaments: Tournament[] }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = todayIso();

  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay()); // back up to Sunday
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [cursor]);

  const eventsOn = (dayIso: string) =>
    tournaments.filter((t) => t.startDate <= dayIso && dayIso <= t.endDate);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{monthLabel}</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="rounded-lg border border-line p-2 text-soft hover:bg-card2 transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => {
              const now = new Date();
              setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
            }}
            className="rounded-lg border border-line px-3 text-xs font-semibold text-soft hover:bg-card2 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            aria-label="Next month"
            className="rounded-lg border border-line p-2 text-soft hover:bg-card2 transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-card2 px-2 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-faint">
            <span className="hidden sm:inline">{d}</span>
            <span className="sm:hidden">{d[0]}</span>
          </div>
        ))}
        {days.map((d) => {
          const dIso = iso(d);
          const inMonth = d.getMonth() === cursor.getMonth();
          const events = eventsOn(dIso);
          const isToday = dIso === today;
          return (
            <div
              key={dIso}
              className={cn(
                "min-h-[4.5rem] bg-card p-1.5 sm:min-h-[5.5rem]",
                !inMonth && "opacity-40"
              )}
            >
              <span
                className={cn(
                  "inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                  isToday ? "bg-accent text-white" : "text-soft"
                )}
              >
                {d.getDate()}
              </span>
              <div className="mt-1 space-y-1">
                {events.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tournaments/detail?id=${t.id}`}
                    title={t.name}
                    className="flex items-center gap-1 rounded-md bg-card2 px-1.5 py-1 text-[10px] font-semibold leading-tight text-ink hover:bg-accent/10 transition-colors"
                  >
                    <span
                      className={cn("size-1.5 shrink-0 rounded-full", toneDot[STATUS_TONES[t.status]])}
                      aria-hidden
                    />
                    <span className="truncate">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
        {(["Planning", "Registered", "Upcoming", "Completed", "Cancelled"] as const).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", toneDot[STATUS_TONES[s]])} aria-hidden />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
