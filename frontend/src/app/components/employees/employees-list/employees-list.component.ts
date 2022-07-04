import { Component, OnInit, Input } from '@angular/core';

import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  @Input() employee?: Employee
  constructor() { }

  ngOnInit(): void {
  }

}
