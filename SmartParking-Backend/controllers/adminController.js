const Booking = require("../models/Booking");
const { Op } = require("sequelize");

/* Dashboard */

const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [["createdAt", "DESC"]],
    });

    const totalBookings = bookings.length;
    const totalRevenue = totalBookings * 100;

    res.json({
      totalBookings,
      totalRevenue,
      totalUsers: totalBookings,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Delete booking */

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy();

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* Search booking */

const searchBooking = async (req, res) => {
  try {
    const { vehicleNumber } = req.query;

    const bookings = await Booking.findAll({
      where: {
        vehicleNumber: {
          [Op.iLike]: `%${vehicleNumber}%`,
        },
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

/* Filter booking */

const filterBookings = async (req, res) => {
  try {
    const { province, district } = req.query;

    const where = {};

    if (province) where.province = province;
    if (district) where.district = district;

    const bookings = await Booking.findAll({ where });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Filter failed" });
  }
};

module.exports = {
  getDashboardData,
  deleteBooking,
  searchBooking,
  filterBookings,
};