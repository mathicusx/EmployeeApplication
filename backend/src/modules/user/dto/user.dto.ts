import { IsEmail, IsNotEmpty } from "class-validator";
import { UserEntity } from "../user.entity";

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    constructor(user: UserEntity){
        this.email = user.email;
    }
}