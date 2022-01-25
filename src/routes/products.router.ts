import express from "express";
import passport from "passport";
import { checkRoles } from "./../middlewares/auth.handler";
import controller from "./../controllers/product.controller";
import validateData from "./../middlewares/validator.handler";
import {
  createProductValidation,
  updateAllProductValidation,
  updatePartialProductValidation,
  getProductValidation
} from "./../validations/product.validator";

const router = express.Router();

// Los endpoints especificos van arriba de los dinamicos

// GET
router.get('/fake', controller.fake);
router.get('/',
  passport.authenticate('jwt'),
  checkRoles('company'),
  controller.own
);

router.get('/all',
  passport.authenticate('jwt'),
  checkRoles('admin'),
  controller.all
);

router.get('/:id',
  validateData(getProductValidation, 'params'),
  controller.one
);


// POST
router.post('/',
  passport.authenticate('jwt'),
  checkRoles('company'),
  validateData(createProductValidation, 'body'),
  controller.create
);


// PUT
router.put('/:id',
  passport.authenticate('jwt'),
  checkRoles('company'),
  validateData(getProductValidation, 'params'),
  validateData(updateAllProductValidation, 'body'),
  controller.update
);


// PATCH
router.patch('/:id',
  passport.authenticate('jwt'),
  checkRoles('company'),
  validateData(getProductValidation, 'params'),
  validateData(updatePartialProductValidation, 'body'),
  controller.update
);


// DELETE
router.delete('/:id',
  passport.authenticate('jwt'),
  checkRoles('company'),
  validateData(getProductValidation, 'params'),
  controller.delete
);

export default router;
