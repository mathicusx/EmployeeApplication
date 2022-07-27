import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
   
    private formatErrors(error: any) {
        return  throwError(() => error.error);
      }

    constructor(private http: HttpClient) {}
    
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

        return  this.http.post<any>(url, {
            email, password
        },{observe: 'response'});
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
          `${environment.apiServer}${path}`,
          JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
      }

    // EMPLOYEE API REQUESTS

    
}
