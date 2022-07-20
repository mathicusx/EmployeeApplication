import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../auth/dto/login-dto';
import { UserDto } from './dto/user.dto';
import { UserEntity as User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<UserDto[]>{
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id')id: number): Promise<UserDto>{
    return this.userService.findOne(id);
  }

  @Post('register')
  async register(@Body() loginDto: LoginDto): Promise<User> {
    const { email } = loginDto;

    let exist;
    try {
      exist = await this.userService.findUserByEmail(email);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'error while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (exist) {
      throw new HttpException(
        'email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.register(loginDto);

    return newUser;
  }
}
