import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load environment variables early
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Apply middlewares
app.use(express.json({ limit: '50mb' })); // Increase limit for image uploads
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to DB and start server
server.listen(PORT, async () => {
  console.log("Server is running on PORT:" + PORT);
  await connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection:', error);
});