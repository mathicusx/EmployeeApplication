import { Employee } from './employee.entity';
import { EMPLOYEES_REPOSITORY } from '../../core/constants/index';

export const employeeProviders = [{
    provide: EMPLOYEES_REPOSITORY,
    useValue: Employee,
}];