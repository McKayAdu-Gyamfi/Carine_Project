import { Router } from "express";
import express from "express";
import * as controllers from "./auth.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerManagerSchema } from "./auth.schema.js";

const router = Router();
const jsonParser = express.json();

// Custom route for MANAGER signup
router.post(
  "/register",
  jsonParser,
  validateRequest(registerManagerSchema),
  controllers.registerManager
);

// Standard explicit Auth endpoints mapped manually
router.post("/sign-up/email", jsonParser, controllers.signUp);
router.post("/sign-in/email", jsonParser, controllers.signIn);
router.post("/sign-out", jsonParser, controllers.signOut);

export default router;
