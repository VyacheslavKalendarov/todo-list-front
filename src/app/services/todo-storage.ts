import { Service, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Service()
export class TodoStorage {
  private readonly _tasks = signal<Task[]>([
    {
      id: 1,
      text: 'Learn Angular',
      description: 'Обучение Ангулар',
      status: TaskStatus.InProgress,
    },
    {
      id: 2,
      text: 'Learn React',
      description: 'Обучение Реакт',
      status: TaskStatus.Completed,
    },
    {
      id: 3,
      text: 'Learn Vue',
      description: 'Обучение вью',
      status: TaskStatus.Completed,
    },
    {
      id: 4,
      text: 'Learn Svelte',
      description: 'Обучение свелт',
      status: TaskStatus.InProgress,
    },
    {
      id: 5,
      text: 'Learn TypeScript',
      description: 'Обучение тайпскрипт',
      status: TaskStatus.InProgress,
    },
  ]);

  public readonly tasks = this._tasks.asReadonly();

  public addTask(task: string, description?: string): void {
    this._tasks.update((tasks) => [
      ...tasks,
      {
        id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
        text: task,
        description,
        status: TaskStatus.InProgress,
      },
    ]);
  }

  public removeTask(id: number): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  public updateTask(id: number, newText: string): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  }

  public updateTaskStatus(id: number, status: TaskStatus): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }
}
