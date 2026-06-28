import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[app-todo-list-item]',
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
})
export class TodoListItem {
  public readonly task = input.required<Task>();
  public readonly removeTask = output<number>();
}
