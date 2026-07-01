import { Component, signal } from '@angular/core';
import { form, FormField, requiredError, validate } from '@angular/forms/signals';
import { MatInput } from '@angular/material/input';
import { Task } from '../../models/task.model';
import { TodoList } from '../todo-list/todo-list';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-todo',
  imports: [FormField, TodoList, MatInput, Button],
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
    validate(path.text, ({ value }) => {
      if (value().trim().length === 0) {
        return requiredError();
      }

      return null;
    });
  });

  protected addTask() {
    const description = this.task().text.trim();
    if (!description) return;

    this.taskList.update((tasks) => [
      ...tasks,
      { id: Math.max(0, ...tasks.map((task) => task.id)) + 1, text: description },
    ]);
    this.task.set({ id: 0, text: '' });
  }

  protected removeTask(id: number) {
    this.taskList.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
