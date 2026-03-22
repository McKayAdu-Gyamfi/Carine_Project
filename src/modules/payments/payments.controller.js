import { supabase } from "../../config/db.js";

// GET /api/payments/:id
export const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from("PAYMENT")
      .select("*, BOOKING (*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/payments?booking_id=123
export const getPayments = async (req, res, next) => {
  try {
    const { booking_id } = req.query;
    
    let query = supabase.from("PAYMENT").select("*");
    
    if (booking_id) query = query.eq("booking_id", booking_id);

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/payments
export const createPayment = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from("PAYMENT")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/payments/:id
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePayload = {
      ...req.body,
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from("PAYMENT")
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
