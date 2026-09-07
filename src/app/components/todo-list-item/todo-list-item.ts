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
  public readonly isSaving = input(false);
  public readonly isDisabled = input(false);
  public readonly isDeleting = input(false);
  public readonly removeTaskRequest = output<string>();
  public readonly updateTaskRequest = output<{ id: string; name: string }>();

  protected readonly isEditing = signal(false);
  protected readonly editValue = signal('');

  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    effect(() => {
      this.editInput()?.nativeElement.focus();
    });
  }

  protected startEdit(): void {
    if (this.isDisabled()) {
      return;
    }

    this.editValue.set(this.task().name);
    this.isEditing.set(true);
  }

  public finishEditing(): void {
    this.isEditing.set(false);
  }

  protected saveEdit(): void {
    if (this.isDisabled()) {
      return;
    }

    const name = this.editValue().trim();

    if (name.length === 0) {
      return;
    }

    if (name === this.task().name) {
      this.finishEditing();
      return;
    }

    this.updateTaskRequest.emit({
      id: this.task().id,
      name,
    });
  }

  protected onInput(e: Event): void {
    this.editValue.set((e.target as HTMLInputElement).value);
  }
}
