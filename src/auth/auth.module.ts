import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { AuthService } from './service/auth.service';
import { AuthHelper } from './helper/auth.helper';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      },
    }),
  ], // ← this is required
  providers: [AuthService, AuthHelper],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
