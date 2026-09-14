import type { RoundResult, Side } from "./types";

/**
 * Parses round results copied from a Tabroom.com results table (or any
 * similar text). Tabroom copies as tab-separated columns, but the parser
 * is deliberately tolerant: it scans each line for a round number, side,
 * result, speaker points, and treats the longest remaining text as the
 * opponent. Lines with no recognizable result are skipped.
 */

export interface ParsedRound {
  roundNumber: number;
  opponent: string;
  side: Side;
  result: RoundResult;
  speakerPoints: number | null;
}

export interface ParseOutcome {
  rounds: ParsedRound[];
  skipped: number;
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

const RESULT_MAP: Record<string, RoundResult> = {
  w: "Win",
  win: "Win",
  won: "Win",
  l: "Loss",
  loss: "Loss",
  lost: "Loss",
  bye: "Bye",
};

const ROUND_LABEL = /^(?:r(?:ound)?\s*)?(\d{1,2})$/i;

export function parseTabroomResults(text: string): ParseOutcome {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const rounds: ParsedRound[] = [];
  let skipped = 0;

  for (const line of lines) {
    // Prefer tab-separated cells (how Tabroom tables paste); fall back to whitespace.
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

      if (roundNumber === null) {
        const m = lower.match(ROUND_LABEL);
        if (m) {
          roundNumber = Number(m[1]);
          continue;
        }
        if (lower === "round" || lower === "rd" || lower === "r") continue;
      }
      if (side === null && SIDE_MAP[lower]) {
        side = SIDE_MAP[lower];
        continue;
      }
      if (result === null && RESULT_MAP[lower]) {
        result = RESULT_MAP[lower];
        continue;
      }
      // Ballot counts like "3-0" / "2-1" imply the result when W/L is absent.
      if (result === null) {
        const ballots = lower.match(/^(\d)-(\d)$/);
        if (ballots) {
          result = Number(ballots[1]) >= Number(ballots[2]) ? "Win" : "Loss";
          continue;
        }
      }
      if (speaks === null) {
        const num = Number(lower);
        if (!Number.isNaN(num) && num >= 20 && num <= 30 && /\d\.\d/.test(lower)) {
          speaks = num;
          continue;
        }
      }
      leftovers.push(cell);
    }

    // A row without a recognizable result is a header or noise.
    if (result === null) {
      skipped++;
      continue;
    }

    const opponent =
      leftovers
        .filter((c) => /[A-Za-z]/.test(c))
        .sort((a, b) => b.length - a.length)[0] ?? "Unknown";

    rounds.push({
      roundNumber: roundNumber ?? rounds.length + 1,
      opponent,
      side: side ?? "Affirmative",
      result,
      speakerPoints: speaks,
    });
  }

  // Ensure round numbers are unique and ordered when they were missing/duplicated.
  const seen = new Set<number>();
  for (const r of rounds) {
    while (seen.has(r.roundNumber)) r.roundNumber++;
    seen.add(r.roundNumber);
  }
  rounds.sort((a, b) => a.roundNumber - b.roundNumber);

  return { rounds, skipped };
}
