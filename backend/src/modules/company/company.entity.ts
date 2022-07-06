import { Table, Column, Model, DataType} from 'sequelize-typescript';

@Table
export class Company extends Model<Company> {
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
}