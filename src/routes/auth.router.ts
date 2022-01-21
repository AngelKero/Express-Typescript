import express from "express";
import passport from "passport";
import controller from "./../controllers/auth.controller";
import validateData from "./../middlewares/validator.handler";
import { recoveryValidator } from "./../validations/auth.validator";

const router = express.Router();

router.post("/login",
  passport.authenticate("login", {session: true}),
  controller.login
);

router.post("/recovery", validateData(recoveryValidator, 'body'), controller.recovery);

router.get("/change-password", controller.changePassword);

export default router;
