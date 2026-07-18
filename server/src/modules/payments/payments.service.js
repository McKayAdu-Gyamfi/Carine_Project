import axios from "axios";
import crypto from "crypto";
import { supabase } from "../../config/db.js";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Utility for throwing errors
class PaymentError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "PaymentError";
    this.statusCode = statusCode;
  }
}

const paystackApi = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export const initializePayment = async (bookingId, userId, email, amount) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new PaymentError("Paystack is not configured on the server", 500);
  }

  // Multiply by 100 to convert to lowest currency unit (pesewas/kobo)
  const amountInLowestUnit = amount * 100;

  try {
    const response = await paystackApi.post("/transaction/initialize", {
      email,
      amount: amountInLowestUnit,
      currency: "GHS",
      callback_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payments/verify`,
      metadata: {
        booking_id: bookingId,
        student_id: userId,
      },
    });

    const { authorization_url, reference } = response.data.data;

    // Create a PENDING payment record
    const { error: insertError } = await supabase.from("PAYMENT").insert([{
      booking_id: bookingId,
      student_id: userId,
      amount: amountInLowestUnit,
      currency: "GHS",
      reference: reference,
      status: "PENDING",
    }]);

    if (insertError) {
      throw new PaymentError("Failed to initialize payment record: " + insertError.message, 500);
    }

    return { authorization_url, reference };
  } catch (error) {
    throw new PaymentError(
      error.response?.data?.message || error.message,
      error.response?.status || 500
    );
  }
};

export const verifyPayment = async (reference) => {
  try {
    const response = await paystackApi.get(`/transaction/verify/${reference}`);
    const data = response.data.data;

    if (data.status === "success") {
      await confirmPaymentRecord(reference, data);
      return { status: "success", data };
    } else {
      await markPaymentFailed(reference, data);
      return { status: "failed", data };
    }
  } catch (error) {
    throw new PaymentError(
      error.response?.data?.message || error.message,
      error.response?.status || 500
    );
  }
};

export const handleWebhook = async (payload, signature) => {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (hash !== signature) {
    throw new PaymentError("Invalid signature", 401);
  }

  const event = payload.event;
  const data = payload.data;

  if (event === "charge.success") {
    await confirmPaymentRecord(data.reference, data);
  } else if (event === "charge.failed") {
    await markPaymentFailed(data.reference, data);
  }

  return { success: true };
};

const confirmPaymentRecord = async (reference, paystackData) => {
  // Update PAYMENT record
  const { data: payment, error: paymentError } = await supabase
    .from("PAYMENT")
    .update({
      status: "SUCCESS",
      paystack_data: paystackData,
      updated_at: new Date(),
    })
    .eq("reference", reference)
    .select("booking_id")
    .single();

  if (paymentError || !payment) return;

  // Mark BOOKING as CONFIRMED
  await supabase
    .from("BOOKING")
    .update({ status: "CONFIRMED", updated_at: new Date() })
    .eq("id", payment.booking_id);
    
  // Room occupancy is updated in the bookings module when status changes to CONFIRMED.
  // Ideally, we'd trigger that or handle it here. For simplicity, since webhook is async,
  // we just update it. A trigger or service function might be better. Let's do it manually.
  const { data: booking } = await supabase.from("BOOKING").select("room_id").eq("id", payment.booking_id).single();
  
  if (booking && booking.room_id) {
    const { data: room } = await supabase.from("ROOM").select("current_occupancy, capacity").eq("id", booking.room_id).single();
    if (room) {
      const newOccupancy = Math.max(0, (room.current_occupancy || 0) + 1);
      const is_available = newOccupancy < room.capacity;
      await supabase.from("ROOM").update({ current_occupancy: newOccupancy, is_available }).eq("id", booking.room_id);
    }
  }
};

const markPaymentFailed = async (reference, paystackData) => {
  await supabase
    .from("PAYMENT")
    .update({
      status: "FAILED",
      paystack_data: paystackData,
      updated_at: new Date(),
    })
    .eq("reference", reference);
};
