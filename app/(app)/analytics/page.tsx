"use client";

import { BarChart3, Flame, Medal, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  FormPill,
  HorizontalMeter,
  SpeaksTrendChart,
  TournamentBarsChart,
  WinLossTrendChart,
  WinRateDonut,
} from "@/components/analytics/charts";
import { useAppData } from "@/lib/store";
import {
  improvementTagCounts,
  seasonStats,
  sidePerformance,
  speakerPointSeries,
  tournamentTrend,
} from "@/lib/stats";

export default function AnalyticsPage() {
  const { data, hydrated } = useAppData();
  const stats = seasonStats(data);
  const trend = tournamentTrend(data);
  const speaks = speakerPointSeries(data);
  const sides = sidePerformance(data);
  const tags = improvementTagCounts(data);
  const maxTag = tags[0]?.count ?? 1;

  if (stats.totalRounds === 0) {
    return (
      <div>
        <PageHeader title="Analytics" subtitle="See where you're improving." />
        <EmptyState
          icon={BarChart3}
          title="No rounds yet"
          message="Log rounds from your tournaments and your analytics will build themselves."
        />
      </div>
    );
  }

  const statCards = [
    { label: "Total Rounds", value: stats.totalRounds },
    { label: "Wins", value: stats.wins, className: "text-win" },
    { label: "Losses", value: stats.losses, className: "text-loss" },
    { label: "Win Percentage", value: `${stats.winRate}%`, className: "text-accent" },
    { label: "Tournaments", value: stats.tournamentsCompleted },
    { label: "Avg Speaker Points", value: stats.avgSpeaks ?? "—" },
  ];

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Know your record. Know your strengths. Know what comes next."
      />

      {/* Stat cards */}
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardBody className="pt-4 pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                {s.label}
              </p>
              <p className={`mt-1.5 font-display text-2xl font-bold ${s.className ?? ""}`}>
                {s.value}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardBody className="flex items-center gap-4 pt-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-warn/15">
              <Flame className="size-5 text-warn" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Current Streak
              </p>
              <p className="font-display text-xl font-bold">
                {stats.currentStreak
                  ? `${stats.currentStreak.length} ${stats.currentStreak.type === "W" ? "wins" : "losses"} in a row`
                  : "—"}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-4 pt-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10">
              <Medal className="size-5 text-accent" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Best Tournament
              </p>
              <p className="font-display text-xl font-bold">
                {stats.bestTournament
                  ? `${stats.bestTournament.tournament.name} (${stats.bestTournament.wins}–${stats.bestTournament.losses})`
                  : "—"}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts — only render after hydration so recharts sizes correctly */}
      {hydrated && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Trend</CardTitle>
              <p className="mt-0.5 text-xs text-faint">Win rate by tournament across the season</p>
            </CardHeader>
            <CardBody>
              <WinLossTrendChart data={trend} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win Rate</CardTitle>
              <p className="mt-0.5 text-xs text-faint">
                {stats.wins} wins · {stats.losses} losses
              </p>
            </CardHeader>
            <CardBody>
              <WinRateDonut winRate={stats.winRate} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tournament Performance</CardTitle>
              <p className="mt-0.5 text-xs text-faint">Wins and losses per tournament</p>
            </CardHeader>
            <CardBody>
              <TournamentBarsChart data={trend} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Speaker Point Trend</CardTitle>
              <p className="mt-0.5 text-xs text-faint">Every scored round, in season order</p>
            </CardHeader>
            <CardBody>
              <SpeaksTrendChart data={speaks} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <Target className="size-4 text-accent" aria-hidden />
              <CardTitle>Performance by Side</CardTitle>
            </CardHeader>
            <CardBody className="space-y-5 pt-2">
              {sides.map((s) => (
                <div key={s.side}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-bold">{s.side}</span>
                    <span className="text-sm text-soft">
                      <span className="font-display font-bold text-ink">{s.winRate}%</span> win rate
                      · {s.wins}–{s.losses}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-card2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-violet transition-all duration-700"
                      style={{ width: `${s.winRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Categories</CardTitle>
              <p className="mt-0.5 text-xs text-faint">
                Areas judges mention most across your ballots
              </p>
            </CardHeader>
            <CardBody className="space-y-3 pt-2">
              {tags.slice(0, 6).map((t) => (
                <HorizontalMeter
                  key={t.tag}
                  label={t.tag}
                  value={t.count}
                  max={maxTag}
                  suffix={t.count === 1 ? " mention" : " mentions"}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      )}

      {/* Recent form */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Form</CardTitle>
          <p className="mt-0.5 text-xs text-faint">Your last {stats.recentForm.length} rounds</p>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2.5">
            {stats.recentForm.map((r) => (
              <FormPill key={r.id} result={r.result} size="lg" />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
