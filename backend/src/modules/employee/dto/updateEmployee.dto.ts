import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

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

    
    @IsString()
    @IsOptional() 
    @IsString()
    readonly company: string;

    
    @IsString()
    @IsOptional() 
    @IsString()
    readonly department: string;

    
    @IsString()
    @IsOptional() 
    @IsString()
    readonly position: string;
    
    
    @IsNumber()
    @IsOptional() 
    @IsNumber()
    readonly salary: number;

}