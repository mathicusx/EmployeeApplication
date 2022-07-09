import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService: AuthService
        ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const user = this.authService.userValue;
        if(user?.token) {
            // user is authorized so we return true
            return true;
        }
        
        // redirect to login page 
        this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
        return false;
    }
}
