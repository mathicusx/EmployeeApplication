import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { DatabaseModule } from 'src/core/database/database.module';


@Module({
    imports: [DatabaseModule],
        providers:[UserService,
             ...usersProviders],
    exports: [UserService],
    controllers: [UsersController],
})
export class UserModule {}
