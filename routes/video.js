// routes/video.js
const express = require("express");
const cloudinary = require("cloudinary").v2;
const Video = require("../models/video");
const authenticate = require("../middleware/auth");
const multer = require("multer");

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload Video
router.post("/upload", authenticate, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const { title } = req.body;

    cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "user_videos", timeout: 60000 },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error.message);
          return res.status(500).json({ message: error.message });
        }

        try {
          const video = new Video({
            title,
            url: result.secure_url,
            public_id: result.public_id,
            uploaded_by: req.user.id, // Changed
          });

          await video.save();
          return res.status(201).json({ message: "Video uploaded successfully", video });
        } catch (dbError) {
          console.error("MongoDB Save Error:", dbError.message);
          return res.status(500).json({ message: dbError.message });
        }
      }
    ).end(req.file.buffer); // Use the file buffer
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});


// routes/video.js
router.get("/", authenticate, async (req, res) => {
  try {
    const videos = await Video.find({ uploaded_by: req.user.id });
    if (!videos.length) {
      return res.status(404).json({ message: "No videos found for this user" });
    }
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});
// Delete Video
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user.id; // Assuming req.user.id is the user's ID

    // Find the video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the video was uploaded by the authenticated user
    if (video.uploaded_by.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this video" });
    }

    // Delete the video from Cloudinary
    await cloudinary.uploader.destroy(video.public_id, { resource_type: "video" });

    // Delete the video from the database
    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error.message);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});
module.exports = router;
