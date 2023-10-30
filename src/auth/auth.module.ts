import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../utils/jwt_config';

@Module({
  imports: [JwtModule.register(JWT_CONFIG)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
