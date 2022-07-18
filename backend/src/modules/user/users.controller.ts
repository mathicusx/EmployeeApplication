import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { LoginDto } from './auth/dto/login-dto';
import { UserEntity as User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

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
