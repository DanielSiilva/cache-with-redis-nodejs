import express from "express";
import userRoutes from "./routes/userRoutes";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use("/api", userRoutes);
  return app;
};
