import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { EditTaskService } from '../services/edit-task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  @Input() taskList: Task[] | null = [];

  constructor(private editTaskService: EditTaskService) {


  }

  openTask(task: Task) {
    this.editTaskService.openTaskToEdit(task);
  }
}