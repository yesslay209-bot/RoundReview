"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Pencil, Quote, TrendingUp, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, ResultBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/dialog";
import { FeedbackFormDialog } from "@/components/feedback/feedback-form";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";

export default function FeedbackDetailPage() {
  return (
    <Suspense fallback={null}>
      <FeedbackDetail />
    </Suspense>
  );
}

function FeedbackDetail() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { data, deleteFeedback } = useAppData();
  const toast = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const feedback = data.feedback.find((f) => f.id === id);
  const round = feedback ? data.rounds.find((r) => r.id === feedback.roundId) : undefined;
  const tournament = round ? data.tournaments.find((t) => t.id === round.tournamentId) : undefined;

  if (!feedback) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-lg font-semibold">Feedback not found</p>
        <Link href="/feedback" className="mt-3 inline-block text-sm font-semibold text-accent">
          ← Back to feedback
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/feedback"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-soft hover:text-ink transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden /> Judge Feedback
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {tournament?.name ?? "Feedback"}
          </h1>
          <p className="mt-1 text-sm text-soft">
            Round {round?.roundNumber} · Judge: {feedback.judgeName} · {formatDate(feedback.date)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-3.5" aria-hidden /> Edit Feedback
          </Button>
          <Button variant="danger" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-3.5" aria-hidden /> Delete Feedback
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Round info */}
        <Card>
          <CardHeader>
            <CardTitle>Round Information</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-faint">Tournament</span>
              {tournament ? (
                <Link
                  href={`/tournaments/detail?id=${tournament.id}`}
                  className="font-semibold text-accent hover:text-accent-strong"
                >
                  {tournament.name}
                </Link>
              ) : (
                <span className="font-semibold">—</span>
              )}
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Opponent</span>
              <span className="font-semibold">{round?.opponent ?? "—"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Round</span>
              <span className="font-semibold">{round ? `Round ${round.roundNumber}` : "—"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Side</span>
              <span className="font-semibold">{round?.side ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-faint">Result</span>
              {round ? <ResultBadge result={round.result} /> : "—"}
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Speaker Points</span>
              <span className="font-display text-lg font-bold">
                {round?.speakerPoints ?? "—"}
              </span>
            </div>
          </CardBody>
        </Card>

        {/* Main feedback */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Quote className="size-4 text-accent" aria-hidden />
              <CardTitle>Judge Feedback</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm leading-relaxed text-ink whitespace-pre-line">
                {feedback.feedback}
              </p>
            </CardBody>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-win" aria-hidden />
                <CardTitle>What Went Well</CardTitle>
              </CardHeader>
              <CardBody>
                {feedback.strengths.length ? (
                  <ul className="space-y-2 text-sm text-soft">
                    {feedback.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-win">•</span> {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-faint">Nothing recorded.</p>
                )}
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-2">
                <TrendingUp className="size-4 text-warn" aria-hidden />
                <CardTitle>Areas to Improve</CardTitle>
              </CardHeader>
              <CardBody>
                {feedback.improvements.length ? (
                  <ul className="space-y-2 text-sm text-soft">
                    {feedback.improvements.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-warn">•</span> {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-faint">Nothing recorded.</p>
                )}
              </CardBody>
            </Card>
          </div>

          {feedback.personalReflection && (
            <Card>
              <CardHeader>
                <CardTitle>My Reflection</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-sm leading-relaxed text-soft whitespace-pre-line">
                  {feedback.personalReflection}
                </p>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Improvement Tags</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {feedback.tags.map((t) => (
                  <Link key={t} href="/insights">
                    <Badge tone="violet" className="cursor-pointer px-3 py-1 text-sm hover:bg-violet/20 transition-colors">
                      {t}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <FeedbackFormDialog open={editOpen} onClose={() => setEditOpen(false)} feedback={feedback} />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Feedback"
        message="Delete this ballot? This can't be undone."
        onConfirm={() => {
          deleteFeedback(feedback.id);
          toast("Feedback deleted");
          router.push("/feedback");
        }}
      />
    </div>
  );
}
