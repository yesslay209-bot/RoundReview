"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, MapPin, MessageSquareQuote, Trophy } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { FormPill } from "@/components/analytics/charts";
import { useAppData } from "@/lib/store";
import {
  improvementTagCounts,
  nextTournamentCountdown,
  seasonStats,
} from "@/lib/stats";
import { formatDateRange } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { data } = useAppData();
  const stats = seasonStats(data);
  const next = nextTournamentCountdown(data);
  const tagCounts = improvementTagCounts(data).slice(0, 3);
  const latestFeedback = [...data.feedback].sort((a, b) => b.date.localeCompare(a.date))[0];
  const done = data.checklist.filter((c) => c.completed).length;
  const total = data.checklist.length;
  const firstName = data.user.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-soft">Here&apos;s how your debate season is looking.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardBody className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Season Record</p>
            <p className="mt-2 font-display text-3xl font-bold">
              {stats.wins}
              <span className="text-faint">–</span>
              {stats.losses}
            </p>
            <p className="mt-1 text-xs text-soft">{stats.totalRounds} rounds debated</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Win Rate</p>
            <p className="mt-2 font-display text-3xl font-bold text-accent">{stats.winRate}%</p>
            {stats.currentStreak && (
              <p className="mt-1 flex items-center gap-1 text-xs text-soft">
                <Flame className="size-3.5 text-warn" aria-hidden />
                {stats.currentStreak.length}-round {stats.currentStreak.type === "W" ? "win" : "loss"} streak
              </p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardBody className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Tournaments</p>
            <p className="mt-2 font-display text-3xl font-bold">{stats.tournamentsCompleted}</p>
            <p className="mt-1 text-xs text-soft">{stats.tournamentsUpcoming} upcoming</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Avg Speaker Points</p>
            <p className="mt-2 font-display text-3xl font-bold">{stats.avgSpeaks ?? "—"}</p>
            <p className="mt-1 text-xs text-soft">out of 30</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Upcoming tournament */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-violet/8"
            aria-hidden
          />
          <CardBody className="relative pt-5">
            {next ? (
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Next Tournament
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl font-bold">{next.tournament.name}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" aria-hidden />
                      {formatDateRange(next.tournament.startDate, next.tournament.endDate)}
                    </span>
                    {next.tournament.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden />
                        {next.tournament.location}
                      </span>
                    )}
                  </p>
                  <Link href="/checklist">
                    <Button className="mt-4" size="sm">
                      Prepare for Tournament <ArrowRight className="size-4" aria-hidden />
                    </Button>
                  </Link>
                </div>
                <div className="text-center">
                  <p className="font-display text-6xl font-bold text-accent">{next.days}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                    {next.days === 1 ? "day" : "days"} away
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="font-display text-lg font-semibold">Your calendar is clear</p>
                <p className="mt-1 text-sm text-soft">
                  Add your next tournament to start preparing.
                </p>
                <Link href="/tournaments">
                  <Button className="mt-4" size="sm">
                    Add Tournament
                  </Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Recent performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2">
              {stats.recentForm.map((r) => (
                <FormPill key={r.id} result={r.result} size="lg" />
              ))}
            </div>
            {stats.bestTournament && (
              <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-card2 px-3 py-2.5">
                <Trophy className="size-4 shrink-0 text-warn" aria-hidden />
                <p className="text-xs text-soft">
                  Best tournament:{" "}
                  <span className="font-semibold text-ink">
                    {stats.bestTournament.tournament.name}
                  </span>{" "}
                  ({stats.bestTournament.wins}–{stats.bestTournament.losses})
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Feedback snapshot */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Latest Judge Feedback</CardTitle>
            <MessageSquareQuote className="size-4 text-faint" aria-hidden />
          </CardHeader>
          <CardBody>
            {latestFeedback ? (
              <>
                <p className="text-sm leading-relaxed text-soft">
                  “{latestFeedback.feedback.slice(0, 140)}
                  {latestFeedback.feedback.length > 140 ? "…" : ""}”
                </p>
                <p className="mt-2 text-xs text-faint">— {latestFeedback.judgeName}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {latestFeedback.tags.slice(0, 3).map((t) => (
                    <Badge key={t} tone="violet">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/feedback/detail?id=${latestFeedback.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
                >
                  View Feedback <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </>
            ) : (
              <p className="text-sm text-soft">
                No feedback yet. Your ballots are one of your best learning tools.
              </p>
            )}
          </CardBody>
        </Card>

        {/* Improvement focus */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Focus</CardTitle>
          </CardHeader>
          <CardBody>
            {tagCounts.length > 0 ? (
              <ol className="space-y-3">
                {tagCounts.map((t, i) => (
                  <li key={t.tag} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-semibold">{t.tag}</span>
                    <span className="text-xs text-faint">{t.count} mentions</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-soft">Add judge feedback to see your focus areas.</p>
            )}
            <Link
              href="/insights"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
            >
              See all insights <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </CardBody>
        </Card>

        {/* Checklist progress */}
        <Card>
          <CardHeader>
            <CardTitle>Tournament Preparation</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="font-display text-3xl font-bold">
              {done}
              <span className="text-faint"> / {total}</span>
            </p>
            <p className="mt-1 text-xs text-soft">
              {total === 0 ? 0 : Math.round((done / total) * 100)}% complete
            </p>
            <ProgressBar
              value={total === 0 ? 0 : (done / total) * 100}
              className="mt-3"
              label="Checklist progress"
              barClassName={done === total ? "bg-win" : undefined}
            />
            <Link href="/checklist">
              <Button variant="outline" size="sm" className="mt-4">
                Continue Checklist
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
