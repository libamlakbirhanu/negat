import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StringValueNode, parse, visit } from 'graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    function isStringValueNode(node: any): node is StringValueNode {
      return node && node.kind === 'StringValue';
    }

    // Extract email and password from the GraphQL query
    const { query } = req.body;
    const document = parse(query);
    let email, password;

    visit(document, {
      Field: {
        enter(node) {
          if (node.name.value === 'login') {
            node.arguments.forEach((arg) => {
              if (arg.name.value === 'email' && isStringValueNode(arg.value)) {
                email = arg.value.value;
              } else if (
                arg.name.value === 'password' &&
                isStringValueNode(arg.value)
              ) {
                password = arg.value.value;
              }
            });
          }
        },
      },
    });

    // Set email and password in the request body
    req.body = { ...req.body, email, password };

    return req;
  }
}
