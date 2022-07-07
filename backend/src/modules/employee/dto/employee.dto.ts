import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Employee } from "../employee.entity";

export class EmployeeDto {


    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @MinLength(3)
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty() 
    @MinLength(3) 
    readonly company: string;
    
    @IsString()
    @IsNotEmpty() 
    @MinLength(3) 
    readonly department: string;
    
    @IsString()
    @IsNotEmpty() 
    @MinLength(3) 
    readonly position: string;

    @IsNumber()
    @IsNotEmpty() 
    @MinLength(3) 
    readonly salary: number;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(employee: Employee) {
        this.name = employee.name;
        this.email = employee.email;
        this.address= employee.address
        this.company = employee.company;
        this.department = employee.department;
        this.position = employee.position;
        this.salary = employee.salary;
    }
  
    
}