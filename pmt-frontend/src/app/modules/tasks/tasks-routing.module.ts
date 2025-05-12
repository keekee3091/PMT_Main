import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

const routes: Routes = [
  { path: '', component: ListTasksComponent },
  { path: ':id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
