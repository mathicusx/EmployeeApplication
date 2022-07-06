import { Table, Column, Model, ForeignKey, BelongsTo, DataType} from "sequelize-typescript";
import { Company } from "src/modules/company/company.entity";

@Table 
export class Employee extends Model<Employee> {

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

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    companyId: number;

    @BelongsTo(() => Company)
    company: Company;
}
