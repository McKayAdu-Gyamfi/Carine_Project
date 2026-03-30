import { supabase } from "../../config/db.js";
import * as amenitiesService from "../amenities/Amenities.service.js";

// GET /api/rooms?hostel_id=123
export const getRooms = async (req, res, next) => {
  try {
    const { hostel_id } = req.query;
    
    let query = supabase.from("ROOM").select("*, HOSTEL!inner(hostel_name)");
    
    if (hostel_id) {
      query = query.eq("hostel_id", hostel_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/rooms/:id
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from("ROOM")
      .select(`
        *,
        ROOM_IMAGE_URLS (*),
        ROOM_AMENITY (*),
        HOSTEL (hostel_name, location)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/rooms
export const createRoom = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      current_occupancy: 0,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from("ROOM")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/rooms/:id
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePayload = { ...req.body, updated_at: new Date() };

    const { data, error } = await supabase
      .from("ROOM")
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

// ROOM AMENITIES

// PUT /api/rooms/:id/amenities
export const updateRoomAmenities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amenities } = req.body;
    
    const data = await amenitiesService.updateRoomAmenities(id, amenities);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/rooms/:id/amenities
export const addRoomAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const data = await amenitiesService.addRoomAmenity(id, name);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/rooms/:id/amenities/:amenityId
export const removeRoomAmenity = async (req, res, next) => {
  try {
    const { amenityId } = req.params;
    
    await amenitiesService.removeRoomAmenity(amenityId);
    res.json({ success: true, message: "Amenity removed" });
  } catch (err) {
    next(err);
  }
};

