import { Table, Column, Model, DataType, HasMany, Unique} from 'sequelize-typescript';
import { Employee } from '../employee/employee.entity';

@Table
export class Company extends Model<Company> {
  
    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    companyName: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    department: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position: string;

    @Column({
        type: DataType.INTEGER,
        allowNull:false,
    })
    salary: number;

    @HasMany(() => Employee)
    employees: Employee[];
}