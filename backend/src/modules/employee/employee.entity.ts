import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey, AutoIncrement, DeletedAt, UpdatedAt, CreatedAt} from "sequelize-typescript";
import { Company } from "src/modules/company/company.entity";

@Table 
export class Employee extends Model<Employee> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'company_id'
    })
    companyId: string;

    @BelongsTo(() => Company)
    company: Company;
}
