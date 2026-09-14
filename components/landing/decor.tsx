import { cn } from "@/lib/utils";

/**
 * Playful editorial decorations: rotated sticker pills, starburst doodles,
 * wavy section dividers, and a curly hand-drawn arrow.
 */

export function Sticker({
  children,
  className,
  color = "periwinkle",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "periwinkle" | "butter" | "blush" | "sage";
}) {
  const colors = {
    periwinkle: "bg-[#DDE1F8] text-[#3D4785]",
    butter: "bg-[#F4EBC3] text-[#7A6614]",
    blush: "bg-[#F9E3EC] text-[#B23A73]",
    sage: "bg-[#E3EDE3] text-[#3E6B4A]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#191817]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_12px_-4px_rgb(25_24_23/0.2)] transition-transform duration-300 hover:rotate-0",
        colors[color],
        className
      )}
    >
      <span aria-hidden>✦</span>
      {children}
    </span>
  );
}

export function Starburst({
  className,
  color = "#E5518D",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill={color}>
      <path d="M20 0c1.8 7.5 4.6 12.3 8.1 15.9C31.7 19.4 36.5 22.2 40 24c-7.5 1.8-12.3 4.6-15.9 8.1C20.6 35.7 21.8 32.5 20 40c-1.8-7.5-4.6-12.3-8.1-15.9C8.3 20.6 3.5 21.8 0 20c7.5-1.8 12.3-4.6 15.9-8.1C19.4 8.3 18.2 7.5 20 0Z" />
    </svg>
  );
}

export function Flower({
  className,
  color = "#DDE1F8",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill={color}>
      {[0, 45, 90, 135].map((deg) => (
        <ellipse key={deg} cx="24" cy="24" rx="22" ry="9" transform={`rotate(${deg} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="5" fill="#191817" />
    </svg>
  );
}

/** Wavy squiggle divider between sections. */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center py-2", className)} aria-hidden>
      <svg viewBox="0 0 320 14" className="h-3.5 w-72 text-[#9BA5E8]" fill="none">
        <path
          d="M2 7c13-8 27-8 40 0s27 8 40 0 27-8 40 0 27 8 40 0 27-8 40 0 27 8 40 0 27-8 40 0 25 8 36 0"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Hand-drawn curly arrow doodle. */
export function CurlyArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={cn("text-[#E5518D]", className)} aria-hidden fill="none">
      <path
        d="M6 8c26 4 44 14 50 34M46 34l10 9 4-14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
