import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table({
    tableName: 'refreshToken'
})
export class RefreshToken extends Model<RefreshToken>{
    
    @Unique
    @Column
    value: string

    @Column
    userId: string;

    @Column
    expiresAt: Date

}