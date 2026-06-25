import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
})
export class TodoListItem {
  public readonly task = input.required<Task>();
  protected readonly removeTaskEvent = output<number>();
}
