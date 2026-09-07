import { Component, input, output, signal } from '@angular/core';
import { CreateTaskData } from '../../models/task.model';
import { disabled, form, FormField, requiredError, validate } from '@angular/forms/signals';
import { MatInput } from '@angular/material/input';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-todo-create-item',
  imports: [MatInput, FormField, Button],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.scss',
})
export class TodoCreateItem {
  public readonly isSubmitting = input(false);
  public readonly createTask = output<CreateTaskData>();

  protected readonly formValue = signal<CreateTaskData>({
    name: '',
    description: '',
  });

  protected readonly taskForm = form(this.formValue, (path) => {
    disabled(path.name, { when: () => this.isSubmitting() });
    disabled(path.description, { when: () => this.isSubmitting() });
    validate(path.name, ({ value }) => {
      if (value().trim().length === 0) {
        return requiredError();
      }

      return null;
    });
  });

  public reset(): void {
    this.taskForm().reset({
      name: '',
      description: '',
    });
  }

  protected submit(event: Event): void {
    event.preventDefault();

    if (this.isSubmitting() || this.taskForm().invalid()) {
      return;
    }

    const { name, description } = this.formValue();

    this.createTask.emit({
      name: name.trim(),
      description: description.trim(),
    });
  }
}
