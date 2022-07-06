import { IsNotEmpty, MinLength } from "class-validator";
import { Company } from "../company.entity";

export class CompanyDto {

    id: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    readonly department: string;
    
    @IsNotEmpty()
    readonly position: string;

    @IsNotEmpty()
    readonly salary: number;
    
    

    constructor(company: Company) {
        this.id = company.id;
        this.name = company.name;
        this.department = company.department;
        this.position = company.position;
        this.salary = company.salary;
    }
}