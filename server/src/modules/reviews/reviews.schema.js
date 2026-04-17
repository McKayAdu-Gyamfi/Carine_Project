import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
    student_id: z.string().min(1, "Student ID is required"),
    hostel_id: z.string().min(1, "Hostel ID is required")
  })
});
