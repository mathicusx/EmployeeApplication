import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import {EmployeesFormComponent} from './employees-form/employees-form.component';
import { EmployeesComponent } from './employees.component';
import { EmployeesInfoComponent } from './employees-info/employees-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeesInfoComponent,
    EmployeesListComponent,
    EmployeesFormComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeesModule { }
