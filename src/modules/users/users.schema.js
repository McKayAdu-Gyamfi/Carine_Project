import { z } from "zod";

export const updateUserProfileSchema = z.object({
  body: z.object({
    profile_complete: z.boolean().optional(),
    course: z.string().optional(),
    current_room_id: z.string().optional(),
    student_id: z.string().optional(), // School issued student ID
    user_type: z.enum(["STUDENT", "HOSTEL_MANAGER", "ADMIN"]).optional()
  })
});
