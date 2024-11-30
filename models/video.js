const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String, // MIME type (e.g., video/mp4)
    required: true,
  },
  videoBase64: {
    type: String, // Base64 string of the video
    required: true,
  },
});

module.exports = mongoose.model("Video", videoSchema);
