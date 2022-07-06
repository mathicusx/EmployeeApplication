import { USERS_REPOSITORY } from "src/core/constants";
import { UserEntity } from "./user.entity";

export const usersProviders = [{
      provide: USERS_REPOSITORY,
      useValue: UserEntity
}
]