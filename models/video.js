// models/video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed
  uploaded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);
