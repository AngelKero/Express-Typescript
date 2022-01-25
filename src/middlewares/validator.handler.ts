import boom from "@hapi/boom";
import Joi from "joi";

/**
 * Middleware to validate the request before the controller
 * @param validator The validator to use
 * @param property The property of the request object to validate
 * @returns A middleware function
 */
function validatorHandler(validator: Joi.ObjectSchema, property: string = 'body') {
  return (req, res, next) => {
    const data = req[property];
    const { error } = validator.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    } else {
      next();
    }
  }
}

export default validatorHandler;
