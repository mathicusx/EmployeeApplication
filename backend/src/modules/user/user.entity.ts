import { Table, Column, Model, DataType,  CreatedAt, DeletedAt, Unique, IsEmail } from 'sequelize-typescript';

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

     @CreatedAt
     @Column({ field: 'created_at' })
     createdAt: Date;
 
     @DeletedAt
     @Column({ field: 'deleted_at' })
     deletedAt: Date;

}