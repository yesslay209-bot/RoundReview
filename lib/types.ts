export type DebateFormat =
  | "Lincoln-Douglas"
  | "Public Forum"
  | "Policy"
  | "Parliamentary"
  | "Congress";

export type TournamentStatus =
  | "Planning"
  | "Registered"
  | "Upcoming"
  | "Completed"
  | "Cancelled";

export type Side = "Affirmative" | "Negative" | "Pro" | "Con";
export type RoundResult = "Win" | "Loss" | "Bye";

export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  graduationYear: number;
  debateFormat: DebateFormat;
  league: string;
  experienceLevel: "Novice" | "JV" | "Varsity" | "Open";
  seasonStart: string;
  seasonEnd: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string;
  location: string;
  format: DebateFormat;
  registrationDeadline: string;
  status: TournamentStatus;
  notes: string;
}

export interface Round {
  id: string;
  tournamentId: string;
  roundNumber: number;
  /** Elimination-round name (e.g. "Quarters") shown instead of "R<n>". */
  label?: string;
  opponent: string;
  side: Side;
  result: RoundResult;
  speakerPoints: number | null;
  /** Judge name(s) — panels in elimination rounds have several. */
  judges?: string[];
  feedbackId: string | null;
}

export type ImprovementTag =
  | "Delivery"
  | "Cross Examination"
  | "Evidence"
  | "Organization"
  | "Speed"
  | "Argumentation"
  | "Rebuttal"
  | "Case Structure"
  | "Strategy"
  | "Time Management";

export const IMPROVEMENT_TAGS: ImprovementTag[] = [
  "Delivery",
  "Cross Examination",
  "Evidence",
  "Organization",
  "Speed",
  "Argumentation",
  "Rebuttal",
  "Case Structure",
  "Strategy",
  "Time Management",
];

export interface JudgeFeedback {
  id: string;
  roundId: string;
  judgeName: string;
  date: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  tags: ImprovementTag[];
  personalReflection: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  completed: boolean;
  custom: boolean;
}

export interface Settings {
  warningSound: boolean;
  final30Alert: boolean;
  notifyTournaments: boolean;
  notifyDeadlines: boolean;
  notifyChecklist: boolean;
}

export interface AppData {
  user: User;
  tournaments: Tournament[];
  rounds: Round[];
  feedback: JudgeFeedback[];
  checklist: ChecklistItem[];
  settings: Settings;
}

export const DEBATE_FORMATS: DebateFormat[] = [
  "Lincoln-Douglas",
  "Public Forum",
  "Policy",
  "Parliamentary",
  "Congress",
];

export const TOURNAMENT_STATUSES: TournamentStatus[] = [
  "Planning",
  "Registered",
  "Upcoming",
  "Completed",
  "Cancelled",
];
