"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Pencil } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Tournament } from "@/lib/types";
import { useAppData } from "@/lib/store";
import { tournamentRecord } from "@/lib/stats";
import { daysUntil, formatDate, formatDateRange } from "@/lib/utils";

export function TournamentCard({
  tournament,
  onEdit,
}: {
  tournament: Tournament;
  onEdit: (t: Tournament) => void;
}) {
  const { data } = useAppData();
  const record = tournamentRecord(data, tournament.id);
  const isPast = tournament.status === "Completed";
  const deadlineDays = daysUntil(tournament.registrationDeadline);

  return (
    <Card className="group transition-all duration-200 hover:shadow-pop hover:-translate-y-0.5">
      <CardBody className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-bold leading-tight">{tournament.name}</h3>
              <StatusBadge status={tournament.status} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-soft">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4 shrink-0" aria-hidden />
                {formatDateRange(tournament.startDate, tournament.endDate)}
              </span>
              {tournament.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {tournament.location}
                </span>
              )}
            </div>
          </div>
          {isPast && record.wins + record.losses > 0 && (
            <div className="shrink-0 text-right">
              <p className="font-display text-xl font-bold">
                {record.wins}
                <span className="text-faint">–</span>
                {record.losses}
              </p>
              <p className="text-xs text-faint">{record.winRate}% win rate</p>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <Badge tone="neutral">{tournament.format}</Badge>
          {!isPast && tournament.status !== "Cancelled" && (
            <span className="text-faint">
              Registration deadline: {formatDate(tournament.registrationDeadline)}
              {deadlineDays >= 0 && deadlineDays <= 14 && (
                <span className="ml-1 font-semibold text-warn">
                  ({deadlineDays === 0 ? "today!" : `${deadlineDays}d left`})
                </span>
              )}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/tournaments/detail?id=${tournament.id}`}>
            <Button size="sm" variant="outline">
              View Tournament
            </Button>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => onEdit(tournament)}>
            <Pencil className="size-3.5" aria-hidden /> Edit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
