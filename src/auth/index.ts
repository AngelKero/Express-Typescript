import passport from "passport";
import localStrategy from "./strategies/local.strategy";
import jwtStrategy from "./strategies/jwt.strategy";

// # Setting the passport middlewares
passport.use('login', localStrategy); // Use with <passport.authenticate('login')>
passport.use(jwtStrategy); // Use with <passport.authenticate('jwt')>
