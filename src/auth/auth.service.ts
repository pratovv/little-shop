import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
@Injectable()
export class AuthService {
  constructor(private auth: JwtService) {}
  async login(dto: LoginDto) {
    if (
        dto.login !== process.env.login ||
        dto.password !== process.env.password
    ) {
      throw new BadRequestException();
    }
    const payload = { access: true };
    return {
      token: await this.auth.signAsync(payload),
    };
  }
}
