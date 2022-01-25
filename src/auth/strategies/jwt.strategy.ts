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
    const user = await service.findById(payload.sub) ?? false;
    if (!user) throw boom.unauthorized();

    return done(null, payload);
  } catch (error) {
    return done(error, false);
  }
});

export default jwtStrategy;
