import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { GrantType } from './dto/grant-types.dto';
import { NotFoundError } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { User } from 'src/shared/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
    const loginResults = await this.authService.login(credentials);

    if (!loginResults) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    return loginResults;
  }

  @Get('access_token')
  async token(
    @Req() req,
    @Query('grant_type') grantType: GrantType,
    @Query('refresh_token') refreshToken?: string,
  ): Promise<LoginResponseDto> {
    let res: LoginResponseDto;

    switch (grantType) {
      case GrantType.RefreshToken:
        try {
          const oldAccessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
          
          res = await this.tokenService.getAccessTokenFromRefreshToken(
            refreshToken,
            oldAccessToken,
           
          );
        } catch (error) {
          if (error instanceof NotFoundError) {
            throw new HttpException('invalid_grant catch', HttpStatus.BAD_REQUEST);
          }
          throw new InternalServerErrorException('invalid_grant');
        }
        return res;

      default:
       
        throw new HttpException('invalid_grant default', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('logout')
  @HttpCode(200)
  async logout(
    @User('id') userId,
    @Query('refresh_token') refreshToken?: string,
    @Query('from_all') fromAll?: false,
  ): Promise<any> {
    if (fromAll) {
      await this.authService.logoutFromAll(userId);
    } else {
      if (!refreshToken) {
        throw new HttpException(
          'no refresh token found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.authService.logout(refreshToken, userId);
    }
    return { message: 'ok' };
  }
}
