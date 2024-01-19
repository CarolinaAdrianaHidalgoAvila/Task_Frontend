import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category, Status, Task } from 'src/app/shared/models/task.model';
import { EditTaskService } from '../services/edit-task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() saveTask = new EventEmitter<Task>();

  formGroup = new FormGroup({
    uuid: new FormControl<string | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(2000), Validators.minLength(3)]),
    categories: new FormControl<Category[]>([]),
    status: new FormControl<Status | null>(null)
  });

  get nameErrors(): ValidationErrors | null {
    return this.formGroup.controls.name.errors;
  }

  get descriptioErrors(): ValidationErrors | null {
    return this.formGroup.controls.description.errors;
  }

  constructor(private editTaskService: EditTaskService) {

  }

  ngOnInit(): void {
    this.formGroup.controls.name.valueChanges.subscribe((value) => {console.log(value)})
    this.formGroup.controls.description.valueChanges.subscribe((value) => {console.log(value)})

    this.editTaskService.taskToEdit$.subscribe((task) => {
      this.formGroup.patchValue(task);
    });
  }

  save() {
    console.log('saving on task form')
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }

    const taskFormValue = this.formGroup.value;
    this.saveTask.emit(taskFormValue as Task);
  }

}