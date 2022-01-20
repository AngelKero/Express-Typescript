import jwt from "jsonwebtoken";
import config from "./../config/config";

const secret = config.jwtSecret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlcyI6InVzZXIiLCJpYXQiOjE2NDI2MjgwNzF9.CAJrHaG1h3wM3qDKfrVYQpHBjz6PoLHh4z_Ce5Ttn-Q';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
