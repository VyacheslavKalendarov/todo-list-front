import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { Button } from '../../shared/ui/button/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[app-todo-list-item]',
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
  imports: [Button],
})
export class TodoListItem {
  public readonly task = input.required<Task>();
  public readonly removeTask = output<number>();
}
