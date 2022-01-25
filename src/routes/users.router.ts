import express from "express";
import passport from "passport";
import { checkApiKey, checkRoles } from "../middlewares/auth.handler";
import controller from "./../controllers/user.controller";
import validateData from "./../middlewares/validator.handler";
import { createUserValidation, getUserValidation } from "./../validations/user.validator";
const router = express.Router();

router.get("/",
  passport.authenticate("jwt"),
  checkRoles('admin'),
  controller.all
);

router.get("/:id",
  passport.authenticate("jwt"),
  checkRoles('admin'),
  validateData(getUserValidation, "params"),
  controller.one
);

router.post("/",
  passport.authenticate("jwt"),
  checkRoles('admin'),
  validateData(createUserValidation, "body"),
  passport.authenticate('signup', { session: false }),
  controller.create
);

export default router;
