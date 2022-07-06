import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class EmployeeDto {

    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly address: string;
  
}