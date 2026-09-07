import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  message,
  action,
}: {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line bg-card/50 px-6 py-14 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/10">
        <Icon className="size-6 text-accent" aria-hidden />
      </div>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-soft">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
