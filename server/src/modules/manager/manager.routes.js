import { Router } from "express";
import * as controllers from "./manager.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

// Require MANAGER role
const requireManager = (req, res, next) => {
  if (!req.user || req.user.user_type !== "HOSTEL_MANAGER") {
    return res.status(403).json({ success: false, message: "Forbidden: Managers only" });
  }
  next();
};

const router = Router();

router.use(requireAuth);
router.use(requireManager);

router.get("/dashboard", controllers.getDashboardStats);
router.get("/hostels", controllers.getHostels);
router.get("/hostels/:hostelId/rooms", controllers.getRooms);
router.get("/hostels/:hostelId/bookings", controllers.getBookings);
router.get("/earnings", controllers.getEarnings);
router.patch("/bookings/:id/status", controllers.updateBookingStatus);

export default router;
