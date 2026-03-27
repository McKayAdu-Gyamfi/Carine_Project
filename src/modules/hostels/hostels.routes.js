import { Router } from "express";
import * as controllers from "./hostels.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createHostelSchema, updateHostelSchema } from "./hostels.schema.js";
import { updateAmenitiesSchema, addAmenitySchema } from "../amenities/Amenities.schema.js";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { verifyHostelOwnership } from "../../middlewares/verifyOwnership.js";

const router = Router();

router.get("/", controllers.getHostels);
router.get("/:id", controllers.getHostelById);

// Optionally, you might attach authentication middlewares here in the future
router.post("/", requireAuth, requireRole("ADMIN"), validateRequest(createHostelSchema), controllers.createHostel);
router.patch("/:id", requireAuth, verifyHostelOwnership, validateRequest(updateHostelSchema), controllers.updateHostel);

// Amenities routes
router.put("/:id/amenities", requireAuth, verifyHostelOwnership, validateRequest(updateAmenitiesSchema), controllers.updateHostelAmenities);
router.post("/:id/amenities", requireAuth, verifyHostelOwnership, validateRequest(addAmenitySchema), controllers.addHostelAmenity);
router.delete("/:id/amenities/:amenityId", requireAuth, verifyHostelOwnership, controllers.removeHostelAmenity);

export default router;
