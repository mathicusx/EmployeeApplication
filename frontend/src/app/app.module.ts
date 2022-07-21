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
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EmployeesModule } from './employees/employees.module';
import { TokensInterceptor } from './_helpers/tokens.interceptor';

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
    EmployeesModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokensInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
