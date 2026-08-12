import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { Button } from '../../shared/ui/button/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[app-todo-list-item]',
  templateUrl: './todo-list-item.html',
  imports: [Button],
  styleUrl: './todo-list-item.scss',
})
export class TodoListItem {
  public readonly task = input.required<Task>();
  public readonly removeTaskRequest = output<number>();
  public readonly updateTaskRequest = output<{ id: number; text: string }>();

  protected readonly isEditing = signal(false);
  protected readonly editValue = signal('');

  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    effect(() => {
      this.editInput()?.nativeElement.focus();
    });
  }

  protected startEdit(): void {
    this.editValue.set(this.task().text);
    this.isEditing.set(true);
  }

  protected saveEdit(): void {
    const text = this.editValue().trim();

    if (text.length === 0) {
      return;
    }

    this.updateTaskRequest.emit({ id: this.task().id, text });
    this.isEditing.set(false);
  }

  protected onInput(e: Event): void {
    this.editValue.set((e.target as HTMLInputElement).value);
  }
}
