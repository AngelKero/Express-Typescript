import Joi from "joi";

export const recoveryValidator = Joi.object({
  email: Joi.string().email().required()
});

export const signupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
