import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from '../database/models/employeeModel';



@Module({
    imports: [SequelizeModule.forFeature([Employee])]
})
export class EmployeeModule {}
