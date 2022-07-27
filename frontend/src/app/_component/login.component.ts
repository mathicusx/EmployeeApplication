import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators'

import { AlertsService } from 'src/app/_services/alerts.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertsService: AlertsService
    
  ) {
    // if user already logged in redirect 
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertsService.clear()
    
    // if invalid form. stop
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authService.onLogin(this.f.email.value, this.f.password.value)   
    .pipe(first())
            .subscribe({
              next: () => {
                const returnUrl= this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                this.alertsService.error(error);
                this.loading = false;
              }
            })
               
  }
  
}
