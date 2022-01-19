import express from "express";
import controller from "./../controllers/product.controller";
import validateData from "./../middlewares/validator.handler";
import { ProductService } from "./../services/product.service";
import {
  createProductValidation,
  updateProductValidation,
  getProductValidation
} from "./../validations/product.validator";

const router = express.Router();
const service = new ProductService();

// Los endpoints especificos van arriba de los dinamicos

// GET
router.get('/', controller.all);
router.get('/filter', controller.filter);
router.get('/:id', validateData(getProductValidation, 'params'), controller.one);

// POST
router.post('/',
  validateData(createProductValidation, 'body'),
  controller.create
);

// PUT
router.put('/:id',
  validateData(getProductValidation, 'params'),
  validateData(updateProductValidation, 'body'),
  controller.update
);

// PATCH
router.patch('/:id',
  validateData(getProductValidation, 'params'),
  validateData(updateProductValidation, 'body'),
  controller.partialUpdate
);

router.delete('/:id',
  validateData(getProductValidation, 'params'),
  controller.delete
);

export default router;
