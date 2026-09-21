"use client";

import { useMemo, useRef, useState } from "react";
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

const SAMPLE = `Chuck Ballingall Memorial Invitational
Varsity Lincoln Douglas (VLD)
Your Code: ModernBrain GC
Quarters
Sun 2:50 PM
502\tNeg\tPeninsula SP\t
Delgado, Norma
L
Millimet, Dylan
W
Vasudeva, Ishaan
L
Round 2
Sat 11:30 AM
Flt 1
108a\tAff\tMarlborough ST\t
Oliveros, Miguel
28.1
L
Round 1
Sat 8:45 AM
Flt 1
600s Bio Lab\tNeg\tHarvard-Westlake HP\t
Mirza, Sabeeh
29
W`;

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
  // Remember what we auto-filled so a user's manual edit is never overwritten.
  const lastAutoName = useRef("");

  const parsed = useMemo(() => parseTabroomResults(raw), [raw]);

  const onRawChange = (value: string) => {
    setRaw(value);
    const p = parseTabroomResults(value);
    if (p.tournamentName && (name === "" || name === lastAutoName.current)) {
      setName(p.tournamentName);
      lastAutoName.current = p.tournamentName;
    }
    if (p.format) setFormat(p.format);
  };

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
        label: r.label,
        opponent: r.opponent,
        side: r.side,
        result: r.result,
        speakerPoints: r.speakerPoints,
        judges: r.judges.length ? r.judges : undefined,
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
          On Tabroom, open your entry page for the tournament, select everything from the
          tournament name down through your last round, copy, and paste below. Each round is
          recognized with its opponent, side, result, speaker points, and judge — including
          elimination rounds, where the result comes from the panel&apos;s majority ballot.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor="ti-name">Tournament Name</Label>
            <Input
              id="ti-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Auto-detected from the paste"
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
              Pasted Entry Page
            </Label>
            <button
              type="button"
              onClick={() => onRawChange(SAMPLE)}
              className="text-xs font-semibold text-accent hover:text-accent-strong"
            >
              Paste sample data
            </button>
          </div>
          <Textarea
            id="ti-raw"
            value={raw}
            onChange={(e) => onRawChange(e.target.value)}
            placeholder={"Round 1\nSat 8:45 AM\n600s Bio Lab   Neg   Harvard-Westlake HP\nMirza, Sabeeh\n29\nW"}
            className="min-h-36 font-mono text-xs"
          />
        </div>

        {raw.trim() && (
          <div className="rounded-xl border border-line bg-card2/50 p-3">
            <p className="mb-2 text-xs font-bold text-soft">
              Preview — {parsed.rounds.length} {parsed.rounds.length === 1 ? "round" : "rounds"}{" "}
              recognized
              {parsed.skipped > 0 &&
                `, ${parsed.skipped} block${parsed.skipped === 1 ? "" : "s"} skipped`}
            </p>
            {parsed.rounds.length > 0 ? (
              <ul className="divide-y divide-line">
                {parsed.rounds.map((r) => (
                  <li key={r.roundNumber} className="py-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-16 shrink-0 font-bold">{r.label ?? `R${r.roundNumber}`}</span>
                      <span className="min-w-0 flex-1 truncate">vs {r.opponent}</span>
                      <span className="shrink-0 text-xs text-faint">{r.side}</span>
                      {r.speakerPoints != null && (
                        <span className="shrink-0 text-xs text-faint">{r.speakerPoints}</span>
                      )}
                      <ResultBadge result={r.result} />
                    </div>
                    {r.judges.length > 0 && (
                      <p className="ml-16 mt-0.5 truncate pl-3 text-xs text-faint">
                        {r.judges.length > 1 ? "Panel" : "Judge"}: {r.judges.join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-faint">
                No rounds recognized yet — make sure each round block includes its result
                (the W or L lines under each judge).
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
