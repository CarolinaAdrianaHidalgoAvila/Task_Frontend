import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Status} from 'src/app/shared/models/task.model';
import { EditStatusService } from '../services/edit-status.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit{
  @Output() saveStatus = new EventEmitter<Status>();

  formGroup = new FormGroup({
    uuid: new FormControl<string | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(2000), Validators.minLength(3)]),
  });

  get nameErrors(): ValidationErrors | null {
    return this.formGroup.controls.name.errors;
  }

  get descriptioErrors(): ValidationErrors | null {
    return this.formGroup.controls.description.errors;
  }

  constructor(private editStatusService: EditStatusService) {

  }

  ngOnInit(): void {
    this.formGroup.controls.name.valueChanges.subscribe((value) => {console.log(value)})
    this.formGroup.controls.description.valueChanges.subscribe((value) => {console.log(value)})

    this.editStatusService.statusToEdit$.subscribe((status) => {
      this.formGroup.patchValue(status);
    });
  }

  save() {
    console.log('saving on status form')
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }

    const statusFormValue = this.formGroup.value;
    this.saveStatus.emit(statusFormValue as Status);
  }

}
