import { supabase } from "../../config/db.js";

// GET /api/hostels
export const getHostels = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("HOSTEL")
      .select("*, manager:manager_id (id, email)");

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/hostels/:id
export const getHostelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Combining table fetches using Supabase joins
    const { data, error } = await supabase
      .from("HOSTEL")
      .select(`
        *,
        ROOM (*),
        HOSTEL_IMAGE_URLS (*),
        AMENITY (*)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/hostels
export const createHostel = async (req, res, next) => {
  try {
    const { hostel_name, location, total_rooms, manager_id } = req.body;
    
    const { data, error } = await supabase
      .from("HOSTEL")
      .insert([
        { hostel_name, location, total_rooms, manager_id, created_at: new Date(), updated_at: new Date() }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/hostels/:id
export const updateHostel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePayload = { ...req.body, updated_at: new Date() };

    const { data, error } = await supabase
      .from("HOSTEL")
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
