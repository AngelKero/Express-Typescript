import Joi from "joi";
import { User } from "src/interfaces/user.interface";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(150);
const email = Joi.string().email();
const avatar = Joi.string().uri();
const password = Joi.string();
const role = Joi.string().valid("user", "admin");

export const getUserValidation = Joi.object({id});

export const createUserValidation = Joi.object<User>({
  id: id.empty(),
  name: name.required(),
  email: email.required(),
  avatar,
  password: password.required(),
  role: role.required()
});
