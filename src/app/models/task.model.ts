export enum TaskStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface Task {
  id: number;
  text: string;
  description?: string;
  status: TaskStatus;
}
