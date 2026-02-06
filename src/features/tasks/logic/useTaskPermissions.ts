import type { UserRole } from "@/types";

export interface TaskPermissions {
  canEdit: boolean;
  canDelete: boolean;
}

export function useTaskPermissions(role: UserRole): TaskPermissions {
  const isManager = role === "MANAGER";

  return {
    canEdit: isManager,
    canDelete: isManager,
  };
}
