import { Router } from "express";
import * as controllers from "./complaints.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createComplaintSchema, updateComplaintSchema } from "./complaints.schema.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, controllers.getComplaints);
router.get("/:id", requireAuth, controllers.getComplaintById);
router.post("/", requireAuth, validateRequest(createComplaintSchema), controllers.createComplaint);
router.patch("/:id", requireAuth, validateRequest(updateComplaintSchema), controllers.updateComplaintStatus);

export default router;
