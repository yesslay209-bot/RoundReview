"use client";

import { useEffect, useState } from "react";

const COLORS = ["#4F46E5", "#E5518D", "#F0B13F", "#2F7A57", "#8B5CF6"];

interface Piece {
  left: string;
  dx: string;
  rot: string;
  delay: string;
  color: string;
}

/** One-shot full-screen confetti burst. Mount it to fire; unmount to clean up. */
export function ConfettiBurst({ count = 28 }: { count?: number }) {
  // Randomness happens post-render to keep render pure.
  const [pieces, setPieces] = useState<Piece[]>([]);
  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        dx: `${(Math.random() - 0.5) * 30}vw`,
        rot: `${540 + Math.random() * 540}deg`,
        delay: `${Math.random() * 0.5}s`,
        color: COLORS[i % COLORS.length],
      }))
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={
            {
              left: p.left,
              background: p.color,
              "--dx": p.dx,
              "--rot": p.rot,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
