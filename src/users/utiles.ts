import jwt from 'npm:jsonwebtoken';
import { Request } from 'oak/mod.ts';

export function get_token_from_request(request: Request): string {
  // extract headers
  const tokenWithBareer = request.headers.get('Authorization');
  const arrayFromToken = tokenWithBareer?.split(' ');
  let token = '';
  if (arrayFromToken && arrayFromToken.length > 0) {
    token = arrayFromToken[1];
  }
  return token;
}

export function verify_token(token: string) {
  const SECKRET_KEY = Deno.env.get('SECKRET_KEY');
  const jwtPayload = jwt.verify(token, SECKRET_KEY);
  return jwtPayload;
}
