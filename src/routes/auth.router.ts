import express from 'express';
import passport from 'passport';
import { signUpUserValidation } from './../validations/user.validator';
import controller from './../controllers/auth.controller';
import validateData from './../middlewares/validator.handler';
import { changePassword, recoveryValidator } from './../validations/auth.validator';

const router = express.Router();

router.post('/signup',
  validateData(signUpUserValidation, "body"),
  passport.authenticate('signup', {session: true}),
  controller.signup
);

router.post('/login',
  passport.authenticate('login', {session: true}),
  controller.login
);

router.post('/recovery',
  validateData(recoveryValidator, 'body'),
  controller.recovery
);

router.post('/change-password',
  validateData(changePassword, 'body'),
  controller.changePassword
);

export default router;
