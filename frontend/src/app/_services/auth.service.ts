import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private apiService: ApiService,
  ){
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null{
    if(this.userSubject.value?.token !== 'undefined')
    console.log(this.userSubject.value?.token);
      return this.userSubject.value;
    
    
  }

  onLogin(email: string, password: string){
    return this.apiService.loginRequest(email, password)
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      console.log(user.token);
      return user;
    }));
  }

  onLogout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

}
