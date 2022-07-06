import { Company } from "../company/company.entity";
import { Injectable, Inject, HttpException,HttpStatus } from "@nestjs/common";
import { CreateEmployeeDto} from "./dto/createEmployee.dto";
import { EmployeeDto } from "./dto/employee.dto";
import { UpdateEmployeeDto} from "./dto/updateEmployee.dto";
import { EMPLOYEES_REPOSITORY } from "src/core/constants";
import { Employee } from "./employee.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEES_REPOSITORY)
    private employeesRepository: typeof Employee
  ) {}

  async findAll() {
    const employees = await this.employeesRepository.findAll<Employee>({
       include: [Company],
    });
    return employees.map(employee => new EmployeeDto(employee));
  }
}