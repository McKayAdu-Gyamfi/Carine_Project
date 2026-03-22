import { Router } from "express";
import * as controllers from "./payments.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createPaymentSchema, updatePaymentSchema } from "./payments.schema.js";

const router = Router();

router.get("/", controllers.getPayments);
router.get("/:id", controllers.getPaymentById);
router.post("/", validateRequest(createPaymentSchema), controllers.createPayment);
router.patch("/:id", validateRequest(updatePaymentSchema), controllers.updatePaymentStatus);

export default router;
