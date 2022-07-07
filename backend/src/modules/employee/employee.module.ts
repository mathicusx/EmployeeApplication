import { Module } from '@nestjs/common';

import { employeeProviders } from './employee.providers';
import { EmployeesService } from './employee.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EmployeesController } from './employee.controller';



@Module({
    imports: [DatabaseModule],
    controllers: [EmployeesController],
    providers: [EmployeesService, ...employeeProviders],
    exports: []
})
export class EmployeeModule {}
