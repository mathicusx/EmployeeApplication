import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity as User} from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { USERS_REPOSITORY } from 'src/core/constants';
import { ConfigService } from '@nestjs/config';
import { LoginUserRequestDto } from './dto/loginUserRequest.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDto } from './dto/loginUserResponse.dto';



 @Injectable()
 export class UserService {
  private readonly jwtPrivateKey: string;
  private readonly refreshJwtPrivateKey: string;
   constructor(
    @Inject(USERS_REPOSITORY)
     private readonly usersRepository: typeof User,
     private readonly configService: ConfigService,
     private readonly jwtService: JwtService
  ) {
    this.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    this.refreshJwtPrivateKey = process.env.REFRESH_JWT_PRIVATE_KEY;
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

  async register( createUserDto:CreateUserDto ){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

      const user = await this.usersRepository.create({
        email: createUserDto.email,
        password: hashedPassword,
      }).catch(
        (err) => {
          if(err) {
            throw new HttpException(
                    `Employee with this value '${err.errors[0].value}' already exists`,
                    HttpStatus.CONFLICT
               );
          }
          return user;
        }
      )

      const tokens = await this.signToken(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refreshToken);

      return tokens;
  
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

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string){
  const user = await this.usersRepository.findByPk<User>(id);
  if(user.hashedRefreshToken !== null){
    user.hashedRefreshToken = null
  }
   return await user.save();
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    return await user.destroy();
  }

  async signToken(id: string, email: string): Promise<UserLoginResponseDto> {
    const[accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
        id: id,
        email: email,
        },
        {
        secret: process.env.JWT_PRIVATE_KEY,
        expiresIn: process.env.TOKEN_EXPIRATION,
        }),
      this.jwtService.signAsync({
        id: id,
        email: email,
      },
      {
        secret: process.env.REFRESH_JWT_PRIVATE_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    }

  async updateRtHash (id: string, refreshToken: string){
    const hash = await bcrypt.hash(refreshToken, 10);
    const user = await this.usersRepository.findByPk<User>(id)
    user.hashedRefreshToken = hash;
    await user.save();
  }

  async refreshTokens(id: string){
    const user = await this.usersRepository.findByPk<User>(id);
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

     const refreshTokenMatches = bcrypt.compare(tokens.refreshToken, user.hashedRefreshToken);
    if(!refreshTokenMatches){
      throw new HttpException('Credentials does not match', HttpStatus.BAD_REQUEST);
    }
  
    return tokens;
  }
  }
