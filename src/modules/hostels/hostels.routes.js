import { Router } from "express";
import * as controllers from "./hostels.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createHostelSchema, updateHostelSchema } from "./hostels.schema.js";

const router = Router();

router.get("/", controllers.getHostels);
router.get("/:id", controllers.getHostelById);

// Optionally, you might attach authentication middlewares here in the future
router.post("/", validateRequest(createHostelSchema), controllers.createHostel);
router.patch("/:id", validateRequest(updateHostelSchema), controllers.updateHostel);

export default router;
