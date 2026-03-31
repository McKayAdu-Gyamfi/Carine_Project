import { supabase } from "../../config/db.js";

// GET /api/reviews?hostel_id=123
export const getReviews = async (req, res, next) => {
  try {
    const { hostel_id } = req.query;

    let query = supabase.from("REVIEW").select("*, USERS:student_id (email)");

    if (hostel_id) query = query.eq("hostel_id", hostel_id);

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews
export const createReview = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };

    const { data, error } = await supabase
      .from("REVIEW")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
