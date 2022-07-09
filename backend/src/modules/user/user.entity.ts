import { Table, Column, Model, CreatedAt, DeletedAt, Unique, IsEmail, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'user'
})
export class UserEntity extends Model<UserEntity> {
  
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;
    
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