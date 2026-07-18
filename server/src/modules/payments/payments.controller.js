import * as paymentsService from "./payments.service.js";

export const initializePayment = async (req, res, next) => {
  try {
    const { booking_id, amount } = req.body;
    const userId = req.user.id;
    const email = req.user.email;

    if (!booking_id || !amount) {
      return res.status(400).json({ success: false, message: "booking_id and amount are required" });
    }

    const data = await paymentsService.initializePayment(booking_id, userId, email, amount);
    res.status(200).json({ success: true, data });
  } catch (err) {
    if (err.name === "PaymentError") {
      return res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.query;
    
    if (!reference) {
      return res.status(400).json({ success: false, message: "reference is required" });
    }

    const data = await paymentsService.verifyPayment(reference);
    res.status(200).json({ success: true, data });
  } catch (err) {
    if (err.name === "PaymentError") {
      return res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
    next(err);
  }
};

export const webhook = async (req, res, next) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    if (!signature) {
      return res.status(401).json({ success: false, message: "Missing signature" });
    }

    // Paystack webhooks should be parsed as raw body if doing strict HMAC validation, 
    // but typically Express JSON parser works if the objects stringify deterministically. 
    // We assume the body is parsed as JSON already.
    await paymentsService.handleWebhook(req.body, signature);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    // Always return 200 to Paystack so it stops retrying, unless we genuinely failed to parse
    res.status(200).json({ success: false, message: err.message });
  }
};
