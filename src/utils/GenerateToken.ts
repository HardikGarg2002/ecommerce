import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload: any, passwordReset = false) => {
  if (process.env.SECRET_KEY === undefined) {
    throw new Error("SECRET_KEY is not defined in .env file");
  }
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: passwordReset
      ? process.env.PASSWORD_RESET_TOKEN_EXPIRATION
      : process.env.LOGIN_TOKEN_EXPIRATION,
  });
};
