import { Router } from "express";
import * as controllers from "./bookings.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createBookingSchema, updateBookingSchema } from "./bookings.schema.js";

const router = Router();

router.get("/", controllers.getBookings);
router.get("/:id", controllers.getBookingById);
router.post("/", validateRequest(createBookingSchema), controllers.createBooking);
router.patch("/:id", validateRequest(updateBookingSchema), controllers.updateBookingStatus);

export default router;
