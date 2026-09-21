"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";
import { Dialog } from "@/components/ui/dialog";
import { useAppData } from "@/lib/store";
import { TIMER_FORMATS, type Speech, type TimerFormat } from "@/lib/timer-formats";
import { cn, formatClock } from "@/lib/utils";

const CUSTOM_KEY = "roundready.customformat.v1";

function loadCustomFormat(): TimerFormat {
  const fallback: TimerFormat = {
    id: "custom",
    name: "Custom",
    prepSeconds: 180,
    speeches: [{ name: "Speech 1", speaker: "You", seconds: 300 }],
  };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(CUSTOM_KEY);
    return raw ? (JSON.parse(raw) as TimerFormat) : fallback;
  } catch {
    return fallback;
  }
}

/** Short beep via WebAudio — no asset files needed. */
function beep(freq: number, durationMs: number) {
  try {
    type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.value = 0.12;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
    osc.onended = () => ctx.close();
  } catch {
    // Audio not available; timer still works silently.
  }
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-line bg-card2 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-soft">
      {children}
    </kbd>
  );
}

export default function TimerPage() {
  const { data } = useAppData();
  const { warningSound, final30Alert } = data.settings;

  const [customFormat, setCustomFormat] = useState<TimerFormat>(loadCustomFormat);
  const formats = useMemo(() => [...TIMER_FORMATS, customFormat], [customFormat]);

  const [formatId, setFormatId] = useState("ld");
  const format = formats.find((f) => f.id === formatId) ?? formats[0];

  const [speechIndex, setSpeechIndex] = useState(0);
  const speech: Speech | undefined = format.speeches[speechIndex];
  const [remaining, setRemaining] = useState(format.speeches[0]?.seconds ?? 0);
  const [running, setRunning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  // Prep banks (one per side/team).
  const [prep, setPrep] = useState<[number, number]>([format.prepSeconds, format.prepSeconds]);
  const [prepRunning, setPrepRunning] = useState<0 | 1 | null>(null);

  const warned30 = useRef(false);
  const lastTick = useRef<number>(0);

  const loadSpeech = useCallback(
    (fmt: TimerFormat, index: number) => {
      setSpeechIndex(index);
      setRemaining(fmt.speeches[index]?.seconds ?? 0);
      setRunning(false);
      warned30.current = false;
    },
    []
  );

  const selectFormat = (id: string) => {
    const fmt = formats.find((f) => f.id === id) ?? formats[0];
    setFormatId(id);
    loadSpeech(fmt, 0);
    setPrep([fmt.prepSeconds, fmt.prepSeconds]);
    setPrepRunning(null);
  };

  // Main countdown loop (timestamp-based to avoid drift).
  useEffect(() => {
    if (!running && prepRunning === null) return;
    lastTick.current = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      if (running) {
        setRemaining((r) => {
          const next = Math.max(0, r - dt);
          if (final30Alert && !warned30.current && next <= 30 && r > 30) {
            warned30.current = true;
            if (warningSound) beep(880, 180);
          }
          if (next === 0 && r > 0) {
            if (warningSound) {
              beep(660, 220);
              window.setTimeout(() => beep(440, 350), 260);
            }
            setRunning(false);
          }
          return next;
        });
      }
      if (prepRunning !== null) {
        setPrep((p) => {
          const copy: [number, number] = [...p];
          copy[prepRunning] = Math.max(0, copy[prepRunning] - dt);
          if (copy[prepRunning] === 0) setPrepRunning(null);
          return copy;
        });
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [running, prepRunning, warningSound, final30Alert]);

  const go = (dir: 1 | -1) => {
    const next = speechIndex + dir;
    if (next >= 0 && next < format.speeches.length) loadSpeech(format, next);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      setFullscreen((f) => !f);
    }
  };

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Keyboard shortcuts so the timer is usable mid-practice without the mouse.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (editorOpen || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Space") {
        e.preventDefault();
        if (remaining === 0) loadSpeech(format, speechIndex);
        else setRunning((r) => !r);
      } else if (e.key === "r" || e.key === "R") {
        loadSpeech(format, speechIndex);
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorOpen, remaining, format, speechIndex, loadSpeech]);

  const saveCustom = (fmt: TimerFormat) => {
    setCustomFormat(fmt);
    try {
      window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(fmt));
    } catch {
      // ignore storage failures
    }
    if (formatId === "custom") loadSpeech(fmt, 0);
  };

  const progress = speech ? 1 - remaining / speech.seconds : 0;
  const urgent = remaining <= 30 && remaining > 0;
  const done = remaining === 0;

  return (
    <div>
      <PageHeader
        title="Debate Timer"
        subtitle="Practice at competition pace."
        actions={
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {fullscreen ? (
              <>
                <Minimize2 className="size-4" aria-hidden /> Exit Full Screen
              </>
            ) : (
              <>
                <Maximize2 className="size-4" aria-hidden /> Full Screen
              </>
            )}
          </Button>
        }
      />

      {/* Format selector */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Debate format">
        {formats.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={formatId === f.id}
            onClick={() => selectFormat(f.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              formatId === f.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-soft hover:border-faint hover:text-ink"
            )}
          >
            {f.name}
          </button>
        ))}
        <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setEditorOpen(true)}>
          <Plus className="size-4" aria-hidden /> Edit Custom
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main timer */}
        <Card className="lg:col-span-2">
          <CardBody className="flex flex-col items-center py-10">
            {speech ? (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-faint">
                  Current Speech
                </p>
                <h2 className="mt-1 text-center font-display text-2xl font-bold">{speech.name}</h2>
                <p className="mt-1 text-sm text-soft">Speaker: {speech.speaker}</p>

                <p
                  aria-live="polite"
                  className={cn(
                    "my-6 font-mono text-[clamp(4.5rem,14vw,9rem)] font-bold leading-none tabular-nums tracking-tight transition-colors",
                    done ? "text-loss" : urgent ? "text-warn" : "text-ink"
                  )}
                >
                  {formatClock(remaining)}
                </p>

                {/* Progress */}
                <div className="mb-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-card2">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      done ? "bg-loss" : urgent ? "bg-warn" : "bg-accent"
                    )}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => go(-1)}
                    disabled={speechIndex === 0}
                    aria-label="Previous speech"
                  >
                    <ChevronLeft className="size-5" aria-hidden /> Previous
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      if (done) loadSpeech(format, speechIndex);
                      else setRunning((r) => !r);
                    }}
                    className="min-w-36"
                  >
                    {done ? (
                      <>
                        <RotateCcw className="size-5" aria-hidden /> Restart
                      </>
                    ) : running ? (
                      <>
                        <Pause className="size-5" aria-hidden /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-5" aria-hidden /> Start
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => loadSpeech(format, speechIndex)}
                    aria-label="Reset speech timer"
                  >
                    <RotateCcw className="size-4" aria-hidden /> Reset
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => go(1)}
                    disabled={speechIndex === format.speeches.length - 1}
                    aria-label="Skip to next speech"
                  >
                    Skip <ChevronRight className="size-5" aria-hidden />
                  </Button>
                </div>

                {format.speeches[speechIndex + 1] && (
                  <p className="mt-6 text-sm text-faint">
                    Next:{" "}
                    <span className="font-semibold text-soft">
                      {format.speeches[speechIndex + 1].name}
                    </span>{" "}
                    ({formatClock(format.speeches[speechIndex + 1].seconds)})
                  </p>
                )}

                <p className="mt-5 hidden items-center gap-1.5 text-xs text-faint sm:flex">
                  <Kbd>Space</Kbd> start/pause · <Kbd>R</Kbd> reset · <Kbd>←</Kbd>
                  <Kbd>→</Kbd> switch speech
                </p>
              </>
            ) : (
              <p className="text-sm text-soft">Add a speech to your custom format to begin.</p>
            )}
          </CardBody>
        </Card>

        <div className="space-y-4">
          {/* Speech order */}
          <Card>
            <CardHeader>
              <CardTitle>Speech Order</CardTitle>
            </CardHeader>
            <CardBody>
              <ol className="space-y-1">
                {format.speeches.map((s, i) => (
                  <li key={`${s.name}-${i}`}>
                    <button
                      onClick={() => loadSpeech(format, i)}
                      aria-current={i === speechIndex ? "step" : undefined}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        i === speechIndex
                          ? "bg-accent/10 font-bold text-accent"
                          : i < speechIndex
                            ? "text-faint line-through hover:bg-card2"
                            : "text-soft hover:bg-card2"
                      )}
                    >
                      <span className="truncate">{s.name}</span>
                      <span className="ml-2 shrink-0 font-mono text-xs">
                        {formatClock(s.seconds)}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          {/* Prep time */}
          {format.prepSeconds > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Preparation Time</CardTitle>
              </CardHeader>
              <CardBody className="space-y-3">
                {([0, 1] as const).map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5"
                  >
                    <div>
                      <p className="text-xs font-semibold text-faint">
                        {i === 0 ? "Your prep" : "Opponent prep"}
                      </p>
                      <p
                        className={cn(
                          "font-mono text-xl font-bold tabular-nums",
                          prep[i] === 0 ? "text-loss" : prepRunning === i ? "text-accent" : ""
                        )}
                      >
                        {formatClock(prep[i])}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant={prepRunning === i ? "primary" : "outline"}
                        onClick={() => setPrepRunning(prepRunning === i ? null : i)}
                        disabled={prep[i] === 0}
                        aria-label={prepRunning === i ? "Pause prep timer" : "Start prep timer"}
                      >
                        {prepRunning === i ? <Pause className="size-4" /> : <Play className="size-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setPrep((p) => {
                            const c: [number, number] = [...p];
                            c[i] = format.prepSeconds;
                            return c;
                          })
                        }
                        aria-label="Reset prep timer"
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      <CustomFormatEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        format={customFormat}
        onSave={saveCustom}
      />
    </div>
  );
}

function CustomFormatEditor({
  open,
  onClose,
  format,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  format: TimerFormat;
  onSave: (f: TimerFormat) => void;
}) {
  const [speeches, setSpeeches] = useState(format.speeches);
  const [prepMinutes, setPrepMinutes] = useState(format.prepSeconds / 60);

  useEffect(() => {
    if (open) {
      setSpeeches(format.speeches);
      setPrepMinutes(format.prepSeconds / 60);
    }
  }, [open, format]);

  const update = (i: number, patch: Partial<Speech>) =>
    setSpeeches((s) => s.map((sp, j) => (j === i ? { ...sp, ...patch } : sp)));

  return (
    <Dialog open={open} onClose={onClose} title="Custom Timer Format" wide>
      <div className="space-y-3">
        {speeches.map((s, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor={`cs-name-${i}`}>Speech Name</Label>
              <Input
                id={`cs-name-${i}`}
                value={s.name}
                onChange={(e) => update(i, { name: e.target.value })}
              />
            </div>
            <div className="w-28">
              <Label htmlFor={`cs-speaker-${i}`}>Speaker</Label>
              <Input
                id={`cs-speaker-${i}`}
                value={s.speaker}
                onChange={(e) => update(i, { speaker: e.target.value })}
              />
            </div>
            <div className="w-24">
              <Label htmlFor={`cs-min-${i}`}>Minutes</Label>
              <Input
                id={`cs-min-${i}`}
                type="number"
                min={0.5}
                step={0.5}
                value={s.seconds / 60}
                onChange={(e) => update(i, { seconds: Math.max(30, Number(e.target.value) * 60) })}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-0.5"
              onClick={() => setSpeeches((sp) => sp.filter((_, j) => j !== i))}
              disabled={speeches.length === 1}
              aria-label={`Remove ${s.name}`}
            >
              <Trash2 className="size-4 text-loss" aria-hidden />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setSpeeches((s) => [
              ...s,
              { name: `Speech ${s.length + 1}`, speaker: "You", seconds: 300 },
            ])
          }
        >
          <Plus className="size-4" aria-hidden /> Add Speech
        </Button>
        <div className="w-40 pt-2">
          <Label htmlFor="cs-prep">Prep Time (minutes)</Label>
          <Input
            id="cs-prep"
            type="number"
            min={0}
            step={0.5}
            value={prepMinutes}
            onChange={(e) => setPrepMinutes(Math.max(0, Number(e.target.value)))}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave({ id: "custom", name: "Custom", prepSeconds: prepMinutes * 60, speeches });
              onClose();
            }}
          >
            Save Format
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
