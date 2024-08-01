import mongoose from "mongoose";
import { createServer } from "./server";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const app = createServer();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
