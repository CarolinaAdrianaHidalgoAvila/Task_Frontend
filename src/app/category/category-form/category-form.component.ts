import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category} from 'src/app/shared/models/task.model';
import { EditCategoryService } from '../services/edit-category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Output() saveCategory = new EventEmitter<Category>();

  formGroup = new FormGroup({
    uuid: new FormControl<string | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(2000), Validators.minLength(3)])
  });

  get nameErrors(): ValidationErrors | null {
    return this.formGroup.controls.name.errors;
  }

  get descriptioErrors(): ValidationErrors | null {
    return this.formGroup.controls.description.errors;
  }

  constructor(private editCategoryService: EditCategoryService) {

  }

  ngOnInit(): void {
    this.formGroup.controls.name.valueChanges.subscribe((value) => {console.log(value)})
    this.formGroup.controls.description.valueChanges.subscribe((value) => {console.log(value)})

    this.editCategoryService.categoryToEdit$.subscribe((category) => {
      this.formGroup.patchValue(category);
    });
  }

  save() {
    console.log('saving on category form')
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }

    const categoryFormValue = this.formGroup.value;
    this.saveCategory.emit(categoryFormValue as Category);
  }

}
