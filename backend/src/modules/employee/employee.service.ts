import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { COMPANIES_REPOSITORY, EMPLOYEES_REPOSITORY } from 'src/core/constants';
import { Employee } from './employee.entity';
import { Company } from './company/company.entity';
import { ValidationError } from 'sequelize/types';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEES_REPOSITORY)
    private employeesRepository: typeof Employee,
    @Inject(COMPANIES_REPOSITORY)
    private companiesRepository: typeof Company,
  ) {}

  async findAll() {
    // this.companiesRepository.update({employeeId: (await data).id},
    // {where: {employeeId: null}})

    const employees = await this.employeesRepository.findAll({
      include: Company,
    });
    return employees;
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findByPk<Employee>(id, {});
    if (!employee) {
      throw new HttpException('No Employee Found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  async create(createEmployee: EmployeeDto) {
    try {
      const employee = {
        name: createEmployee.name,
        email: createEmployee.email,
        address: createEmployee.address,
        company: {
          id: createEmployee.company.id,
          companyName: createEmployee.company.companyName,
          department: createEmployee.company.department,
          position: createEmployee.company.position,
          salary: createEmployee.company.salary,
        },
      };
      const data = await this.employeesRepository.create(employee);

      if ((data.name = undefined)) {
        throw new BadRequestException('something happened');
      } else {
        const companydata = await this.companiesRepository.create(
          employee.company,
        );
        // link employee Id with company and companyId with employee
        this.employeesRepository.update(
          { companyId: companydata.id },
          {
            where: { companyId: null },
          },
        );

        this.companiesRepository.update(
          { employeeId: data.id },
          { where: { employeeId: null } },
        );

        return employee;
      }
    } catch (err) {
      throw new HttpException(
        `Employee with this value ${err.errors[0].value} already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeesRepository.findByPk<Employee>(id);
      employee.name = updateEmployeeDto.name || employee.name;
      employee.email = updateEmployeeDto.email || employee.email;
      employee.address = updateEmployeeDto.address || employee.address;

      const company = await this.companiesRepository.findOne({
        where: { employeeId: id },
      });
      company.companyName = updateEmployeeDto.company.companyName || company.companyName;
      company.department = updateEmployeeDto.company.department || company.department;
      company.position = updateEmployeeDto.company.position || company.position;
      company.salary = updateEmployeeDto.company.salary || company.salary;

      await employee.save();
      await company.save();
      const payload = {employee, company}
      return payload;
    } catch (err) {
      if(err){
        throw new HttpException(
          `Employee with this value ${err.errors[0].value} already exists`,
            HttpStatus.BAD_REQUEST
        )
      }
      throw new HttpException(`Error ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const company = await this.companiesRepository.findOne({
        where: { employeeId: id },
      });
      const employee = await this.employeesRepository.findByPk<Employee>(id);
      if(employee === null || company === null){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND);
      }
      await employee.destroy();
      await company.destroy();
      return `Succesfully Deleted Employee And Company Related to it`;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByName(name: string) {
    return await this.employeesRepository.findOne<Employee>({
      where: { name },
    });
  }
}
