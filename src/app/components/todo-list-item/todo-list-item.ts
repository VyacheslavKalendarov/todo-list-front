import { Component, input, output } from '@angular/core';
import { Task } from '../todo/todo';

@Component({
  selector: 'app-todo-list-item',
  imports: [],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
})
export class TodoListItem {
  public readonly removeTaskEvent = output<number>();
  public taskList = input.required<Task[]>();

  protected removeTask(id: number) {
    this.removeTaskEvent.emit(id);
  }
}
