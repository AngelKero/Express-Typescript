import Joi from "joi";
import { User } from "src/interfaces/user.interface";

const id = Joi.string();
const name = Joi.string().min(3).max(150);
const email = Joi.string().email();
const avatar = Joi.string().uri();
const password = Joi.string();
const role = Joi.string().valid("company", "admin");
const recoveryToken = Joi.string();

export const getUserValidation = Joi.object({id});

export const createUserValidation = Joi.object<User>({
  _id: id.empty(),
  name: name.required(),
  email: email.required(),
  avatar,
  password: password.required(),
  role: role.required(),
  recoveryToken: recoveryToken.empty()
});

export const signUpUserValidation = Joi.object<User>({
  _id: id.empty(),
  email: email.required(),
  password: password.required(),
  name: name.required(),
  avatar,
  role: role.empty(),
  recoveryToken: recoveryToken.empty()
});
