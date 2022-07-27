import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './_component/alerts.component';
import { LoginComponent } from './_component/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EmployeesModule } from './employees/employees.module';
import { TokensInterceptor } from './_helpers/tokens.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    NavMenuComponent,
    AppComponent,
    HomeComponent,
    AlertsComponent,
    LoginComponent,
    NavMenuComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EmployeesModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokensInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
