import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Employee } from 'src/app/models/employee.model';
import { Company } from 'src/app/models/company.model';


@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent{
  submitted= false;

  
  model = new Employee();

  onSubmit() {
    this.submitted = true;
  }

  newEmployee() {
    this.model
  }
}
