import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, defer, delay, filter, map, Observable, of, pipe, shareReplay, take, tap } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(
    private http : HttpClient,
    private router: Router,
    private apiService: ApiService,
  ){}

  
  onLogin(email: string, password: string){
    return this.apiService.loginRequest(email, password)
    .pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body.accessToken, res.body.refreshToken)
      })
    )
    
  }

  logout(){
    this.removeSession();
    this.router.navigate(['/login']);
  }

   getNewAccessToken(): Observable<any>{
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.get(`${environment.apiServer}/auth/access_token?refresh_token=${refreshToken}`,
    {
      headers: {
        'refreshToken': this.getRefreshToken()!,
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.body.accessToken);

          const accesToken = res.body.accessToken;
          const refreshToken = res.body.refreshToken;

          localStorage.setItem('accessToken', accesToken);
          localStorage.setItem('refreshToken', refreshToken);
      })
    )
   }
      

   setSession(accessToken: string, refreshToken: string){
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
   removeSession(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

   getAccessToken(){
    return localStorage.getItem('accessToken');
  }
   getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
   setAccessToken(accessToken: string){
    localStorage.setItem('accessToken', accessToken)
  }
   setRefreshToken(refreshToken: string){
    localStorage.setItem('refreshToken', refreshToken)
  }



}
