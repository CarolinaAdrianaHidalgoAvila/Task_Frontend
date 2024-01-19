import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { TaskTableItemComponent } from './task-table-item/task-table-item.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { TasksRoutingModule } from './tasks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskTableComponent,
    TaskTableItemComponent,
    TaskFormComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskListComponent
  ],
  providers: [
    TaskService
  ]
})
export class TasksModule { }