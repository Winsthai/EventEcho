import express from "express";
import eventRouter from "../controllers/events.js";
import loginRouter from "../controllers/login.js";
import { errorHandler } from "./middleware.js";

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/events", eventRouter);

  app.use("/api/login", loginRouter);

  app.use(errorHandler);

  return app;
};

export default createServer;
