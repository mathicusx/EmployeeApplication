import { Sequelize } from 'sequelize-typescript';
import { RefreshToken } from 'src/modules/auth/refresh.token.entity';
import { Company } from 'src/modules/employee/company/company.entity';
import { Employee} from 'src/modules/employee/employee.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './config/database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Employee,Company, UserEntity,RefreshToken]);
        await sequelize.sync();
        return sequelize;
    },
}];