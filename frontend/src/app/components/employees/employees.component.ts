import { Component, OnInit} from '@angular/core';

import { Employee } from 'src/app/models/employee.model';

import { EMPLOYEES } from 'src/app/models/mock-employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees = EMPLOYEES;

  selectedEmployee!: Employee;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee
  }

}
