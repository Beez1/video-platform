const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Load environment variables
dotenv.config();  // Initialize Express

// Create an Express app
const app = express();
app.use(express.json());  // Middleware for JSON parsing
app.use(cors());
// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected"))   // MongoDB Connected
  .catch((err) => console.error("MongoDB Connection Error:", err));  // MongoDB Connection Error

// Sample routes (replace with actual routes later)
app.get("/", (req, res) => {
  res.send("Welcome to the Video Platform API!");
});

// Serve video files


// Load your routes
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");  // Video Routes
app.use("/video", videoRoutes);


app.use("/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
