import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class EditStatusService {

  private statusOpened = new Subject<Status>();
  statusToEdit$ = this.statusOpened.asObservable();

  openStatusToEdit(status: Status) {
    this.statusOpened.next(status);
  }
}
