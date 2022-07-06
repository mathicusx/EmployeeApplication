import { UserEntity } from "../user.entity";
import { UserDto } from "./user.dto";

// Helper for UserDto 
export const toUserDto = (data: UserEntity): UserDto => {  
    const { username, email } = data;
    const userDto: UserDto = {username, email  };
    return userDto;
};
