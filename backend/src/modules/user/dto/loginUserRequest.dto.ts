import { IsNotEmpty } from "class-validator";

export class LoginUserRequestDto {  
    @IsNotEmpty()  readonly email: string;
    @IsNotEmpty()  readonly password: string;
}