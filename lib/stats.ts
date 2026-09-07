import type { AppData, ImprovementTag, Round, Tournament } from "./types";
import { daysUntil, pct, todayIso } from "./utils";

export interface SeasonStats {
  totalRounds: number;
  wins: number;
  losses: number;
  winRate: number;
  tournamentsCompleted: number;
  tournamentsUpcoming: number;
  avgSpeaks: number | null;
  currentStreak: { type: "W" | "L"; length: number } | null;
  bestTournament: { tournament: Tournament; wins: number; losses: number } | null;
  recentForm: Round[];
}

export function tournamentRounds(data: AppData, tournamentId: string): Round[] {
  return data.rounds
    .filter((r) => r.tournamentId === tournamentId)
    .sort((a, b) => a.roundNumber - b.roundNumber);
}

export function tournamentRecord(data: AppData, tournamentId: string) {
  const rounds = tournamentRounds(data, tournamentId);
  const wins = rounds.filter((r) => r.result === "Win").length;
  const losses = rounds.filter((r) => r.result === "Loss").length;
  return { wins, losses, winRate: pct(wins, wins + losses) };
}

/** Rounds in season order (tournament start date, then round number). */
export function orderedRounds(data: AppData): Round[] {
  const startOf = (id: string) => data.tournaments.find((t) => t.id === id)?.startDate ?? "";
  return [...data.rounds].sort((a, b) => {
    const cmp = startOf(a.tournamentId).localeCompare(startOf(b.tournamentId));
    return cmp !== 0 ? cmp : a.roundNumber - b.roundNumber;
  });
}

export function seasonStats(data: AppData): SeasonStats {
  const rounds = orderedRounds(data);
  const wins = rounds.filter((r) => r.result === "Win").length;
  const losses = rounds.filter((r) => r.result === "Loss").length;
  const speaks = rounds.map((r) => r.speakerPoints).filter((s): s is number => s != null);
  const completed = data.tournaments.filter((t) => t.status === "Completed");
  const upcoming = data.tournaments.filter(
    (t) => t.status !== "Completed" && t.status !== "Cancelled"
  );

  let streak: SeasonStats["currentStreak"] = null;
  for (let i = rounds.length - 1; i >= 0; i--) {
    const res = rounds[i].result;
    if (res === "Bye") continue;
    const type = res === "Win" ? "W" : "L";
    if (!streak) streak = { type, length: 1 };
    else if (streak.type === type) streak.length++;
    else break;
  }

  let best: SeasonStats["bestTournament"] = null;
  for (const t of completed) {
    const rec = tournamentRecord(data, t.id);
    if (rec.wins + rec.losses === 0) continue;
    if (!best || rec.winRate > pct(best.wins, best.wins + best.losses)) {
      best = { tournament: t, wins: rec.wins, losses: rec.losses };
    }
  }

  return {
    totalRounds: rounds.length,
    wins,
    losses,
    winRate: pct(wins, wins + losses),
    tournamentsCompleted: completed.length,
    tournamentsUpcoming: upcoming.length,
    avgSpeaks: speaks.length
      ? Math.round((speaks.reduce((a, b) => a + b, 0) / speaks.length) * 10) / 10
      : null,
    currentStreak: streak,
    bestTournament: best,
    recentForm: rounds.filter((r) => r.result !== "Bye").slice(-5),
  };
}

export function nextTournament(data: AppData): Tournament | null {
  const today = todayIso();
  const upcoming = data.tournaments
    .filter((t) => t.status !== "Completed" && t.status !== "Cancelled" && t.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return upcoming[0] ?? null;
}

export function nextTournamentCountdown(data: AppData) {
  const t = nextTournament(data);
  if (!t) return null;
  return { tournament: t, days: daysUntil(t.startDate) };
}

export interface SidePerformance {
  side: string;
  wins: number;
  losses: number;
  winRate: number;
}

export function sidePerformance(data: AppData): SidePerformance[] {
  const map = new Map<string, { wins: number; losses: number }>();
  for (const r of data.rounds) {
    if (r.result === "Bye") continue;
    const entry = map.get(r.side) ?? { wins: 0, losses: 0 };
    if (r.result === "Win") entry.wins++;
    else entry.losses++;
    map.set(r.side, entry);
  }
  return [...map.entries()]
    .map(([side, { wins, losses }]) => ({ side, wins, losses, winRate: pct(wins, wins + losses) }))
    .sort((a, b) => b.wins + b.losses - (a.wins + a.losses));
}

export interface TagCount {
  tag: ImprovementTag;
  count: number;
}

/** How often each improvement area appears across judge feedback. */
export function improvementTagCounts(data: AppData): TagCount[] {
  const counts = new Map<ImprovementTag, number>();
  for (const f of data.feedback) {
    for (const tag of f.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export interface TrendPoint {
  label: string;
  date: string;
  wins: number;
  losses: number;
  winRate: number;
  avgSpeaks: number | null;
}

/** Per-tournament trend used by the analytics line/bar charts. */
export function tournamentTrend(data: AppData): TrendPoint[] {
  return data.tournaments
    .filter((t) => t.status === "Completed")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((t) => {
      const rounds = tournamentRounds(data, t.id);
      const wins = rounds.filter((r) => r.result === "Win").length;
      const losses = rounds.filter((r) => r.result === "Loss").length;
      const speaks = rounds.map((r) => r.speakerPoints).filter((s): s is number => s != null);
      return {
        label: shortName(t.name),
        date: t.startDate,
        wins,
        losses,
        winRate: pct(wins, wins + losses),
        avgSpeaks: speaks.length
          ? Math.round((speaks.reduce((a, b) => a + b, 0) / speaks.length) * 100) / 100
          : null,
      };
    });
}

export function speakerPointSeries(data: AppData) {
  return orderedRounds(data)
    .filter((r) => r.speakerPoints != null)
    .map((r, i) => ({ round: i + 1, speaks: r.speakerPoints as number }));
}

function shortName(name: string) {
  return name
    .replace(/(Invitational|Tournament|Classic|Round Robin|Opener)$/i, "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .join(" ");
}
