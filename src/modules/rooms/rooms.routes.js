import { Router } from "express";
import * as controllers from "./rooms.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createRoomSchema, updateRoomSchema } from "./rooms.schema.js";
import { updateAmenitiesSchema, addAmenitySchema } from "../amenities/Amenities.schema.js";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { verifyRoomOwnership } from "../../middlewares/verifyOwnership.js";

const router = Router();

router.get("/", controllers.getRooms);
router.get("/:id", controllers.getRoomById);

router.post("/", requireAuth, requireRole("HOSTEL_MANAGER"), validateRequest(createRoomSchema), controllers.createRoom);
router.patch("/:id", requireAuth, verifyRoomOwnership, validateRequest(updateRoomSchema), controllers.updateRoom);

// Amenities routes
router.put("/:id/amenities", requireAuth, verifyRoomOwnership, validateRequest(updateAmenitiesSchema), controllers.updateRoomAmenities);
router.post("/:id/amenities", requireAuth, verifyRoomOwnership, validateRequest(addAmenitySchema), controllers.addRoomAmenity);
router.delete("/:id/amenities/:amenityId", requireAuth, verifyRoomOwnership, controllers.removeRoomAmenity);

export default router;
