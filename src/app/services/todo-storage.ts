import { inject, Service, signal } from '@angular/core';
import { CreateTaskData, Task, TaskStatus } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class TodoStorage {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tasks';

  private readonly _tasks = signal<Task[]>([]);

  public readonly tasks = this._tasks.asReadonly();

  public loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(tap((tasks) => this._tasks.set(tasks)));
  }

  public addTask(data: CreateTaskData): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, {
        ...data,
        status: TaskStatus.InProgress,
      })
      .pipe(
        tap((createdTask) => {
          this._tasks.update((tasks) => [...tasks, createdTask]);
        }),
      );
  }

  public removeTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${encodeURIComponent(id)}`).pipe(
      tap(() => {
        this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
      }),
    );
  }

  public updateTask(id: string, newName: string): Observable<Task> {
    return this.http
      .patch<Task>(`${this.apiUrl}/${encodeURIComponent(id)}`, {
        name: newName,
      })
      .pipe(
        tap((updatedTask) => {
          this._tasks.update((tasks) =>
            tasks.map((task) => (task.id === id ? { ...task, name: updatedTask.name } : task)),
          );
        }),
      );
  }
  public updateTaskStatus(id: string, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${encodeURIComponent(id)}`, { status }).pipe(
      tap((updatedTask) => {
        this._tasks.update((tasks) =>
          tasks.map((task) => (task.id === id ? { ...task, status: updatedTask.status } : task)),
        );
      }),
    );
  }
}
