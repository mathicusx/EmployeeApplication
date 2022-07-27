import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/_services/alerts.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss'],
})
export class EmployeesFormComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = new FormGroup({
        name: new FormControl('', [
          Validators.minLength(3),
          Validators.required,
        ]),
        email: new FormControl('', [
          Validators.minLength(3),
          Validators.email,
          Validators.required,
        ]),
        address: new FormControl('', [
          Validators.minLength(3),
          Validators.required,
        ]),
      company: new FormGroup({
        companyName: new FormControl(' ', [
          Validators.minLength(3),
          Validators.required,
        ]),
        department: new FormControl(' ', [
          Validators.minLength(3),
          Validators.required,
        ]),
        position: new FormControl(' ', [
          Validators.minLength(3),
          Validators.required,
        ]),
        salary: new FormControl(' ', Validators.required),
      }),
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeService.create(this.employeeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.success('Form submitted succesfully');
        this.employeeForm.reset();
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.alertService.error(err);
      },
    });
  }
}
