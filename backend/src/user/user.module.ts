import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../database/models/userModel'

@Module({
    imports: [SequelizeModule.forFeature([User])]
})
export class UserModule {}
