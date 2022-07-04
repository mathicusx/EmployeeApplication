import { Table, Column, Model, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";

@Table 
export class Employee extends Model {
  
    @Column
    name: string

    @Column
    email: string
    
    @Column
    address: string

    @ForeignKey(() => Company)
    @Column
    jobId: number

    @BelongsTo(() => Company)
    company: Company[]
}

@Table
class Company extends Model {
    @Column
    name: string;
    @Column
    department: string;
    @Column
    position: string;
    @Column
    salary: number;
    @HasMany(() => Employee)
    employees: Employee[]
}

// module.exports = (sequelize, Sequelize) => {
//     const Employee = sequelize.define("employee", {
       
//         name: {
//             type: Sequelize.STRING(30),
//             allowNull: false,
//             unique: {
//                     args: true,
//                     msg: 'Name already exists'
//             }
//         },
//         email: {
//             type: Sequelize.STRING(30),
//             allowNull: false,
//             unique: {
//                 args: true,
//                 msg: 'Email already exists'
//             }
//         },
//         address: {
//             type: Sequelize.STRING(50),
//             allowNull: false,
//         }
      
//     });

//     Employee.associate = models => {
//         Employee.hasOne(models.Job,{
//             onDelete: "cascade"
//         })
//     }

//     return Employee;
   
// }