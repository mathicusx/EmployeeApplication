import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {  
    @IsNotEmpty()  password: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}