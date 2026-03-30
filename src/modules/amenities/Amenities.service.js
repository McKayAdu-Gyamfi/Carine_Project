import { supabase } from "../../config/db.js";

class AmenityServiceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AmenityServiceError";
    this.statusCode = statusCode;
  }
}

// HOSTEL AMENITIES

export const updateHostelAmenities = async (hostelId, amenities) => {
  // 1. Delete all existing amenities for this hostel
  const { error: deleteError } = await supabase
    .from("HOSTEL_AMENITY")
    .delete()
    .eq("hostel_id", hostelId);
    
  if (deleteError) throw new AmenityServiceError(deleteError.message, 400);

  // 2. Insert the new ones
  if (amenities && amenities.length > 0) {
    const amenitiesToInsert = amenities.map(name => ({
      hostel_id: hostelId,
      name
    }));
    
    const { data, error: insertError } = await supabase
      .from("HOSTEL_AMENITY")
      .insert(amenitiesToInsert)
      .select();
      
    if (insertError) throw new AmenityServiceError(insertError.message, 400);
    return data;
  }
  return [];
};

export const addHostelAmenity = async (hostelId, name) => {
  const { data, error } = await supabase
    .from("HOSTEL_AMENITY")
    .insert({ hostel_id: hostelId, name })
    .select()
    .single();
    
  if (error) throw new AmenityServiceError(error.message, 400);
  return data;
};

export const removeHostelAmenity = async (id) => {
  const { error } = await supabase
    .from("HOSTEL_AMENITY")
    .delete()
    .eq("id", id);
    
  if (error) throw new AmenityServiceError(error.message, 400);
  return { success: true };
};

// ROOM AMENITIES

export const updateRoomAmenities = async (roomId, amenities) => {
  // 1. Delete all existing amenities for this room
  const { error: deleteError } = await supabase
    .from("ROOM_AMENITY")
    .delete()
    .eq("room_id", roomId);
    
  if (deleteError) throw new AmenityServiceError(deleteError.message, 400);

  // 2. Insert the new ones
  if (amenities && amenities.length > 0) {
    const amenitiesToInsert = amenities.map(name => ({
      room_id: roomId,
      name
    }));
    
    const { data, error: insertError } = await supabase
      .from("ROOM_AMENITY")
      .insert(amenitiesToInsert)
      .select();
      
    if (insertError) throw new AmenityServiceError(insertError.message, 400);
    return data;
  }
  return [];
};

export const addRoomAmenity = async (roomId, name) => {
  const { data, error } = await supabase
    .from("ROOM_AMENITY")
    .insert({ room_id: roomId, name })
    .select()
    .single();
    
  if (error) throw new AmenityServiceError(error.message, 400);
  return data;
};

export const removeRoomAmenity = async (id) => {
  const { error } = await supabase
    .from("ROOM_AMENITY")
    .delete()
    .eq("id", id);
    
  if (error) throw new AmenityServiceError(error.message, 400);
  return { success: true };
};
