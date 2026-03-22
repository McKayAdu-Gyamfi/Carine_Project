import { z } from "zod";

export const getHostelSchema = z.object({
  params: z.object({
    id: z.string()
  }).optional()
});

export const createHostelSchema = z.object({
  body: z.object({
    hostel_name: z.string().min(1, "Hostel name is required"),
    location: z.string().min(1, "Location is required"),
    total_rooms: z.number().int().min(1).default(1),
    // manager_id relates to Better Auth users table
    manager_id: z.string().optional()
  })
});

export const updateHostelSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    hostel_name: z.string().optional(),
    location: z.string().optional(),
    total_rooms: z.number().int().optional(),
    manager_id: z.string().optional()
  })
});
