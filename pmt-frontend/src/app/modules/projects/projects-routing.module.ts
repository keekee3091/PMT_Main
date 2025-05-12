import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

const routes: Routes = [
  { path: '', component: ListProjectsComponent },
  { path: 'create', component: CreateProjectComponent },
  { path: ':id', component: ProjectDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
