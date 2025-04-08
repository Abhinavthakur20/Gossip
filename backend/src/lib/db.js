import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined. Check your .env file.");
    }

    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("✅ MongoDB connected successfully!")
    })
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
