import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to mongoDB", error);
    console.warn("Continuing without database connection; note routes will fail until MongoDB is reachable.");
  }
};