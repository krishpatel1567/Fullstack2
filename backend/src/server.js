import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "../src/routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "../middleware/rateLimmiter.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process and try again.`);
  } else {
    console.error("Server startup error:", error);
  }
  process.exit(1);
});
