import express from "express";
import passport from "passport";
import { checkRoles } from "./../middlewares/auth.handler";
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
router.get('/fake', controller.fake);
router.get('/',
  passport.authenticate('jwt'),
  checkRoles('company'),
  controller.all
);
router.get('/filter', controller.filter);
router.get('/:id', validateData(getProductValidation, 'params'), controller.one);

// POST
router.post('/',
  passport.authenticate('jwt'),
  checkRoles('company'),
  validateData(createProductValidation, 'body'),
  controller.create
);

// PUT
// router.put('/:id',
//   passport.authenticate('jwt'),
//   validateData(getProductValidation, 'params'),
//   validateData(updateProductValidation, 'body'),
//   controller.update
// );

// PATCH
// router.patch('/:id',
//   passport.authenticate('jwt'),
//   validateData(getProductValidation, 'params'),
//   validateData(updateProductValidation, 'body'),
//   controller.partialUpdate
// );

// router.delete('/:id',
//   passport.authenticate('jwt'),
//   validateData(getProductValidation, 'params'),
//   controller.delete
// );

export default router;
