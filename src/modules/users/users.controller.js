import { supabase } from "../../config/db.js";

// GET /api/users/:id
export const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Better Auth handles core user login logic, we use Supabase to extend the user model with things like "course" & "profile_complete"
    const { data, error } = await supabase
      .from("USERS") // Note: The actual Better Auth table name might be lower-case 'user'. Update this based on your DB!
      .select("*, ROOM:current_room_id (room_number, HOSTEL (hostel_name))")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/:id
export const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePayload = {
      ...req.body,
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from("USERS")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
