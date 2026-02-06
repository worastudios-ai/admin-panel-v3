import * as React from "react";

import type { Task } from "@/types";
import { TaskCard } from "./TaskCard";

export interface TaskBoardProps {
  tasks: Task[];
  viewMode: "manager" | "employee";
  onSelectTask?: (task: Task) => void;
}

export function TaskBoard({ tasks, viewMode, onSelectTask }: TaskBoardProps) {
  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          viewMode={viewMode}
          onSelect={onSelectTask}
        />
      ))}
    </div>
  );
}
