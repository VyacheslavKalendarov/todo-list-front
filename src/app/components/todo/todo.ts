import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

export interface Task {
  description: string;
}

@Component({
  selector: 'app-todo',
  imports: [FormField],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  protected readonly title = 'To-Do List';

  protected readonly task = signal<Task>({
    description: '',
  });

  protected readonly taskList = signal<Task[]>([
    { description: 'Learn Angular' },
    { description: 'Learn React' },
    { description: 'Learn Vue' },
    { description: 'Learn Svelte' },
    { description: 'Learn TypeScript' },
  ]);

  protected readonly taskForm = form(this.task);

  protected readonly addTask = () => {
    const description = this.task().description.trim();
    if (!description) return;

    this.taskList.update((tasks) => [...tasks, { description }]);
    this.task.set({ description: '' });
  };
}
