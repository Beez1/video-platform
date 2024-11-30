const express = require("express");
const multer = require("multer");
const Video = require("../models/video");

const router = express.Router();

// Multer Configuration: Store files in memory for Base64 conversion
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
});

// Upload Video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded." });
    }

    const { title, genre } = req.body;

    if (!title || !genre) {
      return res.status(400).json({ message: "Title and genre are required." });
    }

    // Convert video to Base64
    const videoBase64 = req.file.buffer.toString("base64");

    // Save metadata and Base64 string to MongoDB
    const video = new Video({
      title,
      genre,
      mimetype: req.file.mimetype,
      videoBase64,
    });

    await video.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      videoId: video._id,
    });
  } catch (error) {
    console.error("Error during video upload:", error);
    res.status(500).json({
      message: "An error occurred during video upload.",
      error: error.message,
    });
  }
});

// Fetch All Videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    const formattedVideos = videos.map(video => ({
      _id: video._id,
      title: video.title,
      genre: video.genre,
      videoData: `data:${video.mimetype};base64,${video.videoBase64}`
    }));

    res.json(formattedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
