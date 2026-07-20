import express from "express";
import notesRoutes from "../src/routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "../middleware/rateLimmiter.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes",notesRoutes)
