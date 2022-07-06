import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Employee } from "../employee.entity";

export class EmployeeDto {

    readonly id: number;

    readonly companyId: string;
    readonly companyName: string;
    readonly companyDepartment: string;
    readonly companyPosition: string;
    readonly companySalary: number;

    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly address: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
  
    constructor(employee: Employee) {

        this.id = employee.id;
        this.companyId = employee.companyId;
        this.companyName = employee.company.name;
        this.companyDepartment = employee.company.department;
        this.companyPosition = employee.company.position;
        this.name = employee.name;
        this.email= employee.email;
        this.address = employee.address;
    }
}