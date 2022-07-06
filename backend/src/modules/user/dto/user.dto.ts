import { IsEmail,IsNotEmpty} from "class-validator";

export class UserDto {  
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  @IsEmail()  email: string;

    // excluded password. 
    //because we never want to return the stored password data to the user as it is bad practice.
}