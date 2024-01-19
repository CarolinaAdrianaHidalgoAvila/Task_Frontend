import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from 'src/app/shared/models/task.model';
import { BehaviorSubject, Observable, catchError, first, of, tap, throwError } from 'rxjs';

@Injectable()
export class TaskService {

  private url = 'http://localhost:8080/tasks';
  private taskCache = new BehaviorSubject<Task[]>([]);
  taskList$ = this.taskCache.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAll()
      .pipe(first())
      .subscribe((tasks) => {
        this.taskCache.next(tasks);
      });
  }

  private getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([])
        })
      );
  }

  getOne(taskUuid: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${taskUuid}`);
  }

  save(task: Task) {
    return this.httpClient.post<Task>(this.url, task)
      .pipe(
        tap((taskSaved) => this.taskCache.next([...this.taskCache.value, taskSaved])),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'taskSave'}))
        })
      );
  }

  edit(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.url, task)
      .pipe(
        tap((taskSaved) => {
          const tasks = this.taskCache.value;
          const index = tasks.findIndex(task => task.uuid === taskSaved.uuid);
          if (index >= 0) {
            tasks[index] = taskSaved;
          }
          this.taskCache.next(tasks);
        }),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'taskSave'}))
        })
      );
  }

  delete(taskUuid: string) {
    return this.httpClient.delete<Task>(`${this.url}/${taskUuid}`);
  }
}
