import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/core/database/database.module";
import { UserModule } from "../user.module";
import { usersProviders } from "../user.providers";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { refreshtokenProviders } from "./refresh-token.providers";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { TokenService } from "./token.service";

@Module({
    imports: [
        UserModule,
        DatabaseModule,
    ],
    providers: [
             AuthService,
             JwtStrategy,
             TokenService,
             ...usersProviders,
             ...refreshtokenProviders
        ],
    exports: [AuthService, TokenService],
    controllers: [AuthController],
})
export class AuthModule {}