import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import boom from "@hapi/boom";
import { service } from "./../../services/users.service";
import config from "./../../config/config";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await service.findById(payload.sub);
    if (!user) {
      return done(boom.unauthorized(), false);
    }

    return done(null, payload);
  } catch (error) {
    return done(error);
  }
});

export default jwtStrategy;
