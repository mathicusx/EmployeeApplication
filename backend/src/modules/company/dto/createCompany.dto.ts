import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCompanyDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly department: string;
    
    @IsString()
    @IsNotEmpty()
    readonly position: string;
    @IsNumber()
    @IsNotEmpty()
    readonly salary: number;
}