import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    booking_id: z.string().min(1, "Booking ID is required"),
    paystack_reference: z.string().min(1, "Paystack reference is required"),
    amount: z.number().positive(),
    status: z.enum(["PENDING", "PAID", "FAILED"]).default("PENDING")
  })
});

export const updatePaymentSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    status: z.enum(["PENDING", "PAID", "FAILED"]),
    paystack_reference: z.string().optional()
  })
});
