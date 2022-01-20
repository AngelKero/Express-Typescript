import { Strategy } from "passport-local";
import { service } from "./../../services/users.service";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";


export const localLoginStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email)

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(boom.unauthorized('Incorrect password'), false);

      const userWithoutPassword = Object.assign({}, user);
      delete userWithoutPassword.password;
      return done(null, userWithoutPassword);
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
      const user = await service.findByEmail(email)
      if (user) return done(boom.conflict('Email already exists'), false);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await service.create({ email, password: hashedPassword });

      const userWithoutPassword = Object.assign({}, newUser);
      delete userWithoutPassword.password;
      return done(null, userWithoutPassword);
    } catch (error) {
      done(error, false);
    }
  }
);
