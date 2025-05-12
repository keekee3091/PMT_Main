import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from '../../../projects/pages/list-projects/list-projects.component';
import { ListTasksComponent } from '../../../tasks/pages/list-tasks/list-tasks.component'
import { ListUsersComponent } from '../../../users/pages/list-users/list-users.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProjectsComponent, ListTasksComponent, ListUsersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
