import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { USERS_REPOSITORY } from 'src/core/constants';
import { UserEntity as User } from './user.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { LoginDto } from '../auth/dto/login-dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: typeof User,
  ) {}
  async login(loginObject: LoginDto): Promise<User> {
    const { email, password } = loginObject;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return Promise.resolve(null);
    }

    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async register(loginDto: LoginDto): Promise<any> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(loginDto.password, salt)

      const user = await this.usersRepository.create({
        email: loginDto.email,
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
      );
      return loginDto;
   
  }

  protected async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }

  async userExists(id: string): Promise<User> {
    try {
      return this.usersRepository.findByPk(id);
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }
  async findUserByEmail(email: string){
    return this.usersRepository.findOne({where: {email}});
  }
  async getAll(){
    const users = await this.usersRepository.findAll<User>();
    return users.map(user => new UserDto(user));
  }
  async findOne(id: number){
    const user = await this.usersRepository.findByPk(id);
    if(!user) {
      throw new HttpException('User was not Found', HttpStatus.NOT_FOUND)
    }
    return new UserDto(user);
  }
}
