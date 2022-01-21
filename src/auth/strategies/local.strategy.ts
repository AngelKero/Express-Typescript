import { Strategy } from "passport-local";
import { service } from "./../../services/auth.service";
import UserSchema from "./../../db/models/user.model";
import boom from "@hapi/boom";

export const localLoginStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email: string, password: string, done: Function) => {
    try {
      const user = await service.verifyUser(email, password);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export const localSignupStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email: string, password: string, done) => {
    try {
      const userSchema = new UserSchema();
      userSchema.email = email;
      userSchema.password = await userSchema.hashPassword(password);

      const user = await userSchema.save();
      return done(null, user);
    } catch (error) {
      done(boom.badRequest(error), false);
    }
  }
);
