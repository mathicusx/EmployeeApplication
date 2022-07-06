import { IsNotEmpty, MinLength } from "class-validator";

export class CompanyDto {
    @IsNotEmpty()
    @MinLength(3)
    readonly companyName: string;

    @IsNotEmpty()
    readonly department: string;
    
    @IsNotEmpty()
    readonly position: string;

    @IsNotEmpty()
    readonly salary: number;
}