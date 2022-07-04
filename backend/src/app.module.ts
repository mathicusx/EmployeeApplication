import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';

import { Employee } from './database/models/employeeModel';
import { User } from './database/models/userModel';

dotenv.config({
})
@Module({
  imports: [AuthModule,
     UserModule,
     EmployeeModule,
    SequelizeModule.forRoot({
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      models: [Employee, User]
    })],
})
export class AppModule {}
