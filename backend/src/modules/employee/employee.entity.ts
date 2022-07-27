import { Table, Column, Model, IsEmail, Unique, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Company } from "./company/company.entity";

@Table({
    tableName: 'employee',
})
export class Employee extends Model {

    @PrimaryKey
    @Unique
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Unique
    @IsEmail
    @Column
    email: string;
    
    @Column
    address: string;

    @ForeignKey(() => Company,)
    @Column
    companyId: number;

    @BelongsTo(() => Company,{ onDelete: 'CASCADE'})
    company:Company
}

