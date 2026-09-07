"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import {
  DEBATE_FORMATS,
  TOURNAMENT_STATUSES,
  type DebateFormat,
  type Tournament,
  type TournamentStatus,
} from "@/lib/types";
import { todayIso } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  /** When provided, the dialog edits this tournament instead of creating one. */
  tournament?: Tournament | null;
}

const blank = () => ({
  name: "",
  startDate: todayIso(),
  endDate: todayIso(),
  location: "",
  format: "Lincoln-Douglas" as DebateFormat,
  registrationDeadline: todayIso(),
  status: "Planning" as TournamentStatus,
  notes: "",
});

export function TournamentFormDialog({ open, onClose, tournament }: Props) {
  const { addTournament, updateTournament } = useAppData();
  const toast = useToast();
  const [form, setForm] = useState(blank());

  useEffect(() => {
    if (open) {
      setForm(tournament ? { ...tournament } : blank());
    }
  }, [open, tournament]);

  const set = <K extends keyof ReturnType<typeof blank>>(key: K, value: ReturnType<typeof blank>[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      endDate: form.endDate < form.startDate ? form.startDate : form.endDate,
    };
    if (tournament) {
      updateTournament(tournament.id, payload);
      toast("Tournament updated");
    } else {
      addTournament(payload);
      toast("Tournament added to your season");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title={tournament ? "Edit Tournament" : "Add Tournament"} wide>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="t-name">Tournament Name</Label>
          <Input
            id="t-name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. California Invitational"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="t-start">Start Date</Label>
            <Input
              id="t-start"
              type="date"
              required
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="t-end">End Date</Label>
            <Input
              id="t-end"
              type="date"
              required
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="t-location">Location</Label>
            <Input
              id="t-location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="City, State"
            />
          </div>
          <div>
            <Label htmlFor="t-format">Debate Format</Label>
            <Select
              id="t-format"
              value={form.format}
              onChange={(e) => set("format", e.target.value as DebateFormat)}
            >
              {DEBATE_FORMATS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="t-deadline">Registration Deadline</Label>
            <Input
              id="t-deadline"
              type="date"
              value={form.registrationDeadline}
              onChange={(e) => set("registrationDeadline", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="t-status">Status</Label>
            <Select
              id="t-status"
              value={form.status}
              onChange={(e) => set("status", e.target.value as TournamentStatus)}
            >
              {TOURNAMENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="t-notes">Notes</Label>
          <Textarea
            id="t-notes"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Travel plans, judging pool, goals for this tournament…"
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{tournament ? "Save Changes" : "Add Tournament"}</Button>
        </div>
      </form>
    </Dialog>
  );
}
