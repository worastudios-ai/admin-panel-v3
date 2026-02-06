export enum UserRole {
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export interface User {
  id: string;
  role: UserRole;
  avatar?: string | null;
  name: string;
  createdTasks?: Task[];
  assignedTasks?: Task[];
  auditLogs?: AuditLog[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: number;
  deadline?: Date | null;
  parentId?: string | null;
  parent?: Task | null;
  children?: Task[];
  managerId: string;
  manager?: User;
  employeeId?: string | null;
  employee?: User | null;
  checklist?: ChecklistItem[];
  evidence?: Evidence[];
  auditLogs?: AuditLog[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  requiresProof: boolean;
  taskId: string;
  task?: Task;
  createdAt: Date;
  updatedAt: Date;
}

export interface Evidence {
  id: string;
  fileUrl: string;
  type: string;
  uploadedAt: Date;
  taskId: string;
  task?: Task;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  action: string;
  oldValue?: string | null;
  newValue?: string | null;
  userId: string;
  user?: User;
  taskId?: string | null;
  task?: Task | null;
  timestamp: Date;
}
