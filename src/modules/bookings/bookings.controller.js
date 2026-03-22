import { supabase } from "../../config/db.js";

// GET /api/bookings?student_id=123
export const getBookings = async (req, res, next) => {
  try {
    const { student_id } = req.query;
    
    let query = supabase.from("BOOKING").select(`
      *,
      ROOM (room_number, hostel_id, HOSTEL (hostel_name)),
      USERS:student_id (email, profile_complete)
    `);
    
    if (student_id) {
      query = query.eq("student_id", student_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from("BOOKING")
      .select(`
        *,
        PAYMENT (*),
        ROOM (room_number, hostel_id, HOSTEL (hostel_name)),
        USERS:student_id (email, profile_complete)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      status: "PENDING",
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from("BOOKING")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookings/:id
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from("BOOKING")
      .update({ status, updated_at: new Date() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
