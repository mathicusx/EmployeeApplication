import { Table, Column, Model,DataType, IsEmail, Unique} from "sequelize-typescript";

@Table({
    tableName: 'employee',
})
export class Employee extends Model<Employee> {
  
    @Unique
    @Column
    name: string

    @Unique
    @IsEmail
    @Column
    email: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string

    @Column
    company: string;

    @Column
    department: string;

    @Column
    position: string;

    @Column
    salary: number;
    


   

}
