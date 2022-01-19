import Joi from "joi";
import { Product } from "src/interfaces/product.interface";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const author = Joi.string().alphanum().min(3);
const vendor = Joi.string().min(3);
const isBlock = Joi.boolean();
const description = Joi.string().min(1).max(7500);

export const getProductValidation = Joi.object({id});

export const createProductValidation = Joi.object<Product>({
  id, name: name.required(), price: price.required(),
  image, author: author.required(), vendor,
  description, isBlock: isBlock.required(),
});

export const updateProductValidation = Joi.object<Product>({
  name, price, image, author, vendor, description, isBlock
});
