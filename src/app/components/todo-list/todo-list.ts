import { Component, input, OnInit, output, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoListItem } from '../todo-list-item/todo-list-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  imports: [TodoListItem],
})
export class TodoList implements OnInit {
  public readonly taskList = input.required<Task[]>();
  public readonly removeTask = output<number>();
  protected isLoading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  }
}
