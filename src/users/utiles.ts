import jwt from "jsonwebtoken";
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
  const options = {
    expiresIn: Deno.env.get('EXPIRE_IN'),
    //'1h', // Durée de validité du token (1 heure dans cet exemple)
  };
  const SECKRET_KEY = Deno.env.get('SECKRET_KEY');
  const jwtPayload = jwt.verify(token, SECKRET_KEY, options);
  return jwtPayload;
}
