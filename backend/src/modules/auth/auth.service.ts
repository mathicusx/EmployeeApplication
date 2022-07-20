import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login-dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "./jwt-payload";
import { TokenService } from "./token.service";


@Injectable()
export class AuthService{

    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ){}

    async login(credentials: LoginDto): Promise<LoginResponseDto>{
        const loginResults = await this.userService.login(credentials);

        if(!loginResults){
            return null;
        };

        const payload: JwtPayload = {
            sub: loginResults.id,
        };

        const loginResponse: LoginResponseDto = await this.tokenService.createAccessToken(
            payload
        );

        // save user's refresh token

        const tokenContent = { userId: loginResults.id }

        const refresh = await this.tokenService.createRefreshToken(tokenContent);

        loginResponse.refreshToken = refresh;

        return loginResponse;
    }

    async logout(userId: string, refreshToken: string): Promise<any>{
        await this.tokenService.deleteRefreshToken(userId, refreshToken);
    }

    async logoutFromAll(userId: string): Promise<any>{
        await this.tokenService.deleteRefreshTokenForUser(userId);
    }
}