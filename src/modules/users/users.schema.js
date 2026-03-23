import { z } from "zod";

export const updateUserProfileSchema = z.object({
  body: z.object({
    profile_complete: z.boolean().optional(),
    course: z.string().optional(),
    current_room_id: z.string().optional(),
    student_id: z.string().optional(), // School issued student ID
    // Managers can't update user_type in service anyway, but validation allows optional
    user_type: z.enum(["STUDENT", "HOSTEL_MANAGER", "ADMIN"]).optional(),
    name: z.string().optional(), // Common
    phone: z.string().optional() // Example additional fields
  })
});

export const completeProfileSchema = z.object({
  body: z.object({
    course: z.string({ required_error: "Course is required" }),
    student_id: z.string({ required_error: "Student ID is required" }),
  })
});

export const createAdminSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
  })
});

export const adminUpdateUserSchema = z.object({
  body: z.object({
    profile_complete: z.boolean().optional(),
    course: z.string().optional(),
    current_room_id: z.string().optional(),
    student_id: z.string().optional(),
    user_type: z.enum(["STUDENT", "HOSTEL_MANAGER", "ADMIN"]).optional(),
    name: z.string().optional()
  })
});
