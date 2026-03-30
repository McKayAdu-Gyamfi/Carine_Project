import { Router } from "express";
import * as controllers from "./auth.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerManagerSchema } from "./auth.schema.js";

const router = Router();

// Custom route for MANAGER signup
router.post(
  "/register",
  validateRequest(registerManagerSchema),
  controllers.registerManager
);

export default router;
