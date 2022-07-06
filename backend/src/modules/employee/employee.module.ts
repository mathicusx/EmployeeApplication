import { Module } from '@nestjs/common';

import { employeeProviders } from './employee.providers';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';



@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService, ...employeeProviders],
    exports: [EmployeeService]
})
export class EmployeeModule {}
