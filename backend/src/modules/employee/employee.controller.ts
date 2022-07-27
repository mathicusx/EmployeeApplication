import { Controller, Get, Param, Post, Body, Put, UseGuards, Delete, ParseIntPipe} from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";
import { EmployeesService } from "./employee.service";
import { Employee} from "./employee.entity";
import { AuthGuard } from "@nestjs/passport";
import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Promise<EmployeeDto[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id: number): Promise<Employee> {
        return this.employeesService.findOne(id);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    create( @Body() employee,): Promise<any> {    
            return this.employeesService.create({...employee});
        }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id',) id: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ): Promise<any> {
        return this.employeesService.update(id,updateEmployeeDto); 
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id') id: number): Promise<any> {
       return this.employeesService.delete(id);
    }

}