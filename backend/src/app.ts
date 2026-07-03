import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import imageRoutes from "./routes/image.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Image processing API running",
  });
});

export default app;