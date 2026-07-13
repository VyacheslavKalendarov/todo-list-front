import { Component, input, model, OnInit, output, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { Tooltip } from '../../directives/tooltip';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  imports: [TodoListItem, Tooltip],
})
export class TodoList implements OnInit {
  public readonly taskList = input.required<Task[]>();
  public readonly removeTask = output<number>();
  public selectedItemId = model<number | null>(null);
  protected isLoading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
