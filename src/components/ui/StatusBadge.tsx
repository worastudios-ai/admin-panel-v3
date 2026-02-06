import * as React from "react";

export type StatusVariant =
  | "todo"
  | "in-progress"
  | "blocked"
  | "review"
  | "done";

const variantStyles: Record<
  StatusVariant,
  { container: string; label: string; icon: string }
> = {
  todo: {
    container: "bg-white/10 text-white",
    label: "Todo",
    icon: "•",
  },
  "in-progress": {
    container: "bg-action-blue/20 text-action-blue",
    label: "In Progress",
    icon: "⟳",
  },
  blocked: {
    container: "bg-alert-red/20 text-alert-red",
    label: "Blocked",
    icon: "!",
  },
  review: {
    container: "bg-white/15 text-white",
    label: "Review",
    icon: "★",
  },
  done: {
    container: "bg-emerald-400/20 text-emerald-200",
    label: "Done",
    icon: "✓",
  },
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusVariant;
}

export function StatusBadge({ status, className = "", ...props }: StatusBadgeProps) {
  const variant = variantStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${variant.container} ${className}`}
      {...props}
    >
      <span aria-hidden className="text-[10px] leading-none">
        {variant.icon}
      </span>
      <span>{variant.label}</span>
    </span>
  );
}
