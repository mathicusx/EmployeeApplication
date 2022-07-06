import { Employee } from './employee.entity';
import { EMPLOYEE_REPOSITORY } from '../../core/constants/index';

export const employeeProviders = [{
    provide: EMPLOYEE_REPOSITORY,
    useValue: Employee,
}];