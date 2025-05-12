import { Routes } from '@angular/router';
import { FormUsersComponent } from './modules/users/pages/form-users/form-users.component';
import { HomeComponent } from './modules/dashboard/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: FormUsersComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: '**', redirectTo: '' } 
];
