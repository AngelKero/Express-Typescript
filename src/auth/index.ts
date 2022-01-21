import passport from "passport";
import { localLoginStrategy, localSignupStrategy } from "./strategies/local.strategy";
import jwtStrategy from "./strategies/jwt.strategy";
import { User } from "./../interfaces/user.interface";

// # Setting the passport middlewares
passport.use("signup", localSignupStrategy);
passport.use('login', localLoginStrategy); // Use with <passport.authenticate('login')>
passport.use(jwtStrategy); // Use with <passport.authenticate('jwt')>

passport.serializeUser((user: User, done) => {
  done(null, {id: user.id, role: user.role});
});

passport.deserializeUser((user: User, done) => {
  done(null, {id: user.id, role: user.role});
});
