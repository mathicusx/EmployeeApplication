import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesFormComponent} from './employees/employees-form/employees-form.component';
import { EmployeesInfoComponent } from './employees/employees-info/employees-info.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './_component/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'login', component: LoginComponent},  
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: EmployeesFormComponent},
  {path: 'employees:/id', component: EmployeesInfoComponent},
  {path: 'employees/list', component: EmployeesListComponent},
  
  // if any other route redirect to home
  { path: '**', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
