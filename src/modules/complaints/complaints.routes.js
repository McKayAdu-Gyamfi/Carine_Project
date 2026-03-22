import { Router } from "express";
import * as controllers from "./complaints.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createComplaintSchema, updateComplaintSchema } from "./complaints.schema.js";

const router = Router();

router.get("/", controllers.getComplaints);
router.get("/:id", controllers.getComplaintById);
router.post("/", validateRequest(createComplaintSchema), controllers.createComplaint);
router.patch("/:id", validateRequest(updateComplaintSchema), controllers.updateComplaintStatus);

export default router;
