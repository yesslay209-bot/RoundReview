import type { AppData, User } from "@/lib/types";
import { MOCK_DATA, MOCK_CHECKLIST, MOCK_USER } from "@/lib/mock-data";

/**
 * Data-access layer. The UI only talks to this module, so swapping
 * localStorage for Supabase/Firebase/Postgres later means reimplementing
 * this module without touching components.
 *
 * Two data modes exist:
 *  - "demo": the sample season, seeded for Try-the-Live-Demo visitors.
 *  - "own":  a blank season created at sign-up; the onboarding tutorial
 *            then walks the user through entering their real info.
 */

const STORAGE_KEY = "roundready.appdata.v1";
const MODE_KEY = "roundready.mode";
const TUTORIAL_KEY = "roundready.tutorial.pending";

function setItem(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode); app still works in memory.
  }
}

export function loadAppData(): AppData {
  if (typeof window === "undefined") return MOCK_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit with no account: seed the demo season.
      saveAppData(MOCK_DATA);
      setItem(MODE_KEY, "demo");
      return MOCK_DATA;
    }
    const parsed = JSON.parse(raw) as Partial<AppData>;
    // Merge with seed shape so newly added fields get defaults.
    return {
      ...MOCK_DATA,
      ...parsed,
      user: { ...MOCK_DATA.user, ...parsed.user },
      settings: { ...MOCK_DATA.settings, ...parsed.settings },
    };
  } catch {
    return MOCK_DATA;
  }
}

export function saveAppData(data: AppData) {
  if (typeof window === "undefined") return;
  setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Restore the sample season (used by the demo reset in Settings). */
export function resetAppData(): AppData {
  saveAppData(MOCK_DATA);
  setItem(MODE_KEY, "demo");
  try {
    window.localStorage.removeItem(TUTORIAL_KEY);
  } catch {
    // ignore
  }
  return MOCK_DATA;
}

/**
 * Start a blank season for a real user (called at sign-up). The default
 * checklist stays as a helpful starting point, but nothing is checked and
 * there are no placeholder tournaments, rounds, or feedback.
 */
export function startFreshSeason(user: Partial<User>) {
  const data: AppData = {
    user: {
      ...MOCK_USER,
      name: "Debater",
      email: "",
      school: "",
      ...Object.fromEntries(Object.entries(user).filter(([, v]) => v !== "" && v != null)),
    },
    tournaments: [],
    rounds: [],
    feedback: [],
    checklist: MOCK_CHECKLIST.map((c) => ({ ...c, completed: false })),
    settings: { ...MOCK_DATA.settings },
  };
  saveAppData(data);
  setItem(MODE_KEY, "own");
  setItem(TUTORIAL_KEY, "1");
}

export function getDataMode(): "demo" | "own" {
  try {
    return window.localStorage.getItem(MODE_KEY) === "own" ? "own" : "demo";
  } catch {
    return "demo";
  }
}

export function isTutorialPending(): boolean {
  try {
    return window.localStorage.getItem(TUTORIAL_KEY) === "1";
  } catch {
    return false;
  }
}

export function requestTutorial() {
  setItem(TUTORIAL_KEY, "1");
}

export function clearTutorial() {
  try {
    window.localStorage.removeItem(TUTORIAL_KEY);
  } catch {
    // ignore
  }
}
