import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity as User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto/createUser.dto';
import { USERS_REPOSITORY } from 'src/core/constants';
import { ConfigService } from '@nestjs/config';
import {UserLoginResponseDto } from './dto/loginUserResponse.dto';
import { JwtPayload } from './auth/jwt.payload.model';
import { LoginUserRequestDto } from './dto/loginUserRequest.dto';



 @Injectable()
 export class UserService {
  private readonly jwtPrivateKey: string;
   constructor(
    @Inject(USERS_REPOSITORY)
     private readonly usersRepository: typeof User,
     private readonly configService: ConfigService
  ) {
    this.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
  }
  
  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map(user => new UserDto(user));
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return new UserDto(user);
  }

  async getUserByEmail(email: string){
    return await this.usersRepository.findOne<User>({
      where: { email }
    });
  }

  async create(createUserDto:CreateUserDto){
    try {
      const user = new User();
      user.email = createUserDto.email;
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(createUserDto.password, salt);

      const userData = await user.save();

      // auto login on register by returning a token
      const token = await this.signToken(userData);

      return new UserLoginResponseDto(userData, token)
    } catch (err) {
      if(err.original.constraint === 'user_email_key'){
        throw new HttpException(
          `User with Email '${err.errors[0].value}' already exists`,
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserRequestDto:LoginUserRequestDto){
    const email = loginUserRequestDto.email;
    const password = loginUserRequestDto.password;

    const user = await this.getUserByEmail(email)
    if(!user){
      throw new HttpException(
        'Wrong Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
      throw new HttpException(
        'Wrong Password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    await user.destroy();
    return new UserDto(user);
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email
    };
    return sign(payload, this.jwtPrivateKey, {});
    }
  }
