import { Request } from 'https://deno.land/x/oak@v11.1.0/request.ts';
import jwt from 'npm:jsonwebtoken';

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
  const _decoded = jwt.verify(token, SECKRET_KEY);
}
