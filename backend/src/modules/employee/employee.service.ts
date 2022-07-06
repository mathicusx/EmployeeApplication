import { Inject, Injectable } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "src/core/constants";
import { Company } from "../company/company.entity";
import { EmployeeDto } from "./dto/employee.dto";
import { Employee } from "./employee.entity";


@Injectable()
export class EmployeeService {
  constructor(@Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee) {}


  async create(employee: EmployeeDto, companyId): Promise<Employee> {
    return await this.employeeRepository.create<Employee>(employee);
  }

  async getAll(): Promise<Employee[]>{
    return await this.employeeRepository.findAll<Employee>({
      include: [{ model: Company,}]
    })
  }

  async findOne(id): Promise<Employee>{
    return await this.employeeRepository.findOne({
      where: { id },
      include: [{model: Company}]
    })
  }
    // TODO CLEAN UP
  async delete(id, companyId) {
    return await this.employeeRepository.destroy({ where: {id, companyId}});
  }
   // TODO CLEAN UP
  async update(id, data, companyId) {
const [numberOfAffectedRows, [updatedEmployees]] = await this.employeeRepository.update({ ...data }, { where: { id, companyId }, returning: true });

    return { numberOfAffectedRows, updatedEmployees };
  }
}