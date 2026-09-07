export interface Speech {
  name: string;
  speaker: string;
  seconds: number;
}

export interface TimerFormat {
  id: string;
  name: string;
  prepSeconds: number; // prep time per debater/team (0 = none)
  speeches: Speech[];
}

const m = (mins: number) => mins * 60;

export const TIMER_FORMATS: TimerFormat[] = [
  {
    id: "ld",
    name: "Lincoln-Douglas",
    prepSeconds: m(4),
    speeches: [
      { name: "Affirmative Constructive", speaker: "Affirmative", seconds: m(6) },
      { name: "Negative Cross Examination", speaker: "Negative", seconds: m(3) },
      { name: "Negative Constructive", speaker: "Negative", seconds: m(7) },
      { name: "Affirmative Cross Examination", speaker: "Affirmative", seconds: m(3) },
      { name: "First Affirmative Rebuttal", speaker: "Affirmative", seconds: m(4) },
      { name: "Negative Rebuttal", speaker: "Negative", seconds: m(6) },
      { name: "Second Affirmative Rebuttal", speaker: "Affirmative", seconds: m(3) },
    ],
  },
  {
    id: "pf",
    name: "Public Forum",
    prepSeconds: m(3),
    speeches: [
      { name: "Team A Constructive", speaker: "Team A", seconds: m(4) },
      { name: "Team B Constructive", speaker: "Team B", seconds: m(4) },
      { name: "Crossfire", speaker: "Both Teams", seconds: m(3) },
      { name: "Team A Rebuttal", speaker: "Team A", seconds: m(4) },
      { name: "Team B Rebuttal", speaker: "Team B", seconds: m(4) },
      { name: "Crossfire", speaker: "Both Teams", seconds: m(3) },
      { name: "Team A Summary", speaker: "Team A", seconds: m(3) },
      { name: "Team B Summary", speaker: "Team B", seconds: m(3) },
      { name: "Grand Crossfire", speaker: "All Speakers", seconds: m(3) },
      { name: "Team A Final Focus", speaker: "Team A", seconds: m(2) },
      { name: "Team B Final Focus", speaker: "Team B", seconds: m(2) },
    ],
  },
  {
    id: "policy",
    name: "Policy",
    prepSeconds: m(8),
    speeches: [
      { name: "1AC", speaker: "Affirmative", seconds: m(8) },
      { name: "Cross Examination", speaker: "Negative", seconds: m(3) },
      { name: "1NC", speaker: "Negative", seconds: m(8) },
      { name: "Cross Examination", speaker: "Affirmative", seconds: m(3) },
      { name: "2AC", speaker: "Affirmative", seconds: m(8) },
      { name: "Cross Examination", speaker: "Negative", seconds: m(3) },
      { name: "2NC", speaker: "Negative", seconds: m(8) },
      { name: "Cross Examination", speaker: "Affirmative", seconds: m(3) },
      { name: "1NR", speaker: "Negative", seconds: m(5) },
      { name: "1AR", speaker: "Affirmative", seconds: m(5) },
      { name: "2NR", speaker: "Negative", seconds: m(5) },
      { name: "2AR", speaker: "Affirmative", seconds: m(5) },
    ],
  },
  {
    id: "parli",
    name: "Parliamentary",
    prepSeconds: 0,
    speeches: [
      { name: "Prime Minister Constructive", speaker: "Government", seconds: m(7) },
      { name: "Leader of Opposition Constructive", speaker: "Opposition", seconds: m(8) },
      { name: "Member of Government", speaker: "Government", seconds: m(8) },
      { name: "Member of Opposition", speaker: "Opposition", seconds: m(8) },
      { name: "Leader of Opposition Rebuttal", speaker: "Opposition", seconds: m(4) },
      { name: "Prime Minister Rebuttal", speaker: "Government", seconds: m(5) },
    ],
  },
];
