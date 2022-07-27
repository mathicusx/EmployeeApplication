import { IsEmail, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { Company } from "src/modules/employee/company/company.entity";


export class UpdateEmployeeDto {
    @IsOptional() 
    @IsString()
    @Length(3,60)
    readonly name: string;

    @IsOptional() 
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsOptional() 
    @IsString()
    readonly address: string;

    @IsOptional()
    @ValidateNested()
    readonly company: Company;

    // constructor(employee: EmployeeDto) {
    //     this.name = employee.name;
    //     this.email = employee.email;
    //     this.address = employee.address;
    //     this.company.companyName = employee.company.companyName;
    //     this.company.department = employee.company.department;
    //     this.company.position = employee.company.position;
    //     this.company.salary = employee.company.salary;

        
    // }

}