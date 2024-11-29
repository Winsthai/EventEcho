import express from "express";
import eventRouter from "../controllers/events.js";
import loginRouter from "../controllers/login.js";
import { errorHandler } from "./middleware.js";
import userRouter from "../controllers/users.js";
import cors from 'cors';

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use("/api/events", eventRouter);

  app.use("/api/login", loginRouter);

  app.use("/api/users", userRouter);

  app.use(errorHandler);

  return app;
};

export default createServer;
