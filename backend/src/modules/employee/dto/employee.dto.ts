import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Company } from "src/modules/employee/company/company.entity";

export class EmployeeDto {

    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

   
    @MinLength(3)
    @IsNotEmpty()
    readonly address: string;

    readonly company: Company;
   

    // constructor(employee: Employee) {
    //     this.name = employee.name;
    //     this.email = employee.email;
    //     this.address= employee.address;
    //     this.company.companyName = employee.company.companyName;
    //     this.company.department = employee.company.department;
    //     this.company.position = employee.company.position;
    //     this.company.salary = employee.company.salary;
        
    // }
}