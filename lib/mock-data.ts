import type { AppData, ChecklistItem, JudgeFeedback, Round, Tournament, User } from "./types";

/**
 * Seed data representing a realistic Lincoln-Douglas season in progress.
 * Loaded once into localStorage, then user edits take over.
 */

export const MOCK_USER: User = {
  id: "u1",
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  school: "Westfield High School",
  graduationYear: 2028,
  debateFormat: "Lincoln-Douglas",
  league: "National Speech & Debate Association",
  experienceLevel: "Varsity",
  seasonStart: "2026-03-01",
  seasonEnd: "2027-04-30",
};

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "t1",
    name: "Golden Desert Classic",
    startDate: "2026-03-14",
    endDate: "2026-03-15",
    location: "Las Vegas, Nevada",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-03-02",
    status: "Completed",
    notes: "First varsity tournament of the season. Five prelim rounds, no elims for our division.",
  },
  {
    id: "t2",
    name: "Bay Area Spring Round Robin",
    startDate: "2026-04-25",
    endDate: "2026-04-25",
    location: "San Jose, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-04-13",
    status: "Completed",
    notes: "Invitation-only round robin. Great judging pool — detailed ballots from every round.",
  },
  {
    id: "t3",
    name: "Valley Summer Classic",
    startDate: "2026-06-20",
    endDate: "2026-06-21",
    location: "Sacramento, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-06-08",
    status: "Completed",
    notes: "Six rounds over two days. Broke to elims for the first time this season.",
  },
  {
    id: "t4",
    name: "Peninsula Season Opener",
    startDate: "2026-09-05",
    endDate: "2026-09-06",
    location: "Palo Alto, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-08-24",
    status: "Completed",
    notes: "New Sept/Oct topic. Case held up well — judges liked the framework weighing.",
  },
  {
    id: "t5",
    name: "California Invitational",
    startDate: "2026-10-18",
    endDate: "2026-10-19",
    location: "Irvine, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-10-08",
    status: "Registered",
    notes: "Biggest tournament of the fall. Expect fast, technical judging in later rounds.",
  },
  {
    id: "t6",
    name: "Stanford Autumn Classic",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    location: "Stanford, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-11-02",
    status: "Upcoming",
    notes: "Registration opens Oct 1. Coach wants the whole varsity squad entered.",
  },
  {
    id: "t7",
    name: "Sacramento Winter Invitational",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    location: "Sacramento, California",
    format: "Lincoln-Douglas",
    registrationDeadline: "2026-11-30",
    status: "Planning",
    notes: "Deciding between this and the Reno swing. Check travel budget with coach.",
  },
];

export const MOCK_ROUNDS: Round[] = [
  // Golden Desert Classic — 3W 2L
  { id: "r1", tournamentId: "t1", roundNumber: 1, opponent: "Harrison West", side: "Affirmative", result: "Win", speakerPoints: 27.5, feedbackId: "f1" },
  { id: "r2", tournamentId: "t1", roundNumber: 2, opponent: "Priya Raman", side: "Affirmative", result: "Loss", speakerPoints: 27.0, feedbackId: "f2" },
  { id: "r3", tournamentId: "t1", roundNumber: 3, opponent: "Cole Bennett", side: "Negative", result: "Win", speakerPoints: 27.9, feedbackId: null },
  { id: "r4", tournamentId: "t1", roundNumber: 4, opponent: "Mia Delgado", side: "Affirmative", result: "Win", speakerPoints: 28.0, feedbackId: "f3" },
  { id: "r5", tournamentId: "t1", roundNumber: 5, opponent: "Jordan Pike", side: "Affirmative", result: "Loss", speakerPoints: 27.2, feedbackId: "f4" },
  // Bay Area Spring Round Robin — 3W 1L
  { id: "r6", tournamentId: "t2", roundNumber: 1, opponent: "Elena Vasquez", side: "Affirmative", result: "Win", speakerPoints: 28.1, feedbackId: "f5" },
  { id: "r7", tournamentId: "t2", roundNumber: 2, opponent: "Tom Nguyen", side: "Negative", result: "Win", speakerPoints: 27.8, feedbackId: null },
  { id: "r8", tournamentId: "t2", roundNumber: 3, opponent: "Ava Goldstein", side: "Negative", result: "Loss", speakerPoints: 27.4, feedbackId: "f6" },
  { id: "r9", tournamentId: "t2", roundNumber: 4, opponent: "Sam Porter", side: "Negative", result: "Win", speakerPoints: 28.2, feedbackId: null },
  // Valley Summer Classic — 4W 2L
  { id: "r10", tournamentId: "t3", roundNumber: 1, opponent: "Nadia Osman", side: "Affirmative", result: "Win", speakerPoints: 28.0, feedbackId: "f7" },
  { id: "r11", tournamentId: "t3", roundNumber: 2, opponent: "Ethan Marsh", side: "Negative", result: "Loss", speakerPoints: 27.6, feedbackId: null },
  { id: "r12", tournamentId: "t3", roundNumber: 3, opponent: "Isabelle Chen", side: "Affirmative", result: "Win", speakerPoints: 28.3, feedbackId: "f8" },
  { id: "r13", tournamentId: "t3", roundNumber: 4, opponent: "Devon Brooks", side: "Negative", result: "Win", speakerPoints: 28.1, feedbackId: null },
  { id: "r14", tournamentId: "t3", roundNumber: 5, opponent: "Lucas Ferraro", side: "Negative", result: "Loss", speakerPoints: 27.7, feedbackId: "f9" },
  { id: "r15", tournamentId: "t3", roundNumber: 6, opponent: "Maya Solomon", side: "Affirmative", result: "Win", speakerPoints: 28.4, feedbackId: null },
  // Peninsula Season Opener — 4W 1L
  { id: "r16", tournamentId: "t4", roundNumber: 1, opponent: "Oliver Tan", side: "Affirmative", result: "Win", speakerPoints: 28.5, feedbackId: "f10" },
  { id: "r17", tournamentId: "t4", roundNumber: 2, opponent: "Zoe Ramirez", side: "Negative", result: "Win", speakerPoints: 28.2, feedbackId: null },
  { id: "r18", tournamentId: "t4", roundNumber: 3, opponent: "Felix Andersson", side: "Negative", result: "Loss", speakerPoints: 27.9, feedbackId: "f11" },
  { id: "r19", tournamentId: "t4", roundNumber: 4, opponent: "Grace Idowu", side: "Affirmative", result: "Win", speakerPoints: 28.7, feedbackId: "f12" },
  { id: "r20", tournamentId: "t4", roundNumber: 5, opponent: "Nathan Cole", side: "Affirmative", result: "Win", speakerPoints: 28.6, feedbackId: null },
];

export const MOCK_FEEDBACK: JudgeFeedback[] = [
  {
    id: "f1",
    roundId: "r1",
    judgeName: "Sarah Mitchell",
    date: "2026-03-14",
    feedback:
      "Your rebuttal structure was strong and the framework debate was clearly won by the end of the 1AR. That said, you need to slow down during important evidence — I lost two of your extensions because they were delivered at the same speed as your analytics. Signpost harder and give me pen time on the arguments you want on my ballot.",
    strengths: ["Clean framework extension in the 1AR", "Strong crystallization in the 2AR"],
    improvements: ["Slow down on key evidence", "More explicit signposting between contentions"],
    tags: ["Delivery", "Rebuttal", "Evidence"],
    personalReflection:
      "I felt rushed in the 1AR even though I had time left. Practice pacing with the timer at 6:00 flat and mark card tags to emphasize.",
  },
  {
    id: "f2",
    roundId: "r2",
    judgeName: "Daniel Okafor",
    date: "2026-03-14",
    feedback:
      "Close round that came down to cross examination. Your opponent used CX to set up her turns and you let several loaded questions go unchallenged. You also went noticeably over your prep allocation early, which left you thin before the NR. Answers were honest but you gave away too much strategic ground.",
    strengths: ["Composed under pressure", "Honest, direct answers"],
    improvements: ["Use CX to set up your own strategy, not just defend", "Budget prep time across the whole round"],
    tags: ["Cross Examination", "Time Management", "Argumentation"],
    personalReflection:
      "I need a list of go-to CX questions for common negative positions. Also: never burn 3 minutes of prep before the 1AR again.",
  },
  {
    id: "f3",
    roundId: "r4",
    judgeName: "Rebecca Liu",
    date: "2026-03-15",
    feedback:
      "Very persuasive speaking — you have a natural sense of emphasis and eye contact that most debaters in this division lack. The case itself could be organized more tightly: contention two blends two separate links and it makes the flow messy. Number your responses and keep one link story per contention.",
    strengths: ["Excellent vocal variety and presence", "Persuasive final focus"],
    improvements: ["One link story per contention", "Number responses on the flow"],
    tags: ["Delivery", "Organization", "Case Structure"],
    personalReflection: "Restructure contention two before the next tournament — split the economic and rights-based links.",
  },
  {
    id: "f4",
    roundId: "r5",
    judgeName: "Marcus Hale",
    date: "2026-03-15",
    feedback:
      "You lost this on evidence comparison. Both sides read competing studies, but your opponent told me why her methodology was better and you just repeated your card. When evidence clashes, give me a reason to prefer yours — recency, sample size, source qualification, anything. Delivery remains a strength; the strategic layer needs work.",
    strengths: ["Confident delivery", "Good coverage of the flow"],
    improvements: ["Compare evidence, don't just re-read it", "Make strategic choices about which arguments to collapse to"],
    tags: ["Evidence", "Strategy", "Delivery"],
    personalReflection:
      "Build an evidence-comparison block: recency, methodology, qualifications. Practice collapsing to two arguments max in the 2AR.",
  },
  {
    id: "f5",
    roundId: "r6",
    judgeName: "Karen Whitfield",
    date: "2026-04-25",
    feedback:
      "Strong win. Your rebuttal speeches did exactly what rebuttals should do: they weighed. The only structural note is that your underview is doing too much work — fold those spikes into the contentions so the case reads as one coherent story rather than a case plus a list of tricks.",
    strengths: ["Weighing in every rebuttal", "Efficient word economy"],
    improvements: ["Integrate underview into main case structure"],
    tags: ["Rebuttal", "Case Structure"],
    personalReflection: "Judges reward weighing. Do it earlier — start in the 1AR, not just the 2AR.",
  },
  {
    id: "f6",
    roundId: "r8",
    judgeName: "Luis Herrera",
    date: "2026-04-25",
    feedback:
      "Your opponent controlled the pace of the round from CX onward. When she sped up, you sped up with her and your clarity suffered badly — I flowed maybe 70% of your NR. Debate at YOUR pace. You also let CX time expire twice without landing a useful answer. Slow, clear, and strategic beats fast and muddled every time.",
    strengths: ["Good topic knowledge", "Strong opening constructive"],
    improvements: ["Don't mirror your opponent's speed", "Plan CX questions in prep time"],
    tags: ["Cross Examination", "Delivery", "Speed"],
    personalReflection: "When I get flustered I speed up. Breathing reset between speeches. My best rounds are at 80% speed.",
  },
  {
    id: "f7",
    roundId: "r10",
    judgeName: "Grace Kim",
    date: "2026-06-20",
    feedback:
      "Well-researched case with credible, recent evidence — clearly the stronger prep in this round. Organization on the negative block responses could improve: you answered arguments in a different order than they were made, which forces the judge to hunt across the flow. Answer in order, then weigh at the end.",
    strengths: ["Excellent evidence quality", "Deep topic research"],
    improvements: ["Answer arguments in the order they were made", "Add a weighing section at the end of each rebuttal"],
    tags: ["Evidence", "Organization"],
    personalReflection: "Flow discipline: respond top-down. Made my judge's job harder than it needed to be.",
  },
  {
    id: "f8",
    roundId: "r12",
    judgeName: "Robert Feld",
    date: "2026-06-20",
    feedback:
      "The 2AR was the best speech I heard from you — a clean collapse onto the strongest argument with clear ballot direction. Earlier speeches were less decisive; the 1AR tried to answer everything and nearly ran out of time. Trust your instincts about what matters and let the small stuff go sooner.",
    strengths: ["Outstanding 2AR collapse", "Clear ballot direction"],
    improvements: ["Start strategic collapse in the 1AR", "Let go of unwinnable arguments earlier"],
    tags: ["Rebuttal", "Strategy", "Delivery"],
    personalReflection: "The collapse worked! Decide during opponent's NC what my 2AR story will be, then build toward it.",
  },
  {
    id: "f9",
    roundId: "r14",
    judgeName: "Anita Deshpande",
    date: "2026-06-21",
    feedback:
      "You were winning this round until the NR, where time management fell apart — you spent 3:30 on the framework debate that was already won and left only 2:30 for the substance where the round was actually decided. In CX, ask shorter questions; your multi-part questions let your opponent pick the easy half. Speed was fine but allocate it better.",
    strengths: ["Won the framework debate decisively", "Sharp analytical arguments"],
    improvements: ["Time allocation across issues in rebuttals", "Shorter, single-purpose CX questions"],
    tags: ["Time Management", "Cross Examination", "Speed"],
    personalReflection: "Write target times on my flow before each rebuttal: framework 1:00, contention-level 4:00, weighing 1:00.",
  },
  {
    id: "f10",
    roundId: "r16",
    judgeName: "James Corrigan",
    date: "2026-09-05",
    feedback:
      "Strong evidence comparison — this is visibly improved from how most debaters handle clashing studies. You told me why your evidence was more recent and better qualified, and that won you the round. Keep working on pace during rebuttals: the middle of your 1AR blurred together. Vary your speed to show me what matters.",
    strengths: ["Excellent evidence comparison", "Clear ballot story"],
    improvements: ["Vary pace to emphasize key arguments", "Slow down mid-1AR"],
    tags: ["Delivery", "Evidence", "Rebuttal"],
    personalReflection: "The evidence-comparison blocks from June paid off. Next: record 1ARs and listen for the blur.",
  },
  {
    id: "f11",
    roundId: "r18",
    judgeName: "Michelle Park",
    date: "2026-09-05",
    feedback:
      "Tough draw — your opponent was excellent. Two takeaways: first, your CX answers were defensive when they could have been reframing opportunities. Second, the 2NR needed to be a choice, not a tour; covering four arguments thinly lost to her two arguments covered deeply. Time was managed better than the speeches suggested — the issue was argument selection, not the clock.",
    strengths: ["Flowed a fast round accurately", "Kept composure against a stronger opponent"],
    improvements: ["Reframe in CX instead of only defending", "Commit to fewer arguments in the 2NR"],
    tags: ["Cross Examination", "Rebuttal", "Time Management"],
    personalReflection: "Watch elim rounds of top debaters and note how few arguments their final speeches cover.",
  },
  {
    id: "f12",
    roundId: "r19",
    judgeName: "Sarah Mitchell",
    date: "2026-09-06",
    feedback:
      "Night-and-day improvement from when I judged you in March. Pacing was controlled, the signposting was clean, and your emphasis told me exactly what to write down. The remaining gap is argument depth: your responses are correct but sometimes one layer deep. Ask 'and why does that matter?' one more time on your key arguments.",
    strengths: ["Controlled pacing and clear signposting", "Professional presence"],
    improvements: ["Add a second layer of analysis to key responses", "Extend impacts, not just links"],
    tags: ["Delivery", "Argumentation"],
    personalReflection:
      "Same judge as Golden Desert R1 and she noticed the improvement — the deliberate pacing practice is working. New focus: impact-level analysis.",
  },
];

const check = (id: string, category: string, title: string, completed: boolean): ChecklistItem => ({
  id,
  category,
  title,
  completed,
  custom: false,
});

export const MOCK_CHECKLIST: ChecklistItem[] = [
  check("c1", "Evidence & Cases", "Update case for current topic", true),
  check("c2", "Evidence & Cases", "Review evidence and re-cut key cards", true),
  check("c3", "Evidence & Cases", "Prepare rebuttal blocks", true),
  check("c4", "Evidence & Cases", "Check citations", false),
  check("c5", "Evidence & Cases", "Review likely opponent strategies", false),
  check("c6", "Tournament Logistics", "Tournament registration confirmed", true),
  check("c7", "Tournament Logistics", "Location confirmed", true),
  check("c8", "Tournament Logistics", "Transportation planned", true),
  check("c9", "Tournament Logistics", "Schedule reviewed", true),
  check("c10", "Tournament Logistics", "Check-in time saved", false),
  check("c11", "Technology", "Laptop charged", true),
  check("c12", "Technology", "Charger packed", true),
  check("c13", "Technology", "Backup charger", false),
  check("c14", "Technology", "Files downloaded offline", true),
  check("c15", "Technology", "Internet hotspot available", true),
  check("c16", "Personal Items", "Water bottle", true),
  check("c17", "Personal Items", "Snacks", true),
  check("c18", "Personal Items", "Notebook and pens", true),
  check("c19", "Personal Items", "Professional clothing", true),
  check("c20", "Personal Items", "ID", false),
  check("c21", "Mental Preparation", "Review previous judge feedback", true),
  check("c22", "Mental Preparation", "Identify top 3 improvement goals", true),
  check("c23", "Mental Preparation", "Practice opening speech", true),
  check("c24", "Mental Preparation", "Get enough sleep", false),
];

export const CHECKLIST_CATEGORIES = [
  "Evidence & Cases",
  "Tournament Logistics",
  "Technology",
  "Personal Items",
  "Mental Preparation",
];

export const MOCK_DATA: AppData = {
  user: MOCK_USER,
  tournaments: MOCK_TOURNAMENTS,
  rounds: MOCK_ROUNDS,
  feedback: MOCK_FEEDBACK,
  checklist: MOCK_CHECKLIST,
  settings: {
    warningSound: true,
    final30Alert: true,
    notifyTournaments: true,
    notifyDeadlines: true,
    notifyChecklist: false,
  },
};
