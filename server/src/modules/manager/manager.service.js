import { supabase } from "../../config/db.js";

class ManagerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ManagerError";
    this.statusCode = statusCode;
  }
}

export const getDashboardStats = async (managerId) => {
  // Get all hostels for this manager
  const { data: hostels, error: hostelError } = await supabase
    .from("HOSTEL")
    .select("id")
    .eq("manager_id", managerId);

  if (hostelError) throw new ManagerError(hostelError.message, 500);

  const hostelIds = hostels.map(h => h.id);
  
  if (hostelIds.length === 0) {
    return {
      total_hostels: 0,
      total_bookings: 0,
      pending_bookings: 0,
      total_earnings: 0
    };
  }

  // Get all rooms in those hostels
  const { data: rooms } = await supabase.from("ROOM").select("id").in("hostel_id", hostelIds);
  const roomIds = rooms?.map(r => r.id) || [];

  // Get bookings for those rooms
  let bookings = [];
  let pendingBookings = 0;
  if (roomIds.length > 0) {
    const { data: bookingsData } = await supabase.from("BOOKING").select("id, status").in("room_id", roomIds);
    bookings = bookingsData || [];
    pendingBookings = bookings.filter(b => b.status === "PENDING").length;
  }
  const bookingIds = bookings.map(b => b.id);

  // Get earnings
  let totalEarnings = 0;
  if (bookingIds.length > 0) {
    const { data: payments } = await supabase.from("PAYMENT").select("amount").in("booking_id", bookingIds).eq("status", "SUCCESS");
    totalEarnings = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  }

  return {
    total_hostels: hostelIds.length,
    total_bookings: bookings.length,
    pending_bookings: pendingBookings,
    total_earnings: totalEarnings / 100 // Return as GHS
  };
};

export const getHostels = async (managerId) => {
  const { data, error } = await supabase.from("HOSTEL").select("*").eq("manager_id", managerId);
  if (error) throw new ManagerError(error.message, 500);
  return data;
};

export const getRooms = async (managerId, hostelId) => {
  // First verify manager owns the hostel
  const { data: hostel } = await supabase.from("HOSTEL").select("id").eq("id", hostelId).eq("manager_id", managerId).single();
  if (!hostel) throw new ManagerError("Forbidden: You do not manage this hostel", 403);

  const { data, error } = await supabase.from("ROOM").select("*").eq("hostel_id", hostelId);
  if (error) throw new ManagerError(error.message, 500);
  return data;
};

export const getBookings = async (managerId, hostelId) => {
  const { data: hostel } = await supabase.from("HOSTEL").select("id").eq("id", hostelId).eq("manager_id", managerId).single();
  if (!hostel) throw new ManagerError("Forbidden: You do not manage this hostel", 403);

  // Join to get bookings through rooms
  const { data, error } = await supabase
    .from("ROOM")
    .select(`
      id, room_number,
      BOOKING (*, student:student_id (email, name))
    `)
    .eq("hostel_id", hostelId);

  if (error) throw new ManagerError(error.message, 500);

  // Flatten the response
  const bookings = [];
  data.forEach(room => {
    room.BOOKING.forEach(booking => {
      bookings.push({ ...booking, room_number: room.room_number });
    });
  });

  return bookings;
};

export const getEarnings = async (managerId) => {
  // Similar logic to dashboard stats, get all successful payments for manager's rooms
  const { data: hostels } = await supabase.from("HOSTEL").select("id").eq("manager_id", managerId);
  const hostelIds = hostels?.map(h => h.id) || [];
  if (hostelIds.length === 0) return [];

  const { data: rooms } = await supabase.from("ROOM").select("id").in("hostel_id", hostelIds);
  const roomIds = rooms?.map(r => r.id) || [];
  if (roomIds.length === 0) return [];

  const { data: bookings } = await supabase.from("BOOKING").select("id").in("room_id", roomIds);
  const bookingIds = bookings?.map(b => b.id) || [];
  if (bookingIds.length === 0) return [];

  const { data, error } = await supabase
    .from("PAYMENT")
    .select("*, BOOKING (id, room_id, ROOM(room_number, HOSTEL(hostel_name)))")
    .in("booking_id", bookingIds)
    .eq("status", "SUCCESS");

  if (error) throw new ManagerError(error.message, 500);
  return data;
};

export const updateBookingStatus = async (managerId, bookingId, status) => {
  // Fetch booking and check ownership
  const { data: booking, error: fetchError } = await supabase
    .from("BOOKING")
    .select("*, ROOM (id, current_occupancy, capacity, hostel_id, HOSTEL (manager_id))")
    .eq("id", bookingId)
    .single();

  if (fetchError || !booking) throw new ManagerError("Booking not found", 404);

  if (booking.ROOM?.HOSTEL?.manager_id !== managerId) {
    throw new ManagerError("Forbidden: You do not manage the hostel for this booking", 403);
  }

  const { data: updatedBooking, error: updateError } = await supabase
    .from("BOOKING")
    .update({ status, updated_at: new Date() })
    .eq("id", bookingId)
    .select()
    .single();

  if (updateError) throw new ManagerError(updateError.message, 500);

  // Sync occupancy logic: 
  // If moving from non-CONFIRMED to CONFIRMED -> +1
  // If moving from CONFIRMED to CANCELLED/CHECKED_OUT -> -1
  // We'll simplify and do the same logic as bookings.controller.js
  const previousStatus = booking.status;
  const newStatus = status;
  const roomId = booking.room_id;
  let occupancyChange = 0;

  if (newStatus === "CONFIRMED" && previousStatus !== "CONFIRMED") occupancyChange = 1;
  else if (previousStatus === "CONFIRMED" && (newStatus === "CANCELLED" || newStatus === "CHECKED_OUT")) occupancyChange = -1;

  if (occupancyChange !== 0 && booking.ROOM) {
    const newOccupancy = Math.max(0, (booking.ROOM.current_occupancy || 0) + occupancyChange);
    const is_available = newOccupancy < booking.ROOM.capacity;

    await supabase
      .from("ROOM")
      .update({ current_occupancy: newOccupancy, is_available })
      .eq("id", roomId);
  }

  return updatedBooking;
};
