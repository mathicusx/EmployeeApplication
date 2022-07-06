import { CanActivate, ExecutionContext,
         Injectable, ForbiddenException 
       }
     from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/modules/user/user.service";

@Injectable() 
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UserService){}

    canActivate(context: ExecutionContext):
     boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request: { body: { email: string; }; }) {
        const userExist = await this.userService.findOneByEmail(request.body.email);
        if(userExist){
            throw new ForbiddenException('User with this Email Already Exists');
        }
        return true
    }
}