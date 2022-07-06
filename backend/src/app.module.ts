import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { UserModule } from './modules/user/user.module';

import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';


dotenv.config({
})
@Module({
  imports: [
    DatabaseModule,
     AuthModule,
     UserModule,
     EmployeeModule,
     CompanyModule,
     ConfigModule.forRoot({ isGlobal: true}),
  ],
})
export class AppModule {}
