import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { UserService } from "../user/user.service";
import { LoginUserDto } from "../user/dto/loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/payload.interface";
import { RegistrationStatus } from "./interfaces/registration.status.interface";
import { LoginStatus } from "./interfaces/login.status.interface";
import { UserDto } from "../user/dto/user.dto";

@Injectable()
export class AuthService {
 
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus>{
    let status: RegistrationStatus = {
      success: true,
      message: 'user succesfully registered',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user 
    const user = await this.userService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username, ...token
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if(!user) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn: process.env.TOKEN_EXPIRATION,
      accessToken
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UserDto } from '../user/dto/user.dto';

// import { UserService } from '../user/user.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, pass: string) {
//     // find user with given email
//     const user = await this.userService.findOneByEmail(email);
//     console.log(email);
//     if (!user) {
//       return null;
//     }
//     // find if user password matches
//     console.log(email, 'this is the email console.log');
//     const match = await this.comparePassword(pass, user.password);
//     if (!match) {
//       return null;
//     }
//     const { password, ...result } = user['dataValues'];
//     return  {user: result};
//   }

//   public async login(user: UserDto) {
//     const token = await this.generateToken(user);
//     console.log('token is >>', token);
//     console.log(' this is user', user);
//     return {user, token};
//   }

//   public async create(user: UserDto) {
//     // hash PW
//     const pass = await this.hashedPassword(user.password);

//     // create user
//     const newUser = await this.userService.create({ ...user, password: pass });

//     const { password, ...result } = newUser['dataValues'];

//     // generate Token
//     const token = await this.generateToken(result);

//     // return user and token
//     return { user: result, token };
//   }

//   private async comparePassword(enteredPassword: string, dbPassword: string) {
//     const match = await bcrypt.compare(enteredPassword, dbPassword);
//     console.log(match)
//     return match;
//   }

//   private async generateToken(user) {
//     const token = await this.jwtService.signAsync(user);
//     console.log(user);
//     console.log(token);
//     return token;
//   }

//   private async hashedPassword(password: string) {
//     const hash = await bcrypt.hash(password, 10);
//     return hash;
//   }
// }
