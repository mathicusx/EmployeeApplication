import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
   
    constructor(private httpService: HttpClient) {}
    
     // GET API EXAMPLE localhost/3333/api
    get apiUrl(): string {
        return environment.apiServer;
    }
   
    // get API ENDPOINT EXAMPLE /localhost/3333/api/user (user is the endpoint)
    apiEndpoint(endpoint: string): string {
        return `${this.apiUrl}/${endpoint}`;
    }
   
    // USER API REQUESTS

    loginRequest(email: string, password: string): Observable<any>{
        const url = this.apiEndpoint('auth/login');

        return  this.httpService.post<any>(url, {
            email, password
        },{observe: 'response'});
    }

    
}
