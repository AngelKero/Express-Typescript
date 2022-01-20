import express from "express";
import passport from "passport";
import { createOrderValidation } from "./../validations/order.validator";
import controller from "./../controllers/profile.controller";
import validateData from "./../middlewares/validator.handler";

const router = express.Router();

router.get("/", controller.all);

// Extraemos el id del usuario mediante el jwt
router.get("/my-orders",
  passport.authenticate("jwt", { session: false }),
  controller.byUser
);

router.post("/my-orders",
  passport.authenticate("jwt", { session: false }),
  validateData(createOrderValidation, "body"),
  controller.create
);

export default router;
