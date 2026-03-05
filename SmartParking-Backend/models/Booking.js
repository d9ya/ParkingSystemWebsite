const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    nic: { type: DataTypes.STRING, allowNull: false },
    vehicleType: { type: DataTypes.STRING, allowNull: false },
    vehicleModel: { type: DataTypes.STRING, allowNull: false },
    vehicleNumber: { type: DataTypes.STRING, allowNull: false },
    province: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    parkingSpot: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // for revenue
  },
  {
    tableName: "bookings",   // must match your actual table name in DB
    timestamps: true,        // includes createdAt and updatedAt
  }
);

module.exports = Booking;