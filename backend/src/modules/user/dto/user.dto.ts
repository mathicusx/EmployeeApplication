import { IsEmail,IsNotEmpty} from "class-validator";
import { UserEntity as User } from "../user.entity";

export class UserDto {  

    id: string

    @IsNotEmpty()  @IsEmail()  email: string;

    constructor(user: User){
        this.id = user.id;
        this.email = user.email
    }
    // excluded password. 
    //because we never want to return the stored password data to the user as it is bad practice.
}