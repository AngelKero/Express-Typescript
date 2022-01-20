import jwt from "jsonwebtoken";
import config from "./../config/config";

export function signToken(payload) {
  const secret = config.jwtSecret;
  return jwt.sign(payload, secret);
}
