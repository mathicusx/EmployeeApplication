import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if([401, 403].includes(err.status) && this.authService.userValue) {

                //AUTO LOGOUT IF UNAUTHORIZED
                this.authService.onLogout();
            }
            
           const error = err.error?.message || err.statusText;
           console.log(error)
           return throwError(() => error);
        }))
    }
    
}