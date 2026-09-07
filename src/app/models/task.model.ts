export enum TaskStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: TaskStatus;
}

export interface CreateTaskData {
  name: string;
  description: string;
}
