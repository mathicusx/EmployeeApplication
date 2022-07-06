import { Table, Column, Model, DataType, BeforeCreate, BeforeBulkUpdate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class UserEntity extends Model<UserEntity> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    username:string
    
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
     password: string;

     @BeforeCreate
    @BeforeBulkUpdate
    static hashPassword(user: UserEntity) {
        if (user.password) {            
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }

}