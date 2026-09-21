import type { DebateFormat, RoundResult, Side } from "./types";

/**
 * Parses results copied from a Tabroom.com entry page. The real format is a
 * sequence of round blocks (newest first):
 *
 *   Round 5                     ← or an elim name: Octos, Quarters, Semis…
 *   Sun 8:30 AM                 ← ignored
 *   Flt 1                       ← ignored
 *   502 <tab> Aff <tab> Harvard-Westlake AR
 *   Delgado, Norma              ← judge
 *   29.2                        ← speaker points (prelims only)
 *   W                           ← that judge's ballot
 *   …elim panels repeat judge/ballot three times; the round result is the
 *   panel majority.
 *
 * A simple one-round-per-line format is still accepted as a fallback.
 */

export interface ParsedBallot {
  judge: string;
  points: number | null;
  result: "Win" | "Loss";
}

export interface ParsedRound {
  roundNumber: number;
  /** Elim name ("Quarters") when the round isn't numbered. */
  label?: string;
  opponent: string;
  side: Side;
  result: RoundResult;
  speakerPoints: number | null;
  judges: string[];
}

export interface ParseOutcome {
  rounds: ParsedRound[];
  skipped: number;
  /** Header metadata, when present in the paste. */
  tournamentName?: string;
  format?: DebateFormat;
}

const SIDE_MAP: Record<string, Side> = {
  aff: "Affirmative",
  affirmative: "Affirmative",
  neg: "Negative",
  negative: "Negative",
  pro: "Pro",
  con: "Con",
  gov: "Affirmative",
  opp: "Negative",
};

const RESULT_MAP: Record<string, "Win" | "Loss"> = {
  w: "Win",
  win: "Win",
  won: "Win",
  l: "Loss",
  loss: "Loss",
  lost: "Loss",
};

const ROUND_LABEL =
  /^(round\s+(\d{1,2})|r(\d{1,2})|finals?|semis?|semifinals?|quarters?|quarterfinals?|double\s*octos?|octos?|octafinals?|doubles?|triples?|runoffs?|bye)$/i;
const DATE_LINE = /^(mon|tue|wed|thu|fri|sat|sun)[a-z]*[\s,].*\d/i;
const FLIGHT_LINE = /^fl(?:igh)?t\.?\s*\d+$/i;
const BALLOT_LINE = /^[wl]$/i;
const POINTS_LINE = /^\d{1,2}(\.\d+)?$/;

/** Chronological rank for elimination rounds. */
function elimRank(label: string): number {
  const l = label.toLowerCase();
  if (l.startsWith("triple")) return 1;
  if (l.startsWith("double")) return 2;
  if (l.startsWith("octo") || l.startsWith("octa")) return 3;
  if (l.startsWith("quarter")) return 4;
  if (l.startsWith("semi")) return 5;
  if (l.startsWith("final")) return 6;
  if (l.startsWith("runoff")) return 0;
  return 0;
}

function sniffFormat(text: string): DebateFormat | undefined {
  const t = text.toLowerCase();
  if (/lincoln[\s-]?douglas|\bv?ld\b/.test(t)) return "Lincoln-Douglas";
  if (/public forum|\bv?pf\b/.test(t)) return "Public Forum";
  if (/\bpolicy\b|\bv?cx\b/.test(t)) return "Policy";
  if (/parliamentary|\bparli\b/.test(t)) return "Parliamentary";
  if (/congress/.test(t)) return "Congress";
  return undefined;
}

interface Block {
  label: string;
  roundNumber: number | null;
  order: number;
  lines: string[];
}

export function parseTabroomResults(text: string): ParseOutcome {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\t+$/, "").trim())
    .filter(Boolean);

  // Split into header + round blocks.
  const header: string[] = [];
  const blocks: Block[] = [];
  let current: Block | null = null;

  for (const line of lines) {
    const m = line.match(ROUND_LABEL);
    if (m) {
      current = {
        label: line,
        roundNumber: m[2] ? Number(m[2]) : m[3] ? Number(m[3]) : null,
        order: blocks.length,
        lines: [],
      };
      blocks.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      header.push(line);
    }
  }

  if (blocks.length === 0) {
    return parseSimpleLines(lines);
  }

  const tournamentName = header.find(
    (l) => !/your code:/i.test(l) && !sniffFormat(l) && !DATE_LINE.test(l) && l.length > 3
  );
  const format = sniffFormat(header.join("\n"));

  let skipped = 0;
  const parsed: (ParsedRound & { order: number })[] = [];

  for (const block of blocks) {
    const round = parseBlock(block);
    if (round) parsed.push({ ...round, order: block.order });
    else skipped++;
  }

  // Prelims keep their numbers; elims are ordered by bracket stage (the paste
  // is newest-first) and numbered after the last prelim.
  const prelims = parsed
    .filter((r) => !r.label)
    .sort((a, b) => a.roundNumber - b.roundNumber);
  const maxPrelim = Math.max(0, ...prelims.map((r) => r.roundNumber));
  const elims = parsed
    .filter((r) => r.label)
    .sort((a, b) => elimRank(a.label!) - elimRank(b.label!) || b.order - a.order)
    .map((r, i) => ({ ...r, roundNumber: maxPrelim + i + 1 }));

  const rounds = [...prelims, ...elims].map((r) => {
    const { order: _, ...rest } = r;
    void _;
    return rest;
  });
  return { rounds, skipped, tournamentName, format };
}

function parseBlock(block: Block): Omit<ParsedRound, "roundNumber"> & { roundNumber: number } | null {
  if (/^bye$/i.test(block.label)) {
    return {
      roundNumber: block.roundNumber ?? 0,
      label: undefined,
      opponent: "Bye",
      side: "Affirmative",
      result: "Bye",
      speakerPoints: null,
      judges: [],
    };
  }

  let side: Side | null = null;
  let opponent: string | null = null;
  const ballots: ParsedBallot[] = [];
  let judge: string | null = null;
  let points: number | null = null;

  for (const line of block.lines) {
    if (DATE_LINE.test(line) || FLIGHT_LINE.test(line)) continue;

    // Room / side / opponent row (tab-separated on Tabroom).
    if (side === null) {
      const cells = line.split("\t").map((c) => c.trim()).filter(Boolean);
      const sideIdx = cells.findIndex((c) => SIDE_MAP[c.toLowerCase()]);
      if (sideIdx !== -1) {
        side = SIDE_MAP[cells[sideIdx].toLowerCase()];
        opponent = cells.slice(sideIdx + 1).join(" ") || null;
        continue;
      }
      // Same row without tabs.
      const m = line.match(/^(.*?)\b(aff|neg|pro|con)\b\s+(.+)$/i);
      if (m) {
        side = SIDE_MAP[m[2].toLowerCase()];
        opponent = m[3].trim();
        continue;
      }
    }

    if (BALLOT_LINE.test(line)) {
      ballots.push({
        judge: judge ?? "Unknown judge",
        points,
        result: RESULT_MAP[line.toLowerCase()],
      });
      judge = null;
      points = null;
      continue;
    }
    if (POINTS_LINE.test(line)) {
      const v = Number(line);
      if (v >= 20 && v <= 30) {
        points = v;
        continue;
      }
    }
    if (/[a-z]/i.test(line)) {
      judge = line;
    }
  }

  if (ballots.length === 0) return null;

  const wins = ballots.filter((b) => b.result === "Win").length;
  return {
    roundNumber: block.roundNumber ?? 0,
    label: block.roundNumber === null ? block.label : undefined,
    opponent: opponent ?? "Unknown",
    side: side ?? "Affirmative",
    result: wins > ballots.length / 2 ? "Win" : "Loss",
    speakerPoints: ballots.map((b) => b.points).find((p) => p != null) ?? null,
    judges: ballots.map((b) => b.judge),
  };
}

/** Fallback: one round per line, e.g. "1  Aff  Harrison West  W  28.5". */
function parseSimpleLines(lines: string[]): ParseOutcome {
  const rounds: ParsedRound[] = [];
  let skipped = 0;

  for (const line of lines) {
    const cells = line.includes("\t")
      ? line.split("\t").map((c) => c.trim()).filter(Boolean)
      : line.split(/\s{2,}|\s/).map((c) => c.trim()).filter(Boolean);

    let roundNumber: number | null = null;
    let side: Side | null = null;
    let result: RoundResult | null = null;
    let speaks: number | null = null;
    const leftovers: string[] = [];

    for (const cell of cells) {
      const lower = cell.toLowerCase().replace(/[.:]+$/, "");
      if (roundNumber === null && /^\d{1,2}$/.test(lower)) {
        roundNumber = Number(lower);
        continue;
      }
      if (side === null && SIDE_MAP[lower]) {
        side = SIDE_MAP[lower];
        continue;
      }
      if (result === null && (RESULT_MAP[lower] || lower === "bye")) {
        result = lower === "bye" ? "Bye" : RESULT_MAP[lower];
        continue;
      }
      if (result === null) {
        const ballots = lower.match(/^(\d)-(\d)$/);
        if (ballots) {
          result = Number(ballots[1]) >= Number(ballots[2]) ? "Win" : "Loss";
          continue;
        }
      }
      if (speaks === null && /\d\.\d/.test(lower)) {
        const num = Number(lower);
        if (num >= 20 && num <= 30) {
          speaks = num;
          continue;
        }
      }
      leftovers.push(cell);
    }

    if (result === null) {
      skipped++;
      continue;
    }
    rounds.push({
      roundNumber: roundNumber ?? rounds.length + 1,
      opponent:
        leftovers.filter((c) => /[a-z]/i.test(c)).sort((a, b) => b.length - a.length)[0] ??
        "Unknown",
      side: side ?? "Affirmative",
      result,
      speakerPoints: speaks,
      judges: [],
    });
  }

  const seen = new Set<number>();
  for (const r of rounds) {
    while (seen.has(r.roundNumber)) r.roundNumber++;
    seen.add(r.roundNumber);
  }
  rounds.sort((a, b) => a.roundNumber - b.roundNumber);
  return { rounds, skipped };
}
