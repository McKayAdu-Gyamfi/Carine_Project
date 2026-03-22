import { Router } from "express";
import * as controllers from "./users.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { updateUserProfileSchema } from "./users.schema.js";

const router = Router();

router.get("/:id", controllers.getUserProfile);
router.patch("/:id", validateRequest(updateUserProfileSchema), controllers.updateUserProfile);

export default router;
