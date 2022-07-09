import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
    // CONNECT FRONTEND TO BACKEND
   

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
        const url = this.apiEndpoint('users/login');

        return  this.httpService.post<any>(url, {
            email, password
        });
    }

  

    // loginRequest(url: any, payload: any): Observable<any> {
    //     return this.httpService.post(`${this.baseUrl}${url}`, payload);
    // }

    // Get Employee Data 
    // getEmployees(url: any, payload: any): Observable<any> {
    //     const url = $
    //     return this.httpService.get(`${this.baseUrl}${url}`, payload);
    // }
    // // CREATE EMPLOYEE
    // createEmployee(url: any, data: any): Observable<any> {
    //     return this.httpService.post(`${this.baseUrl}${url}`, data);
    // }

    // // UPDATE EMPLOYEE
    // updateEmployee(data: any, url: any, id:any): Observable<any> {
    //     let ids = id;
    //     return this.httpService.get(`${this.baseUrl}${url}/${ids}`);
    // }

    // // REMOVE EMPLOYEE
    // removeEmployee(id: any, url: any): Observable<any> {
    //     let ids = id;
    //     return this.httpService.delete(`${this.baseUrl}${url}/${ids}`);
    // }

    // // GET EMPLOYEE BY ID 
    // getEmployee(id: any, url: any): Observable<any> {
    //     let ids = id;
    //     return this.httpService.get(`${this.baseUrl}${url}/${ids}`);
    // }

    
}
