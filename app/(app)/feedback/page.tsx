"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MessageSquareQuote, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Badge, ResultBadge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/empty-state";
import { FeedbackFormDialog } from "@/components/feedback/feedback-form";
import { useAppData } from "@/lib/store";
import { IMPROVEMENT_TAGS } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export default function FeedbackPage() {
  const { data } = useAppData();
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [resultFilter, setResultFilter] = useState<string>("All");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [formOpen, setFormOpen] = useState(false);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.feedback
      .map((f) => {
        const round = data.rounds.find((r) => r.id === f.roundId);
        const tournament = round
          ? data.tournaments.find((t) => t.id === round.tournamentId)
          : undefined;
        return { f, round, tournament };
      })
      .filter(({ f, round, tournament }) => {
        if (tagFilter !== "All" && !f.tags.includes(tagFilter as (typeof f.tags)[number])) return false;
        if (resultFilter !== "All" && round?.result !== resultFilter) return false;
        if (!q) return true;
        const haystack = [
          f.judgeName,
          f.feedback,
          f.personalReflection,
          tournament?.name,
          round?.opponent,
          ...f.tags,
          ...f.strengths,
          ...f.improvements,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) =>
        sort === "newest" ? b.f.date.localeCompare(a.f.date) : a.f.date.localeCompare(b.f.date)
      );
  }, [data, query, tagFilter, resultFilter, sort]);

  return (
    <div>
      <PageHeader
        title="Judge Feedback"
        subtitle="Turn every ballot into your next advantage."
        actions={
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="size-4" aria-hidden /> Add Feedback
          </Button>
        }
      />

      {/* Search + filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search judges, tournaments, feedback…"
            className="pl-9"
            aria-label="Search feedback"
          />
        </div>
        <Select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          aria-label="Filter by tag"
          className="w-auto min-w-36"
        >
          <option value="All">All tags</option>
          {IMPROVEMENT_TAGS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
        <Select
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          aria-label="Filter by result"
          className="w-auto min-w-28"
        >
          <option value="All">All results</option>
          <option>Win</option>
          <option>Loss</option>
        </Select>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
          aria-label="Sort"
          className="w-auto min-w-32"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </Select>
      </div>

      {data.feedback.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No Judge Feedback"
          message="Your ballots are one of your best learning tools. Add feedback from your first round to start tracking your improvement."
          action={
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="size-4" aria-hidden /> Add Feedback
            </Button>
          }
        />
      ) : entries.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matches"
          message="No feedback matches your search and filters. Try a different term or clear the filters."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setTagFilter("All");
                setResultFilter("All");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {entries.map(({ f, round, tournament }) => (
            <Card
              key={f.id}
              className={cn(
                "group flex flex-col transition-all duration-200 hover:shadow-pop hover:-translate-y-0.5 border-l-4",
                round?.result === "Win" ? "border-l-win" : round?.result === "Loss" ? "border-l-loss" : "border-l-line"
              )}
            >
              <CardBody className="flex flex-1 flex-col pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold leading-tight">
                      {tournament?.name ?? "Unknown tournament"}
                    </h3>
                    <p className="mt-0.5 text-xs text-faint">
                      Round {round?.roundNumber} · Judge: {f.judgeName} · {formatDate(f.date)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {round && <ResultBadge result={round.result} />}
                    {round?.speakerPoints != null && (
                      <span className="text-xs font-bold text-soft">{round.speakerPoints} spks</span>
                    )}
                  </div>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">
                  “{f.feedback.slice(0, 150)}
                  {f.feedback.length > 150 ? "…" : ""}”
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {f.tags.map((t) => (
                    <Badge key={t} tone="violet">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4">
                  <Link href={`/feedback/detail?id=${f.id}`}>
                    <Button variant="outline" size="sm">
                      View Full Feedback
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <FeedbackFormDialog open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
