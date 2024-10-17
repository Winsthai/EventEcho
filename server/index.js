import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import express from "express";
const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
