const PHRASES = [
  "Every round makes you better",
  "Prepare smarter",
  "Debate better",
  "Know your record",
  "Turn feedback into progress",
  "Walk in ready",
];

/** Editorial scrolling ticker. Pauses on hover; decorative for screen readers. */
export function Marquee() {
  const run = PHRASES.map((p, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6">
      <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#191817]">
        {p}
      </span>
      <span className="text-[#E5518D]" aria-hidden>
        ✦
      </span>
    </span>
  ));

  return (
    <div
      className="marquee overflow-hidden border-y border-[#E4D9A8] bg-[#F4EBC3] py-3.5"
      aria-hidden
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        <div className="flex shrink-0">{run}</div>
        <div className="flex shrink-0">{run}</div>
      </div>
    </div>
  );
}
