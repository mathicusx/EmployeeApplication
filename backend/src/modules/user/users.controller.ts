import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserRequestDto } from "./dto/loginUserRequest.dto";
import { UserLoginResponseDto } from "./dto/loginUserResponse.dto";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Post('register')
    register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserLoginResponseDto> {
        return this.userService.create(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserRequestDto: LoginUserRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.userService.login(loginUserRequestDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Promise<UserDto[]> {
        return this.userService.findAll()
    }

    @Get('id/:id')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Req() request): Promise<UserDto> {
        return this.userService.getUser(request.user.id);
    }

    @Delete('id/:id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Req() request): Promise<UserDto>{
        return this.userService.delete(request.user.id);
    }

}