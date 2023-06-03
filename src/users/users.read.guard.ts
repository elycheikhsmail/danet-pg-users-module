import {
  AuthGuard,
  ExecutionContext,
  Injectable,
} from 'https://deno.land/x/danet@1.7.1/mod.ts';
import { Request } from 'https://deno.land/x/oak@v11.1.0/request.ts';
import { get_token_from_request, verify_token } from './utiles.ts';

@Injectable()
export class ReadAuthGuard implements AuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.request;
    return validateRequest(request);
  }
}

function validateRequest(request: Request): boolean {
  const token = get_token_from_request(request);
  if (token) {
    try {
      verify_token(token);
      return true;
    } catch (_error) {
      return false;
    }
  } else {
    return false;
  }
}
