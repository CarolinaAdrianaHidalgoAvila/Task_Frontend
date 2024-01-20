import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class EditCategoryService {

  private categoryOpened = new Subject<Category>();
  categoryToEdit$ = this.categoryOpened.asObservable();

  openCategoryToEdit(category: Category) {
    this.categoryOpened.next(category);
  }
}
