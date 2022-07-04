import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
   

    @Column
    email: string;

    @Column
    password: string;

    
}

// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("user", {
       
//         email: {
//             type: Sequelize.STRING(30),
//             allowNull: false,
//             unique: {
//                 args: true,
//                 msg: 'this email already exists'
//             }
//         },
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     });
//     return User;
// }