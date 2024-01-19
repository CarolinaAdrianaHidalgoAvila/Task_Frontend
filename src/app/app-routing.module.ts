import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  {path: 'status', loadChildren: () => import('./status/status.module').then(m => m.StatusModule) },
  {path: '*', redirectTo: 'tasks'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }