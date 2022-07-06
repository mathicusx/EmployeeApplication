import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable, } from "@nestjs/common";


import * as dotenv from 'dotenv';
import { UserDto } from "../user/dto/user.dto";
import { JwtPayload } from "./interfaces/payload.interface";
import { AuthService } from "./auth.service";


dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        // check if user in token actually exists
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}