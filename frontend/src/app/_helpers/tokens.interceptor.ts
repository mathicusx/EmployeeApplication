import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, tap, switchMap, EMPTY, empty, delay} from "rxjs";
import { AuthService } from "../_services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class TokensInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.addAuthHeader(req)

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err);

                if(err.status=== 401 && this.refreshAccessToken){

                    // refresh access token if fails logout
                    return this.refreshAccessToken()
                    .pipe(
                        switchMap(() => {
                            req = this.addAuthHeader(req);
                            return next.handle(req);
                        }),
                        catchError((err: any) =>{
                            console.log(err)
                            this.authService.logout();
                            return empty();
                        })
                    )
                }else{
                    return throwError(() => err)
                }
            })
        ) as Observable<HttpEvent<any>>;
    }

    addAuthHeader(req: HttpRequest<any>){  

      
        const token = this.authService.getAccessToken();
        //console.log(token, 'NEW ACCESS TOKEN');
        if(token !== null) {
            return req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            })
        }else{

        }
        return req;
    }

    refreshAccessToken(): Observable<any>{
       return this.authService.getNewAccessToken().pipe(
            tap(() => {
                return console.log('Access Token Refreshed!');
            })
        )
    }
   

}