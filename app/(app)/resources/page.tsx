"use client";

import { useState } from "react";
import { BookOpen, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Strategy",
  "Speech Structure",
  "Cross Examination",
  "Evidence",
  "Rebuttal",
  "Tournament Preparation",
  "Debate Formats",
] as const;

interface Resource {
  title: string;
  blurb: string;
  category: (typeof CATEGORIES)[number];
  minutes: number;
}

const RESOURCES: Resource[] = [
  {
    title: "How to Structure a Strong Rebuttal",
    blurb: "A four-part rebuttal template: answer in order, collapse deliberately, weigh explicitly, and end with the ballot story.",
    category: "Rebuttal",
    minutes: 7,
  },
  {
    title: "5 Ways to Improve Cross Examination",
    blurb: "Short questions, planned openings, reframing answers, controlling pace, and turning CX concessions into speech material.",
    category: "Cross Examination",
    minutes: 6,
  },
  {
    title: "How to Read and Apply Judge Feedback",
    blurb: "Ballots are data. How to spot recurring comments, separate style notes from strategy notes, and turn both into drills.",
    category: "Tournament Preparation",
    minutes: 8,
  },
  {
    title: "Preparing the Night Before a Tournament",
    blurb: "The checklist-driven evening routine that leaves you rested, packed, and confident at check-in.",
    category: "Tournament Preparation",
    minutes: 5,
  },
  {
    title: "Evidence Comparison That Wins Rounds",
    blurb: "When cards clash, judges need a reason to prefer yours: recency, methodology, sample size, and source qualification.",
    category: "Evidence",
    minutes: 9,
  },
  {
    title: "Case Writing: One Link Story Per Contention",
    blurb: "Why muddy contentions lose clean flows, and how to restructure a case so every argument has one job.",
    category: "Speech Structure",
    minutes: 10,
  },
  {
    title: "Collapsing: The Art of Letting Arguments Go",
    blurb: "Final speeches that cover two arguments deeply beat speeches that tour six. How to choose what to keep.",
    category: "Strategy",
    minutes: 8,
  },
  {
    title: "Weighing 101: Magnitude, Probability, Timeframe",
    blurb: "The three comparisons that turn a messy flow into an easy ballot — with example weighing sentences.",
    category: "Strategy",
    minutes: 6,
  },
  {
    title: "Signposting So Judges Never Get Lost",
    blurb: "Verbal roadmaps, numbering, and transitions that give judges pen time exactly where you want it.",
    category: "Speech Structure",
    minutes: 5,
  },
  {
    title: "Lincoln-Douglas vs. Public Forum vs. Policy",
    blurb: "Speech times, burdens, and judging norms across the major formats — and how prep differs for each.",
    category: "Debate Formats",
    minutes: 11,
  },
  {
    title: "Prep Time Budgeting Across a Round",
    blurb: "When to spend and when to bank: prep allocation patterns from elimination-round debaters.",
    category: "Strategy",
    minutes: 4,
  },
  {
    title: "Flowing Fast Rounds Accurately",
    blurb: "Shorthand systems, column discipline, and what to do when you miss an argument mid-speech.",
    category: "Tournament Preparation",
    minutes: 7,
  },
];

export default function ResourcesPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const list = RESOURCES.filter((r) => category === "All" || r.category === category);

  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle="Sharpen the skills your ballots keep mentioning."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Resource category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              category === c
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-soft hover:border-faint hover:text-ink"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <Card
            key={r.title}
            className="group flex flex-col transition-all duration-200 hover:shadow-pop hover:-translate-y-0.5"
          >
            <CardBody className="flex flex-1 flex-col pt-5">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-accent/10">
                <BookOpen className="size-5 text-accent" aria-hidden />
              </div>
              <h3 className="font-display font-bold leading-snug">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">{r.blurb}</p>
              <div className="mt-4 flex items-center justify-between">
                <Badge tone="neutral">{r.category}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-faint">
                  <Clock3 className="size-3.5" aria-hidden /> {r.minutes} min read
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
