import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      return false;
    }

    ctx.user = this.jwtService.verify(ctx.req.headers.authorization);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    if (roles.includes(ctx.user.role)) {
      return true;
    } else {
      return false;
    }
  }
}
