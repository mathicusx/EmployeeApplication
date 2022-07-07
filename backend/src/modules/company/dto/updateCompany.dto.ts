import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateCompanyDto{
    @IsString()
    @IsOptional()
    @MinLength(3)
    readonly name: string;
    
    @IsString()
    @IsOptional()
    readonly department: string;
    
    @IsString()
    @IsOptional()
    readonly position: string;
    @IsNumber()
    @IsOptional()
    readonly salary: number;
}
