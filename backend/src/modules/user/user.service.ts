import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { toUserDto } from './dto/toUser.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { USERS_REPOSITORY } from 'src/core/constants';


@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof UserEntity
  ) {}

 
  async findOne(options?: object): Promise<UserDto> {
    return await this.usersRepository.findOne(options);
  }
  
  async findOneByEmail({email}: any): Promise<UserDto> {
    return await this.findOne({ 
      where: { email } 
    });
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if(!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await comparePasswords(user.password, password)
    console.log(user.password,'this is user password');
    console.log(password, 'this is compared password');

    if(!areEqual){
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto>{
    return await this.findOne({
      where: { username }
    });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username} = userDto;

    // check if user exists
    const checkUserExists = await this.usersRepository.findOne({
      where: { username }
    });

    if(checkUserExists){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.usersRepository.create<UserEntity>(userDto);
    return toUserDto(user);
  }
}

async function comparePasswords(enteredPassword: string, userPassword: string) {
  const match = await bcrypt.compare(userPassword, enteredPassword);
     return match;
    }

