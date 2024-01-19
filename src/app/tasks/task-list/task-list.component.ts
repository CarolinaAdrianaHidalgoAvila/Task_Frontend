import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Observable, filter, forkJoin, map, of } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList$: Observable<Task[]> = of([]);
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskList$ = this.taskService.taskList$;
  }

  onSaveTask(task: Task) {
    console.log('onSaveTask')

    if (task.uuid) {
      this.taskService.edit(task).subscribe((task) => {
        console.log('Task updated', task);
      });
    } else {
      this.taskService.save(task).subscribe((tasl) => {
        console.log('Task created', task);
      });
    }
  }

}
