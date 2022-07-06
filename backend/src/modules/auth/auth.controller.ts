import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { DoesUserExist } from 'src/core/guards/doesUserExists';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { RegistrationStatus } from './interfaces/registration.status.interface';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { LoginStatus } from './interfaces/login.status.interface';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

   // @UseGuards(AuthGuard('local'))
   

   @Post('register')
    public async register(@Body() createUser: CreateUserDto): Promise<RegistrationStatus>{
        const result: RegistrationStatus = await this.authService.register(createUser)
        if (!result.success){
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUser: LoginUserDto): Promise<LoginStatus>{
        return await this.authService.login(loginUser);
    }
    

}
