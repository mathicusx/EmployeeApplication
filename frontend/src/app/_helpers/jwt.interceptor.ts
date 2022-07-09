import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";
import { environment } from "src/environments/environment";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // ADD AUTHORIZATION HEADER WITH JWT TOKEN and check if apiurl matches url
        const user = this.authService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = req.url.startsWith(environment.apiServer);
        
        if(isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
       return next.handle(req);
    }
}