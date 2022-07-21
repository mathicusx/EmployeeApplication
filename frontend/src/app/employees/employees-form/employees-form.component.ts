import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee.model';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent{
  submitted= false;

  employeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    company: new FormGroup({
      name: new FormControl(' '),
      department: new FormControl(' '),
      position: new FormControl(' '),
      salary: new FormControl(' ')
    })
  });
  
  model = new Employee();

  onSubmit() {
    this.submitted = true;
  }

  newEmployee() {
    this.model
  }
}
