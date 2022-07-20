import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component'
import { EmployeesInfoComponent } from './employees/employees-info/employees-info.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './_component/alerts.component';
import { LoginComponent } from './_component/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthGuard } from './_helpers/auth.guard';

@NgModule({
  declarations: [
    NavMenuComponent,
    AppComponent,
    EmployeesComponent,
    EmployeesInfoComponent,
    EmployeesFormComponent,
    EmployeesListComponent,
    HomeComponent,
    AlertsComponent,
    LoginComponent,
    NavMenuComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
