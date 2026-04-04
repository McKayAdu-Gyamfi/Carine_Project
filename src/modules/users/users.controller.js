import * as usersService from "./users.service.js";

// GET /api/users/me
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id; // from requireAuth middleware
    const data = await usersService.getMe(userId);
    console.log(`[Users Controller - getMe] Success for user ${userId}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - getMe] Error:", err);
    next(err);
  }
};

// PATCH /api/users/me
export const updateMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userType = req.user.user_type; // from requireAuth middleware
    const data = await usersService.updateMe(userId, req.body, userType);
    console.log(`[Users Controller - updateMe] Success for user ${userId}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - updateMe] Error:", err);
    next(err);
  }
};

// PATCH /api/users/me/profile-complete
export const completeProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await usersService.completeProfile(userId, req.body);
    console.log(`[Users Controller - completeProfile] Success for user ${userId}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - completeProfile] Error:", err);
    next(err);
  }
};

// GET /api/users/me/hostels
export const getMyHostels = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await usersService.getMyHostels(userId);
    console.log(`[Users Controller - getMyHostels] Success for user ${userId}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - getMyHostels] Error:", err);
    next(err);
  }
};

// GET /api/users
export const listUsers = async (req, res, next) => {
  try {
    const data = await usersService.listUsers();
    console.log("[Users Controller - listUsers] Success fetching all users");
    res.json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - listUsers] Error:", err);
    next(err);
  }
};

// POST /api/users (Admin explicit creation)
export const createAdmin = async (req, res, next) => {
  try {
    const data = await usersService.createAdmin(req.body);
    console.log("[Users Controller - createAdmin] Success creating admin");
    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("[Users Controller - createAdmin] Error:", err);
    next(err);
  }
};

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersService.getUserById(id);
    console.log(`[Users Controller - getUserById] Success for id ${id}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error(`[Users Controller - getUserById] Error for id ${req.params.id}:`, err);
    next(err);
  }
};

// PATCH /api/users/:id
export const adminUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersService.adminUpdateUser(id, req.body);
    console.log(`[Users Controller - adminUpdateUser] Success for id ${id}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error(`[Users Controller - adminUpdateUser] Error for id ${req.params.id}:`, err);
    next(err);
  }
};
