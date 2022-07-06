import { Table, Column, Model, DataType, HasMany, Unique, CreatedAt, UpdatedAt, DeletedAt} from 'sequelize-typescript';
import { Employee } from '../employee/employee.entity';

@Table
export class Company extends Model<Company> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

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

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @HasMany(() => Employee)
    employees: Employee[];
}