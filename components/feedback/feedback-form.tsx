"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { IMPROVEMENT_TAGS, type ImprovementTag, type JudgeFeedback } from "@/lib/types";
import { cn, todayIso } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Editing an existing entry. */
  feedback?: JudgeFeedback | null;
  /** Preselect a round (e.g. when adding from a tournament detail page). */
  defaultRoundId?: string;
}

export function FeedbackFormDialog({ open, onClose, feedback, defaultRoundId }: Props) {
  const { data, addFeedback, updateFeedback } = useAppData();
  const toast = useToast();

  const [roundId, setRoundId] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [date, setDate] = useState(todayIso());
  const [text, setText] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [tags, setTags] = useState<ImprovementTag[]>([]);
  const [reflection, setReflection] = useState("");

  // Rounds that don't have feedback yet (plus the one being edited).
  const availableRounds = useMemo(
    () =>
      data.rounds.filter((r) => r.feedbackId === null || r.id === feedback?.roundId),
    [data.rounds, feedback]
  );

  useEffect(() => {
    if (!open) return;
    setRoundId(feedback?.roundId ?? defaultRoundId ?? availableRounds[0]?.id ?? "");
    // Prefill the judge from the round when it was imported with one attached.
    const roundJudge = defaultRoundId
      ? data.rounds.find((r) => r.id === defaultRoundId)?.judges?.[0]
      : undefined;
    setJudgeName(feedback?.judgeName ?? roundJudge ?? "");
    setDate(feedback?.date ?? todayIso());
    setText(feedback?.feedback ?? "");
    setStrengths(feedback?.strengths.join("\n") ?? "");
    setImprovements(feedback?.improvements.join("\n") ?? "");
    setTags(feedback?.tags ?? []);
    setReflection(feedback?.personalReflection ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, feedback, defaultRoundId]);

  const toggleTag = (tag: ImprovementTag) =>
    setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));

  const roundLabel = (id: string) => {
    const r = data.rounds.find((x) => x.id === id);
    if (!r) return id;
    const t = data.tournaments.find((x) => x.id === r.tournamentId);
    return `${t?.name ?? "Unknown"} · Round ${r.roundNumber} vs ${r.opponent}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roundId) return;
    const payload = {
      roundId,
      judgeName,
      date,
      feedback: text,
      strengths: strengths.split("\n").map((s) => s.trim()).filter(Boolean),
      improvements: improvements.split("\n").map((s) => s.trim()).filter(Boolean),
      tags,
      personalReflection: reflection,
    };
    if (feedback) {
      updateFeedback(feedback.id, payload);
      toast("Feedback updated");
    } else {
      addFeedback(payload);
      toast("Ballot saved — analytics updated");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title={feedback ? "Edit Feedback" : "Add Judge Feedback"} wide>
      {availableRounds.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-soft">
            Every logged round already has feedback. Add a round to a tournament first, then
            attach the judge&apos;s ballot to it.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="f-round">Round</Label>
            <Select id="f-round" required value={roundId} onChange={(e) => setRoundId(e.target.value)}>
              {availableRounds.map((r) => (
                <option key={r.id} value={r.id}>
                  {roundLabel(r.id)}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="f-judge">Judge Name</Label>
              <Input
                id="f-judge"
                required
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                placeholder="e.g. Sarah Mitchell"
              />
            </div>
            <div>
              <Label htmlFor="f-date">Date</Label>
              <Input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="f-text">Judge&apos;s Written Feedback</Label>
            <Textarea
              id="f-text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did the judge write on the ballot?"
              className="min-h-32"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="f-strengths">What Went Well (one per line)</Label>
              <Textarea
                id="f-strengths"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder={"Strong framework debate\nClear signposting"}
              />
            </div>
            <div>
              <Label htmlFor="f-improve">Areas to Improve (one per line)</Label>
              <Textarea
                id="f-improve"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder={"Slow down on key evidence\nWeigh earlier"}
              />
            </div>
          </div>
          <div>
            <Label>Improvement Tags</Label>
            <div className="flex flex-wrap gap-2">
              {IMPROVEMENT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={tags.includes(tag)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    tags.includes(tag)
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-soft hover:border-faint"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="f-reflection">My Reflection</Label>
            <Textarea
              id="f-reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What will you do differently next round?"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{feedback ? "Save Changes" : "Save Feedback"}</Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
