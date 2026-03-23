import { Router } from "express";
import * as controllers from "./hostels.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createHostelSchema, updateHostelSchema } from "./hostels.schema.js";
import { updateAmenitiesSchema, addAmenitySchema } from "../amenities/Amenities.schema.js";

const router = Router();

router.get("/", controllers.getHostels);
router.get("/:id", controllers.getHostelById);

// Optionally, you might attach authentication middlewares here in the future
router.post("/", validateRequest(createHostelSchema), controllers.createHostel);
router.patch("/:id", validateRequest(updateHostelSchema), controllers.updateHostel);

// Amenities routes
router.put("/:id/amenities", validateRequest(updateAmenitiesSchema), controllers.updateHostelAmenities);
router.post("/:id/amenities", validateRequest(addAmenitySchema), controllers.addHostelAmenity);
router.delete("/:id/amenities/:amenityId", controllers.removeHostelAmenity);

export default router;
