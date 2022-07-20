import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
import { AlertsService } from '../_services/alerts.service';

const jwtHelper = new JwtHelperService();
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private alert: AlertsService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (user && !jwtHelper.isTokenExpired(user.accessToken)) {
      // check if we have user token.
      // if we have user token that means user is authorized so we return true;
      return true;
    }
    const isRefreshSuccess = await this.refreshingTokens(user?.accessToken!);
    if (!isRefreshSuccess) {
      this.router.navigate(['/login']);
    }
  
    return isRefreshSuccess;

    
  }
  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshTokens = this.authService.userValue;
    
    if (!refreshTokens?.accessToken || !refreshTokens?.refreshToken) {
      return false;
    }
   
    let isRefreshSuccess: boolean = false;
    try {
      const res = await lastValueFrom(
        this.http.get(
          environment.apiServer +
            `/auth/access_token?grant_type=refresh_token&refresh_token=${refreshTokens.refreshToken}`
        )
      );
      const accessToken = (<any>res).accessToken;
      const refreshToken = (<any>res).refreshToken;
      const expiresIn = (<any>res).expiresIn;

      const value = { accessToken, expiresIn, refreshToken };
        
      localStorage.setItem('user', JSON.stringify(value));
      location.reload()
      this.alert.success('succesfully refreshed token');
      
      isRefreshSuccess = true;

    } catch (ex) {
      isRefreshSuccess = false;
    }
    
    return isRefreshSuccess;
  }
}
