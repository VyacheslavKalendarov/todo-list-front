import { Component, input, model, output, viewChildren } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { Tooltip } from '../../directives/tooltip';
import { LoadingSpinner } from '../../shared/ui/loading-spinner/loading-spinner';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  imports: [TodoListItem, Tooltip, LoadingSpinner],
})
export class TodoList {
  private readonly items = viewChildren(TodoListItem);

  public readonly updatingTaskId = input<string | null>(null);
  public readonly deletingTaskId = input<string | null>(null);
  public readonly isDisabled = input(false);
  public readonly isLoading = input(false);
  public readonly taskList = input.required<Task[]>();
  public readonly removeTask = output<string>();
  public readonly updateTask = output<{ id: string; name: string }>();
  public readonly selectedItemId = model<string | null>(null);

  public finishEditingTask(id: string): void {
    const item = this.items().find((component) => component.task().id === id);

    item?.finishEditing();
  }
}
