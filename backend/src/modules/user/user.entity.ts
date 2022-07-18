import { Table, Column, Model, Unique, IsEmail} from 'sequelize-typescript';

@Table({
    tableName: 'user'
})
export class UserEntity extends Model<UserEntity> {
  

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
     password: string;


}