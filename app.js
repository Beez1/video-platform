const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dozfgdehv",
  api_secret: "W8G30odRvqZ2YDo9pqaXJ3dHcE0",
  api_key: "387542228515311",
});

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
app.use("/auth", authRoutes);
app.use("/video", videoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
