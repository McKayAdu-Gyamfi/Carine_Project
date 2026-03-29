import { z } from "zod";

export const registerManagerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    user_type: z.literal("HOSTEL_MANAGER"),
    name: z.string().optional(),
    bank_account_details: z.string().optional()
  })
});
