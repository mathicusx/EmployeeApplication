import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../jwt-payload";
import { TokenService } from "../token.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly tokenService: TokenService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromUrlQueryParameter('access_token'),
            ]),
            secretOrKey: process.env.JWT_PRIVATE_KEY,
            passReqToCallBack: true,
        })
    }
    async validate (payload: JwtPayload){
        const result = await this.tokenService.validatePayload(payload);
        if(!result){
            throw new UnauthorizedException();
        }
        return result
    }
}