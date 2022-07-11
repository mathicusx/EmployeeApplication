import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { UserService } from "../user.service";
import { JwtPayload } from "./jwt.payload.model";
import { Request } from "express";

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_JWT_PRIVATE_KEY,
            passReqToCallback: true,
        });
    }
  async  validate(req:Request ,payload: any){
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return { ...payload, refreshToken};
    }
}