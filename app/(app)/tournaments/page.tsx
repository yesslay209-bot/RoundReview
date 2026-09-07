"use client";

import { useMemo, useState } from "react";
import { CalendarDays, LayoutList, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { TournamentCard } from "@/components/tournaments/tournament-card";
import { TournamentCalendar } from "@/components/tournaments/calendar";
import { TournamentFormDialog } from "@/components/tournaments/tournament-form";
import { useAppData } from "@/lib/store";
import { nextTournamentCountdown, seasonStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import type { Tournament } from "@/lib/types";

export default function TournamentsPage() {
  const { data } = useAppData();
  const [view, setView] = useState<"list" | "calendar">("list");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Tournament | null>(null);

  const next = nextTournamentCountdown(data);
  const stats = seasonStats(data);

  const { upcoming, past } = useMemo(() => {
    const sorted = [...data.tournaments].sort((a, b) => a.startDate.localeCompare(b.startDate));
    return {
      upcoming: sorted.filter((t) => t.status !== "Completed" && t.status !== "Cancelled"),
      past: sorted
        .filter((t) => t.status === "Completed" || t.status === "Cancelled")
        .reverse(),
    };
  }, [data.tournaments]);

  const openEdit = (t: Tournament) => {
    setEditing(t);
    setFormOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Tournaments"
        subtitle="Plan the season. Review the results."
        actions={
          <>
            <div className="flex rounded-lg border border-line p-0.5" role="tablist" aria-label="View">
              <button
                role="tab"
                aria-selected={view === "list"}
                onClick={() => setView("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  view === "list" ? "bg-accent/10 text-accent" : "text-soft hover:text-ink"
                )}
              >
                <LayoutList className="size-3.5" aria-hidden /> List
              </button>
              <button
                role="tab"
                aria-selected={view === "calendar"}
                onClick={() => setView("calendar")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  view === "calendar" ? "bg-accent/10 text-accent" : "text-soft hover:text-ink"
                )}
              >
                <CalendarDays className="size-3.5" aria-hidden /> Calendar
              </button>
            </div>
            <Button
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              <Plus className="size-4" aria-hidden /> Add Tournament
            </Button>
          </>
        }
      />

      {/* Season overview strip */}
      <Card className="mb-6">
        <CardBody className="flex flex-wrap items-center gap-x-10 gap-y-3 pt-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Season</p>
            <p className="font-display text-xl font-bold">
              {stats.tournamentsCompleted} completed · {stats.tournamentsUpcoming} upcoming
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Record</p>
            <p className="font-display text-xl font-bold">
              {stats.wins}–{stats.losses}{" "}
              <span className="text-sm font-semibold text-soft">({stats.winRate}%)</span>
            </p>
          </div>
          {next && (
            <div className="ml-auto rounded-xl bg-accent/8 px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Next Tournament
              </p>
              <p className="text-sm font-bold">
                {next.days} {next.days === 1 ? "day" : "days"} until {next.tournament.name}
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {view === "calendar" ? (
        <Card>
          <CardBody className="pt-5">
            <TournamentCalendar tournaments={data.tournaments} />
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-8">
          <section aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="mb-3 font-display text-lg font-bold">
              Upcoming Tournaments
            </h2>
            {upcoming.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="No Upcoming Tournaments"
                message="Your calendar is clear. Add your next tournament to start preparing."
                action={
                  <Button
                    onClick={() => {
                      setEditing(null);
                      setFormOpen(true);
                    }}
                  >
                    <Plus className="size-4" aria-hidden /> Add Tournament
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {upcoming.map((t) => (
                  <TournamentCard key={t.id} tournament={t} onEdit={openEdit} />
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section aria-labelledby="past-heading">
              <h2 id="past-heading" className="mb-3 font-display text-lg font-bold">
                Past Tournaments
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {past.map((t) => (
                  <TournamentCard key={t.id} tournament={t} onEdit={openEdit} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <TournamentFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        tournament={editing}
      />
    </div>
  );
}
