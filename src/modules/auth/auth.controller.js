import { auth } from "../../lib/auth.js";
import { supabase } from "../../config/db.js";

// POST /api/auth/register
export const registerManager = async (req, res, next) => {
  try {
    const { email, password, user_type, name, bank_account_details } = req.body;
    
    // 1. Call BetterAuth to create auth user & insert fields natively
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || email.split("@")[0],
        user_type, // "HOSTEL_MANAGER"
        bank_account_details,
        profile_complete: true
      }
    });

    if (response.error) {
      return res.status(400).json({ success: false, message: response.error.message });
    }

    const { user } = response;

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
