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
    const employees = await this.employeesRepository.findAll<Employee>()
    return employees.map(employee => new EmployeeDto(employee));
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findByPk<Employee>(id, {
    });
    if (!employee) {
      throw new HttpException('No Employee Found', HttpStatus.NOT_FOUND);
    }
    return new EmployeeDto(employee)
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    
      const employee = new Employee();
        employee.name = createEmployeeDto.name;
        employee.email = createEmployeeDto.email;
        employee.address = createEmployeeDto.address;
        employee.company = createEmployeeDto.company;
        employee.department = createEmployeeDto.department;
        employee.position = createEmployeeDto.position;
        employee.salary = createEmployeeDto.salary;
        return employee.save()
        .catch(
          (err) => {
            if(err) {
              throw new HttpException(
                      `Employee with this value '${err.errors[0].value}' already exists`,
                      HttpStatus.CONFLICT
                 );
            }
            return employee;
          }
        )

  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto){
    const employee = await this.employeesRepository.findByPk<Employee>(id)
    employee.name = updateEmployeeDto.name || employee.name;
    employee.email = updateEmployeeDto.email || employee.email;
    employee.address = updateEmployeeDto.address || employee.address;
    employee.company = updateEmployeeDto.company || employee.company;
    employee.department = updateEmployeeDto.department || employee.department;
    employee.position = updateEmployeeDto.position || employee.position;
    employee.salary = updateEmployeeDto.salary || employee.salary;

    return employee.save().catch(
      (err) => {
        if(err) {
          throw new HttpException(
                  `Employee with this value '${err.errors[0].value}' already exists`,
                  HttpStatus.CONFLICT
             );
        }
        return employee;
      }
    )
  }

  async delete(id: number) {
    const employee = await this.employeesRepository.findByPk<Employee>(id);
    await employee.destroy();
    return employee;
  }

 
}