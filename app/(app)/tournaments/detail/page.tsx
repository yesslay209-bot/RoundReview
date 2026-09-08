"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  MessageSquarePlus,
  Pencil,
  Plus,
  Swords,
  Trash2,
} from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, ResultBadge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { TournamentFormDialog } from "@/components/tournaments/tournament-form";
import { RoundFormDialog } from "@/components/tournaments/round-form";
import { FeedbackFormDialog } from "@/components/feedback/feedback-form";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { tournamentRecord, tournamentRounds } from "@/lib/stats";
import { formatDate, formatDateRange } from "@/lib/utils";
import type { Round } from "@/lib/types";

export default function TournamentDetailPage() {
  return (
    <Suspense fallback={null}>
      <TournamentDetail />
    </Suspense>
  );
}

function TournamentDetail() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { data, deleteTournament, deleteRound } = useAppData();
  const toast = useToast();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [roundFormOpen, setRoundFormOpen] = useState(false);
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const [deletingRound, setDeletingRound] = useState<Round | null>(null);
  const [feedbackFor, setFeedbackFor] = useState<string | null>(null);

  const tournament = data.tournaments.find((t) => t.id === id);
  if (!tournament) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-lg font-semibold">Tournament not found</p>
        <Link href="/tournaments" className="mt-3 inline-block text-sm font-semibold text-accent">
          ← Back to tournaments
        </Link>
      </div>
    );
  }

  const rounds = tournamentRounds(data, tournament.id);
  const record = tournamentRecord(data, tournament.id);

  return (
    <div>
      <Link
        href="/tournaments"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-soft hover:text-ink transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden /> Tournaments
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {tournament.name}
            </h1>
            <StatusBadge status={tournament.status} />
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-soft">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              {formatDateRange(tournament.startDate, tournament.endDate)}
            </span>
            {tournament.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden />
                {tournament.location}
              </span>
            )}
            <Badge tone="neutral">{tournament.format}</Badge>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-3.5" aria-hidden /> Edit Tournament
          </Button>
          <Button variant="danger" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-3.5" aria-hidden /> Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>Tournament Information</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-faint">Format</span>
              <span className="font-semibold">{tournament.format}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Rounds</span>
              <span className="font-semibold">{rounds.length}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Registration deadline</span>
              <span className="font-semibold">{formatDate(tournament.registrationDeadline)}</span>
            </div>
            {tournament.notes && (
              <div className="rounded-lg bg-card2 p-3 text-soft leading-relaxed">
                {tournament.notes}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Results */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>Results</CardTitle>
            {rounds.length > 0 && (
              <p className="text-sm text-soft">
                <span className="font-bold text-win">{record.wins} wins</span> ·{" "}
                <span className="font-bold text-loss">{record.losses} losses</span> ·{" "}
                <span className="font-bold">{record.winRate}%</span> win rate
              </p>
            )}
          </CardHeader>
          <CardBody>
            {rounds.length === 0 ? (
              <EmptyState
                icon={Swords}
                title="No rounds logged"
                message="Log your first round from this tournament to start tracking results and feedback."
                action={
                  <Button
                    onClick={() => {
                      setEditingRound(null);
                      setRoundFormOpen(true);
                    }}
                  >
                    <Plus className="size-4" aria-hidden /> Log Round
                  </Button>
                }
              />
            ) : (
              <>
                <ul className="divide-y divide-line">
                  {rounds.map((r) => (
                    <li key={r.id} className="flex flex-wrap items-center gap-3 py-3">
                      <span className="w-16 shrink-0 text-sm font-bold">R{r.roundNumber}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">vs {r.opponent}</p>
                        <p className="text-xs text-faint">
                          {r.side}
                          {r.speakerPoints != null && ` · ${r.speakerPoints} speaks`}
                        </p>
                      </div>
                      <ResultBadge result={r.result} />
                      {r.feedbackId ? (
                        <Link href={`/feedback/detail?id=${r.feedbackId}`}>
                          <Button variant="outline" size="sm">
                            View Feedback
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => setFeedbackFor(r.id)}>
                          <MessageSquarePlus className="size-3.5" aria-hidden /> Add Feedback
                        </Button>
                      )}
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingRound(r);
                            setRoundFormOpen(true);
                          }}
                          aria-label={`Edit round ${r.roundNumber}`}
                          className="rounded-lg p-2 text-faint hover:bg-card2 hover:text-ink transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingRound(r)}
                          aria-label={`Delete round ${r.roundNumber}`}
                          className="rounded-lg p-2 text-faint hover:bg-loss/10 hover:text-loss transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setEditingRound(null);
                    setRoundFormOpen(true);
                  }}
                >
                  <Plus className="size-4" aria-hidden /> Log Round
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Dialogs */}
      <TournamentFormDialog open={editOpen} onClose={() => setEditOpen(false)} tournament={tournament} />
      <RoundFormDialog
        open={roundFormOpen}
        onClose={() => setRoundFormOpen(false)}
        tournamentId={tournament.id}
        round={editingRound}
      />
      <FeedbackFormDialog
        open={feedbackFor !== null}
        onClose={() => setFeedbackFor(null)}
        defaultRoundId={feedbackFor ?? undefined}
      />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Tournament"
        message={`Delete "${tournament.name}" along with its ${rounds.length} rounds and their feedback? This can't be undone.`}
        onConfirm={() => {
          deleteTournament(tournament.id);
          toast("Tournament deleted");
          router.push("/tournaments");
        }}
      />
      <ConfirmDialog
        open={deletingRound !== null}
        onClose={() => setDeletingRound(null)}
        title="Delete Round"
        message={`Delete round ${deletingRound?.roundNumber} vs ${deletingRound?.opponent}? Any attached feedback will be removed too.`}
        onConfirm={() => {
          if (deletingRound) {
            deleteRound(deletingRound.id);
            toast("Round deleted");
          }
        }}
      />
    </div>
  );
}
