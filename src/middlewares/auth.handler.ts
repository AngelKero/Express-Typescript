import boom from "@hapi/boom";
import config from "./../config/config";

export function checkApiKey(req, res, next) {
  const { token } = req.headers;
  if (token === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

export function checkRoles(...roles) {
  return (req, res, next) => {
    console.log(req.user);
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      next(boom.unauthorized('You are not authorized to perform this action'));
    }
  }
}
