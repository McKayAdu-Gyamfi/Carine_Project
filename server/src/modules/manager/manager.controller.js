import * as managerService from "./manager.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await managerService.getDashboardStats(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getHostels = async (req, res, next) => {
  try {
    const data = await managerService.getHostels(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const { hostelId } = req.params;
    const data = await managerService.getRooms(req.user.id, hostelId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { hostelId } = req.params;
    const data = await managerService.getBookings(req.user.id, hostelId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getEarnings = async (req, res, next) => {
  try {
    const data = await managerService.getEarnings(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const data = await managerService.updateBookingStatus(req.user.id, id, status);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
