import { cn } from "@/lib/utils";

/**
 * The RoundReview mark: a speech bubble (the round) holding a gavel (the
 * decision). Place inside a `group` element — hovering taps the gavel and
 * spins the star.
 */
export function LogoMark({
  className,
  bubbleClass = "text-[#191817]",
  gavelClass = "text-[#FAF9F5]",
}: {
  className?: string;
  bubbleClass?: string;
  gavelClass?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Speech bubble */}
      <svg viewBox="0 0 40 40" className={cn("h-full w-full", bubbleClass)} fill="currentColor">
        <path d="M12 1h16c6.1 0 11 4.9 11 11v10c0 6.1-4.9 11-11 11H15.6l-8.2 6.6C5.4 41.2 3 39.8 3 37.3V12C3 5.9 6.9 1 12 1Z" />
      </svg>
      {/* Gavel */}
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "logo-gavel absolute left-1/2 top-[42%] h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2",
          gavelClass
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="m14.5 12.5-8 8" />
        <path d="m9.5 5.5 7 7" transform="rotate(45 13 9)" strokeWidth="4.6" />
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
