import { Router } from "express";
import * as controllers from "./payments.controller.js";

// Usually we would import the auth middleware to protect these routes, 
// assuming there's an authentication middleware that populates req.user.
// For now, I'll assume standard Express routes and we can add requireAuth if available.
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/initialize", requireAuth, controllers.initializePayment);
router.get("/verify", controllers.verifyPayment); // Usually public callback
router.post("/webhook", controllers.webhook); // Public Paystack webhook

export default router;
