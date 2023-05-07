import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx);

    const { req } = context.getContext();

    return super.canActivate(new ExecutionContextHost([req])); // NOTE
  }
}
