"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import type { Round, RoundResult, Side } from "@/lib/types";

const SIDES: Side[] = ["Affirmative", "Negative", "Pro", "Con"];
const RESULTS: RoundResult[] = ["Win", "Loss", "Bye"];

interface Props {
  open: boolean;
  onClose: () => void;
  tournamentId: string;
  round?: Round | null;
}

export function RoundFormDialog({ open, onClose, tournamentId, round }: Props) {
  const { data, addRound, updateRound } = useAppData();
  const toast = useToast();

  const nextRoundNumber =
    Math.max(0, ...data.rounds.filter((r) => r.tournamentId === tournamentId).map((r) => r.roundNumber)) + 1;

  const [roundNumber, setRoundNumber] = useState(1);
  const [opponent, setOpponent] = useState("");
  const [side, setSide] = useState<Side>("Affirmative");
  const [result, setResult] = useState<RoundResult>("Win");
  const [speaks, setSpeaks] = useState("");

  useEffect(() => {
    if (!open) return;
    setRoundNumber(round?.roundNumber ?? nextRoundNumber);
    setOpponent(round?.opponent ?? "");
    setSide(round?.side ?? "Affirmative");
    setResult(round?.result ?? "Win");
    setSpeaks(round?.speakerPoints != null ? String(round.speakerPoints) : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, round]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      tournamentId,
      roundNumber,
      opponent,
      side,
      result,
      speakerPoints: speaks === "" ? null : Number(speaks),
    };
    if (round) {
      updateRound(round.id, payload);
      toast("Round updated");
    } else {
      addRound(payload);
      toast("Round logged");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title={round ? "Edit Round" : "Log Round"}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="r-num">Round Number</Label>
            <Input
              id="r-num"
              type="number"
              min={1}
              required
              value={roundNumber}
              onChange={(e) => setRoundNumber(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="r-speaks">Speaker Points</Label>
            <Input
              id="r-speaks"
              type="number"
              step="0.1"
              min={0}
              max={30}
              value={speaks}
              onChange={(e) => setSpeaks(e.target.value)}
              placeholder="e.g. 28.5"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="r-opp">Opponent</Label>
          <Input
            id="r-opp"
            required
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="Opponent name or team code"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="r-side">Side</Label>
            <Select id="r-side" value={side} onChange={(e) => setSide(e.target.value as Side)}>
              {SIDES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="r-result">Result</Label>
            <Select id="r-result" value={result} onChange={(e) => setResult(e.target.value as RoundResult)}>
              {RESULTS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{round ? "Save Changes" : "Log Round"}</Button>
        </div>
      </form>
    </Dialog>
  );
}
