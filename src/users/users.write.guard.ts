import {
  AuthGuard,
  ExecutionContext,
  Injectable,
} from 'https://deno.land/x/danet@1.7.1/mod.ts';
import { Request } from 'https://deno.land/x/oak@v11.1.0/request.ts';
import jwt from 'npm:jsonwebtoken';

@Injectable()
export class WriteAuthGuard implements AuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.request;
    return validateRequest(request);
  }
}

function validateRequest(request: Request): boolean {
  // extract headers
  const tokenWithBareer = request.headers.get('Authorization');
  const arrayFromToken = tokenWithBareer?.split(' ');
  let token = '';
  if (arrayFromToken && arrayFromToken.length > 0) {
    token = arrayFromToken[1];
  } else {
    return false;
  }
  if (token) {
    try {
      const SECKRET_KEY = Deno.env.get('SECKRET_KEY');
      const _decoded = jwt.verify(token, SECKRET_KEY);
      return true;
    } catch (_error) {
      return false;
    }
  } else {
    return false;
  }
}
