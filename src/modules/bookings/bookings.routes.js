import { Router } from "express";
import * as controllers from "./bookings.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createBookingSchema, updateBookingSchema } from "./bookings.schema.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, controllers.getBookings);
router.get("/:id", requireAuth, controllers.getBookingById);
router.post("/", requireAuth, validateRequest(createBookingSchema), controllers.createBooking);
router.patch("/:id", requireAuth, validateRequest(updateBookingSchema), controllers.updateBookingStatus);

export default router;
