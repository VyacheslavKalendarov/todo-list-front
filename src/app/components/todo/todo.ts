import { Component, computed, signal } from '@angular/core';
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

  protected selectedItemId = signal<number | null>(null);

  protected readonly task = signal<Task>({
    id: 0,
    text: '',
    description: '',
  });

  protected readonly taskList = signal<Task[]>([
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

  protected selectedTask = computed(
    () => this.taskList().find((task) => task.id === this.selectedItemId()) ?? null,
  );

  protected readonly taskForm = form(this.task, (path) => {
    validate(path.text, ({ value }) => {
      if (value().trim().length === 0) {
        return requiredError();
      }

      return null;
    });
  });

  protected addTask() {
    const title = this.task().text.trim();
    const description = this.task().description?.trim() ?? '';

    this.taskList.update((tasks) => [
      ...tasks,
      {
        id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
        text: title,
        description: description,
      },
    ]);
    this.task.set({ id: 0, text: '', description: '' });
  }

  protected removeTask(id: number) {
    this.taskList.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  protected updateDescription(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.task.update((task) => ({ ...task, description: value || undefined }));
  }
}
