import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './_component/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'login', component: LoginComponent},  
  {path: 'employees', component: EmployeesComponent},
  
  // if any other route redirect to home
  { path: '**', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
