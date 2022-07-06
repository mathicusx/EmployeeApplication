import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dto/user.dto';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    // find user with given email
    const user = await this.userService.findOneByEmail(email);
    console.log(email);
    if (!user) {
      return null;
    }
    // find if user password matches
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: any) {
    console.log(user);
    const token = await this.generateToken(user);
    console.log(token);
    return { user, token };
  }

  public async create(user: UserDto) {
    // hash PW
    const pass = await this.hashedPassword(user.password);

    // create user
    const newUser = await this.userService.create({ ...user, password: pass });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // generate Token
    const token = await this.generateToken(result);

    // return user and token
    return { user: result, token };
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(user: string | object | Buffer) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
