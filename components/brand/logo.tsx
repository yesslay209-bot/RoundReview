import { cn } from "@/lib/utils";

/**
 * The RoundReview mark: a speech bubble (the round) holding a podium (the
 * speaker). Place inside a `group` element — hovering makes the podium do a
 * happy hop and spins the star.
 */
export function LogoMark({
  className,
  bubbleClass = "text-[#191817]",
  glyphClass = "text-[#FAF9F5]",
}: {
  className?: string;
  bubbleClass?: string;
  glyphClass?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Speech bubble */}
      <svg viewBox="0 0 40 40" className={cn("h-full w-full", bubbleClass)} fill="currentColor">
        <path d="M12 1h16c6.1 0 11 4.9 11 11v10c0 6.1-4.9 11-11 11H15.6l-8.2 6.6C5.4 41.2 3 39.8 3 37.3V12C3 5.9 6.9 1 12 1Z" />
      </svg>
      {/* Podium (front-facing lectern with microphone) */}
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "logo-glyph absolute left-1/2 top-[46%] h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2",
          glyphClass
        )}
        fill="currentColor"
      >
        {/* Microphone head + angled stem */}
        <circle cx="14.6" cy="3" r="1.6" />
        <path d="M13.6 4.3 9.4 6.9c-.5.3-.6 1-.3 1.4.3.5 1 .6 1.4.3l4.2-2.6z" />
        {/* Desk ledge */}
        <rect x="4.6" y="9.4" width="14.8" height="2" rx="0.6" />
        {/* Tapered upper */}
        <path d="M6.2 12.2h11.6l-1.1 4H7.3z" />
        {/* Column */}
        <rect x="8.4" y="16.2" width="7.2" height="4.4" />
        {/* Base */}
        <rect x="6.4" y="20.6" width="11.2" height="1.9" rx="0.7" />
      </svg>
      {/* Star pop */}
      <svg
        viewBox="0 0 20 20"
        className="logo-star absolute -right-1.5 -top-1.5 h-[45%] w-[45%] text-[#E5518D]"
        fill="currentColor"
        aria-hidden
      >
        <path d="M10 0c.9 3.8 2.3 6.1 4 7.8 1.7 1.7 4 2.4 6 2.2-3.8.9-6.1 2.3-7.8 4-1.7 1.7-1.3 3.2-2.2 6-.9-3.8-2.3-6.1-4-7.8C4.3 10.5 2 10.9 0 10c3.8-.9 6.1-2.3 7.8-4C9.5 4.3 9.1 3.8 10 0Z" />
      </svg>
    </span>
  );
}
