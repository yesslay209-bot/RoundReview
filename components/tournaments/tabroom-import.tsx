"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { ResultBadge } from "@/components/ui/badge";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { parseTabroomResults } from "@/lib/tabroom-import";
import { DEBATE_FORMATS, type DebateFormat } from "@/lib/types";
import { todayIso } from "@/lib/utils";

const SAMPLE = `1\tAff\tHarrison West\tW\t28.5
2\tNeg\tPriya Raman\tL\t27.9
3\tAff\tCole Bennett\tW\t28.2`;

export function TabroomImportDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addTournament, addRound } = useAppData();
  const toast = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState(todayIso());
  const [format, setFormat] = useState<DebateFormat>("Lincoln-Douglas");
  const [raw, setRaw] = useState("");

  const parsed = useMemo(() => parseTabroomResults(raw), [raw]);

  const importResults = () => {
    const tournament = addTournament({
      name,
      startDate: date,
      endDate: date,
      location: "",
      format,
      registrationDeadline: date,
      status: "Completed",
      notes: "Imported from Tabroom results.",
    });
    for (const r of parsed.rounds) {
      addRound({
        tournamentId: tournament.id,
        roundNumber: r.roundNumber,
        opponent: r.opponent,
        side: r.side,
        result: r.result,
        speakerPoints: r.speakerPoints,
      });
    }
    toast(`Imported ${parsed.rounds.length} rounds — analytics updated`);
    onClose();
    router.push(`/tournaments/detail?id=${tournament.id}`);
  };

  return (
    <Dialog open={open} onClose={onClose} title="Import from Tabroom" wide>
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-soft">
          On Tabroom, open your entry&apos;s results table, select the round rows, copy them,
          and paste below. Each pasted row becomes a round — the parser picks up the round
          number, side (Aff/Neg/Pro/Con), result (W/L or ballot counts like 2-1), opponent,
          and speaker points.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor="ti-name">Tournament Name</Label>
            <Input
              id="ti-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Berkeley Invitational"
            />
          </div>
          <div>
            <Label htmlFor="ti-date">Date</Label>
            <Input id="ti-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <Label htmlFor="ti-format">Debate Format</Label>
          <Select
            id="ti-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as DebateFormat)}
          >
            {DEBATE_FORMATS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </Select>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="ti-raw" className="mb-0">
              Pasted Results
            </Label>
            <button
              type="button"
              onClick={() => setRaw(SAMPLE)}
              className="text-xs font-semibold text-accent hover:text-accent-strong"
            >
              Paste sample data
            </button>
          </div>
          <Textarea
            id="ti-raw"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={"1   Aff   Harrison West   W   28.5\n2   Neg   Priya Raman   L   27.9"}
            className="min-h-32 font-mono text-xs"
          />
        </div>

        {raw.trim() && (
          <div className="rounded-xl border border-line bg-card2/50 p-3">
            <p className="mb-2 text-xs font-bold text-soft">
              Preview — {parsed.rounds.length} {parsed.rounds.length === 1 ? "round" : "rounds"}{" "}
              recognized
              {parsed.skipped > 0 && `, ${parsed.skipped} line${parsed.skipped === 1 ? "" : "s"} skipped`}
            </p>
            {parsed.rounds.length > 0 ? (
              <ul className="divide-y divide-line">
                {parsed.rounds.map((r) => (
                  <li key={r.roundNumber} className="flex items-center gap-3 py-1.5 text-sm">
                    <span className="w-8 shrink-0 font-bold">R{r.roundNumber}</span>
                    <span className="min-w-0 flex-1 truncate">vs {r.opponent}</span>
                    <span className="shrink-0 text-xs text-faint">{r.side}</span>
                    {r.speakerPoints != null && (
                      <span className="shrink-0 text-xs text-faint">{r.speakerPoints}</span>
                    )}
                    <ResultBadge result={r.result} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-faint">
                No rounds recognized yet — make sure each line includes a W or L (or a ballot
                count like 2-1).
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={importResults} disabled={!name.trim() || parsed.rounds.length === 0}>
            Import {parsed.rounds.length > 0 ? `${parsed.rounds.length} Rounds` : "Results"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
