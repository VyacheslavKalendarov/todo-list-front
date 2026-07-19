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
  protected readonly title = 'To-Do List';
  protected selectedItemId = signal<number | null>(null);
  protected readonly task = signal<Task>({
    id: 0,
    text: '',
    description: '',
  });
  protected readonly taskForm = form(this.task, (path) => {
    validate(path.text, ({ value }) => {
      if (value().trim().length === 0) {
        return requiredError();
      }

      return null;
    });
  });
  private readonly todoStorage = inject(TodoStorage);
  protected readonly taskList = this.todoStorage.tasks;
  protected selectedTask = computed(
    () => this.taskList().find((task) => task.id === this.selectedItemId()) ?? null,
  );
  private readonly toastService = inject(ToastService);

  protected addTask() {
    this.todoStorage.addTask(this.task().text, this.task().description);
    this.task.set({ id: 0, text: '', description: '' });
    this.toastService.showToast('Task added!');
  }

  protected updateTask(id: number, description: string): void {
    this.todoStorage.updateTask(id, description);
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
