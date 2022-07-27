import { Module } from '@nestjs/common';

import { employeeProviders } from './employee.providers';
import { EmployeesService } from './employee.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EmployeesController } from './employee.controller';

import { companiesProviders } from './company/company.providers';

@Module({
  imports: [DatabaseModule,],
  controllers: [EmployeesController],
  providers: [ EmployeesService, ...employeeProviders, ...companiesProviders],
  exports: [],
})
export class EmployeeModule {}
