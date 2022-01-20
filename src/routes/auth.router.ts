import express from "express";
import passport from "passport";
import controller from "./../controllers/auth.controller";
const router = express.Router();

router.post("/login",
  passport.authenticate("login", {session: false}),
  controller.login
);

export default router;
