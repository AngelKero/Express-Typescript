import express from "express";
import { checkApiKey } from "../middlewares/auth.handler";
import controller from "./../controllers/user.controller";
import validateData from "./../middlewares/validator.handler";
import { createUserValidation, getUserValidation } from "./../validations/user.validator";
const router = express.Router();

router.get("/",
  checkApiKey,
  controller.all
);

router.get("/:id",
  checkApiKey,
  validateData(getUserValidation, "params"),
  controller.one
);

router.post("/",
  checkApiKey,
  validateData(createUserValidation, "body"),
  controller.create
);

export default router;
