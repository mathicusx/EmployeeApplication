import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator"
import { Company } from "src/modules/employee/company/company.entity";

export class CreateEmployeeDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty() 
    readonly email: string;

    @IsString()
    @IsNotEmpty() 
    @MinLength(3) 
    readonly address: string;

    @IsNotEmpty()
    readonly companyId: number;


    @ValidateNested()
    readonly company:Company;

    



}