import * as usersService from "./users.service.js";

// GET /api/users/me
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id; // from requireAuth middleware
    const data = await usersService.getMe(userId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/me
export const updateMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userType = req.user.user_type; // from requireAuth middleware
    const data = await usersService.updateMe(userId, req.body, userType);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/me/profile-complete
export const completeProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await usersService.completeProfile(userId, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/me/hostels
export const getMyHostels = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await usersService.getMyHostels(userId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/users
export const listUsers = async (req, res, next) => {
  try {
    const data = await usersService.listUsers();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/users (Admin explicit creation)
export const createAdmin = async (req, res, next) => {
  try {
    const data = await usersService.createAdmin(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersService.getUserById(id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/:id
export const adminUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersService.adminUpdateUser(id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
