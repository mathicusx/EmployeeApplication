import { Company } from "./company.model";

export interface Employee{
    id: number;
    name: string;
    email: string;
    address: string;
    company: Company;
}


