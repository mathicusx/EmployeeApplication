import { Module } from '@nestjs/common';

import { employeeProviders } from './employee.providers';
import { EmployeesService } from './employee.service';
import { DatabaseModule } from 'src/core/database/database.module';



@Module({
    imports: [DatabaseModule],
    providers: [EmployeesService, ...employeeProviders],
    exports: [EmployeesService]
})
export class EmployeeModule {}
