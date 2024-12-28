import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LooseJwtGuard
  extends AuthGuard('loose-jwt')
  implements CanActivate
{
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}
