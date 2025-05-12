import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserDetailComponent } from './pages/user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListUsersComponent, 
    UserDetailComponent, 
    ReactiveFormsModule 
  ]
})
export class UsersModule { }
