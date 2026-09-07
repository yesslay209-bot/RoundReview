import type { AppData } from "@/lib/types";
import { MOCK_DATA } from "@/lib/mock-data";

/**
 * Data-access layer. The UI only talks to `loadAppData` / `saveAppData`,
 * so swapping localStorage for Supabase/Firebase/Postgres later means
 * reimplementing this module (or providing an async variant) without
 * touching components.
 */

const STORAGE_KEY = "roundready.appdata.v1";

export function loadAppData(): AppData {
  if (typeof window === "undefined") return MOCK_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppData(MOCK_DATA);
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
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be unavailable (private mode); app still works in memory.
  }
}

export function resetAppData(): AppData {
  saveAppData(MOCK_DATA);
  return MOCK_DATA;
}
