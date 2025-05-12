import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';

@NgModule({
  declarations: [ListProjectsComponent],
  imports: [CommonModule],
  exports: [ListProjectsComponent] 
})
export class ProjectsModule { }
