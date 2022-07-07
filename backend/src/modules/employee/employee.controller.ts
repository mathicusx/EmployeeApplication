import { Controller, Get, Param, Post, Body, Put, UseGuards, Delete } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import { EmployeeDto } from "./dto/employee.dto";
import { EmployeesService } from "./employee.service";
import { Employee as EmployeeEntity } from "./employee.entity";
import { AuthGuard } from "@nestjs/passport";
import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<EmployeeDto[]> {
        return this.employeesService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: number): Promise<EmployeeDto> {
        return this.employeesService.findOne(id);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createEmployeeDto: CreateEmployeeDto,
        ): Promise<EmployeeEntity> {
            return this.employeesService.create(createEmployeeDto);
        }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id') id:number,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ): Promise<EmployeeEntity> {
        return this.employeesService.update(id, updateEmployeeDto); 
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id') id: number): Promise<EmployeeEntity> {
        return this.employeesService.delete(id);
    }

}