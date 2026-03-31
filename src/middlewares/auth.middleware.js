import { auth } from "../lib/auth.js";
import { supabase } from "../config/db.js";

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    
    if (!session || !session.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    req.user = session.user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    // Strict matching per requirements:
    if (req.user.user_type !== role) {
      return res.status(403).json({ success: false, message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};

export const requireCompleteProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { data: user, error } = await supabase
      .from("user")
      .select("profile_complete")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (!user.profile_complete && req.user.user_type === "STUDENT") {
      return res.status(403).json({ success: false, message: "Please complete your profile before making a booking." });
    }

    next();
  } catch (err) {
    next(err);
  }
};
