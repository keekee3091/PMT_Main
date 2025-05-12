import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';

import { ProjectsModule } from '../projects/projects.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProjectsModule,
    TasksModule,
    UsersModule
  ]
})
export class DashboardModule { }
