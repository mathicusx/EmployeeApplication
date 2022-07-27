import { Injectable } from '@angular/core';
import {Observable, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(
    private http : HttpClient,
    private apiService: ApiService,
    private router: Router,
  ){}

  
  onLogin(email: string, password: string){
    return this.apiService.loginRequest(email, password)
    .pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res);
        this.setSession(res.body.accessToken, res.body.refreshToken)
        console.log(res);
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
        console.log(res);
         if(res.body.accessToken === null){
          return;
         }
          this.setAccessToken(res.body.accessToken);

          const accessToken = res.body.accessToken;
          const refreshToken = res.body.refreshToken;
          this.setSession(accessToken, refreshToken)
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
