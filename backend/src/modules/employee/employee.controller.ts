import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee as EmployeeEntity } from './employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // gets all employees in the database
  @Get()
  async getAll() {
    return await this.employeeService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EmployeeEntity> {
    // find employee with id
    const employee = await this.employeeService.findOne(id);

    // if employee doesn't exist in the db throw error
    if (!employee) {
      throw new NotFoundException('Employee does not exist');
    }
    return employee;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() employee: EmployeeDto,
    @Request() req,
  ): Promise<EmployeeEntity> {
    return await this.employeeService.create(employee, req.company.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employee: EmployeeDto,
    @Request() req,
  ): Promise<EmployeeEntity> {
    const { numberOfAffectedRows, updatedEmployees } =
      await this.employeeService.update(id, employee, req.company.id);

      // if affectedRows === 0
      // then employee doesn't exist in db
      if (numberOfAffectedRows === 0) {
        throw new NotFoundException('Employee does not exist');
      }
      return updatedEmployees;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete employee with this id
    const deleted = await this.employeeService.delete(id, req.company.id);

    if(deleted === 0){
        throw new NotFoundException('This Employee does not exist');
    }
    return 'Employee Succesfully Deleted'
  }

}
