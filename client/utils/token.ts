import * as jose from "jose";

interface Token {
  userId: string;
  exp: number;
}

export const decodeToken = (token: string): Token => {
  const decoded: any = jose.decodeJwt(token);
  const data: Token = {
    userId: decoded.userId,
    exp: decoded.exp,
  };
  return data;
};
