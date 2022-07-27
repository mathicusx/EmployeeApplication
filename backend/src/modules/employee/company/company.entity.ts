import { Table, Column, Model, HasMany, PrimaryKey, Unique, AutoIncrement,} from 'sequelize-typescript';
import { Employee } from '../employee.entity';

@Table({
    tableName: 'company'
})
export class Company extends Model {
   
    @PrimaryKey
    @Unique
    @AutoIncrement
    @Column
    id: number;

    @Column
    companyName: string;

    @Column    
    employeeId: number;

    @Column
    department: string;

    @Column
    position: string;

    @Column
    salary: number;

    @HasMany(() => Employee, )
    // @Exclude()
     employees: Employee[]
 
}