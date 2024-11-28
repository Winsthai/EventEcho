import eventRouter from "../controllers/events";
import { errorHandler } from "./middleware";

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/events", eventRouter);

  app.use(errorHandler);

  return app;
};

export default createServer;
