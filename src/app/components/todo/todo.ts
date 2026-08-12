import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, requiredError, validate } from '@angular/forms/signals';
import { MatInput } from '@angular/material/input';
import { Task } from '../../models/task.model';
import { TodoList } from '../todo-list/todo-list';
import { Button } from '../../shared/ui/button/button';
import { TodoStorage } from '../../services/todo-storage';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-todo',
  imports: [FormField, TodoList, MatInput, Button],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  private readonly todoStorage = inject(TodoStorage);
  private readonly toastService = inject(ToastService);

  protected readonly title = 'To-Do List';

  protected readonly selectedItemId = signal<number | null>(null);
  protected readonly task = signal<Task>({
    id: 0,
    text: '',
    description: '',
  });

  protected readonly taskList = this.todoStorage.tasks;

  protected readonly taskForm = form(this.task, (path) => {
    validate(path.text, ({ value }) => {
      if (value().trim().length === 0) {
        return requiredError();
      }

      return null;
    });
  });

  protected readonly selectedTask = computed(
    () => this.taskList().find((task) => task.id === this.selectedItemId()) ?? null,
  );

  protected addTask() {
    const { text, description } = this.task();
    const trimmedDescription = description?.trim();

    this.todoStorage.addTask(text.trim(), trimmedDescription || undefined);
    this.task.set({ id: 0, text: '', description: '' });
    this.toastService.showToast('Task added!');
  }

  protected updateTask(id: number, text: string): void {
    this.todoStorage.updateTask(id, text);
    this.toastService.showToast('Task updated!');
  }

  protected removeTask(id: number) {
    this.todoStorage.removeTask(id);
  }

  protected updateDescription(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.task.update((task) => ({ ...task, description: value || undefined }));
  }
}
