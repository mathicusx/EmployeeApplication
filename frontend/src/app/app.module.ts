import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component'
import { EmployeesInfoComponent } from './components/employees/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/employees/employees-form/employees-form.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeesInfoComponent,
    EmployeesFormComponent,
    EmployeesListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
