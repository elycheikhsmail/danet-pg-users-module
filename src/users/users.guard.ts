import {
  AuthGuard,
  ExecutionContext,
  Injectable,
} from 'https://deno.land/x/danet/mod.ts';
import { Request } from 'https://deno.land/x/oak@v11.1.0/request.ts';
import jwt from 'npm:jsonwebtoken';
const payload = {
  utilisateurId: 123456,
  nomUtilisateur: 'JohnDoe',
  role: 'admin',
};

const cleSecrete = 'votreCleSecrete';

//import { ExecutionContext } from "./router.ts";

@Injectable()
export class SimpleAuthGuard implements AuthGuard {
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
  console.log({ token });
  if (token) {
    try {
      const decoded = jwt.verify(token, cleSecrete);
      console.log({ decoded });
      return true;
    } catch (_error) {
      //console.log(error)
      console.log('invalide token');
      return false;
    }
  }else{
    return false
  }
}
