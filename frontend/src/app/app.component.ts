import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User | null;

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authService.user.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.onLogout();
    this.router.navigate(['/login']);
  }
}
