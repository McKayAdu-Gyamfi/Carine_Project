import { auth } from "../../lib/auth.js";
import { supabase } from "../../config/db.js";

// POST /api/auth/register
export const registerManager = async (req, res, next) => {
  try {
    const { email, password, user_type, name } = req.body;
    
    // 1. Call BetterAuth to create auth user
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || email.split("@")[0]
      }
    });

    if (response.error) {
      return res.status(400).json({ success: false, message: response.error.message });
    }

    const { user } = response;

    // 2. Immediately update the new user in Supabase to specify type
    // Since BetterAuth created the user row, we just mark them as HOSTEL_MANAGER
    const { data: updatedUser, error } = await supabase
      .from("user") // Ensure this matches actual table name, it might be 'USERS' based on controllers
      .update({
        user_type, // "HOSTEL_MANAGER"
        profile_complete: true
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      // Depending on the app, you may want to delete the user or log the error
      throw error;
    }

    res.status(201).json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};
