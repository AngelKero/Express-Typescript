import Joi from "joi";

export const recoveryValidator = Joi.object({
  email: Joi.string().email().required()
});
