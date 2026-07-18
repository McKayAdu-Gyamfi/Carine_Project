import * as adminService from "./admin.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await adminService.getDashboardStats();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await adminService.getAllUsers(req.query);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await adminService.updateUser(id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllHostels = async (req, res, next) => {
  try {
    const data = await adminService.getAllHostels();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const data = await adminService.getAllBookings();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const data = await adminService.getAllPayments();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
