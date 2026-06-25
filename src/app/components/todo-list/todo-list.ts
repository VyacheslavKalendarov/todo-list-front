import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoListItem } from '../todo-list-item/todo-list-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  imports: [TodoListItem],
})
export class TodoList {
  public readonly taskList = input.required<Task[]>();
  protected readonly removeTaskEvent = output<number>();
}
