import { Router } from "express";
import * as controllers from "./rooms.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createRoomSchema, updateRoomSchema } from "./rooms.schema.js";
import { updateAmenitiesSchema, addAmenitySchema } from "../amenities/Amenities.schema.js";

const router = Router();

router.get("/", controllers.getRooms);
router.get("/:id", controllers.getRoomById);

router.post("/", validateRequest(createRoomSchema), controllers.createRoom);
router.patch("/:id", validateRequest(updateRoomSchema), controllers.updateRoom);

// Amenities routes
router.put("/:id/amenities", validateRequest(updateAmenitiesSchema), controllers.updateRoomAmenities);
router.post("/:id/amenities", validateRequest(addAmenitySchema), controllers.addRoomAmenity);
router.delete("/:id/amenities/:amenityId", controllers.removeRoomAmenity);

export default router;
