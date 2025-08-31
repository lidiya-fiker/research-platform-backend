import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { AuthService } from './service/auth.service';
import { AuthHelper } from './helper/auth.helper';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ← this is required
  providers: [AuthService, AuthHelper],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
