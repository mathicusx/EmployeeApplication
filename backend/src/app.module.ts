import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { EmployeeModule } from './modules/employee/employee.module';
import { UserModule } from './modules/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';


dotenv.config({
})
@Module({
  imports: [
    DatabaseModule,
     UserModule,
     AuthModule,
     EmployeeModule,
     ConfigModule.forRoot({ isGlobal: true}),
  ],
})
export class AppModule {}
