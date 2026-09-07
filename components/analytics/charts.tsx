"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/lib/stats";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--ink)",
  fontSize: 12,
  boxShadow: "0 8px 24px -8px rgb(0 0 0 / 0.2)",
};

const axisProps = {
  stroke: "var(--faint)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

export function WinLossTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} domain={[0, 100]} unit="%" />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`${v}%`, "Win rate"]}
          labelFormatter={(l) => `${l}`}
        />
        <Line
          type="monotone"
          dataKey="winRate"
          stroke="var(--accent)"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TournamentBarsChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
        <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--card2)" }} />
        <Bar dataKey="wins" name="Wins" fill="var(--win)" radius={[5, 5, 0, 0]} maxBarSize={26} />
        <Bar dataKey="losses" name="Losses" fill="var(--loss)" radius={[5, 5, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SpeaksTrendChart({ data }: { data: { round: number; speaks: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
        <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="round" {...axisProps} label={undefined} />
        <YAxis {...axisProps} domain={["dataMin - 0.3", "dataMax + 0.3"]} tickFormatter={(v: number) => v.toFixed(1)} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [v, "Speaker points"]}
          labelFormatter={(l) => `Round ${l}`}
        />
        <Line
          type="monotone"
          dataKey="speaks"
          stroke="var(--violet)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--violet)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WinRateDonut({ winRate }: { winRate: number }) {
  const data = [
    { name: "Wins", value: winRate },
    { name: "Losses", value: 100 - winRate },
  ];
  return (
    <div className="relative h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="92%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="var(--accent)" />
            <Cell fill="var(--card2)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold">{winRate}%</span>
        <span className="text-xs text-faint">season win rate</span>
      </div>
    </div>
  );
}

export function HorizontalMeter({
  label,
  value,
  max,
  suffix,
  className,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-36 shrink-0 truncate text-sm font-semibold">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-card2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-violet transition-all duration-700"
          style={{ width: `${max === 0 ? 0 : (value / max) * 100}%` }}
        />
      </div>
      <span className="w-20 shrink-0 text-right text-xs text-faint">
        {value}
        {suffix ?? ""}
      </span>
    </div>
  );
}

export function FormPill({ result, size = "md" }: { result: "Win" | "Loss" | "Bye"; size?: "md" | "lg" }) {
  const letter = result === "Win" ? "W" : result === "Loss" ? "L" : "B";
  return (
    <span
      aria-label={result}
      className={cn(
        "flex items-center justify-center rounded-lg font-display font-bold",
        size === "lg" ? "size-11 text-lg" : "size-8 text-sm",
        result === "Win" && "bg-win/12 text-win",
        result === "Loss" && "bg-loss/12 text-loss",
        result === "Bye" && "bg-card2 text-faint"
      )}
    >
      {letter}
    </span>
  );
}
