import { COMPANIES_REPOSITORY } from "src/core/constants/index";
import { Company } from "./company.entity";

export const companiesProviders = [{
    provide: COMPANIES_REPOSITORY,
    useValue: Company
}]