import { supabase } from "../../config/db.js";

class AdminError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AdminError";
    this.statusCode = statusCode;
  }
}

export const getDashboardStats = async () => {
  const [usersRes, hostelsRes, bookingsRes, paymentsRes] = await Promise.all([
    supabase.from("user").select("id, user_type"),
    supabase.from("HOSTEL").select("id", { count: "exact" }),
    supabase.from("BOOKING").select("id, status"),
    supabase.from("PAYMENT").select("amount").eq("status", "SUCCESS")
  ]);

  if (usersRes.error) throw new AdminError(usersRes.error.message, 500);

  const totalRevenue = paymentsRes.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  return {
    total_users: usersRes.data?.length || 0,
    users_by_role: usersRes.data?.reduce((acc, user) => {
      acc[user.user_type] = (acc[user.user_type] || 0) + 1;
      return acc;
    }, {}) || {},
    total_hostels: hostelsRes.count || 0,
    total_bookings: bookingsRes.data?.length || 0,
    total_revenue_ghs: totalRevenue / 100 // Convert back to GHS
  };
};

export const getAllUsers = async (filters) => {
  let query = supabase.from("user").select("*");
  
  if (filters.user_type) query = query.eq("user_type", filters.user_type);
  if (filters.school_id) query = query.eq("school_id", filters.school_id);
  
  const { data, error } = await query;
  if (error) throw new AdminError(error.message, 500);
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("user")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new AdminError(error.message, 400);
  return data;
};

export const deleteUser = async (id) => {
  // Better to use BetterAuth for full user deletion or a soft-delete if we don't want to break FKs.
  // We'll soft-delete by unsetting their role or using an active flag if it existed.
  // For now, we will perform a hard delete via Supabase. Note: this might fail due to FKs without cascade.
  const { error } = await supabase.from("user").delete().eq("id", id);
  if (error) throw new AdminError(error.message, 400);
  return true;
};

export const getAllHostels = async () => {
  const { data, error } = await supabase.from("HOSTEL").select("*, manager:manager_id (email, name)");
  if (error) throw new AdminError(error.message, 500);
  return data;
};

export const getAllBookings = async () => {
  const { data, error } = await supabase.from("BOOKING").select("*, ROOM(room_number, HOSTEL(hostel_name)), student:student_id (email, name)");
  if (error) throw new AdminError(error.message, 500);
  return data;
};

export const getAllPayments = async () => {
  const { data, error } = await supabase.from("PAYMENT").select("*, BOOKING(student_id, room_id)");
  if (error) throw new AdminError(error.message, 500);
  return data;
};
