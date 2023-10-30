import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const payload: any = this.auth.decode(token?.split(' ')[1]);
    if (payload === null) throw new UnauthorizedException();
    if (payload.access === true) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
