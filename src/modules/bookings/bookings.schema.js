import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    check_in_date: z.string().datetime(),
    check_out_date: z.string().datetime(),
    room_id: z.string().min(1, "Room ID is required"),
    student_id: z.string().min(1, "Student ID is required")
  })
});

export const updateBookingSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "CHECKED_OUT"])
  })
});
