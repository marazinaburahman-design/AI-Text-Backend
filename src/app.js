import "dotenv/config";
import express from "express";
import cors from "cors";
import transformRoutes from "./routes/transformRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// FRONTEND_URL can contain multiple comma-separated origins when deployed.
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.FRONTEND_URL || "").split(","),
].map((url) => url.trim()).filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests such as Postman/curl do not send an Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: This frontend origin is not allowed."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/anotherchecking", (req, res) => {
  res.json({ message: "AI Text Transformer API is running." });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/transform", transformRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use(errorHandler);

export default app;
