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

