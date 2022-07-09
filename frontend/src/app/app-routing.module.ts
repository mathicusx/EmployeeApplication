import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },  
  {path: 'login', component: LoginComponent},  
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  
  // if any other route redirect to home
  { path: '**', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
