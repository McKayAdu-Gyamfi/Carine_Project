import { auth } from "../lib/auth.js";
import { AppError } from "./errorHandler.js"; // Optional usage

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
    // Admin can also access routes that require specific roles if preferred,
    // but strict matching per requirements:
    if (req.user.user_type !== role && req.user.user_type !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};
