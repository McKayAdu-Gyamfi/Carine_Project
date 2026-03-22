import { z } from "zod";

export const createComplaintSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Complaint content is required"),
    student_id: z.string().min(1, "Student ID is required"),
    hostel_id: z.string().min(1, "Hostel ID is required")
  })
});

export const updateComplaintSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"])
  })
});
