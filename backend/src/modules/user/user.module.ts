import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { DatabaseModule } from 'src/core/database/database.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RtJwtStrategy } from './auth/rtJwt.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [DatabaseModule,
    JwtModule.register({})],
    providers:[UserService, ...usersProviders, JwtStrategy, RtJwtStrategy],
    exports: [UserService],
    controllers: [UsersController],
})
export class UserModule {}
