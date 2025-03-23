import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};
