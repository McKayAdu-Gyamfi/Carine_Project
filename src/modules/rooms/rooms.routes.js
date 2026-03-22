import { Router } from "express";
import * as controllers from "./rooms.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createRoomSchema, updateRoomSchema } from "./rooms.schema.js";

const router = Router();

router.get("/", controllers.getRooms);
router.get("/:id", controllers.getRoomById);

router.post("/", validateRequest(createRoomSchema), controllers.createRoom);
router.patch("/:id", validateRequest(updateRoomSchema), controllers.updateRoom);

export default router;
