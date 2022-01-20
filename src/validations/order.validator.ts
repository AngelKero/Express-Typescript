import Joi from "joi";
import { Order } from "src/interfaces/order.interface";

const id = Joi.string().uuid();
const userId = Joi.string().uuid();
const productId = Joi.string().uuid();
const quantity = Joi.number().min(1).max(10);
const total = Joi.number();
const createdAt = Joi.date();
const updatedAt = Joi.date();


export const getOrderValidation = Joi.object({id});


export const createOrderValidation = Joi.object<Order>({
  id: id.empty(),
  userId: userId.empty(),
  productId: productId.required(),
  quantity: quantity.required(),
  total: total.required(),
  createdAt,
  updatedAt
});
