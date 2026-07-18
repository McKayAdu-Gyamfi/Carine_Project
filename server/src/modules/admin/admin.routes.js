import { Router } from "express";
import * as controllers from "./admin.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

// Assume verifyOwnership has a requireRole middleware or we create one here.
// For now, I'll implement a simple role check middleware directly or assume it's in auth.middleware.js
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.user_type !== "ADMIN") {
    return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
  }
  next();
};

const router = Router();

// Apply auth and admin check to all admin routes
router.use(requireAuth);
router.use(requireAdmin);

router.get("/dashboard", controllers.getDashboardStats);
router.get("/users", controllers.getAllUsers);
router.patch("/users/:id", controllers.updateUser);
router.delete("/users/:id", controllers.deleteUser);
router.get("/hostels", controllers.getAllHostels);
router.get("/bookings", controllers.getAllBookings);
router.get("/payments", controllers.getAllPayments);

export default router;
