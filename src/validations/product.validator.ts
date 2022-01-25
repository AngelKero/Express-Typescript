import Joi from "joi";
import { Product } from "src/interfaces/product.interface";

const id = Joi.string();
const name = Joi.string().min(3).max(75);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const vendor = Joi.string().min(3);
const isBlock = Joi.boolean();
const description = Joi.string().min(1).max(7500);

export const getProductValidation = Joi.object({id});

export const createProductValidation = Joi.object<Product>({
  _id: id.empty(),
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.optional(),
  vendor: vendor.optional(),
  authorId: id.empty(),
  isBlock: isBlock.required(),
});

export const updateProductValidation = Joi.object<Product>({
  name, price, image, vendor, description, isBlock
});
