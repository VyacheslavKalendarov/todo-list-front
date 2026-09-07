import { Component, computed, DestroyRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { CreateTaskData, TaskStatus } from '../../models/task.model';
import { TodoList } from '../todo-list/todo-list';
import { TodoStorage } from '../../services/todo-storage';
import { ToastService } from '../../services/toast-service';
import { TodoCreateItem } from '../todo-create-item/todo-create-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [TodoList, TodoCreateItem],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  private readonly todoStorage = inject(TodoStorage);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly createItem = viewChild(TodoCreateItem);
  private readonly listComponent = viewChild(TodoList);

  protected readonly TaskStatus = TaskStatus;
  protected readonly title = 'To-Do List';

  protected readonly selectedItemId = signal<string | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly loadError = signal<string | null>(null);
  protected readonly isCreating = signal(false);
  protected readonly createError = signal<string | null>(null);
  protected readonly isUpdatingStatus = signal(false);
  protected readonly statusError = signal<string | null>(null);
  protected readonly updatingTaskId = signal<string | null>(null);
  protected readonly updateError = signal<string | null>(null);
  protected readonly deletingTaskId = signal<string | null>(null);
  protected readonly deleteError = signal<string | null>(null);

  protected readonly isTaskActionPending = computed(
    () =>
      this.updatingTaskId() !== null || this.isUpdatingStatus() || this.deletingTaskId() !== null,
  );

  protected readonly taskList = this.todoStorage.tasks;
  protected readonly statusFilter = signal<TaskStatus | null>(null);

  protected readonly filteredTasks = computed(() => {
    const status = this.statusFilter();
    const tasks = this.taskList();

    if (status === null) {
      return tasks;
    }

    return tasks.filter((task) => task.status === status);
  });

  protected readonly selectedTask = computed(
    () => this.taskList().find((task) => task.id === this.selectedItemId()) ?? null,
  );

  ngOnInit() {
    this.todoStorage
      .loadTasks()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        error: () => {
          this.loadError.set('Не удалось загрузить задачи. Попробуйте обновить страницу');
        },
      });
  }

  protected addTask(data: CreateTaskData): void {
    if (this.isCreating()) {
      return;
    }

    this.isCreating.set(true);
    this.createError.set(null);

    this.todoStorage
      .addTask(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isCreating.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.createItem()?.reset();
          this.toastService.showToast('Task added!');
        },
        error: () => {
          this.createError.set('Не удалось добавить задачу. Попробуй еще раз');
        },
      });
  }

  protected updateTask(id: string, name: string): void {
    const newName = name.trim();

    if (this.isTaskActionPending() || newName.length === 0) {
      return;
    }

    this.updatingTaskId.set(id);
    this.updateError.set(null);

    this.todoStorage
      .updateTask(id, newName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.updatingTaskId.set(null);
        }),
      )
      .subscribe({
        next: () => {
          this.listComponent()?.finishEditingTask(id);
          this.toastService.showToast('Task updated!');
        },
        error: () => {
          this.updateError.set('Не удалось сохранить название. Попробуйте ещё раз.');
        },
      });
  }

  protected updateTaskStatus(id: string, event: Event): void {
    event.preventDefault();

    if (this.isTaskActionPending()) {
      return;
    }

    const task = this.taskList().find((item) => item.id === id);

    if (!task) {
      return;
    }

    const status =
      task.status === TaskStatus.Completed ? TaskStatus.InProgress : TaskStatus.Completed;

    this.isUpdatingStatus.set(true);
    this.statusError.set(null);

    this.todoStorage
      .updateTaskStatus(id, status)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isUpdatingStatus.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.showToast('Task status updated!');
        },
        error: () => {
          this.statusError.set(
            `Не удалось изменить статус задачи «${task.name}». Попробуйте ещё раз.`,
          );
        },
      });
  }

  protected removeTask(id: string): void {
    if (this.isTaskActionPending()) {
      return;
    }

    const task = this.taskList().find((item) => item.id === id);

    if (!task) {
      return;
    }

    this.deletingTaskId.set(id);
    this.deleteError.set(null);

    this.todoStorage
      .removeTask(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.deletingTaskId.set(null);
        }),
      )
      .subscribe({
        next: () => {
          if (this.selectedItemId() === id) {
            this.selectedItemId.set(null);
          }

          this.toastService.showToast('Task deleted!');
        },
        error: () => {
          this.deleteError.set(`Не удалось удалить задачу «${task.name}». Попробуйте ещё раз.`);
        },
      });
  }

  protected changeStatusFilter(value: string): void {
    if (value === '') {
      this.statusFilter.set(null);
    }

    if (value === TaskStatus.InProgress || value === TaskStatus.Completed) {
      this.statusFilter.set(value);
    }
  }
}
