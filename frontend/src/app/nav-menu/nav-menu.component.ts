import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from '../_services/alerts.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public isExpanded = false;
  public loading = false;
 
  constructor(
    private alert: AlertsService,
    private authService: AuthService,
    ) { }
  ngOnInit(): void {
  
  }
  collapse(){
    this.isExpanded = false
  }

  toggle(){
    this.isExpanded = !this.isExpanded
  }

  isUserAuthenticated() {
    
    const token = this.authService.getAccessToken()
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.authService.logout();
    this.alert.success('You have Logged out');
  }

}
