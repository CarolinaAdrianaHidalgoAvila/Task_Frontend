import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Status } from 'src/app/shared/models/task.model';
import { BehaviorSubject, Observable, catchError, first, of, tap, throwError } from 'rxjs';

@Injectable()
export class StatusService {
  private url = 'http://localhost:8080/states';
  private statusCache = new BehaviorSubject<Status[]>([]);
  statusList$ = this.statusCache.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAll()
      .pipe(first())
      .subscribe((status) => {
        this.statusCache.next(status);
      });
  }

  private getAll(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(this.url)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([])
        })
      );
  }

  getOne(statusUuid: string): Observable<Status> {
    return this.httpClient.get<Status>(`${this.url}/${statusUuid}`);
  }

  save(status: Status) {
    return this.httpClient.post<Status>(this.url, status)
      .pipe(
        tap((statusSaved) => this.statusCache.next([...this.statusCache.value, statusSaved])),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'statusSave'}))
        })
      );
  }

  edit(status: Status): Observable<Status> {
    return this.httpClient.put<Status>(this.url, status)
      .pipe(
        tap((statusSaved) => {
          const statuss = this.statusCache.value;
          const index = statuss.findIndex(status => status.uuid === statusSaved.uuid);
          if (index >= 0) {
            statuss[index] = statusSaved;
          }
          this.statusCache.next(statuss);
        }),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'statusSave'}))
        })
      );
  }

  delete(statusUuid: string) {
    return this.httpClient.delete<Status>(`${this.url}/${statusUuid}`);
  }
}
