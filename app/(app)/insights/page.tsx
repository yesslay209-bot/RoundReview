"use client";

import Link from "next/link";
import { ArrowRight, Lightbulb, Scale, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { BRAND } from "@/lib/brand";
import { useAppData } from "@/lib/store";
import { improvementTagCounts, sidePerformance, tournamentTrend } from "@/lib/stats";
import type { ImprovementTag } from "@/lib/types";

/** Practice guidance per improvement area, matched to what judges typically mean. */
const TAG_ADVICE: Record<ImprovementTag, string> = {
  Delivery: "Slow down during important arguments and emphasize key evidence. Record a speech and listen for sections that blur together.",
  "Cross Examination": "Script your first three CX questions before each round, and use answers to set up later speeches instead of only defending.",
  Evidence: "Build comparison blocks: recency, methodology, and qualifications. When cards clash, tell the judge why to prefer yours.",
  Organization: "Answer arguments in the order they were made and number your responses so judges can follow you on the flow.",
  Speed: "Debate at your own pace — don't mirror a faster opponent. Your clearest speed is your most persuasive speed.",
  Argumentation: "Add a second layer of analysis: after every response, ask 'and why does that matter?' one more time.",
  Rebuttal: "Collapse earlier. Pick the arguments you're winning and spend real time weighing them instead of touring the flow.",
  "Case Structure": "Keep one link story per contention and fold spikes into the case so it reads as a single coherent narrative.",
  Strategy: "Decide your final-speech story early in the round, then make every speech build toward it.",
  "Time Management": "Write target times on your flow before each rebuttal, and budget prep across the whole round before you use any.",
};

export default function InsightsPage() {
  const { data } = useAppData();
  const tags = improvementTagCounts(data);
  const sides = sidePerformance(data);
  const trend = tournamentTrend(data);

  if (data.feedback.length === 0) {
    return (
      <div>
        <PageHeader title="Insights" subtitle="Every ballot tells you something." />
        <EmptyState
          icon={Lightbulb}
          title="No insights yet"
          message={`Add judge feedback from your rounds and ${BRAND.name} will surface the patterns judges keep noticing.`}
        />
      </div>
    );
  }

  const strongest = [...sides].sort((a, b) => b.winRate - a.winRate)[0];

  // Speaker point movement: first vs. last chunk of completed tournaments.
  const speaksByTournament = trend.filter((t) => t.avgSpeaks != null);
  const half = Math.max(1, Math.floor(speaksByTournament.length / 2));
  const early = speaksByTournament.slice(0, half);
  const late = speaksByTournament.slice(-half);
  const avg = (xs: number[]) =>
    xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : null;
  const earlyAvg = avg(early.map((t) => t.avgSpeaks as number));
  const lateAvg = avg(late.map((t) => t.avgSpeaks as number));
  const speaksImproving = earlyAvg != null && lateAvg != null && lateAvg > earlyAvg;

  const priorities = tags.slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Insights"
        subtitle="What your ballots say — and what to do about it."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Common improvement areas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Most Common Improvement Areas</CardTitle>
          </CardHeader>
          <CardBody>
            <ol className="space-y-3">
              {tags.slice(0, 5).map((t, i) => (
                <li key={t.tag} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display font-bold text-accent">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{t.tag}</p>
                    <p className="text-xs text-faint">
                      Mentioned by judges in {t.count} {t.count === 1 ? "round" : "rounds"}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardBody>
        </Card>

        {/* Insight cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {tags.slice(0, 2).map((t) => (
            <Card key={t.tag}>
              <CardBody className="pt-5">
                <Badge tone="violet">{t.tag}</Badge>
                <p className="mt-3 text-sm text-soft">
                  Mentioned by judges in <span className="font-bold text-ink">{t.count}</span>{" "}
                  {t.count === 1 ? "round" : "rounds"}.
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-semibold text-accent">Suggested focus: </span>
                  {TAG_ADVICE[t.tag]}
                </p>
              </CardBody>
            </Card>
          ))}

          {strongest && (
            <Card>
              <CardBody className="pt-5">
                <div className="flex items-center gap-2">
                  <Scale className="size-4 text-accent" aria-hidden />
                  <p className="text-sm font-bold">Your strongest side is {strongest.side}</p>
                </div>
                <div className="mt-3 space-y-2">
                  {sides.map((s) => (
                    <div key={s.side} className="flex items-center justify-between text-sm">
                      <span className="text-soft">{s.side} win rate</span>
                      <span className="font-display font-bold">{s.winRate}%</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-faint">
                  Spend extra practice reps on your weaker side — that&apos;s where the cheapest
                  wins are hiding.
                </p>
              </CardBody>
            </Card>
          )}

          {earlyAvg != null && lateAvg != null && (
            <Card>
              <CardBody className="pt-5">
                <div className="flex items-center gap-2">
                  <TrendingUp
                    className={`size-4 ${speaksImproving ? "text-win" : "text-warn"}`}
                    aria-hidden
                  />
                  <p className="text-sm font-bold">
                    Your speaker points are {speaksImproving ? "improving" : "holding steady"}
                  </p>
                </div>
                <div className="mt-3 flex gap-6">
                  <div>
                    <p className="text-xs text-faint">Early season avg</p>
                    <p className="font-display text-2xl font-bold">{earlyAvg}</p>
                  </div>
                  <div>
                    <p className="text-xs text-faint">Recent avg</p>
                    <p className="font-display text-2xl font-bold text-win">{lateAvg}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-faint">
                  Judges reward the fundamentals: clarity, structure, and weighing. Keep doing what
                  the recent ballots praise.
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* What should I work on */}
      <section className="mt-8" aria-labelledby="work-on-heading">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="size-5 text-violet" aria-hidden />
          <h2 id="work-on-heading" className="font-display text-xl font-bold">
            What Should I Work On?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {priorities.map((t, i) => (
            <Card
              key={t.tag}
              className="relative overflow-hidden transition-all duration-200 hover:shadow-pop hover:-translate-y-0.5"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-violet"
                aria-hidden
              />
              <CardBody className="pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-faint">
                  Priority {i + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold">{t.tag}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">{TAG_ADVICE[t.tag]}</p>
                <Link
                  href="/timer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
                >
                  Practice with the timer <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
