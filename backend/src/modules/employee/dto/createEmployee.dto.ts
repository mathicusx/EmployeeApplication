import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

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
    readonly salary: number;
}