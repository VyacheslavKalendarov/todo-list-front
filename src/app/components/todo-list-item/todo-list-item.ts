import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { Button } from '../../shared/ui/button/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[app-todo-list-item]',
  templateUrl: './todo-list-item.html',
  imports: [Button],
})
export class TodoListItem {
  public readonly task = input.required<Task>();
  public readonly removeTaskRequest = output<number>();
  public readonly updateTaskRequest = output<{ id: number; text: string }>();

  protected isEditing = signal(false);
  protected editValue = signal('');

  protected startEdit(): void {
    this.editValue.set(this.task().text);
    this.isEditing.set(true);
  }

  protected saveEdit(): void {
    this.updateTaskRequest.emit({ id: this.task().id, text: this.editValue() });
    this.isEditing.set(false);
  }

  protected onInput(e: Event): void {
    this.editValue.set((e.target as HTMLInputElement).value);
  }
}
