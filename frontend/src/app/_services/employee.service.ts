import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, shareReplay, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../_models/employee.model";
import { AlertsService } from "./alerts.service";
import { ApiService } from "./api.service";


@Injectable({
    providedIn:'root'
})
export class EmployeeService{
    constructor(
        private alertService: AlertsService,
        private http: HttpClient
        ){}

    create(employee): Observable<Employee>{
        return this.http.post<Employee>(`${environment.apiServer}/employees/create`, employee)
        .pipe(catchError(this.errorHandler))
    }

    update(){}

    getOne(){}

    getAll(){}

    delete(){}

    errorHandler(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => errorMessage);
     }
}

