import * as React from "react";
import { motion } from "framer-motion";

import type { Task } from "@/types";

export interface TaskCardProps {
  task: Task;
  viewMode: "manager" | "employee";
  onSelect?: (task: Task) => void;
}

const statusStyles: Record<string, string> = {
  TODO: "bg-white/10 text-white",
  IN_PROGRESS: "bg-action-blue/20 text-action-blue",
  BLOCKED: "bg-alert-red/20 text-alert-red",
  REVIEW: "bg-white/15 text-white",
  DONE: "bg-emerald-400/20 text-emerald-200",
};

export function TaskCard({ task, viewMode, onSelect }: TaskCardProps) {
  const isManager = viewMode === "manager";

  return (
    <motion.button
      layoutId={`task-${task.id}`}
      type="button"
      onClick={() => onSelect?.(task)}
      className="group flex w-full flex-col gap-4 rounded-squircle-lg border border-white/10 bg-glass-surface/80 p-5 text-left text-white backdrop-blur transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold leading-tight">
            {task.title}
          </h3>
          {task.description ? (
            <p className="text-sm text-white/70 line-clamp-2">
              {task.description}
            </p>
          ) : null}
        </div>
        {isManager ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </span>
        ) : (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
            Read-Only
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[task.status] ?? "bg-white/10 text-white"
          }`}
        >
          <span aria-hidden className="text-[10px] leading-none">
            •
          </span>
          <span>{task.status.replace("_", " ")}</span>
        </span>
        {task.deadline ? (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}
