const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    logging: console.log, // shows queries
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");

    // Verify exact database
    const [results] = await sequelize.query("SELECT current_database();");
    console.log("Connected to DB:", results);

    // Sync models
    await sequelize.sync(); // simple sync to avoid permission issues
    console.log("All models were synchronized successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };