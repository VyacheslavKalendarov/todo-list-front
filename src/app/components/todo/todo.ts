import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { MatInput } from '@angular/material/input';

export interface Task {
  id: number;
  text: string;
}

@Component({
  selector: 'app-todo',
  imports: [FormField, TodoListItem, MatInput],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  protected readonly title = 'To-Do List';

  protected readonly task = signal<Task>({
    id: 0,
    text: '',
  });

  protected readonly taskList = signal<Task[]>([
    { id: 1, text: 'Learn Angular' },
    { id: 2, text: 'Learn React' },
    { id: 3, text: 'Learn Vue' },
    { id: 4, text: 'Learn Svelte' },
    { id: 5, text: 'Learn TypeScript' },
  ]);

  protected readonly taskForm = form(this.task, (path) => {
    required(path.text);
  });

  protected readonly addTask = () => {
    const description = this.task().text.trim();
    if (!description) return;

    this.taskList.update((tasks) => [
      ...tasks,
      { id: Math.max(...tasks.map((task) => task.id)) + 1, text: description },
    ]);
    this.task.set({ id: 0, text: '' });
  };

  protected removeTask(id: number) {
    this.taskList.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
