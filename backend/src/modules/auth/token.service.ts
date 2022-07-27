import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { sign, verify, SignOptions} from 'jsonwebtoken'
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
//import {uuid} from 'uuid'

import { REFRESH_TOKENS_REPOSITORY } from "src/core/constants";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "./jwt-payload";
import { RefreshToken } from "./refresh.token.entity";
import { randomBytes } from "crypto";

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;
    private refreshTokenTtl: number;
    private expiresInDefault: string | number;

    private readonly usersExpired: number[] = [];

   constructor(
    @Inject(REFRESH_TOKENS_REPOSITORY)
    private readonly refreshTokensRepository: typeof RefreshToken
   ){
    this.expiresInDefault= this.JWT.AccessTokenTtl;
    this.jwtOptions = {expiresIn: this.expiresInDefault};
    this.jwtKey = this.JWT.Key;
    this.refreshTokenTtl = this.JWT.RefreshTokenTtl;
   }

    async getAccessTokenFromRefreshToken(
        refreshToken: string,
        oldAccessToken: string,   
    ): Promise<LoginResponseDto>{
        try {   
           
           const token = await this.refreshTokensRepository.findOne({where: {value: refreshToken}})


           const currentDate = new Date();
           if(!token){

            throw new HttpException('Refresh Token not found', HttpStatus.NOT_FOUND)
           }
           if(token.expiresAt < currentDate){

            throw new HttpException('Refresh Token Expired', HttpStatus.CONFLICT);
            
           }
           // refresh token is valid
           // generate access token
           const oldPayload = await this.validateToken(oldAccessToken, true);
           const payload = {
            sub: oldPayload.sub,
           };
           const accessToken = await this.createAccessToken(payload);
           // remove old refresh token and generate a new one
           await this.refreshTokensRepository.destroy({where: {id: token.id}});

           accessToken.refreshToken = await this.createRefreshToken({
            userId: oldPayload.sub
           });
         
           return accessToken;

        } catch (error) {
            this.logger.error(error);
            throw error
        }
    }

    async createAccessToken(payload: JwtPayload, expires =this.expiresInDefault,): Promise<LoginResponseDto> {
        // if expires is negative that means token should not expire
        const options = this.jwtOptions;
        expires > 0 ? (options.expiresIn = expires): delete options.expiresIn;

        //generate unique id for this token
        options.jwtid = uuidv4();
        const signPayload = sign(payload, this.jwtKey, options);
        const token: LoginResponseDto = {
            accessToken: signPayload,
            expiresIn: expires,
        };
        return token;
    }

    async createRefreshToken(tokenContent: {userId: string}): Promise<any> {
        const { userId } = tokenContent;

        const token = new RefreshToken();

        const refreshToken = randomBytes(64).toString('hex');
        
        token.userId = userId;
        token.value = refreshToken;
        token.expiresAt = moment().add(this.refreshTokenTtl, 'd').toDate();
        token.save();

        return refreshToken;
    }

    // remove all refresh tokens associated with user

    async deleteRefreshTokenForUser(userId: string){
        await this.refreshTokensRepository.destroy({ where: {value: userId} });
        await this.revokeTokenForUser(userId);
    }

    // remove a refresh token, and invalidate all access token associated with user
    async deleteRefreshToken(userId: string, value: string){

        await this.refreshTokensRepository.destroy({where: {value: userId}});
        await this.revokeTokenForUser(userId);
    }

    async decodeAndValidateJWT(token: string): Promise<any>{
        if(token){
            try {
                const payload = await this.validateToken(token);
                return await this.validatePayload(payload);
            } catch (error) {
                return null;
            }
        }
    }

    async validatePayload(payload: JwtPayload): Promise<any>{
        const tokenBlacklisted = await this.isBlackListed(payload.sub, payload.exp);
        if(!tokenBlacklisted){
            return { id: payload.sub };
        };
        return null
    }
  
    private async validateToken(token: string, ignoreExpiration = false): Promise<JwtPayload> {
        return verify(token, this.JWT.Key, {
            ignoreExpiration,
        }) as JwtPayload
    }

    private async isBlackListed(id: string, expire: number){
        return this.usersExpired[id] && expire < this.usersExpired[id];
    }

    private async revokeTokenForUser(userId: string): Promise<any> {
        this.usersExpired[userId] = moment().add(this.expiresInDefault, 's').unix();
    }

    get JWT() {
     return {
       Key: process.env.JWT_PRIVATE_KEY,
       AccessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 10, // 5m
       RefreshTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 10, // 30 Days
     };
     
 }
    
}