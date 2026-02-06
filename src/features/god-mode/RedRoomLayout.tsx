import * as React from "react";

import type { Task } from "@/types";
import { HeatmapGrid } from "./HeatmapGrid";

export interface RedRoomLayoutProps {
  tasks: Task[];
  onNudge?: (task: Task) => void;
  onFreeze?: (task: Task) => void;
}

function isOverdue(task: Task) {
  if (!task.deadline) {
    return false;
  }

  const deadline = new Date(task.deadline).getTime();
  const now = Date.now();

  return deadline < now && task.status !== "DONE";
}

export function RedRoomLayout({ tasks, onNudge, onFreeze }: RedRoomLayoutProps) {
  const enhancedTasks = tasks.map((task) => ({
    ...task,
    isOverdue: isOverdue(task),
  }));

  return (
    <section className="relative min-h-screen bg-manager-bg px-6 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-alert-red/80">
            God Mode
          </p>
          <h1 className="text-3xl font-semibold">Red Room</h1>
          <p className="text-sm text-white/60">
            Overdue tasks glow. Everything else fades into the background.
          </p>
        </header>
        <HeatmapGrid
          tasks={enhancedTasks}
          onNudge={onNudge}
          onFreeze={onFreeze}
        />
      </div>
    </section>
  );
}
