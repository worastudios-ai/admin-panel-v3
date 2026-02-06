import * as React from "react";

import type { Task } from "@/types";

type HeatmapTask = Task & { isOverdue?: boolean };

export interface HeatmapGridProps {
  tasks: HeatmapTask[];
  onNudge?: (task: Task) => void;
  onFreeze?: (task: Task) => void;
}

export function HeatmapGrid({ tasks, onNudge, onFreeze }: HeatmapGridProps) {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const [menuTaskId, setMenuTaskId] = React.useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => {
        const isFocused = focusedId === task.id;
        const isDimmed = focusedId ? !isFocused : false;
        const isMenuOpen = menuTaskId === task.id;

        return (
          <div
            key={task.id}
            className={`relative overflow-hidden rounded-squircle-lg border border-white/10 bg-glass-surface/80 p-5 transition-all duration-200 ${
              task.isOverdue
                ? "shadow-[0_0_25px_rgba(255,0,51,0.45)] ring-1 ring-alert-red/60"
                : "opacity-70"
            } ${isDimmed ? "blur-sm opacity-30" : ""} ${
              isFocused ? "shadow-[0_0_35px_rgba(255,255,255,0.2)]" : ""
            }`}
            onMouseEnter={() => setFocusedId(task.id)}
            onMouseLeave={() => setFocusedId(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70"
              onClick={() =>
                setMenuTaskId((current) =>
                  current === task.id ? null : task.id
                )
              }
              aria-label="Task actions"
            >
              <span aria-hidden>⋮</span>
            </button>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-white">
                {task.title}
              </h3>
              {task.description ? (
                <p className="text-sm text-white/60 line-clamp-2">
                  {task.description}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {task.status.replace("_", " ")}
                </span>
                {task.deadline ? (
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
            </div>

            {isMenuOpen ? (
              <div className="absolute right-4 top-14 z-10 w-40 rounded-squircle border border-white/10 bg-manager-bg/95 p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => onNudge?.(task)}
                  className="w-full rounded-squircle px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/5"
                >
                  Dürt (Nudge)
                </button>
                <button
                  type="button"
                  onClick={() => onFreeze?.(task)}
                  className="w-full rounded-squircle px-3 py-2 text-left text-sm text-alert-red transition hover:bg-alert-red/10"
                >
                  Dondur (Freeze)
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
