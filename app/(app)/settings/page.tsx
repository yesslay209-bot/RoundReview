"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { GraduationCap, Monitor, Moon, Sparkles, Sun } from "lucide-react";
import { requestTutorial } from "@/lib/repositories/local-repository";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Toggle } from "@/components/ui/form";
import { ConfirmDialog } from "@/components/ui/dialog";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { DEBATE_FORMATS, type DebateFormat, type User } from "@/lib/types";
import { cn } from "@/lib/utils";

const EXPERIENCE_LEVELS = ["Novice", "JV", "Varsity", "Open"] as const;

export default function SettingsPage() {
  const { data, updateUser, updateSettings, resetAll, startFresh } = useAppData();
  const toast = useToast();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [freshOpen, setFreshOpen] = useState(false);
  const [profile, setProfile] = useState<User>(data.user);

  useEffect(() => setMounted(true), []);
  useEffect(() => setProfile(data.user), [data.user]);

  const set = <K extends keyof User>(key: K, value: User[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profile);
    toast("Settings saved");
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Your profile, preferences, and appearance." />

      <form onSubmit={saveProfile} className="grid gap-4 lg:grid-cols-2">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <Label htmlFor="s-name">Name</Label>
              <Input id="s-name" value={profile.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-email">Email</Label>
              <Input
                id="s-email"
                type="email"
                value={profile.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-school">School</Label>
                <Input
                  id="s-school"
                  value={profile.school}
                  onChange={(e) => set("school", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="s-grad">Graduation Year</Label>
                <Input
                  id="s-grad"
                  type="number"
                  min={2026}
                  max={2035}
                  value={profile.graduationYear}
                  onChange={(e) => set("graduationYear", Number(e.target.value))}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Debate preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Debate Preferences</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-format">Debate Format</Label>
                <Select
                  id="s-format"
                  value={profile.debateFormat}
                  onChange={(e) => set("debateFormat", e.target.value as DebateFormat)}
                >
                  {DEBATE_FORMATS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="s-level">Experience Level</Label>
                <Select
                  id="s-level"
                  value={profile.experienceLevel}
                  onChange={(e) => set("experienceLevel", e.target.value as User["experienceLevel"])}
                >
                  {EXPERIENCE_LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="s-league">League</Label>
              <Input
                id="s-league"
                value={profile.league}
                onChange={(e) => set("league", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-season-start">Season Start</Label>
                <Input
                  id="s-season-start"
                  type="date"
                  value={profile.seasonStart}
                  onChange={(e) => set("seasonStart", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="s-season-end">Season End</Label>
                <Input
                  id="s-season-end"
                  type="date"
                  value={profile.seasonEnd}
                  onChange={(e) => set("seasonEnd", e.target.value)}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Timer preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Timer Preferences</CardTitle>
          </CardHeader>
          <CardBody className="divide-y divide-line">
            <Toggle
              checked={data.settings.warningSound}
              onChange={(v) => updateSettings({ warningSound: v })}
              label="Warning sounds"
              description="Beep when a speech timer runs out"
            />
            <Toggle
              checked={data.settings.final30Alert}
              onChange={(v) => updateSettings({ final30Alert: v })}
              label="Final 30 second alert"
              description="Warn when 30 seconds remain in a speech"
            />
          </CardBody>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2" role="radiogroup" aria-label="Theme">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={mounted && theme === opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 text-sm font-semibold transition-colors",
                    mounted && theme === opt.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-soft hover:border-faint"
                  )}
                >
                  <opt.icon className="size-5" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardBody className="divide-y divide-line">
            <Toggle
              checked={data.settings.notifyTournaments}
              onChange={(v) => updateSettings({ notifyTournaments: v })}
              label="Tournament reminders"
              description="Remind me as tournaments approach"
            />
            <Toggle
              checked={data.settings.notifyDeadlines}
              onChange={(v) => updateSettings({ notifyDeadlines: v })}
              label="Registration deadline reminders"
              description="Warn me before registration closes"
            />
            <Toggle
              checked={data.settings.notifyChecklist}
              onChange={(v) => updateSettings({ notifyChecklist: v })}
              label="Checklist reminders"
              description="Nudge me if the prep checklist isn't done"
            />
          </CardBody>
        </Card>

        {/* Data & onboarding */}
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xs text-sm text-soft">
                Replay the getting-started tour that shows where everything goes.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  requestTutorial();
                  router.push("/dashboard");
                }}
              >
                <GraduationCap className="size-3.5" aria-hidden /> Show Tutorial
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="max-w-xs text-sm text-soft">
                Clear every tournament, round, and ballot to start a new season. Your profile
                is kept.
              </p>
              <Button variant="outline" size="sm" onClick={() => setFreshOpen(true)}>
                <Sparkles className="size-3.5" aria-hidden /> Start Blank Season
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="max-w-xs text-sm text-soft">
                Restore the sample season data. This replaces all your local changes.
              </p>
              <Button variant="danger" size="sm" onClick={() => setResetOpen(true)}>
                Reset Demo Data
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className="lg:col-span-2">
          <Button type="submit" size="lg">
            Save Changes
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={freshOpen}
        onClose={() => setFreshOpen(false)}
        title="Start Blank Season"
        message="Delete all tournaments, rounds, feedback, and checklist progress so you can enter your own season from scratch? Your profile and settings are kept."
        confirmLabel="Start Fresh"
        onConfirm={() => {
          startFresh();
          toast("Fresh season started — the tour will show you around");
          router.push("/dashboard");
        }}
      />
      <ConfirmDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset Demo Data"
        message="Replace all tournaments, rounds, feedback, and checklist progress with the original sample season?"
        confirmLabel="Reset"
        onConfirm={() => {
          resetAll();
          toast("Demo data restored");
        }}
      />
    </div>
  );
}
