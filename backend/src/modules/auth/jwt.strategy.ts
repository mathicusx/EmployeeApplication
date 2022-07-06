import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "../user/user.service";

import * as dotenv from 'dotenv';


dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY,
        });
    }

    async validate(payload: any) {
        // check if user in token actually exists
        const user = await this.userService.findOneById(payload.id);

        if(!user){
            throw new UnauthorizedException('Unauthorized');
        }
        return payload;
    }
}