import { Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt, DeletedAt, Unique} from 'sequelize-typescript';

@Table({
    tableName: 'company'
})
export class Company extends Model<Company> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @Column
    name: string;

    @Column
    department: string;

    @Column
    position: string;

    @Column
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

}