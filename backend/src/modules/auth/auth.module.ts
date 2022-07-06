import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
 import { UserModule } from '../user/user.module';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({  
  imports: [    
      UserModule,    
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
      }),
      JwtModule.register({
          secret: process.env.JWT_KEY, signOptions: {
              expiresIn: process.env.TOKEN_EXPIRATION,
          },
      }),
  ], 
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],  
  exports: [
      PassportModule, 
      JwtModule
  ],
})
export class AuthModule {}
