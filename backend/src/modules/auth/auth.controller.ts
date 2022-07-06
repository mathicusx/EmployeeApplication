import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExists';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}

   // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        console.log(user)
        return await this.authService.create(user);
        
    }

}
