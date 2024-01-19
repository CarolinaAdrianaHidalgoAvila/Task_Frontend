import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-table-item',
  templateUrl: './task-table-item.component.html',
  styleUrls: ['./task-table-item.component.scss']
})
export class TaskTableItemComponent {
  @Input() task: Task | null = null;

}
