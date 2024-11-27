import dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from 'pg';
const { Client } = pkg;
import eventRouter from "./controllers/events.js";
import userRouter from "./controllers/users.js";
import cors from 'cors';

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const main = async () => {
  try {
    await client.connect();
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();

export default client;