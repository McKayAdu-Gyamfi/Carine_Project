import { Router } from "express";
import * as controllers from "./reviews.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createReviewSchema } from "./reviews.schema.js";

const router = Router();

router.get("/", controllers.getReviews);
router.post("/", validateRequest(createReviewSchema), controllers.createReview);

export default router;
