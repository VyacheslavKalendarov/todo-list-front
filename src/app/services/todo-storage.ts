import { Service, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Service()
export class TodoStorage {
  private readonly _tasks = signal<Task[]>([
    {
      id: 1,
      text: 'Learn Angular',
      description: 'Обучение Ангулар',
    },
    {
      id: 2,
      text: 'Learn React',
      description: 'Обучение Реакт',
    },
    {
      id: 3,
      text: 'Learn Vue',
      description: 'Обучение вью',
    },
    {
      id: 4,
      text: 'Learn Svelte',
      description: 'Обучение свелт',
    },
    {
      id: 5,
      text: 'Learn TypeScript',
      description: 'Обучение тайпскрипт',
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
}
