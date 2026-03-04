const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Booking = sequelize.define("Booking", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parkingSpot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Booking;