import { Strategy } from "passport-local";
import { service } from "./../../services/users.service";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";


const localStrategy = new Strategy(
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

export default localStrategy;
