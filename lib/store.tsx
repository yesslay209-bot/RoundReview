"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  AppData,
  ChecklistItem,
  JudgeFeedback,
  Round,
  Settings,
  Tournament,
  User,
} from "./types";
import { loadAppData, resetAppData, saveAppData } from "./repositories/local-repository";
import { MOCK_DATA } from "./mock-data";
import { uid } from "./utils";

interface Store {
  data: AppData;
  hydrated: boolean;
  updateUser: (patch: Partial<User>) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  addTournament: (t: Omit<Tournament, "id">) => Tournament;
  updateTournament: (id: string, patch: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  addRound: (r: Omit<Round, "id" | "feedbackId">) => Round;
  updateRound: (id: string, patch: Partial<Round>) => void;
  deleteRound: (id: string) => void;
  addFeedback: (f: Omit<JudgeFeedback, "id">) => JudgeFeedback;
  updateFeedback: (id: string, patch: Partial<JudgeFeedback>) => void;
  deleteFeedback: (id: string) => void;
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (category: string, title: string) => void;
  deleteChecklistItem: (id: string) => void;
  resetChecklist: () => void;
  resetAll: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(MOCK_DATA);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate once from localStorage after mount (SSR renders the seed data).
  useEffect(() => {
    setData(loadAppData());
    setHydrated(true);
  }, []);

  const commit = useCallback((updater: (d: AppData) => AppData) => {
    setData((prev) => {
      const next = updater(prev);
      saveAppData(next);
      return next;
    });
  }, []);

  const updateUser = useCallback(
    (patch: Partial<User>) => commit((d) => ({ ...d, user: { ...d.user, ...patch } })),
    [commit]
  );

  const updateSettings = useCallback(
    (patch: Partial<Settings>) =>
      commit((d) => ({ ...d, settings: { ...d.settings, ...patch } })),
    [commit]
  );

  const addTournament = useCallback(
    (t: Omit<Tournament, "id">) => {
      const created: Tournament = { ...t, id: uid("t") };
      commit((d) => ({ ...d, tournaments: [...d.tournaments, created] }));
      return created;
    },
    [commit]
  );

  const updateTournament = useCallback(
    (id: string, patch: Partial<Tournament>) =>
      commit((d) => ({
        ...d,
        tournaments: d.tournaments.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),
    [commit]
  );

  const deleteTournament = useCallback(
    (id: string) =>
      commit((d) => {
        const roundIds = new Set(d.rounds.filter((r) => r.tournamentId === id).map((r) => r.id));
        return {
          ...d,
          tournaments: d.tournaments.filter((t) => t.id !== id),
          rounds: d.rounds.filter((r) => r.tournamentId !== id),
          feedback: d.feedback.filter((f) => !roundIds.has(f.roundId)),
        };
      }),
    [commit]
  );

  const addRound = useCallback(
    (r: Omit<Round, "id" | "feedbackId">) => {
      const created: Round = { ...r, id: uid("r"), feedbackId: null };
      commit((d) => ({ ...d, rounds: [...d.rounds, created] }));
      return created;
    },
    [commit]
  );

  const updateRound = useCallback(
    (id: string, patch: Partial<Round>) =>
      commit((d) => ({
        ...d,
        rounds: d.rounds.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      })),
    [commit]
  );

  const deleteRound = useCallback(
    (id: string) =>
      commit((d) => ({
        ...d,
        rounds: d.rounds.filter((r) => r.id !== id),
        feedback: d.feedback.filter((f) => f.roundId !== id),
      })),
    [commit]
  );

  const addFeedback = useCallback(
    (f: Omit<JudgeFeedback, "id">) => {
      const created: JudgeFeedback = { ...f, id: uid("f") };
      commit((d) => ({
        ...d,
        feedback: [...d.feedback, created],
        rounds: d.rounds.map((r) =>
          r.id === f.roundId ? { ...r, feedbackId: created.id } : r
        ),
      }));
      return created;
    },
    [commit]
  );

  const updateFeedback = useCallback(
    (id: string, patch: Partial<JudgeFeedback>) =>
      commit((d) => {
        const prev = d.feedback.find((f) => f.id === id);
        const next = d.feedback.map((f) => (f.id === id ? { ...f, ...patch } : f));
        let rounds = d.rounds;
        // Keep round <-> feedback links consistent if the round changed.
        if (prev && patch.roundId && patch.roundId !== prev.roundId) {
          rounds = d.rounds.map((r) => {
            if (r.id === prev.roundId) return { ...r, feedbackId: null };
            if (r.id === patch.roundId) return { ...r, feedbackId: id };
            return r;
          });
        }
        return { ...d, feedback: next, rounds };
      }),
    [commit]
  );

  const deleteFeedback = useCallback(
    (id: string) =>
      commit((d) => ({
        ...d,
        feedback: d.feedback.filter((f) => f.id !== id),
        rounds: d.rounds.map((r) => (r.feedbackId === id ? { ...r, feedbackId: null } : r)),
      })),
    [commit]
  );

  const toggleChecklistItem = useCallback(
    (id: string) =>
      commit((d) => ({
        ...d,
        checklist: d.checklist.map((c) =>
          c.id === id ? { ...c, completed: !c.completed } : c
        ),
      })),
    [commit]
  );

  const addChecklistItem = useCallback(
    (category: string, title: string) =>
      commit((d) => ({
        ...d,
        checklist: [
          ...d.checklist,
          { id: uid("c"), category, title, completed: false, custom: true } as ChecklistItem,
        ],
      })),
    [commit]
  );

  const deleteChecklistItem = useCallback(
    (id: string) =>
      commit((d) => ({ ...d, checklist: d.checklist.filter((c) => c.id !== id) })),
    [commit]
  );

  const resetChecklist = useCallback(
    () =>
      commit((d) => ({
        ...d,
        checklist: d.checklist.map((c) => ({ ...c, completed: false })),
      })),
    [commit]
  );

  const resetAll = useCallback(() => {
    setData(resetAppData());
  }, []);

  return (
    <StoreContext.Provider
      value={{
        data,
        hydrated,
        updateUser,
        updateSettings,
        addTournament,
        updateTournament,
        deleteTournament,
        addRound,
        updateRound,
        deleteRound,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        toggleChecklistItem,
        addChecklistItem,
        deleteChecklistItem,
        resetChecklist,
        resetAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useAppData(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
