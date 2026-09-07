import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/lib/types";
import type { HTMLAttributes } from "react";

type Tone = "neutral" | "accent" | "win" | "loss" | "warn" | "violet";

const tones: Record<Tone, string> = {
  neutral: "bg-card2 text-soft",
  accent: "bg-accent/10 text-accent",
  win: "bg-win/10 text-win",
  loss: "bg-loss/10 text-loss",
  warn: "bg-warn/15 text-warn",
  violet: "bg-violet/10 text-violet",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export const STATUS_TONES: Record<TournamentStatus, Tone> = {
  Planning: "neutral",
  Registered: "accent",
  Upcoming: "violet",
  Completed: "win",
  Cancelled: "loss",
};

export function StatusBadge({ status }: { status: TournamentStatus }) {
  return <Badge tone={STATUS_TONES[status]}>{status}</Badge>;
}

export function ResultBadge({ result }: { result: "Win" | "Loss" | "Bye" }) {
  const tone = result === "Win" ? "win" : result === "Loss" ? "loss" : "neutral";
  return <Badge tone={tone}>{result}</Badge>;
}
